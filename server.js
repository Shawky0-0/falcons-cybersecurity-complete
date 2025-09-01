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
    let safeUrl = decodeURIComponent(req.url.split('?')[0]);
    if (safeUrl === '/' || safeUrl === '') {
      return sendFile(res, path.join(root, 'index.html'));
    }

    // Prevent path traversal
    if (safeUrl.includes('..')) {
      return send404(res);
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
