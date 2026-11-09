import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MYSQL_HOST = process.env.MYSQL_HOST || '127.0.0.1';
const MYSQL_PORT = parseInt(process.env.MYSQL_PORT || '3306', 10);
const MYSQL_USER = process.env.MYSQL_USER || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD ?? '';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'aroham';
const MYSQL_URL = process.env.MYSQL_URL || null;

let pool = null;
let isConnected = false;
let initPromise = null;

/**
 * Parse connection options
 */
function getPoolConfig() {
  if (MYSQL_URL) {
    return {
      uri: MYSQL_URL,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 3000
    };
  }

  return {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 3000
  };
}

/**
 * Connect to MySQL and initialize database & tables
 */
export async function connectToMysql() {
  if (isConnected && pool) return pool;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      // Step 1: Ensure database exists (using root connection without database)
      try {
        const adminConn = await mysql.createConnection({
          host: MYSQL_HOST,
          port: MYSQL_PORT,
          user: MYSQL_USER,
          password: MYSQL_PASSWORD,
          connectTimeout: 2000
        });
        await adminConn.query(`CREATE DATABASE IF NOT EXISTS \`${MYSQL_DATABASE}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
        await adminConn.end();
      } catch (dbErr) {
        // If create database fails due to permissions or cloud URL, try direct pool connection
      }

      // Step 2: Create connection pool with database
      pool = mysql.createPool(getPoolConfig());

      // Test connection
      const [rows] = await pool.query('SELECT 1 as test');
      if (rows && rows[0]?.test === 1) {
        isConnected = true;
        console.log(`[MySQL] Connected successfully to database: "${MYSQL_DATABASE}" on ${MYSQL_HOST}:${MYSQL_PORT}`);
        await initMysqlTables(pool);
        return pool;
      }
    } catch (err) {
      console.warn(`[MySQL] Connection warning (${err.message}). MySQL is currently inactive or needs credentials.`);
      isConnected = false;
      pool = null;
      return null;
    } finally {
      initPromise = null;
    }
  })();

  return initPromise;
}

/**
 * Initialize MySQL tables and auto-seed if empty
 */
export async function initMysqlTables(targetPool) {
  const p = targetPool || pool;
  if (!p) return;

  try {
    // 1. Mentors table
    await p.query(`
      CREATE TABLE IF NOT EXISTS mentors (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255),
        company VARCHAR(255),
        bio TEXT,
        image LONGTEXT,
        expertise JSON,
        email VARCHAR(255),
        phone VARCHAR(100),
        linkedin VARCHAR(255),
        status VARCHAR(50) DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Events table
    await p.query(`
      CREATE TABLE IF NOT EXISTS events (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        date VARCHAR(100),
        time VARCHAR(100),
        venue VARCHAR(255),
        description TEXT,
        seats INT DEFAULT 50,
        registered INT DEFAULT 0,
        status VARCHAR(50) DEFAULT 'Upcoming',
        image LONGTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Mentees table
    await p.query(`
      CREATE TABLE IF NOT EXISTS mentees (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(100),
        course VARCHAR(255),
        batch VARCHAR(100),
        mentor_id VARCHAR(100),
        status VARCHAR(50) DEFAULT 'Active',
        attendance VARCHAR(50) DEFAULT '100%',
        bio TEXT,
        avatar LONGTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Applications table
    await p.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(100),
        type VARCHAR(50),
        status VARCHAR(50) DEFAULT 'Pending',
        applied_date VARCHAR(100),
        details JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. System metadata table
    await p.query(`
      CREATE TABLE IF NOT EXISTS system_metadata (
        key_name VARCHAR(100) PRIMARY KEY,
        value_data LONGTEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Auto-seed if mentors table is empty
    const [countRows] = await p.query('SELECT COUNT(*) as count FROM mentors');
    if (countRows && countRows[0].count === 0) {
      console.log('[MySQL] Database is empty. Seeding authoritative Aroham dataset into MySQL...');
      await seedMysqlDatabase(p);
    }
  } catch (err) {
    console.warn('[MySQL] Table init warning:', err.message);
  }
}

/**
 * Seed MySQL database from aroham_db.json
 */
export async function seedMysqlDatabase(targetPool = null) {
  const p = targetPool || (await connectToMysql());
  if (!p) return { success: false, error: 'MySQL not connected' };

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
      await p.query('DELETE FROM mentors');
      for (const m of data.mentors) {
        await p.query(`
          INSERT INTO mentors (id, name, role, company, bio, image, expertise, email, phone, linkedin, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            name=VALUES(name), role=VALUES(role), company=VALUES(company), bio=VALUES(bio),
            image=VALUES(image), expertise=VALUES(expertise), email=VALUES(email),
            phone=VALUES(phone), linkedin=VALUES(linkedin), status=VALUES(status)
        `, [
          String(m.id || Date.now()),
          m.name || 'Unnamed Mentor',
          m.role || '',
          m.company || '',
          m.bio || '',
          m.image || '',
          JSON.stringify(m.expertise || []),
          m.email || '',
          m.phone || '',
          m.linkedin || '',
          m.status || 'Active'
        ]);
      }
      counts.mentors = data.mentors.length;
    }

    // 2. Events
    if (Array.isArray(data.events) && data.events.length > 0) {
      await p.query('DELETE FROM events');
      for (const e of data.events) {
        await p.query(`
          INSERT INTO events (id, title, category, date, time, venue, description, seats, registered, status, image)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            title=VALUES(title), category=VALUES(category), date=VALUES(date), time=VALUES(time),
            venue=VALUES(venue), description=VALUES(description), seats=VALUES(seats),
            registered=VALUES(registered), status=VALUES(status), image=VALUES(image)
        `, [
          String(e.id || Date.now()),
          e.title || 'Untitled Event',
          e.category || 'General',
          e.date || '',
          e.time || '',
          e.venue || '',
          e.description || '',
          e.seats || 50,
          e.registered || 0,
          e.status || 'Upcoming',
          e.image || ''
        ]);
      }
      counts.events = data.events.length;
    }

    // 3. Mentees
    if (Array.isArray(data.mentees) && data.mentees.length > 0) {
      await p.query('DELETE FROM mentees');
      for (const m of data.mentees) {
        await p.query(`
          INSERT INTO mentees (id, name, email, phone, course, batch, mentor_id, status, attendance, bio, avatar)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            name=VALUES(name), email=VALUES(email), phone=VALUES(phone), course=VALUES(course),
            batch=VALUES(batch), mentor_id=VALUES(mentor_id), status=VALUES(status),
            attendance=VALUES(attendance), bio=VALUES(bio), avatar=VALUES(avatar)
        `, [
          String(m.id || Date.now()),
          m.name || 'Unnamed Mentee',
          m.email || '',
          m.phone || '',
          m.course || '',
          m.batch || '',
          m.mentorId || m.mentor_id || '',
          m.status || 'Active',
          m.attendance || '100%',
          m.bio || '',
          m.avatar || ''
        ]);
      }
      counts.mentees = data.mentees.length;
    }

    // 4. Applications
    if (Array.isArray(data.applications) && data.applications.length > 0) {
      await p.query('DELETE FROM applications');
      for (const a of data.applications) {
        await p.query(`
          INSERT INTO applications (id, name, email, phone, type, status, applied_date, details)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            name=VALUES(name), email=VALUES(email), phone=VALUES(phone), type=VALUES(type),
            status=VALUES(status), applied_date=VALUES(applied_date), details=VALUES(details)
        `, [
          String(a.id || Date.now()),
          a.name || 'Applicant',
          a.email || '',
          a.phone || '',
          a.type || 'Student',
          a.status || 'Pending',
          a.appliedDate || a.applied_date || new Date().toISOString(),
          JSON.stringify(a.details || a)
        ]);
      }
      counts.applications = data.applications.length;
    }

    console.log('[MySQL] Seeding completed successfully:', counts);
    return { success: true, counts };
  } catch (err) {
    console.error('[MySQL] Seeding failed:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Retrieve all data from MySQL in Aroham format
 */
export async function getMysqlAllData() {
  const p = await connectToMysql();
  if (!p) return null;

  try {
    const [mentorRows] = await p.query('SELECT * FROM mentors ORDER BY updated_at DESC');
    const [eventRows] = await p.query('SELECT * FROM events ORDER BY updated_at DESC');
    const [menteeRows] = await p.query('SELECT * FROM mentees ORDER BY updated_at DESC');
    const [appRows] = await p.query('SELECT * FROM applications ORDER BY updated_at DESC');

    const mentors = mentorRows.map(r => {
      let exp = [];
      try {
        exp = typeof r.expertise === 'string' ? JSON.parse(r.expertise) : (r.expertise || []);
      } catch (e) { exp = []; }
      return {
        id: r.id,
        name: r.name,
        role: r.role,
        company: r.company,
        bio: r.bio,
        image: r.image,
        expertise: exp,
        email: r.email,
        phone: r.phone,
        linkedin: r.linkedin,
        status: r.status
      };
    });

    const events = eventRows.map(r => ({
      id: r.id,
      title: r.title,
      category: r.category,
      date: r.date,
      time: r.time,
      venue: r.venue,
      description: r.description,
      seats: r.seats,
      registered: r.registered,
      status: r.status,
      image: r.image
    }));

    const mentees = menteeRows.map(r => ({
      id: r.id,
      name: r.name,
      email: r.email,
      phone: r.phone,
      course: r.course,
      batch: r.batch,
      mentorId: r.mentor_id,
      status: r.status,
      attendance: r.attendance,
      bio: r.bio,
      avatar: r.avatar
    }));

    const applications = appRows.map(r => {
      let details = {};
      try {
        details = typeof r.details === 'string' ? JSON.parse(r.details) : (r.details || {});
      } catch (e) { details = {}; }
      return {
        id: r.id,
        name: r.name,
        email: r.email,
        phone: r.phone,
        type: r.type,
        status: r.status,
        appliedDate: r.applied_date,
        ...details
      };
    });

    return {
      mentors,
      events,
      mentees,
      applications,
      source: 'mysql',
      lastModified: new Date().toISOString()
    };
  } catch (err) {
    console.warn('[MySQL] Read error:', err.message);
    return null;
  }
}

/**
 * Save all data into MySQL database
 */
export async function saveMysqlAllData(payload) {
  const p = await connectToMysql();
  if (!p) return { success: false, error: 'MySQL not connected' };

  try {
    const conn = await p.getConnection();
    await conn.beginTransaction();

    try {
      // 1. Mentors
      if (Array.isArray(payload.mentors)) {
        await conn.query('DELETE FROM mentors');
        for (const m of payload.mentors) {
          if (!m.id) continue;
          await conn.query(`
            INSERT INTO mentors (id, name, role, company, bio, image, expertise, email, phone, linkedin, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            String(m.id),
            m.name || 'Mentor',
            m.role || '',
            m.company || '',
            m.bio || '',
            m.image || '',
            JSON.stringify(m.expertise || []),
            m.email || '',
            m.phone || '',
            m.linkedin || '',
            m.status || 'Active'
          ]);
        }
      }

      // 2. Events
      if (Array.isArray(payload.events)) {
        await conn.query('DELETE FROM events');
        for (const e of payload.events) {
          if (!e.id) continue;
          await conn.query(`
            INSERT INTO events (id, title, category, date, time, venue, description, seats, registered, status, image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            String(e.id),
            e.title || 'Event',
            e.category || 'General',
            e.date || '',
            e.time || '',
            e.venue || '',
            e.description || '',
            e.seats || 50,
            e.registered || 0,
            e.status || 'Upcoming',
            e.image || ''
          ]);
        }
      }

      // 3. Mentees
      if (Array.isArray(payload.mentees)) {
        await conn.query('DELETE FROM mentees');
        for (const m of payload.mentees) {
          if (!m.id) continue;
          await conn.query(`
            INSERT INTO mentees (id, name, email, phone, course, batch, mentor_id, status, attendance, bio, avatar)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            String(m.id),
            m.name || 'Mentee',
            m.email || '',
            m.phone || '',
            m.course || '',
            m.batch || '',
            m.mentorId || m.mentor_id || '',
            m.status || 'Active',
            m.attendance || '100%',
            m.bio || '',
            m.avatar || ''
          ]);
        }
      }

      // 4. Applications
      if (Array.isArray(payload.applications)) {
        await conn.query('DELETE FROM applications');
        for (const a of payload.applications) {
          if (!a.id) continue;
          await conn.query(`
            INSERT INTO applications (id, name, email, phone, type, status, applied_date, details)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            String(a.id),
            a.name || 'Applicant',
            a.email || '',
            a.phone || '',
            a.type || 'Student',
            a.status || 'Pending',
            a.appliedDate || a.applied_date || new Date().toISOString(),
            JSON.stringify(a.details || a)
          ]);
        }
      }

      // Save system metadata timestamp
      await conn.query(`
        INSERT INTO system_metadata (key_name, value_data)
        VALUES ('last_sync', ?)
        ON DUPLICATE KEY UPDATE value_data=VALUES(value_data)
      `, [new Date().toISOString()]);

      await conn.commit();
      conn.release();

      return { success: true };
    } catch (txErr) {
      await conn.rollback();
      conn.release();
      throw txErr;
    }
  } catch (err) {
    console.error('[MySQL] Save failed:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Get MySQL connection status and table statistics
 */
export async function getMysqlStatus() {
  try {
    const p = await connectToMysql();
    if (!p) {
      return {
        connected: false,
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        database: MYSQL_DATABASE,
        user: MYSQL_USER,
        message: 'MySQL is not reachable or requires password authentication in .env'
      };
    }

    const [mentorC] = await p.query('SELECT COUNT(*) as c FROM mentors');
    const [eventC] = await p.query('SELECT COUNT(*) as c FROM events');
    const [menteeC] = await p.query('SELECT COUNT(*) as c FROM mentees');
    const [appC] = await p.query('SELECT COUNT(*) as c FROM applications');

    return {
      connected: true,
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      database: MYSQL_DATABASE,
      user: MYSQL_USER,
      tables: {
        mentors: mentorC[0]?.c ?? 0,
        events: eventC[0]?.c ?? 0,
        mentees: menteeC[0]?.c ?? 0,
        applications: appC[0]?.c ?? 0
      }
    };
  } catch (err) {
    return {
      connected: false,
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      database: MYSQL_DATABASE,
      user: MYSQL_USER,
      error: err.message,
      message: 'Failed to query MySQL'
    };
  }
}

