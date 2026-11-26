/**
 * BASE DE DATOS DE PRODUCTOS - EL FLACO TUX
 * Smash Burgers, Boneless & Papas - Root de tu antojo
 * Datos basados fielmente en el menú del negocio
 */

/**
 * VISIBILIDAD TEMPORAL DEL MENÚ
 * ---------------------------------------------------------------
 * Pon en `false` la categoría que quieras ocultar del sitio.
 */
export const CATEGORY_VISIBILITY = {
  combos: true,
  burgers: true,
  hotdogs: true,
  boneless: true,
  combos: true,
  sides: true
};

const ALL_MENU_DATA = [
  // --- SECCIÓN COMBOS (Producto Destacado) ---
  {
    id: "combo-flaco",
    name: "Combo El Flaco (combo.sh)",
    category: "combos",
    price: 230,
    badge: "Destacado",
    aspectClass: "pin-aspect-tall",
    description: "1 Smash Clásica + Boneless (5 pz) + Dedos de Queso (5 pz). Incluye papas.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/burger_combo.jpg",
    popular: true,
    isShareable: true
  },

  // --- SECCIÓN HAMBURGUESAS (Todas incluyen papas) ---
  {
    id: "smash-clasica",
    name: "Smash Clásica",
    category: "burgers",
    price: 100,
    badge: "Clásica",
    aspectClass: "pin-aspect-standard",
    description: "Carne de res, doble queso americano, cebolla caramelizada y aderezo. Incluye papas.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/burger_fries.jpg",
    popular: false
  },
  {
    id: "smash-tocino",
    name: "Smash de Tocino",
    category: "burgers",
    price: 120,
    badge: "Favorita",
    aspectClass: "pin-aspect-portrait",
    description: "Carne de res, queso, tocino crujiente, cebolla caramelizada y salsa BBQ. Incluye papas.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/burger_bacon.jpg",
    popular: true
  },
  {
    id: "smash-hawaiana",
    name: "Smash Hawaiana",
    category: "burgers",
    price: 125,
    badge: "Tropical",
    aspectClass: "pin-aspect-standard",
    description: "Carne de res, queso, piña asada, tocino crujiente y aderezo. Incluye papas.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/burger_special.jpg",
    popular: false
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
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/boneless.png",
    popular: false,
    sauces: ["BBQ", "Mango Habanero", "Parmesano"]
  },
  {
    id: "boneless-12",
    name: "Boneless (12 piezas)",
    category: "boneless",
    price: 150,
    badge: "Para Compartir",
    aspectClass: "pin-aspect-tall",
    description: "Doce piezas crujientes para compartir con tu salsa favorita.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/boneless.png",
    popular: true,
    sauces: ["BBQ", "Mango Habanero", "Parmesano"]
  },
  {
    id: "boneless-25",
    name: "Boneless (25 piezas)",
    category: "boneless",
    price: 280,
    badge: "Fiesta",
    aspectClass: "pin-aspect-standard",
    description: "Veinticinco piezas crujientes para compartir en grande.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/boneless.png",
    popular: false,
    sauces: ["BBQ", "Mango Habanero", "Parmesano"]
  },

  // --- SECCIÓN COMBOS (todos SIN papas) ---
  {
    id: "combo-sudo",
    name: "Combo SUDO",
    category: "combos",
    price: 160,
    badge: "Ahorra $20",
    aspectClass: "pin-aspect-standard",
    description: "Burger sencilla + 5 pz boneless. El que lo puede todo. Elige tu salsa favorita.",
    includes: "Sin papas • Combo TUX",
    image: "assets/images/burger_combo.jpg",
    popular: true,
    sauces: ["BBQ", "Búfalo", "Mango Habanero", "Lemon Pepper", "Parmesano"]
  },
  {
    id: "combo-ping",
    name: "Combo PING",
    category: "combos",
    price: 109,
    badge: "Ahorra $21",
    aspectClass: "pin-aspect-portrait",
    description: "Jumbo sencillo + 5 pz boneless. Rápido y sin vueltas. Elige tu salsa favorita.",
    includes: "Sin papas • Combo TUX",
    image: "assets/images/hotdog_loaded.jpg",
    popular: false,
    sauces: ["BBQ", "Búfalo", "Mango Habanero", "Lemon Pepper", "Parmesano"]
  },
  {
    id: "combo-kernel",
    name: "Combo KERNEL",
    category: "combos",
    price: 269,
    badge: "Ahorra $41",
    aspectClass: "pin-aspect-tall",
    description: "12 pz boneless + dedos de queso + aros de cebolla. El núcleo para compartir. Elige tu salsa favorita.",
    includes: "Sin papas • Combo TUX",
    image: "assets/images/boneless.png",
    popular: false,
    isShareable: true,
    sauces: ["BBQ", "Búfalo", "Mango Habanero", "Lemon Pepper", "Parmesano"]
  },
  {
    id: "combo-cluster",
    name: "Combo CLUSTER",
    category: "combos",
    price: 499,
    badge: "Ahorra $61",
    aspectClass: "pin-aspect-standard",
    description: "25 pz boneless + 2 burgers sencillas + aros de cebolla. Para toda la banda. Elige tu salsa favorita.",
    includes: "Sin papas • Combo TUX",
    image: "assets/images/burger_combo.jpg",
    popular: false,
    isShareable: true,
    sauces: ["BBQ", "Búfalo", "Mango Habanero", "Lemon Pepper", "Parmesano"]
  },

  // --- SECCIÓN BOTANAS (Todas incluyen papas) ---
  {
    id: "papas-gajo",
    name: "Papas Gajo (Porción)",
    category: "sides",
    price: 60,
    badge: "Crujientes",
    aspectClass: "pin-aspect-standard",
    description: "Papas gajo sazonadas y doraditas por fuera, suaves por dentro.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/fries_golden_crisp_1790710209462.jpg",
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
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/aros_cebolla.png",
    popular: false,
    isShareable: true
  },
  {
    id: "dedos-queso",
    name: "Dedos de Queso (5 pz)",
    category: "sides",
    price: 80,
    badge: "Queso Fundido",
    aspectClass: "pin-aspect-portrait",
    description: "Queso fundido empanizado y doradito.",
    includes: "🍟 Incluye porción de papas",
    image: "assets/images/dedos_queso.png",
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
  tagline: "Smash Burgers, Boneless & Papas - Root de tu antojo",
  specialties: "Smash Burgers • Boneless • Botanas",
  phone: "+52 56 3831 6644",
  whatsappNumber: "5215638316644",
  currency: "$",
  location: "Nanchital de Lázaro Cárdenas del Río, Veracruz",
  deliveryZoneText: "Nanchital y zonas conurbadas",
  deliveryNote: "🛵 Envíos a domicilio en Nanchital de Lázaro Cárdenas del Río con costo adicional según colonia",
  promoHero: "🔥 Smash Burgers con bordes crujientes y boneless al momento con BBQ, Mango Habanero o Parmesano.",
  hours: {
    openHour: 18, // 6:00 PM
    closeHour: 24, // 12:00 AM
    closedDays: [1, 2, 3], // Lunes = 1, Martes = 2, Miércoles = 3
    scheduleText: "Jue a Dom: 6:00 PM - 12:00 AM • Lun a Mié: Cerrado"
  }
};
