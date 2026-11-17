# EL FLACO TUX

**Hamburguesas, Alitas & Botanas - Root de tu antojo**

Sitio web de pedidos para **EL FLACO TUX**, en Nanchital de Lázaro Cárdenas del Río, Veracruz. Incluye tablero de productos, carrito dinámico, personalización de platillos y envío del pedido por WhatsApp.

## Características

- Diseño responsive con modo oscuro/claro.
- Paleta temática Tux: negro terminal, rojo bandana y amarillo pico.
- Precios con tipografía monoespaciada **Fira Code**.
- Filtros, búsqueda y vista detallada de productos.
- Carrito con cálculo de espera y checkout por WhatsApp.
- Metadatos SEO y tarjeta Open Graph con la identidad de EL FLACO TUX.

## Desarrollo

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Estructura

```text
.
├── assets/icons/    # Iconos PWA y favicons
├── assets/images/   # Fotos, logo y tarjeta Open Graph
├── css/style.css    # Estilos y variables de la paleta Tux
├── js/              # Lógica del menú, carrito y pedidos
├── scripts/         # Utilidades: bundle, tarjeta OG y cambio de dominio
├── index.html       # Página principal
├── manifest.json    # Manifest de la PWA
├── sw.js            # Service Worker (caché offline)
└── server.js        # Servidor Express para desarrollo
```

## Publicación

El sitio es una PWA instalable y usa URLs absolutas para SEO y para la tarjeta
que se ve al compartir el enlace por WhatsApp (`canonical`, Open Graph, Twitter,
datos estructurados, `sitemap.xml` y `robots.txt`).

Mientras no haya dominio definitivo, esas URLs apuntan a un dominio de ejemplo.
Al publicar, cámbialas todas de una vez:

```bash
npm run set:domain -- https://tudominio.com
```

Después, vuelve a desplegar. Para comprobar la tarjeta en WhatsApp puedes usar el
[depurador de Facebook](https://developers.facebook.com/tools/debug/) y pulsar
«Scrape again».

### Regenerar la tarjeta e iconos

Si cambias la foto principal o el logo:

```bash
npm run make:og
```

Genera `assets/images/og-el-flaco-tux.jpg` (1200×630, listo para WhatsApp),
`favicon.ico`, `favicon-16/32/48.png` y `apple-touch-icon-180.png` a partir de
`scripts/og-card.html`. Usa Edge en modo headless (define `CHROME_PATH` si usas
otro navegador Chromium).

### Service Worker

Al publicar cambios en HTML, CSS o JS sube `CACHE_VERSION` en `sw.js` (por
ejemplo a `'v2'`) y ejecuta `npm run build` si tocaste algo dentro de `js/`.

## Personalización

- Los productos y la configuración del negocio están en `js/products.js`.
- Los colores y tipografías se controlan desde `:root` en `css/style.css`.
- La identidad visual está en `assets/images/el_flaco_tux_logo.svg` y sus versiones PNG.
