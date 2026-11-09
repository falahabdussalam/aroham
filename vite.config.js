import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { getMysqlAllData, saveMysqlAllData, getMysqlStatus } from './server/mysql.js';

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

    // 1. Status endpoint: returns MySQL status
    if (req.url === '/status' || req.url === '/api/status') {
      try {
        const mysqlStatus = await getMysqlStatus().catch(err => ({ connected: false, error: err.message }));

        const response = {
          connected: Boolean(mysqlStatus?.connected),
          active: mysqlStatus?.connected ? 'mysql' : 'json_backup',
          mysql: mysqlStatus
        };

        res.statusCode = 200;
        res.end(JSON.stringify(response));
      } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    // 2. Main data endpoint
    if (req.url === '/data' || req.url.startsWith('/data?') || req.url.startsWith('/api/data')) {
      if (req.method === 'GET') {
        // Attempt MySQL query first
        try {
          const mysqlData = await getMysqlAllData();
          if (mysqlData && Array.isArray(mysqlData.mentors) && mysqlData.mentors.length > 0) {
            res.statusCode = 200;
            res.end(JSON.stringify(mysqlData));
            return;
          }
        } catch (err) {
          console.warn('[Vite API] MySQL read fallback:', err.message);
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

            // 1. Save to MySQL
            let mysqlResult = null;
            try {
              mysqlResult = await saveMysqlAllData(parsed);
            } catch (myErr) {
              console.warn('[Vite API] MySQL save error:', myErr.message);
            }

            // 2. Mirror to JSON file on disk
            try {
              fs.writeFileSync(dbPath, JSON.stringify(parsed, null, 2), 'utf8');
            } catch (fsErr) {
              console.warn('[Vite API] JSON disk mirror warning:', fsErr.message);
            }

            res.statusCode = 200;
            res.end(JSON.stringify({
              success: true,
              mysql: mysqlResult?.success ?? false,
              database: mysqlResult?.success ? 'mysql' : 'json_backup',
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
