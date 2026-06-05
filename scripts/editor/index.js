#!/usr/bin/env node
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = process.argv[2];
if (!targetFile) {
    console.error("Usage: node slide-creator/scripts/editor <path/to/html>");
    process.exit(1);
}

const absolutePath = path.resolve(process.cwd(), targetFile);
if (!fs.existsSync(absolutePath)) {
    console.error(`❌ File not found: ${absolutePath}`);
    process.exit(1);
}

const PORT = 5173;
const EDITOR_DIST_DIR = path.resolve(__dirname, './dist');
const SLIDE_DIR = path.dirname(absolutePath);

const CONTENT_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    const urlObj = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = decodeURIComponent(urlObj.pathname);

    // API: GET /api/slide
    if (pathname === '/api/slide' && req.method === 'GET') {
        try {
            const content = fs.readFileSync(absolutePath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ content }));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    // API: POST /api/save
    if (pathname === '/api/save' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                fs.writeFileSync(absolutePath, data.content, 'utf8');
                console.log(`💾 Saved changes to: ${absolutePath}`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // 2. Serve static slide-editor assets from dist/
    let localFilePath = path.join(EDITOR_DIST_DIR, pathname === '/' ? 'index.html' : pathname);
    if (fs.existsSync(localFilePath) && fs.statSync(localFilePath).isFile()) {
        const ext = path.extname(localFilePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': CONTENT_TYPES[ext] || 'application/octet-stream' });
        fs.createReadStream(localFilePath).pipe(res);
        return;
    }

    // fallback: if requested file starts with /assets, look inside dist/assets/
    if (pathname.startsWith('/assets/')) {
        const assetPath = path.join(EDITOR_DIST_DIR, pathname);
        if (fs.existsSync(assetPath) && fs.statSync(assetPath).isFile()) {
            const ext = path.extname(assetPath).toLowerCase();
            res.writeHead(200, { 'Content-Type': CONTENT_TYPES[ext] || 'application/octet-stream' });
            fs.createReadStream(assetPath).pipe(res);
            return;
        }
    }

    // 3. Plan B: Serve static images/assets from the same directory as the deck HTML
    const ext = path.extname(pathname).toLowerCase();
    if (CONTENT_TYPES[ext] && !pathname.includes('..')) {
        const physicalPath = path.join(SLIDE_DIR, pathname);
        if (fs.existsSync(physicalPath) && fs.statSync(physicalPath).isFile()) {
            res.writeHead(200, { 'Content-Type': CONTENT_TYPES[ext] });
            fs.createReadStream(physicalPath).pipe(res);
            return;
        }
    }

    // 4. Default to index.html for React routing fallback (SPA support)
    const indexHtmlPath = path.join(EDITOR_DIST_DIR, 'index.html');
    if (fs.existsSync(indexHtmlPath)) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream(indexHtmlPath).pipe(res);
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

server.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`🚀 Slide Editor is running at: ${url}`);
    console.log(`📂 Editing file: ${absolutePath}`);
    console.log(`Press Ctrl+C to stop.`);

    const start = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${start} ${url}`);
});
