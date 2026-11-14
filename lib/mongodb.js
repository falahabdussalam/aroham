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

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global connection cache across hot reloads in development
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB with caching
 */
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: MONGODB_DATABASE,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      const sanitizedUri = MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
      console.log(`[MongoDB] Connected successfully to database: "${MONGODB_DATABASE}" (${sanitizedUri})`);
      return mongooseInstance;
    }).catch((err) => {
      cached.promise = null;
      console.warn(`[MongoDB] Connection error: ${err.message}`);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Re-export models and utilities from server/mongodb.js
export {
  Mentor,
  Event,
  Mentee,
  Application,
  SystemMetadata,
  connectToMongoDB,
  getMongoAllData,
  saveMongoAllData,
  getMongoStatus,
  seedMongoDatabase,
  disconnectFromMongoDB
} from '../server/mongodb.js';

export default connectToDatabase;

