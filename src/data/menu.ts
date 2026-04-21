import { Dish } from "@/lib/types";

export const STATIC_MENU: Dish[] = [
  // ── ENTRADAS ─────────────────────────────────────────────
  {
    id: "e1",
    name: "Tartar de Lomo",
    description:
      "Lomo Black Angus cortado a cuchillo, yema de huevo curada en sal, chimichurri gelificado y crutones de pan de campo.",
    price: 18,
    category: "entradas",
    image_url:
      "https://images.unsplash.com/photo-1546964124-0cce460f38ef?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "e2",
    name: "Ceviche de Corvina",
    description:
      "Corvina del Atlántico Sur marinada en leche de tigre a la criolla, ají amarillo, maíz morado y cilantro fresco.",
    price: 16,
    category: "entradas",
    image_url:
      "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "e3",
    name: "Provoleta Ahumada",
    description:
      "Queso provolone artesanal ahumado en frío, servido con membrillo casero, nueces tostadas y miel de la Patagonia.",
    price: 14,
    category: "entradas",
    image_url:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "e4",
    name: "Burrata con Tomate Asado",
    description:
      "Burrata de búfala importada sobre cama de tomates asados a las hierbas, aceto balsámico de Módena y hojas de albahaca.",
    price: 15,
    category: "entradas",
    image_url:
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop",
    available: true,
  },

  // ── PRINCIPALES ───────────────────────────────────────────
  {
    id: "p1",
    name: "Bife de Chorizo Black Angus",
    description:
      "400g madurado 21 días, cocción al punto en brasas de quebracho. Papines andinos confitados y salsa de Malbec reducida.",
    price: 42,
    category: "principales",
    image_url:
      "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "p2",
    name: "Cordero Patagónico",
    description:
      "Paleta de cordero lechal de Santa Cruz con costra de hierbas patagónicas, puré de zanahorias ahumadas y jus de cocción.",
    price: 38,
    category: "principales",
    image_url:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "p3",
    name: "Risotto de Hongos Silvestres",
    description:
      "Arroz Carnaroli cremoso, mix de hongos del bosque, parmesano Reggiano 24 meses, aceite de trufa negra y chips de ajo.",
    price: 28,
    category: "principales",
    image_url:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "p4",
    name: "Merluza Negra del Sur",
    description:
      "Filete de merluza negra patagónica sobre velouté de alcaparras, manteca de limón confitado y vegetales de estación salteados.",
    price: 35,
    category: "principales",
    image_url:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop",
    available: true,
  },

  // ── POSTRES ───────────────────────────────────────────────
  {
    id: "d1",
    name: "Soufflé de Dulce de Leche",
    description:
      "Soufflé tibio de dulce de leche artesanal de Tandil, acompañado de helado de vainilla tahitiana y caramelo salado.",
    price: 12,
    category: "postres",
    image_url:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "d2",
    name: "Volcán de Chocolate",
    description:
      "Coulant de chocolate amargo 72% con corazón fundido, coulis de frambuesa fresca y polvo de cacao de origen.",
    price: 11,
    category: "postres",
    image_url:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "d3",
    name: "Panacotta de Maracuyá",
    description:
      "Panacotta de vainilla con cobertura de maracuyá fresco, granita de champagne brut y flores de temporada.",
    price: 10,
    category: "postres",
    image_url:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "d4",
    name: "Tabla de Quesos Argentinos",
    description:
      "Selección de cuatro quesos de productores locales, dulces artesanales de frutas, membrillo y pan de nuez tostado.",
    price: 16,
    category: "postres",
    image_url:
      "https://images.unsplash.com/photo-1452195100486-9cc805987862?q=80&w=800&auto=format&fit=crop",
    available: true,
  },

  // ── BEBIDAS ───────────────────────────────────────────────
  {
    id: "b1",
    name: "Malbec Reserva",
    description:
      "Achaval Ferrer, Luján de Cuyo 2021. Notas de ciruela, especias y roble. Cuerpo pleno, final largo.",
    price: 9,
    category: "bebidas",
    image_url:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "b2",
    name: "Torrontés de Cafayate",
    description:
      "El Esteco, Salta 2023. Aromático e intenso, con notas florales de rosa y jazmín. Perfecto con entradas del mar.",
    price: 7,
    category: "bebidas",
    image_url:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "b3",
    name: "Negroni Luma",
    description:
      "Versión de autor con Fernet artesanal patagónico, vermut rojo de Mendoza, gin botánico y twist de naranja ahumada.",
    price: 12,
    category: "bebidas",
    image_url:
      "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
  {
    id: "b4",
    name: "Agua Mineral Sparkling",
    description:
      "Agua mineral con gas de manantial andino, servida en jarra fría con rodaja de limón y menta fresca.",
    price: 4,
    category: "bebidas",
    image_url:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=800&auto=format&fit=crop",
    available: true,
  },
];
