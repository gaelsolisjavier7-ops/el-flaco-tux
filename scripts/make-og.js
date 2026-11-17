/**
 * make-og.js
 * Genera la tarjeta Open Graph (1200x630) y los favicons del pingüino Tux.
 *
 * Uso:
 *   npm run make:og
 *
 * Qué hace:
 *   1. Levanta un servidor estático temporal del proyecto.
 *   2. Abre scripts/og-card.html en Edge/Chrome headless a 1200x630.
 *   3. Guarda assets/images/og-el-flaco-tux.jpg (< 300 KB, ideal WhatsApp).
 *   4. Genera favicon.ico, favicon-16/32/48.png y apple-touch-icon-180.png.
 *
 * Requiere Microsoft Edge (Windows). En macOS/Linux cambia EDGE por el
 * ejecutable de Chrome que tengas instalado.
 */

const fs = require('fs');
const http = require('http');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const IMAGES = path.join(ROOT, 'assets', 'images');
const ICONS = path.join(ROOT, 'assets', 'icons');
const EDGE = process.env.CHROME_PATH ||
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9270;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

function startServer() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath);
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404).end('not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(PORT, '127.0.0.1', () => resolve(server)));
}

async function target() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT + 1}/json/list`)).json();
      const page = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page;
    } catch {}
    await sleep(300);
  }
  throw new Error('No se pudo conectar con el navegador headless');
}

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (!msg.id || !this.pending.has(msg.id)) return;
      const { resolve, reject } = this.pending.get(msg.id);
      this.pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error('Timeout en ' + method));
        }
      }, 30000);
    });
  }
}

// ICO con PNG embebidos (soportado por todos los navegadores modernos)
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);

  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, buf } of pngs) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buf.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += buf.length;
    entries.push(entry);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]);
}

(async () => {
  if (!fs.existsSync(EDGE)) {
    console.error('✗ No encuentro el navegador en: ' + EDGE);
    console.error('  Define CHROME_PATH con la ruta a chrome.exe / msedge.exe');
    process.exit(1);
  }

  const server = await startServer();
  const profile = path.join(ROOT, '.og-profile-' + Date.now());
  const browser = spawn(EDGE, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars',
    '--remote-debugging-port=' + (PORT + 1),
    '--user-data-dir=' + profile,
    '--window-size=1200,630',
    'about:blank'
  ], { stdio: 'ignore' });

  try {
    const page = await target();
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve, { once: true });
      ws.addEventListener('error', reject, { once: true });
    });
    const cdp = new CDP(ws);
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');

    const evaluate = async (expression) => {
      const result = await cdp.send('Runtime.evaluate', {
        expression, awaitPromise: true, returnByValue: true
      });
      if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails).slice(0, 500));
      return result.result.value;
    };

    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1200, height: 630, deviceScaleFactor: 1, mobile: false
    });
    await cdp.send('Page.navigate', { url: `http://127.0.0.1:${PORT}/scripts/og-card.html` });
    await sleep(2200);

    await evaluate(`(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((img) => img.complete
        ? Promise.resolve()
        : new Promise((r) => { img.onload = r; img.onerror = r; })));
      return true;
    })()`);
    await sleep(800);

    // 1. Tarjeta a PNG
    const shot = await cdp.send('Page.captureScreenshot', { format: 'png', fromSurface: true });
    const pngPath = path.join(IMAGES, 'og-el-flaco-tux.png');
    fs.writeFileSync(pngPath, Buffer.from(shot.data, 'base64'));

    // 2. PNG -> JPEG (mismo origen, el canvas no queda contaminado)
    const jpeg = await evaluate(`(async () => {
      const img = new Image();
      img.src = '/assets/images/og-el-flaco-tux.png?ts=' + Date.now();
      await img.decode();
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#0D0F12';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      return { w: img.naturalWidth, h: img.naturalHeight, data: canvas.toDataURL('image/jpeg', 0.86) };
    })()`);
    const jpgPath = path.join(IMAGES, 'og-el-flaco-tux.jpg');
    fs.writeFileSync(jpgPath, Buffer.from(jpeg.data.split(',')[1], 'base64'));
    fs.rmSync(pngPath, { force: true });

    // 3. Favicons desde el logo
    const icons = await evaluate(`(async () => {
      const img = new Image();
      img.src = '/assets/images/el_flaco_tux_logo.png?ts=' + Date.now();
      await img.decode();
      const make = (size) => {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        // Fondo opaco: iOS y algunos navegadores pintan negro tras la transparencia
        ctx.fillStyle = '#0D0F12';
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        return canvas.toDataURL('image/png');
      };
      return { s16: make(16), s32: make(32), s48: make(48), s180: make(180) };
    })()`);

    fs.mkdirSync(ICONS, { recursive: true });
    const save = (dataUrl, name) =>
      fs.writeFileSync(path.join(ICONS, name), Buffer.from(dataUrl.split(',')[1], 'base64'));
    save(icons.s16, 'favicon-16.png');
    save(icons.s32, 'favicon-32.png');
    save(icons.s48, 'favicon-48.png');
    save(icons.s180, 'apple-touch-icon-180.png');

    fs.writeFileSync(path.join(ROOT, 'favicon.ico'), buildIco([
      { size: 16, buf: Buffer.from(icons.s16.split(',')[1], 'base64') },
      { size: 32, buf: Buffer.from(icons.s32.split(',')[1], 'base64') },
      { size: 48, buf: Buffer.from(icons.s48.split(',')[1], 'base64') }
    ]));

    const kb = (file) => (fs.statSync(file).size / 1024).toFixed(1) + ' KB';
    console.log('✓ Tarjeta Open Graph: assets/images/og-el-flaco-tux.jpg (' +
      jpeg.w + 'x' + jpeg.h + ', ' + kb(jpgPath) + ')');
    console.log('✓ Favicons: favicon.ico (' + kb(path.join(ROOT, 'favicon.ico')) + '), ' +
      '16/32/48 px y apple-touch-icon-180.png (' + kb(path.join(ICONS, 'apple-touch-icon-180.png')) + ')');
    if (fs.statSync(jpgPath).size > 300 * 1024) {
      console.warn('⚠ La tarjeta supera los 300 KB; WhatsApp puede mostrarla más pequeña.');
    }

    ws.close();
  } finally {
    browser.kill();
    server.close();
    await sleep(300);
    try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
  }
})().catch((err) => {
  console.error('✗ ' + err.message);
  process.exit(1);
});
