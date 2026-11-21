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
export const CATEGORY_VISIBILITY = {
  burgers: true,
  hotdogs: true,
  boneless: true,
  sides: true
};

const ALL_MENU_DATA = [
  // --- SECCIÓN HAMBURGUESAS (Todas incluyen papas) ---
  {
    id: "burger-sencilla",
    name: "Burguer Sencilla",
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
    name: "Burguer de Tocino",
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
    name: "Burguer Hawaiana",
    category: "burgers",
    price: 125,
    badge: "Tropical",
    aspectClass: "pin-aspect-standard",
    description: "Carne de res, jamón, queso, piña asada y salsa BBQ.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/burger_combo.jpg",
    popular: false
  },
  {
    id: "burger-especial",
    name: "Burguer Especial",
    category: "burgers",
    price: 150,
    badge: "🔥 La Más Completa",
    aspectClass: "pin-aspect-tall",
    description: "Res, tocino, queso de hebra, piña dulce y salsa BBQ.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/burger_cheese_pull_1790710190015.jpg",
    popular: true
  },
  {
    id: "burger-pollo",
    name: "Burguer de Pollo",
    category: "burgers",
    price: 120,
    badge: "Pollo Crujiente",
    aspectClass: "pin-aspect-standard",
    description: "Pechuga empanizada, lechuga, queso amarillo y aderezos.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/burger_pollo.jpg",
    popular: false
  },

  // --- SECCIÓN JOCHOS JUMBOS ---
  {
    id: "hotdog-sencillo",
    name: "Hot Dog Sencillo",
    category: "hotdogs",
    price: 40,
    priceWithoutFries: 40,
    priceWithFries: 50,
    badge: "Clásico",
    aspectClass: "pin-aspect-standard",
    description: "Salchicha dorada, aderezos cremosos y salsas de la casa.",
    includes: "Con papas: $50 / Sin papas: $40",
    image: "assets/images/hotdog_loaded.jpg",
    popular: false
  },
  {
    id: "hotdog-queso",
    name: "Hot Dog de Queso",
    category: "hotdogs",
    price: 45,
    priceWithoutFries: 45,
    priceWithFries: 55,
    badge: "Queso Fundido",
    aspectClass: "pin-aspect-portrait",
    description: "Salchicha con queso fundido, aderezos y salsas.",
    includes: "Con papas: $55 / Sin papas: $45",
    image: "assets/images/hotdog_loaded.jpg",
    popular: false
  },
  {
    id: "hotdog-tocino",
    name: "Hot Dog de Tocino",
    category: "hotdogs",
    price: 65,
    priceWithoutFries: 65,
    priceWithFries: 75,
    badge: "Tocino Crujiente",
    aspectClass: "pin-aspect-tall",
    description: "Salchicha envuelta en tocino, queso fundido y salsas.",
    includes: "Con papas: $75 / Sin papas: $65",
    image: "assets/images/hotdogs_plancha_1790710200592.jpg",
    popular: true
  },
  {
    id: "hotdog-hawaiano",
    name: "Hot Dog Hawaiano",
    category: "hotdogs",
    price: 70,
    priceWithoutFries: 70,
    priceWithFries: 75,
    badge: "Piña Asada",
    aspectClass: "pin-aspect-standard",
    description: "Tocino crujiente, queso, piña asada y salsas.",
    includes: "Con papas: $75 / Sin papas: $70",
    image: "assets/images/hotdog_hawaiano.jpg",
    popular: false
  },
  {
    id: "hotdog-combinado",
    name: "Hot Dog Combinado",
    category: "hotdogs",
    price: 80,
    priceWithoutFries: 80,
    priceWithFries: 90,
    badge: "⭐ Especial de la Casa",
    aspectClass: "pin-aspect-portrait",
    description: "Tocino, queso de hebra, piña dulce y salsas de la casa.",
    includes: "Con papas: $90 / Sin papas: $80",
    image: "assets/images/hotdog_special.jpg",
    popular: true
  },

  // --- SECCIÓN BONELESS (por piezas) ---
  {
    id: "boneless-6",
    name: "Boneless (6 piezas)",
    category: "boneless",
    price: 90,
    badge: "Sin Hueso",
    aspectClass: "pin-aspect-standard",
    description: "Pollo crujiente sin hueso bañado en tu salsa favorita.",
    includes: "6 piezas • Elige tu salsa",
    image: "assets/images/boneless.png",
    popular: false,
    sauces: ["BBQ", "Búfalo", "Mango Habanero", "Lemon Pepper", "Parmesano"]
  },
  {
    id: "boneless-12",
    name: "Boneless (12 piezas)",
    category: "boneless",
    price: 170,
    badge: "Para Compartir",
    aspectClass: "pin-aspect-tall",
    description: "Doce piezas crujientes para compartir con tu salsa favorita.",
    includes: "12 piezas • Elige tu salsa",
    image: "assets/images/boneless.png",
    popular: true,
    sauces: ["BBQ", "Búfalo", "Mango Habanero", "Lemon Pepper", "Parmesano"]
  },

  // --- SECCIÓN BOTANAS ---
  {
    id: "dedos-queso",
    name: "Dedos de Queso",
    category: "sides",
    price: 65,
    badge: "Queso Fundido",
    aspectClass: "pin-aspect-portrait",
    description: "Queso fundido empanizado y doradito.",
    includes: "5 piezas",
    image: "assets/images/dedos_queso.png",
    popular: true,
    isShareable: true
  },
  {
    id: "aros-cebolla",
    name: "Aros de Cebolla",
    category: "sides",
    price: 55,
    badge: "Crujientes",
    aspectClass: "pin-aspect-standard",
    description: "Cebolla empanizada, dorada y dulce.",
    includes: "Recién hechos",
    image: "assets/images/aros_cebolla.png",
    popular: false,
    isShareable: true
  },
  {
    id: "papas-fritas",
    name: "Papas",
    category: "sides",
    price: 50,
    badge: "Clásicas",
    aspectClass: "pin-aspect-tall",
    description: "Papas doradas y sazonadas, recién hechas.",
    includes: "Doradas y sazonadas",
    image: "assets/images/fries_golden_crisp_1790710209462.jpg",
    popular: true,
    isShareable: true
  }
];

// Solo se publican las categorías visibles (ver CATEGORY_VISIBILITY arriba)
export const MENU_DATA = ALL_MENU_DATA.filter(
  (product) => CATEGORY_VISIBILITY[product.category] !== false
);

// Opciones de personalización disponibles
export const CUSTOM_OPTIONS = {
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
export const STORE_CONFIG = {
  name: "EL FLACO TUX",
  tagline: "Alitas, Boneless & Botanas - Root de tu antojo",
  specialties: "Alitas • Boneless • Botanas",
  phone: "+52 921 303 3313",
  whatsappNumber: "529213033313",
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
