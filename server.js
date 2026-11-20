const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const port = Number(process.env.PORT) || 3000;
const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']]
]);
http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    const file = files.get(url.pathname);
    if (!file) { response.writeHead(404); response.end('Not found'); return; }
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405, {'Allow':'GET, HEAD'}); response.end(); return; }
    const content = await fs.readFile(path.join(__dirname, file[0]));
    response.writeHead(200, {'Content-Type':file[1], 'Cache-Control':'no-cache', 'X-Content-Type-Options':'nosniff'});
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch {
    response.writeHead(500); response.end('Unable to load this page');
  }
}).listen(port, '0.0.0.0', () => console.log(`Printzone is ready at http://localhost:${port}`));
