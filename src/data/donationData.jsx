import {
  FaSyringe,
  FaShieldAlt,
  FaPills,
  FaEye,
  FaFlask,
  FaBandAid,
  FaDog,
  FaHeart,
} from "react-icons/fa";

export const MEDICATIONS = [
  {
    id: "antiparasitarios-ext",
    title: "Antiparasitarios Externos",
    description: "Control de pulgas, garrapatas y ácaros",
    icon: <FaShieldAlt size={24} color="#2DA14F" />,
    color: "#2DA14F",
    items: [
      { name: "Pipetas spot-on", brand: "Frontline, Advantix, Revolution", use: "Protección mensual contra pulgas y garrapatas" },
      { name: "Collares antipulgas", brand: "Seresto, Scalibor", use: "Protección continua por varios meses" },
      { name: "Spray antipulgas", brand: "Frontline spray", use: "Tratamiento inmediato para infestaciones" },
    ],
  },
  {
    id: "antiparasitarios-int",
    title: "Antiparasitarios Internos",
    description: "Desparasitantes intestinales",
    icon: <FaSyringe size={24} color="#FF8C42" />,
    color: "#FF8C42",
    items: [
      { name: "Desparasitante oral tabletas", brand: "Drontal, Caniverm, Endogard", use: "Desparasitación trimestral" },
      { name: "Suspensión líquida", brand: "Strongid, Nemex", use: "Para cachorros y animales pequeños" },
      { name: "Praziquantel inyectable", brand: "Droncit", use: "Tratamiento contra tenias" },
    ],
  },
  {
    id: "antibioticos",
    title: "Antibióticos y Antiinflamatorios",
    description: "Infecciones e inflamaciones",
    icon: <FaPills size={24} color="#2DA14F" />,
    color: "#2DA14F",
    items: [
      { name: "Amoxicilina + Ác. clavulánico", brand: "Clavomox, Synulox", use: "Infecciones bacterianas generales" },
      { name: "Enrofloxacina", brand: "Baytril", use: "Infecciones respiratorias y urinarias" },
      { name: "Carprofeno", brand: "Rimadyl", use: "Antiinflamatorio y analgésico" },
      { name: "Meloxicam", brand: "Metacam", use: "Antiinflamatorio para dolor crónico" },
    ],
  },
  {
    id: "vitaminas",
    title: "Vitaminas y Suplementos",
    description: "Nutrición y recuperación",
    icon: <FaHeart size={24} color="#FF8C42" />,
    color: "#FF8C42",
    items: [
      { name: "Complejo B inyectable", brand: "Catosal, B12", use: "Recuperación y apetito" },
      { name: "Hierro", brand: "Iron Dextran", use: "Tratamiento de anemia" },
      { name: "Suplemento multivitamínico", brand: "Pet-Tabs, Nutricoat", use: "Fortaleza general y pelaje" },
      { name: "Calcio", brand: "Calcionato", use: "Post-parto y crecimiento" },
    ],
  },
  {
    id: "oftalmicas",
    title: "Soluciones Oftálmicas y Óticas",
    description: "Cuidado de ojos y oídos",
    icon: <FaEye size={24} color="#2DA14F" />,
    color: "#2DA14F",
    items: [
      { name: "Ungüento antibiótico oftálmico", brand: "Terramicina, Gentamicina", use: "Infecciones oculares" },
      { name: "Lágrimas artificiales", brand: "Optixcare, ReNu", use: "Ojo seco y lubricación" },
      { name: "Suspensión ótica", brand: "Otomax, Surolan", use: "Infecciones de oído" },
      { name: "Limpiador ótico", brand: "Epi-Otic", use: "Limpieza y prevención" },
    ],
  },
  {
    id: "antisepticos",
    title: "Antisépticos Tópicos",
    description: "Limpieza y desinfección de heridas",
    icon: <FaFlask size={24} color="#FF8C42" />,
    color: "#FF8C42",
    items: [
      { name: "Clorhexidina solución", brand: "Hibiscrub, Clorexyl", use: "Antiséptico de amplio espectro" },
      { name: "Povidona yodada", brand: "Isodine", use: "Desinfección pre-quirúrgica" },
      { name: "Mupirocina crema", brand: "Bactroban", use: "Infecciones bacterianas de piel" },
      { name: "Sulfadiazina de plata", brand: "Silvadene", use: "Quemaduras y heridas abiertas" },
    ],
  },
];

export const HYGIENE_PRODUCTS = [
  {
    id: "shampoos",
    title: "Shampoos Medicados",
    description: "Tratamiento dermatológico",
    icon: <FaDog size={24} color="#2DA14F" />,
    color: "#2DA14F",
    items: [
      { name: "Shampoo de clorhexidina", brand: "Derbys, Clorexyderm", use: "Dermatitis bacteriana y fúngica" },
      { name: "Shampoo de ketoconazol", brand: "Ketocare, Dermocanis", use: "Hongos y caspa" },
      { name: "Shampoo de peróxido de benzoílo", brand: "Pyohex, Benzoil", use: "Acné canino y dermatitis sebácea" },
      { name: "Shampoo de avena coloidal", brand: "Douxo, Epi-Soothe", use: "Piel sensible y alérgica" },
    ],
  },
  {
    id: "curacion",
    title: "Material de Curación",
    description: "Vendaje y protección de heridas",
    icon: <FaBandAid size={24} color="#FF8C42" />,
    color: "#FF8C42",
    items: [
      { name: "Gasas estériles", use: "Limpieza y cobertura de heridas" },
      { name: "Vendas elásticas", use: "Compresión y soporte" },
      { name: "Vendas de gasa", use: "Fijación de apósitos" },
      { name: "Apósitos adhesivos", brand: "Tegaderm, Opsite", use: "Protección de heridas limpias" },
      { name: "Micropore", brand: "3M", use: "Fijación de vendajes" },
      { name: "Venda cohesiva", brand: "Vetrap, Co-flex", use: "Vendaje sin adhesivo directo" },
    ],
  },
  {
    id: "insumos",
    title: "Insumos Veterinarios",
    description: "Material médico esencial",
    icon: <FaSyringe size={24} color="#2DA14F" />,
    color: "#2DA14F",
    items: [
      { name: "Jeringas desechables", brand: "1ml, 3ml, 5ml, 10ml, 20ml", use: "Administración de medicamentos" },
      { name: "Agujas hipodérmicas", brand: "Calibre 21G–25G", use: "Aplicación de inyectables" },
      { name: "Guantes de nitrilo/látex", brand: "Tallas S, M, L", use: "Protección durante procedimientos" },
      { name: "Suero fisiológico", brand: "500ml, 1000ml", use: "Hidratación y lavado de heridas" },
      { name: "Ringer Lactato", brand: "500ml, 1000ml", use: "Fluidoterapia intravenosa" },
      { name: "Alcohol al 70%", use: "Desinfección de superficies y piel" },
      { name: "Agua oxigenada", use: "Limpieza inicial de heridas" },
    ],
  },
];

export const DELIVERY_INFO = {
  whatsapp: "50230603492",
  message: "¡Hola! Quiero donar insumos veterinarios a Armonia Animal. ¿Cómo coordino la entrega?",
  addressNote: "Coordinamos la recogida o entrega por WhatsApp. Contáctanos para acordar el punto más cercano.",
  requirementNote: "Todos los productos deben estar en buen estado, dentro de su fecha de vigencia y con empaque original.",
};

export const WA_NUMBER = "50230603492";
export const WA_MESSAGE = "¡Hola! Quiero donar insumos veterinarios a Armonia Animal. ¿Cómo coordino la entrega?";
export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
