const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3008;
const mime = { '.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.svg':'image/svg+xml','.ico':'image/x-icon','.webp':'image/webp','.woff2':'font/woff2','.woff':'font/woff' };
http.createServer((req, res) => {
  let f = req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0]);
  let fp = path.join(__dirname, f);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not Found'); }
    res.writeHead(200, { 'Content-Type': mime[path.extname(fp)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => console.log(`Server running at http://localhost:${port}`));
