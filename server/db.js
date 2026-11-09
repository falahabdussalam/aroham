import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aroham';
const DB_NAME = process.env.MONGODB_DB_NAME || 'aroham';

let client = null;
let db = null;
let isConnected = false;

/**
 * Connect to MongoDB and initialize collections
 */
export async function connectToMongo() {
  if (isConnected && db) return db;

  try {
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 3000
    });
    await client.connect();
    db = client.db(DB_NAME);
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to database: "${DB_NAME}"`);

    // Ensure collections and unique indexes on 'id'
    await initCollections(db);
    return db;
  } catch (err) {
    console.warn(`[MongoDB] Connection warning (${err.message}). Running in fallback mode.`);
    isConnected = false;
    return null;
  }
}

/**
 * Initialize collections and indexes, and auto-seed if empty
 */
async function initCollections(database) {
  try {
    const collections = ['mentors', 'events', 'mentees', 'applications'];
    for (const colName of collections) {
      const col = database.collection(colName);
      await col.createIndex({ id: 1 }, { unique: true }).catch(() => {});
    }

    // Auto-seed if mentors collection is empty
    const mentorsCount = await database.collection('mentors').countDocuments();
    if (mentorsCount === 0) {
      console.log('[MongoDB] Database is empty. Seeding authoritative Aroham dataset...');
      await seedMongoDatabase(database);
    }
  } catch (err) {
    console.warn('[MongoDB] Collection init note:', err.message);
  }
}

/**
 * Seed MongoDB with aroham_db.json seed data
 */
export async function seedMongoDatabase(targetDb = null) {
  const database = targetDb || (await connectToMongo());
  if (!database) return { success: false, error: 'Database not connected' };

  try {
    const seedPath = path.resolve(__dirname, '../src/admin/data/aroham_db.json');
    if (!fs.existsSync(seedPath)) {
      return { success: false, error: 'Seed file not found' };
    }

    const raw = fs.readFileSync(seedPath, 'utf8');
    const data = JSON.parse(raw);

    const counts = {};

    // 1. Mentors
    if (Array.isArray(data.mentors) && data.mentors.length > 0) {
      const col = database.collection('mentors');
      await col.deleteMany({});
      const docs = data.mentors.map(m => ({ ...m, updatedAt: new Date() }));
      const result = await col.insertMany(docs);
      counts.mentors = result.insertedCount;
    }

    // 2. Events
    if (Array.isArray(data.events) && data.events.length > 0) {
      const col = database.collection('events');
      await col.deleteMany({});
      const docs = data.events.map(e => ({ ...e, updatedAt: new Date() }));
      const result = await col.insertMany(docs);
      counts.events = result.insertedCount;
    }

    // 3. Mentees
    if (Array.isArray(data.mentees) && data.mentees.length > 0) {
      const col = database.collection('mentees');
      await col.deleteMany({});
      const docs = data.mentees.map(m => ({ ...m, updatedAt: new Date() }));
      const result = await col.insertMany(docs);
      counts.mentees = result.insertedCount;
    }

    // 4. Applications
    if (Array.isArray(data.applications) && data.applications.length > 0) {
      const col = database.collection('applications');
      await col.deleteMany({});
      const docs = data.applications.map(a => ({ ...a, updatedAt: new Date() }));
      const result = await col.insertMany(docs);
      counts.applications = result.insertedCount;
    }

    // Save metadata
    await database.collection('metadata').updateOne(
      { key: 'aroham_metadata' },
      { $set: { key: 'aroham_metadata', seededAt: new Date(), counts } },
      { upsert: true }
    );

    console.log('[MongoDB] Seeding completed successfully:', counts);
    return { success: true, counts };
  } catch (err) {
    console.error('[MongoDB] Seeding error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetch all data bundle from MongoDB (clean of _id internal field)
 */
export async function getMongoAllData() {
  const database = await connectToMongo();
  if (!database) return null;

  try {
    const mentors = await database.collection('mentors').find({}, { projection: { _id: 0 } }).toArray();
    const events = await database.collection('events').find({}, { projection: { _id: 0 } }).toArray();
    const mentees = await database.collection('mentees').find({}, { projection: { _id: 0 } }).toArray();
    const applications = await database.collection('applications').find({}, { projection: { _id: 0 } }).toArray();

    return {
      mentors,
      events,
      mentees,
      applications,
      source: 'mongodb',
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    console.warn('[MongoDB] Query error:', err.message);
    return null;
  }
}

/**
 * Save complete data bundle into MongoDB collections (upserting each record)
 */
export async function saveMongoAllData(payload) {
  const database = await connectToMongo();
  if (!database) return { success: false, error: 'Not connected' };

  try {
    // 1. Mentors
    if (Array.isArray(payload.mentors)) {
      const col = database.collection('mentors');
      await col.deleteMany({});
      if (payload.mentors.length > 0) {
        await col.insertMany(payload.mentors.map(m => ({ ...m, updatedAt: new Date() })));
      }
    }

    // 2. Events
    if (Array.isArray(payload.events)) {
      const col = database.collection('events');
      await col.deleteMany({});
      if (payload.events.length > 0) {
        await col.insertMany(payload.events.map(e => ({ ...e, updatedAt: new Date() })));
      }
    }

    // 3. Mentees
    if (Array.isArray(payload.mentees)) {
      const col = database.collection('mentees');
      await col.deleteMany({});
      if (payload.mentees.length > 0) {
        await col.insertMany(payload.mentees.map(m => ({ ...m, updatedAt: new Date() })));
      }
    }

    // 4. Applications
    if (Array.isArray(payload.applications)) {
      const col = database.collection('applications');
      await col.deleteMany({});
      if (payload.applications.length > 0) {
        await col.insertMany(payload.applications.map(a => ({ ...a, updatedAt: new Date() })));
      }
    }

    // Update metadata
    await database.collection('metadata').updateOne(
      { key: 'aroham_metadata' },
      { $set: { key: 'aroham_metadata', lastModified: new Date().toISOString() } },
      { upsert: true }
    );

    return { success: true, timestamp: new Date().toISOString() };
  } catch (err) {
    console.error('[MongoDB] Save error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Get MongoDB server connection status and collection statistics
 */
export async function getMongoStatus() {
  const database = await connectToMongo();
  if (!database) {
    return {
      connected: false,
      uri: MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'),
      database: DB_NAME,
      message: 'MongoDB is not reachable or starting up'
    };
  }

  try {
    const mentors = await database.collection('mentors').countDocuments();
    const events = await database.collection('events').countDocuments();
    const mentees = await database.collection('mentees').countDocuments();
    const applications = await database.collection('applications').countDocuments();

    return {
      connected: true,
      uri: MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'),
      database: DB_NAME,
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
      error: err.message
    };
  }
}
