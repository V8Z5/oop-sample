/**
 * @summary Serves the production Angular build and proxies the single required Hipo Labs query.
 * @author Marlon Packard Viza Quispe
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/university-finder/browser/', import.meta.url));
const upstream = 'http://universities.hipolabs.com/search?name=ciencias';
const port = Number(process.env['PORT'] || 4300);
const contentTypes = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
};

createServer(async (request, response) => {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  if (!['GET', 'HEAD'].includes(request.method ?? '')) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  try {
    const url = new URL(request.url ?? '/', 'http://localhost');
    if (url.pathname.startsWith('/api/')) {
      if (url.pathname !== '/api/universities/search' || url.search !== '?name=ciencias') {
        response.writeHead(404).end();
        return;
      }
      try {
        const result = await fetch(upstream, { signal: AbortSignal.timeout(20000) });
        if (!result.ok) throw new Error(`University API returned ${result.status}`);
        const data = await result.json();
        response.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
        response.end(request.method === 'HEAD' ? undefined : JSON.stringify(data));
      } catch {
        response.writeHead(502, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'University service temporarily unavailable.' }));
      }
      return;
    }

    const filePath = resolve(root, `.${decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname)}`);
    if (!filePath.startsWith(resolve(root) + sep)) {
      response.writeHead(403).end();
      return;
    }
    const content = await readFile(filePath);
    response.writeHead(200, { 'Content-Type': contentTypes[extname(filePath)] ?? 'application/octet-stream' });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(port, '0.0.0.0', () => {
  console.log(`UniversityFinder running at http://localhost:${port}`);
});
