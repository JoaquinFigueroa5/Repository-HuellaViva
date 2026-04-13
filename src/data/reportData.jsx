import {
  FaPaw,
  FaCheck,
  FaDove,
  FaDog,
  FaCat,
  FaVirus,
  FaQuestionCircle,
  FaHeartBroken,
  FaHome,
  FaHeart,
  FaNewspaper,
  FaHandHoldingMedical
} from "react-icons/fa";
import { GiStickingPlaster } from "react-icons/gi";
import { MdWbTwilight } from "react-icons/md";
import { IoWarning } from "react-icons/io5";
import { PiProhibitBold } from "react-icons/pi";

export const SPECIES_OPTIONS = [
  { value: "dog", label: "Perro", emoji: <FaDog className="text-[#D8F3DC]" /> },
  { value: "cat", label: "Gato", emoji: <FaCat className="text-[#D8F3DC]" /> },
  { value: "bird", label: "Ave", emoji: <FaDove className="text-[#D8F3DC]" /> },
  {
    value: "other",
    label: "Otro",
    emoji: <FaPaw className="text-[#D8F3DC]" />,
  },
];

export const CONDITION_OPTIONS = [
  {
    value: "healthy",
    label: "Aparentemente sano",
    emoji: <FaCheck className="text-[#D8F3DC]" />,
    color: "#2DA14F",
  },
  {
    value: "injured",
    label: "Herido o lastimado",
    emoji: <GiStickingPlaster className="text-[#D8F3DC]" />,
    color: "#FF8C42",
  },
  {
    value: "sick",
    label: "Parece enfermo",
    emoji: <FaVirus className="text-[#D8F3DC]" />,
    color: "#FF8C42",
  },
  {
    value: "critical",
    label: "Estado crítico",
    emoji: <MdWbTwilight className="text-[#D8F3DC]" />,
    color: "#FF4444",
  },
  {
    value: "unknown",
    label: "No lo pude evaluar",
    emoji: <FaQuestionCircle className="text-[#D8F3DC]" />,
    color: "#D8F3DC",
  },
];

export const SIZE_OPTIONS = [
  { value: "small", label: "Pequeño", sub: "< 10 kg" },
  { value: "medium", label: "Mediano", sub: "10–25 kg" },
  { value: "large", label: "Grande", sub: "> 25 kg" },
];

export const ABUSE_TYPES = [
  {
    value: "physical",
    label: "Maltrato físico",
    emoji: <FaHandHoldingMedical className="text-[#D8F3DC]" />,
    color: "#FF4444",
    desc: "Golpes, heridas, quemaduras, mutilaciones",
  },
  {
    value: "abandonment",
    label: "Abandono con riesgo",
    emoji: <PiProhibitBold className="text-[#D8F3DC]" />,
    color: "#FF8C42",
    desc: "Animal encadenado, encerrado o sin acceso a agua/comida",
  },
  {
    value: "neglect",
    label: "Negligencia grave",
    emoji: <FaHeartBroken className="text-[#D8F3DC]" />,
    color: "#FF8C42",
    desc: "Desnutrición severa, condiciones insalubres, sin atención médica",
  },
  {
    value: "hoarding",
    label: "Acumulación de animales",
    emoji: <FaHome className="text-[#D8F3DC]" />,
    color: "#FF8C42",
    desc: "Demasiados animales en condiciones precarias",
  },
  {
    value: "other",
    label: "Otro tipo de maltrato",
    emoji: <IoWarning className="text-[#D8F3DC]" />,
    color: "#D8F3DC",
    desc: "Situación no contemplada en las anteriores",
  },
];

export const URGENCY_LEVELS = [
  {
    value: "immediate",
    label: "Inmediata — vida en peligro",
    color: "#FF4444",
    emoji: <MdWbTwilight className="text-[#D8F3DC]" />,
  },
  {
    value: "urgent",
    label: "Urgente — requiere atención hoy",
    color: "#FF8C42",
    emoji: <IoWarning className="text-[#D8F3DC]" />,
  },
  {
    value: "moderate",
    label: "Moderada — situación estable",
    color: "#FFD166",
    emoji: <FaHeart className="text-[#D8F3DC]" />,
  },
  {
    value: "low",
    label: "Baja — es recurrente pero estable",
    color: "#2DA14F",
    emoji: <FaNewspaper className="text-[#D8F3DC]" />,
  },
];

export const WA_NUMBER = "50258694127";
