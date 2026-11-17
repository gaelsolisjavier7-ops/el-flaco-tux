/**
 * set-domain.js
 * Cambia el dominio público del sitio en un solo paso.
 *
 * Uso:
 *   npm run set:domain -- https://midominio.com
 *   npm run set:domain -- midominio.com            (asume https://)
 *
 * Actualiza las URLs absolutas de index.html (canonical, Open Graph, Twitter
 * y datos estructurados), sitemap.xml y robots.txt. Los archivos del sitio
 * (CSS, JS, imágenes) usan rutas relativas y no necesitan cambios.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FILES = ['index.html', 'sitemap.xml', 'robots.txt'];

function fail(msg) {
  console.error('✗ ' + msg);
  process.exit(1);
}

const raw = process.argv.slice(2).join('').trim();
if (!raw) fail('Falta el dominio. Ejemplo: npm run set:domain -- https://elflacotux.com');

const withProtocol = /^https?:\/\//i.test(raw) ? raw : 'https://' + raw;

let parsed;
try {
  parsed = new URL(withProtocol);
} catch (e) {
  fail('El dominio no es una URL válida: ' + raw);
}
if (parsed.protocol !== 'https:' && parsed.hostname !== 'localhost' && parsed.hostname !== '127.0.0.1') {
  fail('Usa https:// (Google y WhatsApp lo prefieren). Recibido: ' + parsed.protocol);
}

const newBase = (parsed.origin + parsed.pathname).replace(/\/+$/, '');
const indexPath = path.join(ROOT, 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

const canonical = indexHtml.match(/<link rel="canonical" href="([^"]+)">/);
if (!canonical) fail('No encontré <link rel="canonical"> en index.html; no puedo saber el dominio actual.');

const currentBase = canonical[1].replace(/\/+$/, '');
if (currentBase === newBase) {
  console.log('• El dominio ya es ' + newBase + '. No hay nada que cambiar.');
  process.exit(0);
}

console.log('Dominio actual : ' + currentBase);
console.log('Dominio nuevo  : ' + newBase);
console.log('');

let total = 0;
for (const name of FILES) {
  const file = path.join(ROOT, name);
  if (!fs.existsSync(file)) {
    console.log('  - ' + name + ': no existe, se omite');
    continue;
  }
  const before = fs.readFileSync(file, 'utf8');
  const parts = before.split(currentBase);
  const count = parts.length - 1;
  if (count === 0) {
    console.log('  - ' + name + ': sin URLs que cambiar');
    continue;
  }
  fs.writeFileSync(file, parts.join(newBase));
  total += count;
  console.log('  ✓ ' + name + ': ' + count + ' URL(s) actualizada(s)');
}

if (total === 0) {
  fail('No se actualizó ninguna URL. Revisa el dominio actual en index.html.');
}

console.log('');
console.log('✓ Listo. ' + total + ' URL(s) apuntan ahora a ' + newBase);
console.log('');
console.log('Siguiente paso: vuelve a desplegar el sitio y comprueba la tarjeta en');
console.log('https://developers.facebook.com/tools/debug/ (botón "Scrape again").');
