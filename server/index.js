import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
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

// 1. Health & Database Status (MySQL)
app.get('/api/status', async (req, res) => {
  const mysqlStatus = await getMysqlStatus().catch(e => ({ connected: false, error: e.message }));
  res.json({
    connected: Boolean(mysqlStatus?.connected),
    active: mysqlStatus?.connected ? 'mysql' : 'json_backup',
    mysql: mysqlStatus
  });
});

// 2. Full Database Bundle (GET & POST)
app.get('/api/data', async (req, res) => {
  // 1. Try MySQL
  const mysqlData = await getMysqlAllData();
  if (mysqlData && Array.isArray(mysqlData.mentors) && mysqlData.mentors.length > 0) {
    return res.json(mysqlData);
  }

  // 2. Fallback to local JSON disk file
  const jsonPath = path.resolve(__dirname, '../src/admin/data/aroham_db.json');
  if (fs.existsSync(jsonPath)) {
    return res.json(JSON.parse(fs.readFileSync(jsonPath, 'utf8')));
  }

  res.status(404).json({ error: 'Database not initialized' });
});

app.post('/api/data', async (req, res) => {
  const mysqlRes = await saveMysqlAllData(req.body).catch(e => ({ success: false, error: e.message }));

  // Mirror to JSON disk backup
  try {
    const jsonPath = path.resolve(__dirname, '../src/admin/data/aroham_db.json');
    fs.writeFileSync(jsonPath, JSON.stringify(req.body, null, 2), 'utf8');
  } catch (e) {}

  res.json({
    success: true,
    mysql: mysqlRes?.success ?? false,
    database: mysqlRes?.success ? 'mysql' : 'json_backup',
    timestamp: new Date().toISOString()
  });
});

// 3. Database Re-seed Endpoint
app.post('/api/seed/mysql', async (req, res) => {
  const result = await seedMysqlDatabase();
  res.json(result);
});

// 4. Mentors Endpoints
app.get('/api/mentors', async (req, res) => {
  const all = await getMysqlAllData();
  if (all && all.mentors) return res.json(all.mentors);
  
  // Fallback to local JSON
  const jsonPath = path.resolve(__dirname, '../src/admin/data/aroham_db.json');
  if (fs.existsSync(jsonPath)) {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    return res.json(data.mentors || []);
  }
  res.status(503).json({ error: 'Database disconnected' });
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
  await connectToMysql();
});
