export const SPECIES = [
  { id: "dog", label: "Perro", emoji: "🐕" },
  { id: "cat", label: "Gato",  emoji: "🐈" },
];

export const SIZES = [
  { id: "small",  label: "Pequeño",  sub: "< 10 kg",  emoji: "🐩" },
  { id: "medium", label: "Mediano",  sub: "10–25 kg", emoji: "🐕" },
  { id: "large",  label: "Grande",   sub: "> 25 kg",  emoji: "🦮" },
];

// Costos base en Quetzales (GTQ) — rangos reales de Guatemala 2024
// [min, max] por mes
export const BASE_COSTS = {
  dog: {
    small:  { food: [150, 250], health: [50, 100], grooming: [80, 150], accessories: [30, 60], treats: [40, 80] },
    medium: { food: [250, 400], health: [60, 120], grooming: [100, 200], accessories: [40, 80], treats: [50, 100] },
    large:  { food: [400, 650], health: [80, 150], grooming: [150, 300], accessories: [50, 100], treats: [70, 130] },
  },
  cat: {
    small:  { food: [100, 180], health: [40, 80],  grooming: [0, 60],   accessories: [20, 50], treats: [30, 60]  },
    medium: { food: [150, 250], health: [50, 100], grooming: [0, 80],   accessories: [25, 60], treats: [40, 70]  },
    large:  { food: [200, 320], health: [60, 120], grooming: [0, 100],  accessories: [30, 70], treats: [50, 90]  },
  },
};

// Gastos únicos iniciales (primer año)
export const ONE_TIME_COSTS = {
  dog: { sterilization: [500, 900], vaccines: [200, 400], microchip: [150, 250], initialVet: [150, 300], bed: [80, 200], leash: [30, 80], bowls: [30, 60] },
  cat: { sterilization: [400, 700], vaccines: [150, 300], microchip: [150, 250], initialVet: [150, 300], bed: [60, 150], litter_box: [60, 120], bowls: [20, 50] },
};

export const EXPENSE_META = {
  food:         { label: "Alimentación",       icon: "🍖", color: "#2DA14F",  desc: "Alimento balanceado de calidad",     tip: "Comprar al por mayor y marcas nacionales puede reducir este costo hasta 30%." },
  health:       { label: "Salud mensual",       icon: "💊", color: "#FF8C42",  desc: "Desparasitación, antipulgas, vitaminas", tip: "La prevención mensual es más económica que tratar enfermedades." },
  grooming:     { label: "Higiene y estética",  icon: "🏠", color: "#D8F3DC",  desc: "Baño, corte de uñas, oídos",       tip: "Aprender a bañar a tu mascota en casa reduce este gasto a casi cero." },
  accessories:  { label: "Accesorios",          icon: "🎀", color: "#FF8C42",  desc: "Ropa, juguetes, correa, collar",   tip: "Los juguetes caseros y ropa básica pueden cubrir esta necesidad." },
  treats:       { label: "Premios y snacks",    icon: "🦴", color: "#2DA14F",  desc: "Premios para entrenamiento y amor",tip: "Vegetales como zanahoria o manzana son snacks económicos y saludables." },
};

export const ONE_TIME_META = {
  sterilization: { label: "Esterilización",    icon: "🩺", color: "#2DA14F" },
  vaccines:      { label: "Vacunas (primer año)",icon: "💉", color: "#FF8C42" },
  microchip:     { label: "Microchip",          icon: "📡", color: "#D8F3DC" },
  initialVet:    { label: "Consulta inicial",   icon: "🏥", color: "#2DA14F" },
  bed:           { label: "Cama/refugio",       icon: "🛏️", color: "#FF8C42" },
  leash:         { label: "Correa y collar",    icon: "🔗", color: "#2DA14F" },
  litter_box:    { label: "Caja de arena",      icon: "📦", color: "#FF8C42" },
  bowls:         { label: "Platos y bebedero",  icon: "🥣", color: "#D8F3DC" },
};

export const SAVINGS_TIPS = [
  { icon: "🏡", tip: "Aprende a bañar a tu mascota en casa. Ahorras hasta Q150/mes." },
  { icon: "🛒", tip: "Compra alimento a granel o en tiendas mayoristas." },
  { icon: "🤝", tip: "Muchas clínicas ofrecen planes de salud preventiva con descuento." },
  { icon: "📱", tip: "Únete a grupos de Facebook locales — hay intercambio de accesorios." },
  { icon: "🌿", tip: "Zanahoria, manzana y brócoli son snacks sanos y económicos para perros." },
  { icon: "🩺", tip: "Las jornadas veterinarias municipales ofrecen vacunas gratis o a bajo costo." },
];
