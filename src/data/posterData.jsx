import { FaDog, FaCat, FaPaw, FaHeart, FaExclamationTriangle } from "react-icons/fa";

export const POSTER_TYPES = [
  {
    id: "adoptame",
    label: "Adóptame",
    icon: <FaHeart size={16} />,
    accentColor: "#00B8CC",
    tagColor: "#00B8CC",
    tagBg: "rgba(0,184,204,0.18)",
    tagBorder: "rgba(0,184,204,0.35)",
    headerBg: "linear-gradient(135deg, #0A2629 0%, #143A3F 100%)",
    badgeText: "EN ADOPCIÓN",
  },
  {
    id: "sebusca",
    label: "Se Busca",
    icon: <FaExclamationTriangle size={16} />,
    accentColor: "#34D399",
    tagColor: "#34D399",
    tagBg: "rgba(52,211,153,0.18)",
    tagBorder: "rgba(52,211,153,0.35)",
    headerBg: "linear-gradient(135deg, #2A0A08 0%, #4A1210 100%)",
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