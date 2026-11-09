import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { getMongoAllData, saveMongoAllData, getMongoStatus } from './server/db.js';

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

    // 1. Status endpoint
    if (req.url === '/status' || req.url === '/api/status') {
      try {
        const status = await getMongoStatus();
        res.statusCode = 200;
        res.end(JSON.stringify(status));
      } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    // 2. Main data endpoint
    if (req.url === '/data' || req.url.startsWith('/data?') || req.url.startsWith('/api/data')) {
      if (req.method === 'GET') {
        try {
          // Attempt MongoDB query first
          const mongoData = await getMongoAllData();
          if (mongoData && Array.isArray(mongoData.mentors) && mongoData.mentors.length > 0) {
            res.statusCode = 200;
            res.end(JSON.stringify(mongoData));
            return;
          }
        } catch (err) {
          console.warn('[Vite API] MongoDB read fallback:', err.message);
        }

        // Fallback to local JSON file
        if (fs.existsSync(dbPath)) {
          const data = fs.readFileSync(dbPath, 'utf8');
          res.statusCode = 200;
          res.end(data);
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

            // 1. Save to MongoDB
            let mongoResult = null;
            try {
              mongoResult = await saveMongoAllData(parsed);
            } catch (mErr) {
              console.warn('[Vite API] MongoDB save error:', mErr.message);
            }

            // 2. Mirror to JSON file on disk
            fs.writeFileSync(dbPath, JSON.stringify(parsed, null, 2), 'utf8');

            res.statusCode = 200;
            res.end(JSON.stringify({
              success: true,
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
