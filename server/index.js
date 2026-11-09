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

// 1. Health & MongoDB Status
app.get('/api/status', async (req, res) => {
  const status = await getMongoStatus();
  res.json(status);
});

// 2. Full Database Bundle (GET & POST)
app.get('/api/data', async (req, res) => {
  const data = await getMongoAllData();
  if (data) {
    return res.json(data);
  }

  // Fallback to local json
  const jsonPath = path.resolve(__dirname, '../src/admin/data/aroham_db.json');
  if (fs.existsSync(jsonPath)) {
    return res.json(JSON.parse(fs.readFileSync(jsonPath, 'utf8')));
  }

  res.status(404).json({ error: 'Database not initialized' });
});

app.post('/api/data', async (req, res) => {
  const result = await saveMongoAllData(req.body);

  // Mirror to json backup
  try {
    const jsonPath = path.resolve(__dirname, '../src/admin/data/aroham_db.json');
    fs.writeFileSync(jsonPath, JSON.stringify(req.body, null, 2), 'utf8');
  } catch (e) {}

  res.json(result);
});

// 3. Mentors Endpoints
app.get('/api/mentors', async (req, res) => {
  const db = await connectToMongo();
  if (!db) return res.status(503).json({ error: 'Database disconnected' });
  const mentors = await db.collection('mentors').find({}, { projection: { _id: 0 } }).toArray();
  res.json(mentors);
});

app.post('/api/mentors', async (req, res) => {
  const db = await connectToMongo();
  if (!db) return res.status(503).json({ error: 'Database disconnected' });
  const mentor = { ...req.body, updatedAt: new Date() };
  await db.collection('mentors').updateOne({ id: mentor.id }, { $set: mentor }, { upsert: true });
  res.json({ success: true, mentor });
});

app.put('/api/mentors/:id', async (req, res) => {
  const db = await connectToMongo();
  if (!db) return res.status(503).json({ error: 'Database disconnected' });
  const updates = { ...req.body, updatedAt: new Date() };
  delete updates._id;
  await db.collection('mentors').updateOne({ id: req.params.id }, { $set: updates });
  res.json({ success: true, updatedId: req.params.id });
});

app.delete('/api/mentors/:id', async (req, res) => {
  const db = await connectToMongo();
  if (!db) return res.status(503).json({ error: 'Database disconnected' });
  await db.collection('mentors').deleteOne({ id: req.params.id });
  res.json({ success: true, deletedId: req.params.id });
});

// 4. Events Endpoints
app.get('/api/events', async (req, res) => {
  const db = await connectToMongo();
  if (!db) return res.status(503).json({ error: 'Database disconnected' });
  const events = await db.collection('events').find({}, { projection: { _id: 0 } }).toArray();
  res.json(events);
});

app.post('/api/events', async (req, res) => {
  const db = await connectToMongo();
  if (!db) return res.status(503).json({ error: 'Database disconnected' });
  const event = { ...req.body, updatedAt: new Date() };
  await db.collection('events').updateOne({ id: event.id }, { $set: event }, { upsert: true });
  res.json({ success: true, event });
});

app.delete('/api/events/:id', async (req, res) => {
  const db = await connectToMongo();
  if (!db) return res.status(503).json({ error: 'Database disconnected' });
  await db.collection('events').deleteOne({ id: req.params.id });
  res.json({ success: true, deletedId: req.params.id });
});

// 5. Mentees Endpoints
app.get('/api/mentees', async (req, res) => {
  const db = await connectToMongo();
  if (!db) return res.status(503).json({ error: 'Database disconnected' });
  const mentees = await db.collection('mentees').find({}, { projection: { _id: 0 } }).toArray();
  res.json(mentees);
});

app.post('/api/mentees', async (req, res) => {
  const db = await connectToMongo();
  if (!db) return res.status(503).json({ error: 'Database disconnected' });
  const mentee = { ...req.body, updatedAt: new Date() };
  await db.collection('mentees').updateOne({ id: mentee.id }, { $set: mentee }, { upsert: true });
  res.json({ success: true, mentee });
});

app.put('/api/mentees/:id', async (req, res) => {
  const db = await connectToMongo();
  if (!db) return res.status(503).json({ error: 'Database disconnected' });
  const updates = { ...req.body, updatedAt: new Date() };
  delete updates._id;
  await db.collection('mentees').updateOne({ id: req.params.id }, { $set: updates });
  res.json({ success: true, updatedId: req.params.id });
});

app.delete('/api/mentees/:id', async (req, res) => {
  const db = await connectToMongo();
  if (!db) return res.status(503).json({ error: 'Database disconnected' });
  await db.collection('mentees').deleteOne({ id: req.params.id });
  res.json({ success: true, deletedId: req.params.id });
});

// 6. Applications Endpoints
app.get('/api/applications', async (req, res) => {
  const db = await connectToMongo();
  if (!db) return res.status(503).json({ error: 'Database disconnected' });
  const applications = await db.collection('applications').find({}, { projection: { _id: 0 } }).toArray();
  res.json(applications);
});

app.post('/api/applications', async (req, res) => {
  const db = await connectToMongo();
  if (!db) return res.status(503).json({ error: 'Database disconnected' });
  const appItem = { ...req.body, updatedAt: new Date() };
  await db.collection('applications').updateOne({ id: appItem.id }, { $set: appItem }, { upsert: true });
  res.json({ success: true, application: appItem });
});

app.delete('/api/applications/:id', async (req, res) => {
  const db = await connectToMongo();
  if (!db) return res.status(503).json({ error: 'Database disconnected' });
  await db.collection('applications').deleteOne({ id: req.params.id });
  res.json({ success: true, deletedId: req.params.id });
});

// SPA catch-all fallback
app.get('*', (req, res) => {
  const indexPath = path.resolve(__dirname, '../dist/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not Found');
  }
});

// Start Server
app.listen(PORT, async () => {
  console.log(`[Aroham Server] Server listening on http://localhost:${PORT}`);
  await connectToMongo();
});
