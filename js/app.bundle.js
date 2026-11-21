/**
 * EL FLACO TUX - Standalone Application Bundle
 * Funciona tanto en servidores HTTP como abriendo el archivo HTML localmente (file://)
 */
(function() {
  'use strict';

  // --- 1. PRODUCTOS & CONFIG ---
  /**
 * BASE DE DATOS DE PRODUCTOS - EL FLACO TUX
 * Alitas, Boneless & Botanas - Root de tu antojo
 * Datos basados fielmente en el menú del negocio
 */

/**
 * VISIBILIDAD TEMPORAL DEL MENÚ
 * ---------------------------------------------------------------
 * Pon en `false` la categoría que quieras ocultar del sitio.
 * Los platillos siguen guardados en este mismo archivo, así que al
 * volver a `true` reaparecen sin tocar diseño, carrito ni WhatsApp.
 *
 * Estado actual: menú completo con hamburguesas, hot dogs jumbos,
 * boneless y botanas.
 */
const CATEGORY_VISIBILITY = {
  burgers: true,
  hotdogs: true,
  boneless: true,
  sides: true
};

const ALL_MENU_DATA = [
  // --- SECCIÓN HAMBURGUESAS (Todas incluyen papas) ---
  {
    id: "burger-sencilla",
    name: "Hamburguesa Sencilla",
    category: "burgers",
    price: 100,
    badge: "Clásica",
    aspectClass: "pin-aspect-standard",
    description: "Carne de res, jamón, queso amarillo, lechuga y jalapeño.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/burger_fries.jpg",
    popular: false
  },
  {
    id: "burger-tocino",
    name: "Hamburguesa de Tocino",
    category: "burgers",
    price: 110,
    badge: "Favorita",
    aspectClass: "pin-aspect-portrait",
    description: "Carne de res, tocino crujiente, queso de hebra y salsa BBQ.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/burger_bacon.jpg",
    popular: true
  },
  {
    id: "burger-hawaiana",
    name: "Hamburguesa Hawaiana",
    category: "burgers",
    price: 120,
    badge: "Tropical",
    aspectClass: "pin-aspect-standard",
    description: "Carne de res, jamón, queso, piña asada y salsa BBQ.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/burger_combo.jpg",
    popular: false
  },
  {
    id: "burger-especial",
    name: "Hamburguesa Doble Carne",
    category: "burgers",
    price: 150,
    badge: "🔥 La Más Completa",
    aspectClass: "pin-aspect-tall",
    description: "Carne de res doble, queso de hebra, queso americano y salsa BBQ.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/burger_cheese_pull_1790710190015.jpg",
    popular: true
  },

  // --- SECCIÓN JOCHOS JUMBOS (Todos incluyen papas) ---
  {
    id: "hotdog-sencillo",
    name: "Hot Dog Sencillo",
    category: "hotdogs",
    price: 50,
    badge: "Clásico",
    aspectClass: "pin-aspect-standard",
    description: "Salchicha dorada, aderezos cremosos y salsas de la casa.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/hotdog_loaded.jpg",
    popular: false
  },
  {
    id: "hotdog-queso",
    name: "Hot Dog de Queso",
    category: "hotdogs",
    price: 55,
    badge: "Queso Fundido",
    aspectClass: "pin-aspect-portrait",
    description: "Salchicha con queso fundido, aderezos y salsas.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/hotdog_loaded.jpg",
    popular: false
  },
  {
    id: "hotdog-tocino",
    name: "Hot Dog de Tocino",
    category: "hotdogs",
    price: 70,
    badge: "Tocino Crujiente",
    aspectClass: "pin-aspect-tall",
    description: "Salchicha envuelta en tocino, queso fundido y salsas.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/hotdogs_plancha_1790710200592.jpg",
    popular: true
  },
  {
    id: "hotdog-hawaiano",
    name: "Hot Dog Hawaiano",
    category: "hotdogs",
    price: 75,
    badge: "Piña Asada",
    aspectClass: "pin-aspect-standard",
    description: "Tocino crujiente, queso, piña asada y salsas.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/hotdog_hawaiano.jpg",
    popular: false
  },
  {
    id: "hotdog-combinado",
    name: "Hot Dog Combinado",
    category: "hotdogs",
    price: 90,
    badge: "⭐ Especial de la Casa",
    aspectClass: "pin-aspect-portrait",
    description: "Tocino, queso de hebra, piña dulce y salsas de la casa.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/hotdog_special.jpg",
    popular: true
  },

  // --- SECCIÓN BONELESS (por piezas, todos incluyen papas) ---
  {
    id: "boneless-5",
    name: "Boneless (5 piezas)",
    category: "boneless",
    price: 80,
    badge: "Sin Hueso",
    aspectClass: "pin-aspect-standard",
    description: "Pollo crujiente sin hueso bañado en tu salsa favorita.",
    includes: "5 piezas • 🍟 Incluye porción de papas",
    image: "assets/images/boneless.png",
    popular: false,
    sauces: ["BBQ", "Búfalo", "Mango Habanero", "Lemon Pepper", "Parmesano"]
  },
  {
    id: "boneless-12",
    name: "Boneless (12 piezas)",
    category: "boneless",
    price: 150,
    badge: "Para Compartir",
    aspectClass: "pin-aspect-tall",
    description: "Doce piezas crujientes para compartir con tu salsa favorita.",
    includes: "12 piezas • 🍟 Incluye porción de papas",
    image: "assets/images/boneless.png",
    popular: true,
    sauces: ["BBQ", "Búfalo", "Mango Habanero", "Lemon Pepper", "Parmesano"]
  },
  {
    id: "boneless-25",
    name: "Boneless (25 piezas)",
    category: "boneless",
    price: 280,
    badge: "Fiesta",
    aspectClass: "pin-aspect-standard",
    description: "Veinticinco piezas crujientes para compartir en grande.",
    includes: "25 piezas • 🍟 Incluye porción de papas",
    image: "assets/images/boneless.png",
    popular: false,
    sauces: ["BBQ", "Búfalo", "Mango Habanero", "Lemon Pepper", "Parmesano"]
  },

  // --- SECCIÓN BOTANAS (Todas incluyen papas) ---
  {
    id: "dedos-queso",
    name: "Dedos de Queso (5 pz)",
    category: "sides",
    price: 80,
    badge: "Queso Fundido",
    aspectClass: "pin-aspect-portrait",
    description: "Queso fundido empanizado y doradito.",
    includes: "5 piezas • 🍟 Incluye porción de papas",
    image: "assets/images/dedos_queso.png",
    popular: true,
    isShareable: true
  },
  {
    id: "aros-cebolla",
    name: "Aros de Cebolla (6 pz)",
    category: "sides",
    price: 80,
    badge: "Crujientes",
    aspectClass: "pin-aspect-standard",
    description: "Cebolla empanizada, dorada y dulce.",
    includes: "6 piezas • 🍟 Incluye porción de papas",
    image: "assets/images/aros_cebolla.png",
    popular: false,
    isShareable: true
  }
];

// Solo se publican las categorías visibles (ver CATEGORY_VISIBILITY arriba)
const MENU_DATA = ALL_MENU_DATA.filter(
  (product) => CATEGORY_VISIBILITY[product.category] !== false
);

// Opciones de personalización disponibles
const CUSTOM_OPTIONS = {
  exclusions: [
    { id: "sin-cebolla", label: "Sin Cebolla Caramelizada" },
    { id: "sin-chile", label: "Sin Chile" },
    { id: "sin-lechuga", label: "Sin Lechuga" },
    { id: "sin-aderezos", label: "Sin Aderezos / Salsas" },
    { id: "sin-pina", label: "Sin Piña" }
  ],
  extras: [
    { id: "extra-queso", label: "Extra Queso de Hebra", price: 15 },
    { id: "extra-tocino", label: "Extra Tocino Crujiente", price: 20 },
    { id: "extra-carne", label: "Carne Extra (Burger)", price: 35 }
  ]
};

// Configuración general del negocio
const STORE_CONFIG = {
  name: "EL FLACO TUX",
  tagline: "Alitas, Boneless & Botanas - Root de tu antojo",
  specialties: "Alitas • Boneless • Botanas",
  phone: "+52 56 3831 6644",
  whatsappNumber: "5215638316644",
  currency: "$",
  location: "Nanchital de Lázaro Cárdenas del Río, Veracruz",
  deliveryZoneText: "Nanchital y zonas conurbadas",
  deliveryNote: "🛵 Envíos a domicilio en Nanchital de Lázaro Cárdenas del Río con costo adicional según colonia",
  promoHero: "🌶️ Alitas y boneless bañados al momento: elige entre BBQ, Búfalo, Mango Habanero, Lemon Pepper o Parmesano.",
  hours: {
    openHour: 18, // 6:00 PM
    closeHour: 24, // 12:00 AM
    closedDays: [1], // Lunes = 1
    scheduleText: "Mar a Dom: 6:00 PM - 12:00 AM • Lunes: Cerrado"
  }
};


  // --- 2. CARRITO ---
  /**
 * CART.JS - Lógica del Carrito de Compras
 */



let cart = JSON.parse(localStorage.getItem('el_flaco_tux_cart')) || [];

function getCart() {
  return cart;
}

function setCart(newCart) {
  cart = newCart;
  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
}

function quickAddToCart(productId) {
  const product = MENU_DATA.find(p => p.id === productId);
  if (!product) return { success: false, error: 'Product not found' };

  // Boneless necesita el modal de personalización (salsa obligatoria).
  // Los hot dogs ya incluyen papas por defecto y se agregan directo.
  if (product.category === 'boneless') {
    return { success: false, needsCustomization: true };
  }

  // Buscar si ya existe el mismo item sin personalizaciones
  const existingIndex = cart.findIndex(item => 
    item.id === productId && 
    (!item.exclusions || item.exclusions.length === 0) && 
    (!item.extras || item.extras.length === 0) &&
    !item.note
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      cartItemId: Date.now() + Math.random().toString(36).substring(2, 6),
      id: product.id,
      name: product.name,
      unitPrice: product.price,
      totalPrice: product.price,
      quantity: 1,
      image: product.image,
      exclusions: [],
      extras: [],
      note: ''
    });
  }

  saveCart();
  return { success: true, product };
}

function saveCart() {
  localStorage.setItem('el_flaco_tux_cart', JSON.stringify(cart));
}

function calculateCartTotals() {
  let subtotal = 0;
  let totalItems = 0;

  cart.forEach(item => {
    subtotal += item.totalPrice * item.quantity;
    totalItems += item.quantity;
  });

  return { subtotal, totalItems };
}

function updateCartUI() {
  const { subtotal, totalItems } = calculateCartTotals();

  const cartBadgeCount = document.getElementById('cart-badge-count');
  const cartBtnTotal = document.getElementById('cart-btn-total');
  const cartItemCountLabel = document.getElementById('cart-item-count-label');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const summarySubtotal = document.getElementById('summary-subtotal');
  const summaryTotal = document.getElementById('summary-total');
  const checkoutTriggerBtn = document.getElementById('checkout-trigger-btn');
  const mobileCartCount = document.getElementById('mobile-cart-count');
  const mobileCartTotal = document.getElementById('mobile-cart-total');
  const orderFloatCountLabel = document.getElementById('order-float-count-label');
  const orderFloatConfirmBtn = document.getElementById('order-float-confirm-btn');

  if (cartBadgeCount) cartBadgeCount.textContent = totalItems;
  if (cartBtnTotal) cartBtnTotal.textContent = `${STORE_CONFIG.currency}${subtotal}`;
  if (cartItemCountLabel) cartItemCountLabel.textContent = `(${totalItems} ${totalItems === 1 ? 'item' : 'items'})`;
  
  if (mobileCartCount) mobileCartCount.textContent = totalItems;
  if (mobileCartTotal) mobileCartTotal.textContent = `${STORE_CONFIG.currency}${subtotal}`;
  if (orderFloatCountLabel) orderFloatCountLabel.textContent = (totalItems === 1) ? 'producto' : 'productos';

  // Barra flotante: "CONFIRMAR AHORA" se deshabilita si no hay productos
  if (orderFloatConfirmBtn) {
    const isEmpty = (cart.length === 0);
    orderFloatConfirmBtn.disabled = isEmpty;
    orderFloatConfirmBtn.setAttribute('aria-disabled', isEmpty ? 'true' : 'false');
  }
  
  if (summarySubtotal) summarySubtotal.textContent = `${STORE_CONFIG.currency}${subtotal}`;
  if (summaryTotal) summaryTotal.textContent = `${STORE_CONFIG.currency}${subtotal}`;

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon"><i class="fa-solid fa-burger"></i></div>
        <h4>Tu carrito está vacío</h4>
        <p>Agrega deliciosas hamburguesas o hot dogs para comenzar tu orden.</p>
        <a href="#menu" class="btn btn-primary" onclick="document.getElementById('cart-backdrop').classList.remove('active')">
          Ver el Menú
        </a>
      </div>
    `;
    if (checkoutTriggerBtn) {
      checkoutTriggerBtn.disabled = true;
      checkoutTriggerBtn.style.opacity = '0.5';
      checkoutTriggerBtn.style.cursor = 'not-allowed';
    }
  } else {
    if (checkoutTriggerBtn) {
      checkoutTriggerBtn.disabled = false;
      checkoutTriggerBtn.style.opacity = '1';
      checkoutTriggerBtn.style.cursor = 'pointer';
    }

    cartItemsContainer.innerHTML = cart.map(item => {
      const hasCustoms = (item.exclusions && item.exclusions.length > 0) || 
                          (item.extras && item.extras.length > 0) || 
                          item.note ||
                          item.sauce;

      let customsHtml = '';
      if (hasCustoms) {
        const hasSalsasInNote = /salsas?:\s*/i.test(item.note || '');
        const sauceTxt = (item.sauce && !hasSalsasInNote)
          ? `<span style="color: var(--secondary); font-weight: 700;">🌶️ Salsa: ${item.sauce}</span>`
          : '';
        const exclusionsTxt = item.exclusions && item.exclusions.length > 0 ? `⛔ ${item.exclusions.join(', ')}` : '';
        const extrasTxt = item.extras && item.extras.length > 0 ? `✨ Extras: ${item.extras.map(e => e.label).join(', ')}` : '';
        const noteTxt = item.note ? `📝 ${item.note}` : '';
        customsHtml = `<div class="cart-item-notes">${[sauceTxt, exclusionsTxt, extrasTxt, noteTxt].filter(Boolean).join('<br>')}</div>`;
      }

      return `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='assets/images/hero_burger.jpg'">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-price">${STORE_CONFIG.currency}${item.totalPrice} c/u</div>
            ${customsHtml}
            <div class="cart-item-controls">
              <div class="qty-stepper">
                <button class="qty-btn" onclick="window.changeItemQty('${item.cartItemId}', -1)">-</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" onclick="window.changeItemQty('${item.cartItemId}', 1)">+</button>
              </div>
              <button class="cart-item-remove" onclick="window.removeItemFromCart('${item.cartItemId}')" title="Eliminar">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

function changeItemQty(cartItemId, delta) {
  const itemIndex = cart.findIndex(i => i.cartItemId === cartItemId);
  if (itemIndex > -1) {
    cart[itemIndex].quantity += delta;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
    saveCart();
    updateCartUI();
  }
}

function removeItemFromCart(cartItemId) {
  cart = cart.filter(i => i.cartItemId !== cartItemId);
  saveCart();
  updateCartUI();
  if (typeof window.showToast === 'function') {
    window.showToast('Producto removido del pedido');
  }
}


  // --- 3. UI & TEMAS ---
  /**
 * UI.JS - Lógica de Interfaz de Usuario (Temas, Modales, Navegación)
 */

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 
         localStorage.getItem('el_flaco_tux_theme') || 
         'dark';
}

function applyTheme(theme, notify = false, showToast = null) {
  const isLight = (theme === 'light');
  const targetTheme = isLight ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', targetTheme);
  try {
    localStorage.setItem('el_flaco_tux_theme', targetTheme);
  } catch (e) {}

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeToggleIcon = document.getElementById('theme-toggle-icon');
  const themeTooltip = document.getElementById('theme-tooltip');
  const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle-btn');
  const mobileThemeIcon = document.getElementById('mobile-theme-icon');
  const mobileThemeLabel = document.getElementById('mobile-theme-label');

  if (themeToggleBtn && themeToggleIcon) {
    if (isLight) {
      themeToggleBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
      themeToggleBtn.setAttribute('title', 'Cambiar a modo oscuro (Noche)');
      themeToggleIcon.className = 'fa-solid fa-moon';
      if (themeTooltip) themeTooltip.textContent = 'Modo Oscuro';
    } else {
      themeToggleBtn.setAttribute('aria-label', 'Cambiar a modo claro');
      themeToggleBtn.setAttribute('title', 'Cambiar a modo claro (Día)');
      themeToggleIcon.className = 'fa-solid fa-sun';
      if (themeTooltip) themeTooltip.textContent = 'Modo Claro';
    }
  }

  if (mobileThemeToggleBtn) {
    if (isLight) {
      mobileThemeToggleBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
      if (mobileThemeIcon) mobileThemeIcon.className = 'fa-solid fa-moon';
      if (mobileThemeLabel) mobileThemeLabel.textContent = 'Cambiar a Modo Oscuro';
    } else {
      mobileThemeToggleBtn.setAttribute('aria-label', 'Cambiar a modo claro');
      if (mobileThemeIcon) mobileThemeIcon.className = 'fa-solid fa-sun';
      if (mobileThemeLabel) mobileThemeLabel.textContent = 'Cambiar a Modo Claro';
    }
  }

  if (notify && showToast) {
    showToast(isLight ? '☀️ Modo Claro activado' : '🌙 Modo Oscuro activado');
  }
}

function toggleTheme(showToast = null) {
  const current = getCurrentTheme();
  const nextTheme = (current === 'light') ? 'dark' : 'light';
  applyTheme(nextTheme, true, showToast);
}

const REVEAL_SELECTOR = '.scroll-reveal, .section-reveal, .scroll-fade-item, .pin-card, .product-card, .step-card, .feature-item, .coverage-map-card';

let scrollObserver = null;

function initScrollAnimations() {
  const isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isReducedMotion || !('IntersectionObserver' in window)) {
    document.querySelectorAll(REVEAL_SELECTOR).forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  if (scrollObserver) {
    scrollObserver.disconnect();
  }

  scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -35px 0px',
    threshold: 0.05
  });

  observeScrollElements(document);

  // Revelar de inmediato lo que ya está en el viewport al cargar
  setTimeout(() => {
    document.querySelectorAll(REVEAL_SELECTOR + ':not(.is-visible)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 60 && rect.bottom > -30) {
        el.classList.add('is-visible');
        if (scrollObserver) scrollObserver.unobserve(el);
      }
    });
  }, 150);
}

function observeScrollElements(container = document) {
  if (!scrollObserver) {
    container.querySelectorAll(REVEAL_SELECTOR).forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const elements = container.querySelectorAll(REVEAL_SELECTOR);
  elements.forEach((el, index) => {
    if (!el.style.getPropertyValue('--fade-idx')) {
      el.style.setProperty('--fade-idx', (index % 6));
    }
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 20 && rect.bottom > 0) {
      // Ya está en el viewport: pequeña pausa para el efecto escalonado
      setTimeout(() => {
        el.classList.add('is-visible');
      }, (index % 6) * 45);
    } else {
      scrollObserver.observe(el);
    }
  });
}


  // --- 4. API & CHECKOUT ---
  /**
 * API.JS - Integración con Servicios Externos (WhatsApp)
 */




/**
 * Guarda el pedido en Firestore para el panel de finanzas.
 * Se invoca en segundo plano (sin await) desde el checkout, para no retrasar
 * ni bloquear la apertura de WhatsApp.
 */
async function guardarPedidoEnFirestore({ name, phone, address, orderType, payment, changeAmount, notes, cart, subtotal }) {
  const { initializeApp, getApps, getApp } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
  const { getFirestore, collection, addDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');

  const firebaseConfig = {
    apiKey: "AIzaSyCYmj4iaPU-Ku6edzajvJXJtnX0qSSqTO4",
    authDomain: "entre3-finanzas.firebaseapp.com",
    projectId: "entre3-finanzas",
    storageBucket: "entre3-finanzas.firebasestorage.app",
    messagingSenderId: "352611680426",
    appId: "1:352611680426:web:1c3e851d14f2d542da10d3"
  };

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app);

  await addDoc(collection(db, 'pedidos'), {
    fecha: serverTimestamp(),
    cliente: { nombre: name, telefono: phone, direccion: address },
    modalidad: orderType,
    metodo_pago: payment,
    cambio: changeAmount || null,
    notas: notes || null,
    productos: cart.map(i => ({
      nombre: i.name,
      cantidad: i.quantity,
      precio_unitario: i.totalPrice,
      subtotal: i.totalPrice * i.quantity,
      extras: i.extras || [],
      exclusiones: i.exclusions || [],
      salsa: i.sauce || null,
      nota: i.note || null
    })),
    subtotal: subtotal,
    total: subtotal,
    estado: 'Pendiente',
    origen: 'web'
  });
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const cart = getCart();
  if (cart.length === 0) {
    if (typeof window.showToast === 'function') {
      window.showToast('⚠️ Tu carrito está vacío.');
    }
    return;
  }

  const name = document.getElementById('customer-name').value.trim();
  const phone = document.getElementById('customer-phone').value.trim();
  const deliveryBtn = document.getElementById('type-delivery-btn');
  const orderType = (deliveryBtn && deliveryBtn.classList.contains('active')) ? 'delivery' : 'pickup';
  const address = orderType === 'delivery' ? document.getElementById('customer-address').value.trim() : 'Recoger en Sucursal / Para Llevar';
  const payment = document.getElementById('payment-method').value;
  const changeAmount = document.getElementById('payment-change').value.trim();
  const notes = document.getElementById('order-notes').value.trim();

  const { subtotal } = calculateCartTotals();

  // Construcción del Mensaje Estructurado para WhatsApp
  let message = `🍔 *¡NUEVO PEDIDO - ${STORE_CONFIG.name}!*\n`;
  message += `───────────────────────\n`;
  message += `👤 *Cliente:* ${name}\n`;
  message += `📱 *Teléfono:* ${phone}\n`;
  message += `📍 *Modalidad:* ${orderType === 'delivery' ? '🛵 Entrega a Domicilio' : '🥡 Para Recoger en Sucursal'}\n`;
  
  if (orderType === 'delivery') {
    message += `🏠 *Dirección:* ${address}\n`;
  }
  
  message += `💳 *Pago:* ${payment}`;
  if (payment === 'Efectivo (Cambio)' && changeAmount) {
    message += ` (Paga con: ${changeAmount})`;
  }
  message += `\n───────────────────────\n`;
  message += `📋 *RESUMEN DEL PEDIDO:*\n`;

  cart.forEach(item => {
    message += `\n• *${item.quantity}x ${item.name}* (${STORE_CONFIG.currency}${item.totalPrice * item.quantity})\n`;
    if (item.sauce && !/salsas?:\s*/i.test(item.note || '')) {
      message += `   ↳ 🌶️ _Salsa: ${item.sauce}_\n`;
    }
    if (item.exclusions && item.exclusions.length > 0) {
      message += `   ↳ ⛔ _${item.exclusions.join(', ')}_\n`;
    }
    if (item.extras && item.extras.length > 0) {
      message += `   ↳ ✨ _Extras: ${item.extras.map(e => e.label).join(', ')}_\n`;
    }
    if (item.note) {
      message += `   ↳ 📝 _Nota: ${item.note}_\n`;
    }
  });

  message += `\n───────────────────────\n`;
  message += `💵 *Subtotal:* ${STORE_CONFIG.currency}${subtotal}\n`;
  if (orderType === 'delivery') {
    message += `🛵 *Envío:* Según zona de entrega\n`;
  }
  message += `🔥 *TOTAL ESTIMADO: ${STORE_CONFIG.currency}${subtotal} MXN*\n`;
  message += `📍 *Entrega:* ${orderType === 'delivery' ? 'A Domicilio 🛵' : 'Para Recoger en Sucursal 🥡'}\n`;
  message += `───────────────────────\n`;
  
  if (notes) {
    message += `📌 *Instrucción Especial:* ${notes}\n\n`;
  }

  message += `¡Hola! Me gustaría confirmar este pedido. Quedo atento a su confirmación. 🙌`;

  // Enviar a la API de WhatsApp
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  
  // 1. Abrir WhatsApp INMEDIATAMENTE (síncrono, preserva user activation)
  window.open(whatsappUrl, '_blank');

  // 2. Guardar en Firestore en background (sin bloquear)
  //    Se pasa una COPIA PROFUNDA del carrito (tomada aquí, antes de clearCart())
  //    para que el guardado no dependa de la semántica de clearCart().
  guardarPedidoEnFirestore({
    name, phone, address, orderType, payment, changeAmount, notes,
    cart: JSON.parse(JSON.stringify(cart)),
    subtotal
  }).catch(err => console.warn('⚠️ No se pudo guardar el pedido en Firestore:', err));

  // Cerrar modal de checkout y drawer del carrito
  const checkoutBackdrop = document.getElementById('checkout-modal-backdrop');
  const cartBackdrop = document.getElementById('cart-backdrop');
  if (checkoutBackdrop) checkoutBackdrop.classList.remove('active');
  if (cartBackdrop) cartBackdrop.classList.remove('active');

  // Vaciar el carrito (en memoria y en localStorage) y refrescar la interfaz
  clearCart();
  updateCartUI();

  if (typeof window.showToast === 'function') {
    window.showToast('🚀 ¡Pedido listo! Abriendo WhatsApp de EL FLACO TUX...');
  }
}


  // --- 5. LÓGICA PRINCIPAL ---
  




// Estado de la Aplicación
let currentFilter = 'all';
let searchQuery = '';
let orderType = 'delivery'; 
let currentProductToCustomize = null;

// Elementos DOM Principales
const productsGrid = document.getElementById('products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Categorías del tablero: las apagadas en CATEGORY_VISIBILITY se ocultan solas
const CATEGORY_META = [
  { id: 'burgers', icon: 'fa-burger', label: 'Hamburguesas' },
  { id: 'hotdogs', icon: 'fa-hotdog', label: 'Jochos Jumbos' },
  { id: 'boneless', icon: 'fa-drumstick-bite', label: 'Boneless' },
  { id: 'sides', icon: 'fa-bowl-food', label: 'Botanas' }
];

const isCategoryVisible = (cat) => CATEGORY_VISIBILITY[cat] !== false;

function applyCategoryVisibility() {
  filterBtns.forEach((btn) => {
    const cat = btn.getAttribute('data-category');
    if (cat !== 'all' && !isCategoryVisible(cat)) {
      btn.style.display = 'none';
      btn.hidden = true;
      btn.setAttribute('aria-hidden', 'true');
      btn.setAttribute('tabindex', '-1');
    }
  });
}
const menuSearchInput = document.getElementById('menu-search-input');
const menuSearchClearBtn = document.getElementById('menu-search-clear-btn');
const quickTagChips = document.querySelectorAll('.quick-tag-chip');
const menuSearchStatus = document.getElementById('menu-search-status');
const searchStatusCount = document.getElementById('search-status-count');
const searchStatusDesc = document.getElementById('search-status-desc');
const searchStatusClearBtn = document.getElementById('search-status-clear-btn');
const cartBadgeCount = document.getElementById('cart-badge-count');
const cartBtnTotal = document.getElementById('cart-btn-total');
const cartItemCountLabel = document.getElementById('cart-item-count-label');
const cartItemsContainer = document.getElementById('cart-items-container');
const summarySubtotal = document.getElementById('summary-subtotal');
const summaryTotal = document.getElementById('summary-total');

// Modales y Drawer
const cartBackdrop = document.getElementById('cart-backdrop');
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const cartCloseBtn = document.getElementById('cart-close-btn');
const mobileCartFloat = document.getElementById('mobile-cart-float');
const mobileCartCount = document.getElementById('mobile-cart-count');
const mobileCartTotal = document.getElementById('mobile-cart-total');

// Checkout Modal
const checkoutModalBackdrop = document.getElementById('checkout-modal-backdrop');
const checkoutModalClose = document.getElementById('checkout-modal-close');
const checkoutTriggerBtn = document.getElementById('checkout-trigger-btn');
const checkoutForm = document.getElementById('checkout-form');
const paymentMethodSelect = document.getElementById('payment-method');
const changeFieldGroup = document.getElementById('change-field-group');
const addressFieldGroup = document.getElementById('address-field-group');
const customerAddressInput = document.getElementById('customer-address');

// Customize Modal
const customizeModalBackdrop = document.getElementById('customize-modal-backdrop');
const customizeModalClose = document.getElementById('customize-modal-close');
const modalProductTitle = document.getElementById('modal-product-title');
const customizeProductDetails = document.getElementById('customize-product-details');
const exclusionsOptionsContainer = document.getElementById('exclusions-options-container');
const extrasOptionsContainer = document.getElementById('extras-options-container');
const saucesSelectionGroup = document.getElementById('sauces-selection-group');
const saucesOptionsContainer = document.getElementById('sauces-options-container');
const saucesErrorHint = document.getElementById('sauces-error-hint');
const customItemNoteInput = document.getElementById('custom-item-note');
const modalCalculatedPrice = document.getElementById('modal-calculated-price');
const confirmCustomizeAddBtn = document.getElementById('confirm-customize-add-btn');

// Tipo de entrega buttons
const typeDeliveryBtn = document.getElementById('type-delivery-btn');
const typePickupBtn = document.getElementById('type-pickup-btn');

// Navegación móvil
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const header = document.getElementById('header');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
const heroWhatsappBtn = document.getElementById('hero-whatsapp-btn');

// Tema
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeToggleIcon = document.getElementById('theme-toggle-icon');
const themeTooltip = document.getElementById('theme-tooltip');
const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle-btn');
const mobileThemeIcon = document.getElementById('mobile-theme-icon');
const mobileThemeLabel = document.getElementById('mobile-theme-label');

// Estado del Negocio y Horarios
const navStatusDot = document.getElementById('nav-status-dot');
const navStatusText = document.getElementById('nav-status-text');

// =========================================================================
// 1. RENDERIZADO DEL MENÚ
// =========================================================================

function normalizeSearchText(str) {
  if (!str) return '';
  return str.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function escapeHtml(str) {
  if (!str) return '';
  return str.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function getCategoryLabel(catId) {
  switch (catId) {
    case 'burgers': return 'Hamburguesas';
    case 'hotdogs': return 'Hot Dogs Jumbos';
    case 'boneless': return 'Boneless';
    case 'sides': return 'Botanas';
    default: return 'Todo el Menú';
  }
}

function matchProductWithQuery(product, query) {
  if (!query) return true;
  const normQuery = normalizeSearchText(query);
  if (!normQuery) return true;
  const terms = normQuery.split(/\s+/).filter(Boolean);
  const prodName = normalizeSearchText(product.name);
  const prodDesc = normalizeSearchText(product.description);
  const prodIncludes = normalizeSearchText(product.includes || '');
  const prodBadge = normalizeSearchText(product.badge || '');
  const prodCategory = normalizeSearchText(product.category || '');

  let categorySynonyms = '';
  if (product.category === 'burgers') {
    categorySynonyms = 'hamburguesa hamburguesas burger burgers carne res plancha';
  } else if (product.category === 'hotdogs') {
    categorySynonyms = 'hotdog hotdogs jocho jochos jumbo perro perros salchicha hot dog pan';
  } else if (product.category === 'boneless') {
    categorySynonyms = 'boneless bono sin hueso pollo piezas salsa bbq bufalo mango habanero lemon pepper parmesano';
  } else if (product.category === 'sides') {
    categorySynonyms = 'botanas papas fritas francesas aros cebolla dedos queso compartir acompanamiento';
  }

  const searchableBlob = `${prodName} ${prodDesc} ${prodIncludes} ${prodBadge} ${prodCategory} ${categorySynonyms}`;
  return terms.every(term => searchableBlob.includes(term));
}

function highlightMatches(text, query) {
  if (!text || !query) return text;
  const normQuery = normalizeSearchText(query);
  if (!normQuery) return text;
  const terms = normQuery.split(/\s+/).filter(t => t.length > 1);
  if (terms.length === 0) return text;
  let result = text;
  terms.forEach(term => {
    const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safeTerm})`, 'gi');
    result = result.replace(regex, '<mark class="search-highlight">$1</mark>');
  });
  return result;
}

function selectCategory(cat) {
  // Nunca dejes activa una categoría oculta temporalmente
  if (cat !== 'all' && !isCategoryVisible(cat)) cat = 'all';
  currentFilter = cat;
  filterBtns.forEach(b => {
    const isMatch = b.getAttribute('data-category') === cat;
    b.classList.toggle('active', isMatch);
    b.setAttribute('aria-selected', isMatch ? 'true' : 'false');
  });
  renderProducts();
}

function clearSearch() {
  searchQuery = '';
  if (menuSearchInput) menuSearchInput.value = '';
  syncQuickChipsState();
  renderProducts();
}

function syncQuickChipsState() {
  const norm = normalizeSearchText(searchQuery);
  quickTagChips.forEach(chip => {
    const chipTerm = normalizeSearchText(chip.getAttribute('data-search') || '');
    chip.classList.toggle('active', norm.length > 0 && norm === chipTerm);
  });
}

function renderProducts() {
  renderProductsInner();
  keepMenuResultsInView();
}

/**
 * Al filtrar o buscar, la rejilla cambia de alto. Si el cliente estaba
 * desplazado dentro del tablero, evita que termine viendo una sección
 * posterior sin resultados a la vista: lo regresa al inicio de los pines.
 */
function keepMenuResultsInView() {
  if (!productsGrid) return;

  const header = document.getElementById('header');
  const toolbar = document.getElementById('menu-toolbar');
  const headerH = header ? header.getBoundingClientRect().height : 0;
  const toolbarStuck = toolbar && toolbar.getBoundingClientRect().top <= headerH + 1;
  const toolbarH = toolbarStuck ? toolbar.getBoundingClientRect().height : 0;
  const stickyOffset = headerH + toolbarH;

  const gridTop = productsGrid.getBoundingClientRect().top;
  // Los resultados ya se ven completos desde arriba: no movemos la pantalla
  if (gridTop >= stickyOffset - 4) return;

  const target = Math.max(0, window.scrollY + gridTop - stickyOffset - 8);
  const reduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // El navegador compensa el "scroll anchoring" cuando la rejilla encoge y
  // deshace el ajuste; se desactiva un instante mientras se reposiciona.
  const root = document.documentElement;
  const prevAnchor = root.style.overflowAnchor;
  root.style.overflowAnchor = 'none';

  window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' });

  window.setTimeout(() => {
    if (root.style.overflowAnchor === 'none') root.style.overflowAnchor = prevAnchor;
  }, reduced ? 120 : 900);
}

function renderProductsInner() {
  if (!productsGrid) return;
  productsGrid.innerHTML = '';
  productsGrid.className = 'products-grid pin-board-grid';

  const queryTrimmed = searchQuery.trim();
  const hasSearch = queryTrimmed.length > 0;

  if (menuSearchClearBtn) {
    menuSearchClearBtn.style.display = hasSearch ? 'flex' : 'none';
  }

  const allMatches = hasSearch 
    ? MENU_DATA.filter(item => matchProductWithQuery(item, queryTrimmed))
    : MENU_DATA;

  const categoryFiltered = (currentFilter === 'all')
    ? allMatches
    : allMatches.filter(item => item.category === currentFilter);

  if (menuSearchStatus) {
    if (hasSearch) {
      menuSearchStatus.style.display = 'flex';
      const count = categoryFiltered.length;
      if (searchStatusCount) searchStatusCount.textContent = `${count} ${count === 1 ? 'encontrado' : 'encontrados'}`;
      if (searchStatusDesc) {
        const categorySuffix = currentFilter !== 'all' ? ` en ${getCategoryLabel(currentFilter)}` : '';
        searchStatusDesc.innerHTML = `para "<strong>${escapeHtml(queryTrimmed)}</strong>"${categorySuffix}`;
      }
    } else {
      menuSearchStatus.style.display = 'none';
    }
  }

  if (categoryFiltered.length === 0) {
    if (hasSearch && allMatches.length > 0) {
      productsGrid.innerHTML = `
        <div class="menu-no-results">
          <div class="no-results-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
          <h3>Sin resultados en ${getCategoryLabel(currentFilter)}</h3>
          <p>No hay coincidencias en esta categoría, pero encontramos <strong>${allMatches.length} ${allMatches.length === 1 ? 'platillo' : 'platillos'}</strong> con "<strong>${escapeHtml(queryTrimmed)}</strong>" en otras secciones del menú.</p>
          <div class="no-results-actions">
            <button class="btn btn-primary" id="btn-show-all-search">
              <i class="fa-solid fa-layer-group"></i> Ver en Todo el Menú (${allMatches.length})
            </button>
            <button class="btn btn-outline" id="btn-clear-empty-search">
              <i class="fa-solid fa-xmark"></i> Quitar búsqueda
            </button>
          </div>
        </div>
      `;
      document.getElementById('btn-show-all-search')?.addEventListener('click', () => selectCategory('all'));
      document.getElementById('btn-clear-empty-search')?.addEventListener('click', () => clearSearch());
      return;
    }
    if (hasSearch) {
      productsGrid.innerHTML = `
        <div class="menu-no-results">
          <div class="no-results-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
          <h3>No encontramos platillos para "${escapeHtml(queryTrimmed)}"</h3>
          <p>Intenta buscar por ingredientes populares como <em>tocino, queso, piña, jalapeño, salsa BBQ</em> o selecciona una de nuestras categorías.</p>
          <div class="no-results-actions">
            <button class="btn btn-primary" id="btn-clear-empty-search">
              <i class="fa-solid fa-rotate-left"></i> Limpiar búsqueda y ver todo
            </button>
            ${CATEGORY_META.filter((c) => isCategoryVisible(c.id)).map((c) => `
            <button class="btn btn-outline" data-empty-category="${c.id}">
              <i class="fa-solid ${c.icon}"></i> Ver ${c.label}
            </button>`).join('')}
          </div>
        </div>
      `;
      document.getElementById('btn-clear-empty-search')?.addEventListener('click', () => clearSearch());
      productsGrid.querySelectorAll('[data-empty-category]').forEach((btn) => {
        btn.addEventListener('click', () => {
          clearSearch();
          selectCategory(btn.getAttribute('data-empty-category'));
        });
      });
      return;
    }
    productsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">No hay productos disponibles en esta categoría.</p>`;
    return;
  }

  categoryFiltered.forEach((product, idx) => {
    const card = document.createElement('article');
    const aspectClass = product.aspectClass || 'pin-aspect-standard';
    card.className = `pin-card product-card ${aspectClass} scroll-fade-item`;
    card.style.setProperty('--fade-idx', (idx % 6));
    
    const titleHtml = hasSearch ? highlightMatches(product.name, queryTrimmed) : product.name;
    const descHtml = hasSearch ? highlightMatches(product.description, queryTrimmed) : product.description;
    const includesHtml = product.includes ? (hasSearch ? highlightMatches(product.includes, queryTrimmed) : product.includes) : '';

    const addBtnLabel = product.category === 'boneless'
      ? 'Elegir Salsa'
      : 'Añadir al Carrito';
    const priceDisplayHtml = `
      <div class="pin-price-wrap">
        <span class="pin-price-val">${STORE_CONFIG.currency}${product.price}</span>
        ${product.includes && product.category === 'burgers' ? '<span class="pin-fries-tag">🍟 Incluye Papas</span>' : ''}
      </div>
    `;

    const badgeText = product.badge ? product.badge.replace(/^[^a-zA-ZáéíóúÁÉÍÓÚñÑ]+/, '').trim() : '';
    const badgeHtml = badgeText ? `<span class="pin-badge product-badge">&lt;${badgeText} /&gt;</span>` : '';

    card.innerHTML = `
      <div class="pin-media-wrap product-img-wrap gallery-photo-trigger" data-id="${product.id}" role="button" tabindex="0" title="Toca para ver ${product.name} en el tablero">
        <img src="${product.image}" alt="${product.name}" class="pin-img product-img" loading="lazy" onerror="this.src='assets/images/alitas.png'">
        ${badgeHtml}
        <div class="pin-hover-overlay">
          <div class="pin-top-actions">
            <button type="button" class="pin-save-btn btn-add-cart-action" data-id="${product.id}">
              <i class="fa-solid fa-cart-plus"></i> ${addBtnLabel}
            </button>
          </div>
          <div class="pin-bottom-actions">
            <button type="button" class="pin-circle-btn pin-whatsapp-action" data-id="${product.id}" title="Pedir este platillo por WhatsApp">
              <i class="fa-brands fa-whatsapp"></i>
            </button>
            <button type="button" class="pin-circle-btn pin-zoom-action" data-id="${product.id}" title="Ampliar Pin">
              <i class="fa-solid fa-expand"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="pin-meta product-card-body">
        <div class="pin-meta-header product-header">
          <h3 class="pin-title product-title">${titleHtml}</h3>
          ${priceDisplayHtml}
        </div>
        <p class="pin-desc product-desc">${descHtml}</p>
        ${(product.includes && product.category !== 'burgers') || product.isShareable ? `
          <div class="pin-tags-row">
            ${product.includes && product.category !== 'burgers' ? `
              <div class="pin-includes product-includes">
                <i class="fa-solid fa-sparkles"></i> ${includesHtml}
              </div>
            ` : ''}
            ${product.isShareable ? `
              <span class="pin-share-tag" title="Ideal para compartir">
                <i class="fa-brands fa-linux" aria-hidden="true"></i><span>&lt; Para Compartir /&gt;</span>
              </span>
            ` : ''}
          </div>
        ` : ''}
        <div class="pin-footer">
          <div class="pin-author">
            <img src="assets/images/el_flaco_tux_logo.png" alt="Logo EL FLACO TUX" class="pin-author-img">
            <span class="pin-author-name">EL FLACO TUX</span>
          </div>
          <div class="pin-actions-btns">
            <button type="button" class="pin-customize-btn btn-customize-action" data-id="${product.id}" title="Personalizar ingredientes (quitar/agregar extras)">
              <i class="fa-solid fa-sliders"></i>
            </button>
            <button type="button" class="pin-mobile-add-btn btn-add-cart-action" data-id="${product.id}">
              <i class="fa-solid fa-plus"></i> ${addBtnLabel}
            </button>
          </div>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });

  productsGrid.querySelectorAll('.btn-add-cart-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const res = quickAddToCart(id);
      if (res.needsCustomization) openCustomizeModal(id);
      else if (res.success) {
        updateCartUI();
        showToast(`✓ ¡${res.product.name} agregado al pedido!`);
      }
    });
  });

  productsGrid.querySelectorAll('.btn-customize-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      openCustomizeModal(id);
    });
  });

  productsGrid.querySelectorAll('.pin-whatsapp-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const prod = MENU_DATA.find(p => p.id === id);
      if (prod) {
        const text = encodeURIComponent(`¡Hola EL FLACO TUX! 🍔 Me gustaría ordenar: *${prod.name}* (${STORE_CONFIG.currency}${prod.price}).`);
        window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${text}`, '_blank');
      }
    });
  });

  productsGrid.querySelectorAll('.pin-zoom-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (id) openProductInLightbox(id);
    });
  });

  productsGrid.querySelectorAll('.gallery-photo-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const id = trigger.getAttribute('data-id');
      if (id) openProductInLightbox(id);
    });
  });

  // Observar los nuevos pines para la animación de cascada
  observeScrollElements(productsGrid);
}

// =========================================================================
// 2. MODAL DE PERSONALIZACIÓN
// =========================================================================

function openCustomizeModal(productId) {
  const product = MENU_DATA.find(p => p.id === productId);
  if (!product) return;

  currentProductToCustomize = product;
  modalProductTitle.textContent = `Personalizar: ${product.name}`;

  const displayBasePrice = `${STORE_CONFIG.currency}${product.price}`;

  customizeProductDetails.innerHTML = `
    <div style="display: flex; gap: 14px; align-items: center; background: var(--bg-surface); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-light);">
      <img src="${product.image}" style="width: 60px; height: 60px; border-radius: var(--radius-sm); object-fit: cover;" onerror="this.src='assets/images/alitas.png'">
      <div style="font-size: 0.9rem; font-weight: 700;">${product.name}</div>
      <div style="color: var(--secondary); font-weight: 800; font-size: 0.9rem;">${displayBasePrice}</div>
    </div>
  `;

  renderSauceOptions(product);

  const exclusionsGroup = document.getElementById('exclusions-selection-group');
  const extrasGroup = document.getElementById('extras-selection-group');
  const customNoteGroup = customItemNoteInput ? customItemNoteInput.closest('.form-group') : null;
  const hasExclusionsAndExtras = (product.category === 'burgers' || product.category === 'hotdogs');
  const isBoneless = product.category === 'boneless';

  if (exclusionsGroup) {
    exclusionsGroup.style.display = hasExclusionsAndExtras ? 'block' : 'none';
  }
  if (extrasGroup) {
    extrasGroup.style.display = hasExclusionsAndExtras ? 'block' : 'none';
  }
  if (customNoteGroup) {
    // Boneless: el modal solo muestra la selección de salsa (obligatoria).
    customNoteGroup.style.display = isBoneless ? 'none' : 'block';
  }

  exclusionsOptionsContainer.innerHTML = hasExclusionsAndExtras ? CUSTOM_OPTIONS.exclusions.map(ex => `
    <label class="option-checkbox-label">
      <div class="option-left">
        <input type="checkbox" name="exclusion" value="${ex.label}" class="custom-exclusion-chk">
        <span>${ex.label}</span>
      </div>
    </label>
  `).join('') : '';

  extrasOptionsContainer.innerHTML = hasExclusionsAndExtras ? CUSTOM_OPTIONS.extras.map(extra => `
    <label class="option-checkbox-label">
      <div class="option-left">
        <input type="checkbox" name="extra" value="${extra.label}" data-price="${extra.price}" class="custom-extra-chk">
        <span>${extra.label}</span>
        <span class="option-extra-price">+${STORE_CONFIG.currency}${extra.price}</span>
      </div>
    </label>
  `).join('') : '';

  customItemNoteInput.value = '';
  recalculateModalPrice();

  customizeModalBackdrop.querySelectorAll('.custom-extra-chk').forEach(chk => {
    chk.addEventListener('change', recalculateModalPrice);
  });

  customizeModalBackdrop.classList.add('active');
}

function clearSauceError() {
  if (saucesSelectionGroup) saucesSelectionGroup.classList.remove('sauces-invalid');
  if (saucesOptionsContainer) saucesOptionsContainer.removeAttribute('aria-invalid');
  if (saucesErrorHint) saucesErrorHint.hidden = true;
  // Si el toast de error sigue visible, se oculta al corregir la selección
  if (toast && toast.classList.contains('toast-error')) {
    toast.classList.remove('show');
    toast.classList.remove('toast-error');
  }
}

// Salsas: solo para boneless (product.sauces)
function renderSauceOptions(product) {
  if (!saucesSelectionGroup || !saucesOptionsContainer) return;

  clearSauceError();

  const isBoneless = product.category === 'boneless' || (Array.isArray(product.sauces) && product.sauces.length > 0);
  const sauces = isBoneless
    ? (Array.isArray(product.sauces) && product.sauces.length > 0
        ? product.sauces
        : ['BBQ', 'Búfalo', 'Mango Habanero', 'Lemon Pepper', 'Parmesano'])
    : [];

  // El botón de confirmar siempre está disponible: la validación de salsa se
  // hace al hacer clic, para poder mostrar el toast de error.
  if (confirmCustomizeAddBtn) {
    confirmCustomizeAddBtn.disabled = false;
    confirmCustomizeAddBtn.classList.remove('disabled-btn');
  }

  if (sauces.length === 0) {
    saucesSelectionGroup.style.display = 'none';
    saucesOptionsContainer.innerHTML = '';
    return;
  }

  saucesSelectionGroup.style.display = 'block';
  saucesOptionsContainer.innerHTML = sauces.map((sauce, idx) => `
    <label class="sauce-choice-card">
      <input type="checkbox" name="sauce-option" value="${sauce}" id="sauce-option-${idx}" class="sauce-checkbox">
      <span class="sauce-choice-label">${sauce}</span>
    </label>
  `).join('');

  const sauceCheckboxes = Array.from(saucesOptionsContainer.querySelectorAll('.sauce-checkbox'));
  sauceCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const checkedSauces = sauceCheckboxes.filter(cb => cb.checked);

      // Máximo 2 salsas: se desmarca la tercera y se avisa al cliente.
      if (checkedSauces.length > 2) {
        checkbox.checked = false;
        checkbox.closest('.sauce-choice-card')?.classList.remove('active');
        clearSauceError();
        showToast('> ERROR: Máximo 2 salsas por orden.');
        return;
      }

      checkbox.closest('.sauce-choice-card')?.classList.toggle('active', checkbox.checked);
      clearSauceError();
    });
  });
}

function recalculateModalPrice() {
  if (!currentProductToCustomize) return;
  let base = currentProductToCustomize.price;
  const checkedExtras = customizeModalBackdrop.querySelectorAll('.custom-extra-chk:checked');
  checkedExtras.forEach(chk => {
    base += parseFloat(chk.getAttribute('data-price') || 0);
  });
  modalCalculatedPrice.textContent = `${STORE_CONFIG.currency}${base}`;
}

function handleConfirmCustomize() {
  if (!currentProductToCustomize) return;

  // Boneless: se permiten de 1 a 2 salsas (al menos una es obligatoria)
  let selectedSauces = [];
  const isBoneless = currentProductToCustomize.category === 'boneless' || (Array.isArray(currentProductToCustomize.sauces) && currentProductToCustomize.sauces.length > 0);
  if (isBoneless) {
    selectedSauces = Array.from(
      customizeModalBackdrop.querySelectorAll('input[name="sauce-option"]:checked')
    ).map(cb => cb.value);

    if (selectedSauces.length === 0) {
      showToast('> ERROR 404: Falta la salsa. Selecciona al menos una.');
      if (saucesSelectionGroup) {
        saucesSelectionGroup.classList.remove('sauces-invalid');
        void saucesSelectionGroup.offsetWidth;   // reinicia la animación de sacudida
        saucesSelectionGroup.classList.add('sauces-invalid');
        saucesSelectionGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      if (saucesErrorHint) {
        saucesErrorHint.hidden = false;
        saucesErrorHint.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> &gt; ERROR 404: Falta la salsa. Selecciona al menos una.';
      }
      if (saucesOptionsContainer) {
        saucesOptionsContainer.setAttribute('aria-invalid', 'true');
        saucesOptionsContainer.focus({ preventScroll: true });
      }
      return;
    }

    // Protección adicional por si el estado del DOM cambiara fuera del listener.
    if (selectedSauces.length > 2) {
      showToast('> ERROR: Máximo 2 salsas por orden.');
      return;
    }
  }

  const basePrice = currentProductToCustomize.price;
  const itemDisplayName = currentProductToCustomize.name;
  const noteParts = [];

  if (selectedSauces.length > 0) {
    // Las salsas se guardan en las notas del carrito como "Salsas: BBQ, Búfalo".
    noteParts.push(`Salsas: ${selectedSauces.join(', ')}`);
  }

  const exclusions = Array.from(customizeModalBackdrop.querySelectorAll('.custom-exclusion-chk:checked')).map(c => c.value);
  const extras = Array.from(customizeModalBackdrop.querySelectorAll('.custom-extra-chk:checked')).map(c => ({
    label: c.value,
    price: parseFloat(c.getAttribute('data-price') || 0)
  }));
  const userNote = customItemNoteInput.value.trim();
  if (userNote) noteParts.push(userNote);
  const note = noteParts.join(' | ');
  let extraPriceTotal = extras.reduce((sum, e) => sum + e.price, 0);
  let finalItemUnitPrice = basePrice + extraPriceTotal;

  const cart = getCart();
  const updatedCart = [...cart, {
    cartItemId: Date.now() + Math.random().toString(36).substring(2, 6),
    id: currentProductToCustomize.id,
    name: itemDisplayName,
    unitPrice: basePrice,
    totalPrice: finalItemUnitPrice,
    quantity: 1,
    image: currentProductToCustomize.image,
    exclusions: exclusions,
    extras: extras,
    note: note,
    sauce: selectedSauces.length > 0 ? selectedSauces.join(', ') : null
  }];
  setCart(updatedCart);
  updateCartUI();
  customizeModalBackdrop.classList.remove('active');
  showToast(`✓ ¡${itemDisplayName} agregado a tu orden!`);
}

// =========================================================================
// 3. GALERÍA LIGHTBOX
// =========================================================================

function openProductInLightbox(productId) {
  const idx = MENU_DATA.findIndex(p => p.id === productId);
  if (idx === -1) return;
  
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxPrice = document.getElementById('lightbox-price');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxOrderBtn = document.getElementById('lightbox-order-btn');
  const lightboxWhatsappBtn = document.getElementById('lightbox-whatsapp-btn');

  if (!lightbox) return;

  const showPinByIndex = (index) => {
    if (MENU_DATA.length === 0) return;
    if (index < 0) index = MENU_DATA.length - 1;
    if (index >= MENU_DATA.length) index = 0;
    
    const product = MENU_DATA[index];
    if (lightboxImg) lightboxImg.src = product.image;
    if (lightboxTitle) lightboxTitle.textContent = product.name;
    if (lightboxDesc) lightboxDesc.textContent = product.description;
    
    let priceText = `${STORE_CONFIG.currency}${product.price} MXN`;
    if (product.includes) {
      priceText = `${STORE_CONFIG.currency}${product.price} MXN (${product.includes})`;
    }
    if (lightboxPrice) lightboxPrice.textContent = priceText;
    if (lightboxCategory) lightboxCategory.textContent = getCategoryLabel(product.category);

    if (lightboxOrderBtn) {
      const orderLabel = product.category === 'boneless'
        ? 'Elegir Salsa y Ordenar'
        : 'Añadir al Carrito';
      lightboxOrderBtn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> ' + orderLabel;
      lightboxOrderBtn.onclick = () => {
        closeLightbox();
        const res = quickAddToCart(product.id);
        if (res.needsCustomization) openCustomizeModal(product.id);
        else if (res.success) {
          updateCartUI();
          showToast(`✓ ¡${product.name} agregado al pedido!`);
        }
      };
    }

    if (lightboxWhatsappBtn) {
      lightboxWhatsappBtn.onclick = () => {
        closeLightbox();
        const text = encodeURIComponent(`¡Hola EL FLACO TUX! 🍔 Me interesa ordenar este pin: *${product.name}* (${STORE_CONFIG.currency}${product.price}).`);
        window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${text}`, '_blank');
      };
    }
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => showPinByIndex(idx - 1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => showPinByIndex(idx + 1));
  
  showPinByIndex(idx);
}

// =========================================================================
// 4. HORARIOS Y UTILIDADES
// =========================================================================

function checkStoreHours() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const isMonday = (day === 1);
  const isWithinHours = !isMonday && (hour >= 18 && hour < 24);
  return { isOpen: isWithinHours, isMonday };
}

function updateStoreHoursUI() {
  const store = checkStoreHours();
  if (navStatusDot && navStatusText) {
    if (store.isOpen) {
      navStatusDot.className = 'status-dot';
      navStatusText.textContent = 'Abierto';
    } else {
      navStatusDot.className = 'status-dot closed';
      navStatusText.textContent = 'Cerrado';
    }
  }
}

function showToast(message) {
  if (!toast || !toastMessage) return;
  toastMessage.textContent = message;
  const isError = message.includes('ERROR');
  const toastIcon = toast.querySelector('i');
  if (toastIcon) {
    if (isError) {
      toastIcon.className = 'fa-solid fa-triangle-exclamation';
      toastIcon.style.color = 'var(--primary)';
    } else {
      toastIcon.className = 'fa-solid fa-circle-check text-primary';
      toastIcon.style.color = '';
    }
  }
  toast.classList.toggle('toast-error', isError);
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.remove('toast-error');
  }, 3200);
}

// Funciones globales expuestas para el HTML (onclick en línea)
window.openProductInLightbox = openProductInLightbox;
window.changeItemQty = changeItemQty;
window.removeItemFromCart = removeItemFromCart;
window.showToast = showToast;

/**
 * Registra el Service Worker (PWA). Solo funciona en https o localhost:
 * al abrir el sitio con doble clic (file://) el navegador no lo permite,
 * así que se sale sin errores en consola.
 */
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  const isLocalhost = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
  if (window.location.protocol !== 'https:' && !isLocalhost) return;

  window.addEventListener('load', () => {
    // updateViaCache: 'none' evita que un sw.js cacheado por el hosting
    // (Firebase lo guarda 2 h) retrase las actualizaciones.
    navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then((registration) => {
      console.log('[PWA] Service Worker registrado:', registration.scope);
    }).catch((error) => {
      console.warn('[PWA] No se pudo registrar el Service Worker:', error);
    });
  });
}

function init() {
  applyTheme(getCurrentTheme(), false);
  applyCategoryVisibility();
  renderProducts();
  updateMenuCount();
  initScrollAnimations();
  updateCartUI();
  updateStoreHoursUI();
  setupEventListeners();
  initStickyToolbar();
  handleViewParam();
  registerServiceWorker();

  setInterval(() => {
    updateStoreHoursUI();
  }, 60000);
}

/**
 * Si la URL trae ?view=menu (los clientes llegan escaneando un QR), baja
 * automáticamente al menú. Se espera a que las fuentes estén listas para que
 * el cálculo de la posición sea exacto.
 */
function handleViewParam() {
  let params;
  try {
    params = new URLSearchParams(window.location.search);
  } catch (e) {
    return;
  }
  if (params.get('view') !== 'menu') return;

  const menuEl = document.getElementById('menu');
  if (!menuEl) return;

  const scrollToMenu = () => {
    const header = document.getElementById('header');
    const headerH = header ? header.getBoundingClientRect().height : 0;
    const top = menuEl.getBoundingClientRect().top + window.scrollY - headerH - 8;

    const reduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: reduced ? 'auto' : 'smooth'
    });
  };

  // Tras el primer pintado y, si es posible, con las fuentes ya cargadas
  requestAnimationFrame(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => setTimeout(scrollToMenu, 60));
    } else {
      setTimeout(scrollToMenu, 150);
    }
  });
}

/**
 * Sombra de la barra sticky solo cuando está pegada al header.
 */
function initStickyToolbar() {
  const toolbar = document.getElementById('menu-toolbar');
  if (!toolbar) return;

  const header = document.getElementById('header');
  const update = () => {
    const headerH = header ? header.getBoundingClientRect().height : 0;
    const isStuck = toolbar.getBoundingClientRect().top <= headerH + 1;
    toolbar.classList.toggle('is-stuck', isStuck);
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

// Mantiene el contador "N Pines de Menú" del hero sincronizado con MENU_DATA
function updateMenuCount() {
  const menuCountEl = document.getElementById('menu-pin-count');
  if (menuCountEl) {
    menuCountEl.textContent = MENU_DATA.length;
  }
}

function setupEventListeners() {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      selectCategory(cat);
    });
  });

  // Banner de promoción: lleva directo al menú
  const promoMenuBtn = document.getElementById('promo-menu-btn');
  if (promoMenuBtn) {
    promoMenuBtn.addEventListener('click', () => {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (menuSearchInput) {
    menuSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      syncQuickChipsState();
      renderProducts();
    });
    menuSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        clearSearch();
        menuSearchInput.blur();
      }
    });
  }

  if (menuSearchClearBtn) {
    menuSearchClearBtn.addEventListener('click', () => {
      clearSearch();
      menuSearchInput.focus();
    });
  }

  if (searchStatusClearBtn) {
    searchStatusClearBtn.addEventListener('click', () => {
      clearSearch();
    });
  }

  if (quickTagChips) {
    quickTagChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const queryTerm = chip.getAttribute('data-search') || '';
        if (normalizeSearchText(searchQuery) === normalizeSearchText(queryTerm)) {
          clearSearch();
        } else {
          searchQuery = queryTerm;
          if (menuSearchInput) menuSearchInput.value = queryTerm;
          syncQuickChipsState();
          renderProducts();
        }
      });
    });
  }

  if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', () => {
      cartBackdrop.classList.add('active');
    });
  }

  if (mobileCartFloat) {
    mobileCartFloat.addEventListener('click', () => {
      cartBackdrop.classList.add('active');
    });
  }

  // =========================================================================
  // BARRA FLOTANTE INFERIOR DE PEDIDO ("Tu Pedido | VER PEDIDO | CONFIRMAR AHORA")
  // =========================================================================
  const orderFloatViewBtn = document.getElementById('order-float-view-btn');
  const orderFloatConfirmBtn = document.getElementById('order-float-confirm-btn');

  if (orderFloatViewBtn) {
    orderFloatViewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      cartBackdrop.classList.add('active');
    });
  }

  if (orderFloatConfirmBtn) {
    orderFloatConfirmBtn.addEventListener('click', (e) => {
      // Detener la propagación para que el contenedor no abra también el drawer
      e.stopPropagation();
      if (getCart().length === 0) {
        showToast('Agrega productos al carrito primero.');
        return;
      }
      checkoutModalBackdrop.classList.add('active');
    });
  }

  if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', () => {
      cartBackdrop.classList.remove('active');
    });
  }

  if (cartBackdrop) {
    cartBackdrop.addEventListener('click', (e) => {
      if (e.target === cartBackdrop) {
        cartBackdrop.classList.remove('active');
      }
    });
  }

  if (typeDeliveryBtn) {
    typeDeliveryBtn.addEventListener('click', () => {
      orderType = 'delivery';
      typeDeliveryBtn.classList.add('active');
      typePickupBtn.classList.remove('active');
      document.getElementById('delivery-cost-row').style.display = 'flex';
      addressFieldGroup.style.display = 'block';
      customerAddressInput.required = true;
      updateWaitTimeUI();
    });
  }

  if (typePickupBtn) {
    typePickupBtn.addEventListener('click', () => {
      orderType = 'pickup';
      typePickupBtn.classList.add('active');
      document.getElementById('delivery-cost-row').style.display = 'none';
      addressFieldGroup.style.display = 'none';
      customerAddressInput.required = false;
      updateWaitTimeUI();
    });
  }

  if (checkoutTriggerBtn) {
    checkoutTriggerBtn.addEventListener('click', () => {
      if (getCart().length === 0) {
        showToast('Agrega productos al carrito primero.');
        } else {
        checkoutModalBackdrop.classList.add('active');
        }
      });
  }

  if (checkoutModalClose) {
    checkoutModalClose.addEventListener('click', () => {
      checkoutModalBackdrop.classList.remove('active');
    });
  }

  if (checkoutModalBackdrop) {
    checkoutModalBackdrop.addEventListener('click', (e) => {
      if (e.target === checkoutModalBackdrop) {
        checkoutModalBackdrop.classList.remove('active');
      }
    });
  }

  // Modal de personalización: cierre con la X y con clic en el fondo oscuro
  if (customizeModalClose) {
    customizeModalClose.addEventListener('click', () => {
      customizeModalBackdrop.classList.remove('active');
    });
  }

  if (customizeModalBackdrop) {
    customizeModalBackdrop.addEventListener('click', (e) => {
      if (e.target === customizeModalBackdrop) {
        customizeModalBackdrop.classList.remove('active');
      }
    });
  }

  if (confirmCustomizeAddBtn) {
    confirmCustomizeAddBtn.addEventListener('click', handleConfirmCustomize);
  }

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }

  if (paymentMethodSelect) {
    paymentMethodSelect.addEventListener('change', () => {
      if (paymentMethodSelect.value === 'Efectivo (Cambio)') {
        changeFieldGroup.style.display = 'block';
      } else {
        changeFieldGroup.style.display = 'none';
      }
    });
  }

  if (heroWhatsappBtn) {
    heroWhatsappBtn.addEventListener('click', () => {
      const directMsg = `¡Hola! Me gustaría hacer un pedido en ${STORE_CONFIG.name}. ¿Me podrían compartir el menú o promociones del día? 🍔`;
      window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(directMsg)}`, '_blank');
    });
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      toggleTheme(showToast);
    });
  }

  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', () => {
      toggleTheme(showToast);
      if (navLinks) navLinks.classList.remove('open');
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function updateWaitTimeUI() {
  // Tiempo estimado de espera según la modalidad elegida
  const waitTimeEl = document.getElementById('summary-wait-time');
  if (!waitTimeEl) return;
  waitTimeEl.textContent = (orderType === 'delivery') ? '25 - 35 min' : '15 - 25 min';
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}


})();
