import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  connectToMongoDB,
  getMongoAllData,
  saveMongoAllData,
  getMongoStatus,
  seedMongoDatabase
} from './mongodb.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load standard .env then override with .env.local if present
dotenv.config();
const envLocalPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath, override: true });
}

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

// 1. Health & Database Status (MongoDB)
app.get('/api/status', async (req, res) => {
  const mongoStatus = await getMongoStatus().catch(e => ({ connected: false, error: e.message }));
  res.json({
    connected: Boolean(mongoStatus?.connected),
    active: mongoStatus?.connected ? 'mongodb' : 'json_backup',
    mongodb: mongoStatus,
    // Backward compatibility for existing UI checks
    mysql: { connected: false, message: 'MySQL disconnected. Active database: MongoDB' }
  });
});

// 1b. Test Database Endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const mongoStatus = await getMongoStatus();
    res.json({
      success: true,
      message: 'MongoDB connection test successful! Database is live and reachable.',
      database: mongoStatus.database || 'aroham',
      connected: Boolean(mongoStatus.connected),
      collections: mongoStatus.collections || {},
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'MongoDB connection test failed',
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
});

// 2. Full Database Bundle (GET & POST)
app.get('/api/data', async (req, res) => {
  // 1. Try MongoDB
  const mongoData = await getMongoAllData();
  if (mongoData && Array.isArray(mongoData.mentors)) {
    return res.json(mongoData);
  }

  // 2. Fallback to local JSON disk file
  const jsonPath = path.resolve(__dirname, '../src/admin/data/aroham_db.json');
  if (fs.existsSync(jsonPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const dSet = new Set((data.deletedIds || []).map(String));
      if (dSet.size > 0) {
        if (Array.isArray(data.mentors)) data.mentors = data.mentors.filter(m => m && !dSet.has(String(m.id)));
        if (Array.isArray(data.events)) data.events = data.events.filter(e => e && !dSet.has(String(e.id)));
        if (Array.isArray(data.mentees)) data.mentees = data.mentees.filter(m => m && !dSet.has(String(m.id)));
        if (Array.isArray(data.applications)) data.applications = data.applications.filter(a => a && !dSet.has(String(a.id)));
      }
      return res.json(data);
    } catch (e) {
      return res.json(JSON.parse(fs.readFileSync(jsonPath, 'utf8')));
    }
  }

  res.status(404).json({ error: 'Database not initialized' });
});

app.post('/api/data', async (req, res) => {
  const payload = req.body;
  const dSet = new Set((payload.deletedIds || []).map(String));
  if (dSet.size > 0) {
    if (Array.isArray(payload.mentors)) payload.mentors = payload.mentors.filter(m => m && !dSet.has(String(m.id)));
    if (Array.isArray(payload.events)) payload.events = payload.events.filter(e => e && !dSet.has(String(e.id)));
    if (Array.isArray(payload.mentees)) payload.mentees = payload.mentees.filter(m => m && !dSet.has(String(m.id)));
    if (Array.isArray(payload.applications)) payload.applications = payload.applications.filter(a => a && !dSet.has(String(a.id)));
  }

  const mongoRes = await saveMongoAllData(payload).catch(e => ({ success: false, error: e.message }));

  // Mirror to JSON disk backup
  try {
    const jsonPath = path.resolve(__dirname, '../src/admin/data/aroham_db.json');
    fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2), 'utf8');
  } catch (e) {}

  res.json({
    success: true,
    mongodb: mongoRes?.success ?? false,
    database: mongoRes?.success ? 'mongodb' : 'json_backup',
    timestamp: new Date().toISOString()
  });
});

// 3. Database Re-seed Endpoints
app.post(['/api/seed/mongodb', '/api/seed/mysql'], async (req, res) => {
  const result = await seedMongoDatabase();
  res.json(result);
});

// 4. Mentors Endpoints
app.get('/api/mentors', async (req, res) => {
  const all = await getMongoAllData();
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
  await connectToMongoDB();
});
