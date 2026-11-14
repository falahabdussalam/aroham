import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load standard .env then override with .env.local if present
dotenv.config();
const envLocalPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath, override: true });
}

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/aroham';
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'aroham';

// -------------------------------------------------------------
// SCHEMAS & MODELS
// -------------------------------------------------------------

const MentorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  role: { type: String, default: '' },
  company: { type: String, default: '' },
  bio: { type: String, default: '' },
  image: { type: String, default: '' },
  expertise: { type: [String], default: [] },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  status: { type: String, default: 'Active' }
}, { timestamps: true });

const EventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  date: { type: String, default: '' },
  time: { type: String, default: '' },
  venue: { type: String, default: '' },
  description: { type: String, default: '' },
  seats: { type: Number, default: 50 },
  registered: { type: Number, default: 0 },
  status: { type: String, default: 'Upcoming' },
  image: { type: String, default: '' }
}, { timestamps: true });

const MenteeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  course: { type: String, default: '' },
  batch: { type: String, default: '' },
  mentorId: { type: String, default: '' },
  status: { type: String, default: 'Active' },
  attendance: { type: String, default: '100%' },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' }
}, { timestamps: true });

const ApplicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  type: { type: String, default: 'Student' },
  status: { type: String, default: 'Pending' },
  appliedDate: { type: String, default: () => new Date().toISOString() },
  details: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true, strict: false });

const SystemMetadataSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, index: true },
  value: { type: mongoose.Schema.Types.Mixed, default: null }
}, { timestamps: true });

// Prevent model overwrite in development HMR
export const Mentor = mongoose.models.Mentor || mongoose.model('Mentor', MentorSchema);
export const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);
export const Mentee = mongoose.models.Mentee || mongoose.model('Mentee', MenteeSchema);
export const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
export const SystemMetadata = mongoose.models.SystemMetadata || mongoose.model('SystemMetadata', SystemMetadataSchema);

// Connection state management
let isConnected = false;
let isConnecting = false;

/**
 * Connect to MongoDB with fast fallback timeout
 */
export async function connectToMongoDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (isConnecting) {
    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (!isConnecting) {
          clearInterval(check);
          resolve(mongoose.connection.readyState === 1 ? mongoose.connection : null);
        }
      }, 100);
    });
  }

  isConnecting = true;

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DATABASE,
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000
    });

    isConnected = true;
    const sanitizedUri = MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
    console.log(`[MongoDB] Connected successfully to database: "${MONGODB_DATABASE}" (${sanitizedUri})`);

    // Auto-seed if newly created
    await autoSeedIfEmpty();
    return conn.connection;
  } catch (err) {
    isConnected = false;
    console.warn(`[MongoDB] Connection warning (${err.message}). MongoDB is currently inactive or needs credentials.`);
    return null;
  } finally {
    isConnecting = false;
  }
}

/**
 * Auto-seed if database was never initialized before
 */
async function autoSeedIfEmpty() {
  try {
    const meta = await SystemMetadata.findOne({ key: 'initialized' });
    if (!meta) {
      const mentorCount = await Mentor.countDocuments();
      if (mentorCount === 0) {
        console.log('[MongoDB] Database is newly created. Auto-seeding initial Aroham dataset...');
        await seedMongoDatabase();
      }
      await SystemMetadata.findOneAndUpdate(
        { key: 'initialized' },
        { key: 'initialized', value: true },
        { upsert: true }
      );
    }
  } catch (err) {
    console.warn('[MongoDB] Auto-seed check warning:', err.message);
  }
}

/**
 * Seed MongoDB database from aroham_db.json
 */
export async function seedMongoDatabase() {
  const conn = await connectToMongoDB();
  if (!conn) return { success: false, error: 'MongoDB not connected' };

  try {
    const seedPath = path.resolve(__dirname, '../src/admin/data/aroham_db.json');
    if (!fs.existsSync(seedPath)) {
      return { success: false, error: 'Seed file not found: ' + seedPath };
    }

    const raw = fs.readFileSync(seedPath, 'utf8');
    const data = JSON.parse(raw);
    const counts = {};

    // 1. Mentors
    if (Array.isArray(data.mentors) && data.mentors.length > 0) {
      await Mentor.deleteMany({});
      const ops = data.mentors.map(m => ({
        id: String(m.id || Date.now() + Math.random()),
        name: m.name || 'Unnamed Mentor',
        role: m.role || '',
        company: m.company || '',
        bio: m.bio || '',
        image: m.image || '',
        expertise: Array.isArray(m.expertise) ? m.expertise : [],
        email: m.email || '',
        phone: m.phone || '',
        linkedin: m.linkedin || '',
        status: m.status || 'Active'
      }));
      await Mentor.insertMany(ops);
      counts.mentors = ops.length;
    }

    // 2. Events
    if (Array.isArray(data.events) && data.events.length > 0) {
      await Event.deleteMany({});
      const ops = data.events.map(e => ({
        id: String(e.id || Date.now() + Math.random()),
        title: e.title || 'Untitled Event',
        category: e.category || 'General',
        date: e.date || '',
        time: e.time || '',
        venue: e.venue || '',
        description: e.description || '',
        seats: typeof e.seats === 'number' ? e.seats : 50,
        registered: typeof e.registered === 'number' ? e.registered : 0,
        status: e.status || 'Upcoming',
        image: e.image || ''
      }));
      await Event.insertMany(ops);
      counts.events = ops.length;
    }

    // 3. Mentees
    if (Array.isArray(data.mentees) && data.mentees.length > 0) {
      await Mentee.deleteMany({});
      const ops = data.mentees.map(m => ({
        id: String(m.id || Date.now() + Math.random()),
        name: m.name || 'Unnamed Mentee',
        email: m.email || '',
        phone: m.phone || '',
        course: m.course || '',
        batch: m.batch || '',
        mentorId: m.mentorId || m.mentor_id || '',
        status: m.status || 'Active',
        attendance: m.attendance || '100%',
        bio: m.bio || '',
        avatar: m.avatar || ''
      }));
      await Mentee.insertMany(ops);
      counts.mentees = ops.length;
    }

    // 4. Applications
    if (Array.isArray(data.applications) && data.applications.length > 0) {
      await Application.deleteMany({});
      const ops = data.applications.map(a => ({
        id: String(a.id || Date.now() + Math.random()),
        name: a.name || 'Applicant',
        email: a.email || '',
        phone: a.phone || '',
        type: a.type || 'Student',
        status: a.status || 'Pending',
        appliedDate: a.appliedDate || a.applied_date || new Date().toISOString(),
        details: a.details || a
      }));
      await Application.insertMany(ops);
      counts.applications = ops.length;
    }

    // 5. Deleted IDs
    if (Array.isArray(data.deletedIds)) {
      await SystemMetadata.findOneAndUpdate(
        { key: 'deleted_ids' },
        { key: 'deleted_ids', value: data.deletedIds },
        { upsert: true }
      );
    }

    await SystemMetadata.findOneAndUpdate(
      { key: 'initialized' },
      { key: 'initialized', value: true },
      { upsert: true }
    );

    console.log('[MongoDB] Seeding completed successfully:', counts);
    return { success: true, counts };
  } catch (err) {
    console.error('[MongoDB] Seeding failed:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Retrieve all data from MongoDB in Aroham format
 */
export async function getMongoAllData() {
  const conn = await connectToMongoDB();
  if (!conn) return null;

  try {
    const [mentors, events, mentees, applications, metaDeleted] = await Promise.all([
      Mentor.find({}).sort({ updatedAt: -1 }).lean(),
      Event.find({}).sort({ updatedAt: -1 }).lean(),
      Mentee.find({}).sort({ updatedAt: -1 }).lean(),
      Application.find({}).sort({ updatedAt: -1 }).lean(),
      SystemMetadata.findOne({ key: 'deleted_ids' }).lean()
    ]);

    const deletedIds = Array.isArray(metaDeleted?.value) ? metaDeleted.value : [];
    const dSet = new Set(deletedIds.map(String));

    return {
      mentors: mentors.filter(m => m && m.id && !dSet.has(String(m.id))).map(cleanMongoDoc),
      events: events.filter(e => e && e.id && !dSet.has(String(e.id))).map(cleanMongoDoc),
      mentees: mentees.filter(m => m && m.id && !dSet.has(String(m.id))).map(cleanMongoDoc),
      applications: applications.filter(a => a && a.id && !dSet.has(String(a.id))).map(cleanMongoDoc),
      deletedIds,
      source: 'mongodb',
      lastModified: new Date().toISOString()
    };
  } catch (err) {
    console.warn('[MongoDB] Read error:', err.message);
    return null;
  }
}

/**
 * Strip Mongoose internal fields (_id, __v)
 */
function cleanMongoDoc(doc) {
  if (!doc || typeof doc !== 'object') return doc;
  const { _id, __v, ...rest } = doc;
  return rest;
}

/**
 * Save all data into MongoDB
 */
export async function saveMongoAllData(payload) {
  const conn = await connectToMongoDB();
  if (!conn) return { success: false, error: 'MongoDB not connected' };

  try {
    const dSet = new Set((payload.deletedIds || []).map(String));

    // 1. Mentors
    if (Array.isArray(payload.mentors)) {
      await Mentor.deleteMany({});
      const valid = payload.mentors
        .filter(m => m && m.id && !dSet.has(String(m.id)))
        .map(m => ({
          id: String(m.id),
          name: m.name || 'Unnamed Mentor',
          role: m.role || '',
          company: m.company || '',
          bio: m.bio || '',
          image: m.image || '',
          expertise: Array.isArray(m.expertise) ? m.expertise : [],
          email: m.email || '',
          phone: m.phone || '',
          linkedin: m.linkedin || '',
          status: m.status || 'Active'
        }));
      if (valid.length > 0) await Mentor.insertMany(valid);
    }

    // 2. Events
    if (Array.isArray(payload.events)) {
      await Event.deleteMany({});
      const valid = payload.events
        .filter(e => e && e.id && !dSet.has(String(e.id)))
        .map(e => ({
          id: String(e.id),
          title: e.title || 'Untitled Event',
          category: e.category || 'General',
          date: e.date || '',
          time: e.time || '',
          venue: e.venue || '',
          description: e.description || '',
          seats: typeof e.seats === 'number' ? e.seats : 50,
          registered: typeof e.registered === 'number' ? e.registered : 0,
          status: e.status || 'Upcoming',
          image: e.image || ''
        }));
      if (valid.length > 0) await Event.insertMany(valid);
    }

    // 3. Mentees
    if (Array.isArray(payload.mentees)) {
      await Mentee.deleteMany({});
      const valid = payload.mentees
        .filter(m => m && m.id && !dSet.has(String(m.id)))
        .map(m => ({
          id: String(m.id),
          name: m.name || 'Unnamed Mentee',
          email: m.email || '',
          phone: m.phone || '',
          course: m.course || '',
          batch: m.batch || '',
          mentorId: m.mentorId || m.mentor_id || '',
          status: m.status || 'Active',
          attendance: m.attendance || '100%',
          bio: m.bio || '',
          avatar: m.avatar || ''
        }));
      if (valid.length > 0) await Mentee.insertMany(valid);
    }

    // 4. Applications
    if (Array.isArray(payload.applications)) {
      await Application.deleteMany({});
      const valid = payload.applications
        .filter(a => a && a.id && !dSet.has(String(a.id)))
        .map(a => ({
          id: String(a.id),
          name: a.name || 'Applicant',
          email: a.email || '',
          phone: a.phone || '',
          type: a.type || 'Student',
          status: a.status || 'Pending',
          appliedDate: a.appliedDate || a.applied_date || new Date().toISOString(),
          details: a.details || a
        }));
      if (valid.length > 0) await Application.insertMany(valid);
    }

    // 5. Deleted IDs
    if (Array.isArray(payload.deletedIds)) {
      await SystemMetadata.findOneAndUpdate(
        { key: 'deleted_ids' },
        { key: 'deleted_ids', value: payload.deletedIds },
        { upsert: true }
      );
    }

    return { success: true };
  } catch (err) {
    console.error('[MongoDB] Save failed:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Get MongoDB connection status and collection statistics
 */
export async function getMongoStatus() {
  try {
    const conn = await connectToMongoDB();
    if (!conn || mongoose.connection.readyState !== 1) {
      return {
        connected: false,
        uri: MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'),
        database: MONGODB_DATABASE,
        message: 'MongoDB is not reachable or waiting for connection in .env (MONGODB_URI)'
      };
    }

    const [mentors, events, mentees, applications] = await Promise.all([
      Mentor.countDocuments(),
      Event.countDocuments(),
      Mentee.countDocuments(),
      Application.countDocuments()
    ]);

    return {
      connected: true,
      uri: MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'),
      database: MONGODB_DATABASE,
      collections: {
        mentors,
        events,
        mentees,
        applications
      }
    };
  } catch (err) {
    return {
      connected: false,
      uri: MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'),
      database: MONGODB_DATABASE,
      error: err.message,
      message: 'Failed to query MongoDB'
    };
  }
}

/**
 * Disconnect cleanly from MongoDB
 */
export async function disconnectFromMongoDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('[MongoDB] Disconnected.');
  }
}

