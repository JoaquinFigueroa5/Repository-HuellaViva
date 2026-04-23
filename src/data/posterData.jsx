import { FaDog, FaCat, FaPaw, FaHeart, FaExclamationTriangle } from "react-icons/fa";

export const POSTER_TYPES = [
  {
    id: "adoptame",
    label: "Adóptame",
    icon: <FaHeart size={16} />,
    accentColor: "#2DA14F",
    tagColor: "#2DA14F",
    tagBg: "rgba(45,161,79,0.18)",
    tagBorder: "rgba(45,161,79,0.35)",
    headerBg: "linear-gradient(135deg, #0d2b17 0%, #1a4a2a 100%)",
    badgeText: "EN ADOPCIÓN",
  },
  {
    id: "sebusca",
    label: "Se Busca",
    icon: <FaExclamationTriangle size={16} />,
    accentColor: "#FF8C42",
    tagColor: "#FF8C42",
    tagBg: "rgba(255,140,66,0.18)",
    tagBorder: "rgba(255,140,66,0.35)",
    headerBg: "linear-gradient(135deg, #2a1500 0%, #4a2400 100%)",
    badgeText: "¡SE BUSCA!",
  },
];

export const SPECIES_OPTIONS = [
  { value: "perro", label: "Perro", icon: <FaDog /> },
  { value: "gato", label: "Gato", icon: <FaCat /> },
  { value: "otro", label: "Otro", icon: <FaPaw /> },
];

export const SIZE_OPTIONS = ["Pequeño", "Mediano", "Grande"];
export const GENDER_OPTIONS = ["Macho", "Hembra", "Desconocido"];