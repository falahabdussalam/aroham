import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function arohamApiPlugin() {
  const dbPath = path.resolve(__dirname, 'src/admin/data/aroham_db.json');

  const handler = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      res.end();
      return;
    }

    if (req.method === 'GET') {
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
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          fs.writeFileSync(dbPath, JSON.stringify(parsed, null, 2), 'utf8');
          res.statusCode = 200;
          res.end(JSON.stringify({ success: true, timestamp: new Date().toISOString() }));
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    next();
  };

  return {
    name: 'aroham-api-server',
    configureServer(server) {
      server.middlewares.use('/api/data', handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/data', handler);
    }
  };
}

export default defineConfig({
  plugins: [react(), arohamApiPlugin()],
  server: {
    host: true, // Listen on all local network addresses so mobile phones on the Wi-Fi can connect
    port: 3000,
    open: false
  }
});

