import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { getMongoAllData, saveMongoAllData, getMongoStatus } from './server/mongodb.js';

function arohamApiPlugin() {
  const dbPath = path.resolve(__dirname, 'src/admin/data/aroham_db.json');

  const handler = async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      res.end();
      return;
    }

    // 1. Status endpoint: returns MongoDB status
    if (req.url === '/status' || req.url === '/api/status') {
      try {
        const mongoStatus = await getMongoStatus().catch(err => ({ connected: false, error: err.message }));

        const response = {
          connected: Boolean(mongoStatus?.connected),
          active: mongoStatus?.connected ? 'mongodb' : 'json_backup',
          mongodb: mongoStatus,
          mysql: { connected: false, message: 'MySQL disconnected. Active database: MongoDB' }
        };

        res.statusCode = 200;
        res.end(JSON.stringify(response));
      } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    // 1b. Test-db endpoint
    if (req.url === '/test-db' || req.url === '/api/test-db') {
      try {
        const mongoStatus = await getMongoStatus().catch(err => ({ connected: false, error: err.message }));
        res.statusCode = mongoStatus?.connected ? 200 : 503;
        res.end(JSON.stringify({
          success: Boolean(mongoStatus?.connected),
          message: mongoStatus?.connected ? 'MongoDB connection test successful! Database is live and reachable.' : 'MongoDB connection test failed',
          database: mongoStatus?.database || 'aroham',
          connected: Boolean(mongoStatus?.connected),
          collections: mongoStatus?.collections || {},
          error: mongoStatus?.error,
          timestamp: new Date().toISOString()
        }));
      } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({
          success: false,
          message: 'MongoDB connection test failed',
          error: err.message,
          timestamp: new Date().toISOString()
        }));
      }
      return;
    }

    // 2. Main data endpoint
    if (req.url === '/data' || req.url.startsWith('/data?') || req.url.startsWith('/api/data')) {
      if (req.method === 'GET') {
        // Attempt MongoDB query first
        try {
          const mongoData = await getMongoAllData();
          if (mongoData && Array.isArray(mongoData.mentors)) {
            res.statusCode = 200;
            res.end(JSON.stringify(mongoData));
            return;
          }
        } catch (err) {
          console.warn('[Vite API] MongoDB read fallback:', err.message);
        }

        // Fallback to local JSON file
        if (fs.existsSync(dbPath)) {
          try {
            const raw = fs.readFileSync(dbPath, 'utf8');
            const data = JSON.parse(raw);
            const dSet = new Set((data.deletedIds || []).map(String));
            if (dSet.size > 0) {
              if (Array.isArray(data.mentors)) data.mentors = data.mentors.filter(m => m && !dSet.has(String(m.id)));
              if (Array.isArray(data.events)) data.events = data.events.filter(e => e && !dSet.has(String(e.id)));
              if (Array.isArray(data.mentees)) data.mentees = data.mentees.filter(m => m && !dSet.has(String(m.id)));
              if (Array.isArray(data.applications)) data.applications = data.applications.filter(a => a && !dSet.has(String(a.id)));
            }
            res.statusCode = 200;
            res.end(JSON.stringify(data));
          } catch (e) {
            res.statusCode = 200;
            res.end(fs.readFileSync(dbPath, 'utf8'));
          }
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Database not initialized' }));
        }
        return;
      }

      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body);

            // Filter out any items in deletedIds
            const dSet = new Set((parsed.deletedIds || []).map(String));
            if (dSet.size > 0) {
              if (Array.isArray(parsed.mentors)) parsed.mentors = parsed.mentors.filter(m => m && !dSet.has(String(m.id)));
              if (Array.isArray(parsed.events)) parsed.events = parsed.events.filter(e => e && !dSet.has(String(e.id)));
              if (Array.isArray(parsed.mentees)) parsed.mentees = parsed.mentees.filter(m => m && !dSet.has(String(m.id)));
              if (Array.isArray(parsed.applications)) parsed.applications = parsed.applications.filter(a => a && !dSet.has(String(a.id)));
            }

            // 1. Save to MongoDB
            let mongoResult = null;
            try {
              mongoResult = await saveMongoAllData(parsed);
            } catch (mErr) {
              console.warn('[Vite API] MongoDB save error:', mErr.message);
            }

            // 2. Mirror clean state to JSON file on disk
            try {
              fs.writeFileSync(dbPath, JSON.stringify(parsed, null, 2), 'utf8');
            } catch (fsErr) {
              console.warn('[Vite API] JSON disk mirror warning:', fsErr.message);
            }

            res.statusCode = 200;
            res.end(JSON.stringify({
              success: true,
              mongodb: mongoResult?.success ?? false,
              database: mongoResult?.success ? 'mongodb' : 'json_backup',
              timestamp: new Date().toISOString()
            }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }
    }

    next();
  };

  return {
    name: 'aroham-api-server',
    configureServer(server) {
      server.middlewares.use('/api', handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api', handler);
    }
  };
}

export default defineConfig({
  plugins: [react(), arohamApiPlugin()],
  server: {
    host: true, // Listen on all network addresses (0.0.0.0) so mobile phones can connect
    port: 3000,
    open: false
  }
});
