/**
 * build-bundle.js
 * Genera js/app.bundle.js unificando todos los módulos para que el sitio funcione
 * perfectamente TANTO en servidores HTTP como al abrir directamente con doble clic (file://).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function cleanModule(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Eliminar imports de módulos locales
  content = content.replace(/import\s+[^;]+from\s+['"][^'"]+['"];?/g, '');
  // Reemplazar export const/function/let por const/function/let
  content = content.replace(/export\s+const\s+/g, 'const ');
  content = content.replace(/export\s+function\s+/g, 'function ');
  content = content.replace(/export\s+let\s+/g, 'let ');
  content = content.replace(/export\s+async\s+function\s+/g, 'async function ');
  content = content.replace(/export\s*\{[^}]*\};?/g, '');
  return content;
}

const products = cleanModule(path.join(ROOT, 'js/products.js'));
const cart = cleanModule(path.join(ROOT, 'js/modules/cart.js'));
const ui = cleanModule(path.join(ROOT, 'js/modules/ui.js'));
const api = cleanModule(path.join(ROOT, 'js/modules/api.js'));
const main = cleanModule(path.join(ROOT, 'js/main.js'));

const bundle = `/**
 * EL FLACO TUX - Standalone Application Bundle
 * Funciona tanto en servidores HTTP como abriendo el archivo HTML localmente (file://)
 */
(function() {
  'use strict';

  // --- 1. PRODUCTOS & CONFIG ---
  ${products}

  // --- 2. CARRITO ---
  ${cart}

  // --- 3. UI & TEMAS ---
  ${ui}

  // --- 4. API & CHECKOUT ---
  ${api}

  // --- 5. LÓGICA PRINCIPAL ---
  ${main}

})();
`;

fs.writeFileSync(path.join(ROOT, 'js/app.bundle.js'), bundle, 'utf8');
console.log('✓ js/app.bundle.js generado exitosamente (' + (Buffer.byteLength(bundle) / 1024).toFixed(1) + ' KB)');
