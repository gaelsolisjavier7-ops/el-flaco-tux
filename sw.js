/**
 * EL FLACO TUX - Service Worker
 * ---------------------------------------------------------------
 * Cachea el shell de la app (HTML, CSS y JS principales) para que el
 * sitio abra sin conexión y cargue rápido en el celular.
 *
 * IMPORTANTE: al publicar cambios en el HTML/CSS/JS sube CACHE_VERSION
 * (por ejemplo 'v2') para que los clientes reciban la versión nueva.
 */

const CACHE_VERSION = 'v1';
const CACHE_NAME = `flaco-tux-${CACHE_VERSION}`;

// Rutas relativas al alcance del SW (raíz del sitio)
const PRECACHE_URLS = [
  './',
  './index.html',
  './css/style.css',
  './js/app.bundle.js',
  './manifest.json',
  './assets/images/el_flaco_tux_logo.png',
  './assets/images/tux_logo.png',
  './assets/images/burger_cheese_pull_1790710190015.jpg',
  './assets/icons/tux-192.png',
  './assets/icons/tux-512.png'
];

// ---------- INSTALL: precache del shell ----------
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Se guarda una por una para que un archivo faltante no rompa la
    // instalación completa del Service Worker.
    await Promise.all(PRECACHE_URLS.map(async (url) => {
      try {
        await cache.add(new Request(url, { cache: 'reload' }));
      } catch (error) {
        console.warn('[SW] No se pudo precachear:', url, error);
      }
    }));
    await self.skipWaiting();
  })());
});

// ---------- ACTIVATE: limpia versiones anteriores ----------
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

// ---------- FETCH ----------
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Solo GET y solo nuestro propio origen (Google Fonts, Font Awesome,
  // WhatsApp y Firestore se dejan pasar tal cual).
  if (request.method !== 'GET') return;

  let url;
  try {
    url = new URL(request.url);
  } catch (error) {
    return;
  }
  if (url.origin !== self.location.origin) return;

  // 1. Navegación (el HTML): red primero para recibir cambios; si no hay
  //    conexión, se sirve el index cacheado.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(new Request('./index.html'), fresh.clone());
        }
        return fresh;
      } catch (error) {
        const cache = await caches.open(CACHE_NAME);
        return (await cache.match('./index.html')) ||
               (await cache.match('./')) ||
               new Response('Sin conexión', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
      }
    })());
    return;
  }

  const isCode = request.destination === 'script' ||
                 request.destination === 'style' ||
                 /\.(?:js|css)$/i.test(url.pathname);

  // 2. CSS y JS: red primero (para no quedarse con una versión vieja),
  //    con la copia en caché como respaldo.
  if (isCode) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, fresh.clone());
        }
        return fresh;
      } catch (error) {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(request, { ignoreSearch: true });
        return cached || new Response('', { status: 504, statusText: 'Sin conexión' });
      }
    })());
    return;
  }

  // 3. Imágenes y demás estáticos: caché primero y actualización en segundo
  //    plano (stale-while-revalidate).
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request, { ignoreSearch: true });

    const network = fetch(request)
      .then((response) => {
        if (response && response.ok && response.type === 'basic') {
          cache.put(request, response.clone());
        }
        return response;
      })
      .catch(() => null);

    if (cached) {
      network.catch(() => {});
      return cached;
    }

    const response = await network;
    return response || new Response('', { status: 504, statusText: 'Sin conexión' });
  })());
});
