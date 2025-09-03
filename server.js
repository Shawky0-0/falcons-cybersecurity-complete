// Minimal static server with custom 404
// Usage: node server.js [port]
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.env.PORT) || Number(process.argv[2]) || 8000;
const root = process.cwd();

const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
};

function sendFile(res, filePath, statusCode = 200) {
  const ext = path.extname(filePath).toLowerCase();
  const type = mimeTypes[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If even the requested file failed, try 404
      return send404(res);
    }
    res.writeHead(statusCode, { 'Content-Type': type });
    res.end(data);
  });
}

function send404(res) {
  const notFoundPath = path.join(root, '404.html');
  if (fs.existsSync(notFoundPath)) {
    return sendFile(res, notFoundPath, 404);
  }
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
  res.end('404 Not Found');
}

const server = http.createServer((req, res) => {
  try {
    // Deliberately vulnerable CTF endpoints (isolated under /challenge/*)
    // 6) Misconfigured CORS: allow only origins containing 'falcons' (weak check)
    if (req.url.startsWith('/challenge/cors/api')) {
      const origin = req.headers['origin'] || '';
      const allow = /falcons/i.test(origin);
      if (req.method === 'OPTIONS') {
        res.writeHead(204, {
          'Access-Control-Allow-Origin': allow ? origin : 'null',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '600'
        });
        return res.end();
      }
      const body = JSON.stringify({ ok: true, flag: 'FALCONS{cors_allow_any_origin}' });
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': allow ? origin : 'null'
      });
      return res.end(body);
    }

    // 7) XXE Injection: naive XML entity resolution that can read local files
    if (req.url.startsWith('/challenge/xxe/upload') && req.method === 'POST') {
      let data = '';
      req.on('data', (chunk) => (data += chunk));
      req.on('end', () => {
        // Extremely naive, intentionally unsafe XXE handling (for CTF only)
        try {
          // Extract SYSTEM entity like: <!ENTITY xxe SYSTEM "file:///challenge/xxe/flag.txt">
          const entMatch = data.match(/<!ENTITY\s+([a-zA-Z0-9_:-]+)\s+SYSTEM\s+"([^"]+)"/);
          let resolved = data;
          if (entMatch) {
            const entName = entMatch[1];
            const target = entMatch[2];
            if (target.startsWith('file://')) {
              const fileUrl = new URL(target);
              const relPath = fileUrl.pathname; // e.g., /challenge/xxe/flag.txt
              const filePath = path.join(root, relPath);
              let fileContent = '';
              try { fileContent = fs.readFileSync(filePath, 'utf8'); } catch {}
              // Replace first occurrence of &name; with file content
              resolved = resolved.replace(new RegExp('&' + entName + ';'), fileContent);
            }
          }
          // Echo back the (now-resolved) XML content for the player to see
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
          return res.end(resolved);
        } catch {
          res.writeHead(400, { 'Content-Type': 'text/plain; charset=UTF-8' });
          return res.end('Bad XML');
        }
      });
      return;
    }

    let safeUrl = decodeURIComponent(req.url.split('?')[0]);
    // Alias: /challenges -> /challenge/
    if (safeUrl === '/challenges' || safeUrl === '/challenges/') {
      res.writeHead(302, { Location: '/challenge/' });
      return res.end();
    }
    if (safeUrl === '/' || safeUrl === '') {
      return sendFile(res, path.join(root, 'index.html'));
    }

    // Prevent path traversal
    if (safeUrl.includes('..')) {
      return send404(res);
    }

    // 16) Cache trick: special-case decoy vs real flag via query param
    if (safeUrl.startsWith('/challenge/cache/flag.css')) {
      const hasReal = (req.url || '').includes('v=real');
      const realPath = path.join(root, 'challenge', 'cache', hasReal ? 'flag.real.css' : 'flag.css');
      return sendFile(res, realPath);
    }

    const filePath = path.join(root, safeUrl);
    fs.stat(filePath, (err, stats) => {
      if (!err && stats.isDirectory()) {
        const indexInDir = path.join(filePath, 'index.html');
        if (fs.existsSync(indexInDir)) return sendFile(res, indexInDir);
        return send404(res);
      }
      if (!err && stats.isFile()) {
        return sendFile(res, filePath);
      }
      return send404(res);
    });
  } catch (_e) {
    return send404(res);
  }
});

server.listen(port, () => {
  console.log(`Static server running at http://localhost:${port}`);
});
