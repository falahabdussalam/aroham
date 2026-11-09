import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { 
  connectToMongo, 
  getMongoAllData, 
  saveMongoAllData, 
  getMongoStatus,
  seedMongoDatabase 
} from './db.js';
import {
  connectToMysql,
  getMysqlAllData,
  saveMysqlAllData,
  getMysqlStatus,
  seedMysqlDatabase
} from './mysql.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Static dist files (for production hosting)
const distPath = path.resolve(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// -------------------------------------------------------------
// REST API ROUTES
// -------------------------------------------------------------

// 1. Health & Database Status (MongoDB + MySQL)
app.get('/api/status', async (req, res) => {
  const [mongoStatus, mysqlStatus] = await Promise.all([
    getMongoStatus().catch(e => ({ connected: false, error: e.message })),
    getMysqlStatus().catch(e => ({ connected: false, error: e.message }))
  ]);
  res.json({
    connected: Boolean(mongoStatus?.connected || mysqlStatus?.connected),
    active: mongoStatus?.connected ? 'mongodb' : (mysqlStatus?.connected ? 'mysql' : 'json_backup'),
    mongo: mongoStatus,
    mysql: mysqlStatus
  });
});

// 2. Full Database Bundle (GET & POST)
app.get('/api/data', async (req, res) => {
  // 1. Try MongoDB
  const mongoData = await getMongoAllData();
  if (mongoData && Array.isArray(mongoData.mentors) && mongoData.mentors.length > 0) {
    return res.json(mongoData);
  }

  // 2. Try MySQL
  const mysqlData = await getMysqlAllData();
  if (mysqlData && Array.isArray(mysqlData.mentors) && mysqlData.mentors.length > 0) {
    return res.json(mysqlData);
  }

  // 3. Fallback to local JSON disk file
  const jsonPath = path.resolve(__dirname, '../src/admin/data/aroham_db.json');
  if (fs.existsSync(jsonPath)) {
    return res.json(JSON.parse(fs.readFileSync(jsonPath, 'utf8')));
  }

  res.status(404).json({ error: 'Database not initialized' });
});

app.post('/api/data', async (req, res) => {
  const [mongoRes, mysqlRes] = await Promise.all([
    saveMongoAllData(req.body).catch(e => ({ success: false, error: e.message })),
    saveMysqlAllData(req.body).catch(e => ({ success: false, error: e.message }))
  ]);

  // Mirror to JSON disk backup
  try {
    const jsonPath = path.resolve(__dirname, '../src/admin/data/aroham_db.json');
    fs.writeFileSync(jsonPath, JSON.stringify(req.body, null, 2), 'utf8');
  } catch (e) {}

  res.json({
    success: true,
    mongo: mongoRes?.success ?? false,
    mysql: mysqlRes?.success ?? false,
    timestamp: new Date().toISOString()
  });
});

// 3. Database Re-seed Endpoints
app.post('/api/seed/mongo', async (req, res) => {
  const result = await seedMongoDatabase();
  res.json(result);
});

app.post('/api/seed/mysql', async (req, res) => {
  const result = await seedMysqlDatabase();
  res.json(result);
});

// 4. Mentors Endpoints
app.get('/api/mentors', async (req, res) => {
  const db = await connectToMongo();
  if (db) {
    const mentors = await db.collection('mentors').find({}, { projection: { _id: 0 } }).toArray();
    return res.json(mentors);
  }
  const all = await getMysqlAllData();
  if (all && all.mentors) return res.json(all.mentors);
  res.status(503).json({ error: 'Database disconnected' });
});

app.post('/api/mentors', async (req, res) => {
  const mentor = { ...req.body, updatedAt: new Date() };
  const db = await connectToMongo();
  if (db) {
    await db.collection('mentors').updateOne({ id: mentor.id }, { $set: mentor }, { upsert: true });
  }
  res.json({ success: true, mentor });
});

// Serve frontend for SPA routing in production
app.get('*', (req, res) => {
  const indexPath = path.resolve(__dirname, '../dist/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send('Aroham Foundation API Server running.');
  }
});

// Start Server
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`[Aroham Server] Listening on http://0.0.0.0:${PORT}`);
  await connectToMongo();
  await connectToMysql();
});
