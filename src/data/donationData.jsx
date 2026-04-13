import {
  FaDog,
  FaSyringe,
  FaStethoscope,
  FaHeartbeat,
  FaHome,
  FaBullhorn
} from "react-icons/fa";
import { LuHandPlatter } from "react-icons/lu";

export const IMPACT_AMOUNTS = [
  {
    value: "Q 50",
    impact: "Alimenta a un rescatado por 1 semana",
    emoji: <FaDog size={32} color="#2DA14F" />,
    color: "#2DA14F",
  },
  {
    value: "Q 150",
    impact: "Cubre vacunas esenciales",
    emoji: <FaSyringe size={32} color="#FF8C42" />,
    color: "#FF8C42",
    popular: true,
  },
  {
    value: "Q 300",
    impact: "Paga una consulta veterinaria",
    emoji: <FaStethoscope size={32} color="#2DA14F" />,
    color: "#2DA14F",
  },
  {
    value: "Lo que desees",
    impact: "Cualquier cantidad es bienvenida y agradecida",
    emoji: <FaHeartbeat size={32} color="#FF8C42" />,
    color: "#FF8C42",
  },
];

export const BANK_ACCOUNTS = [
  {
    id: "banrural",
    bank: "Banrural",
    logo: <img src="/banrural.png" alt="Logo banrural" style={{ width: "100px", borderRadius: "15px" }} />,
    accountType: "Monetaria",
    accountNumber: "3-000-12345-6",
    accountHolder: "Asociación HuellaViva",
    currency: "Quetzales (GTQ)",
    color: "#2DA14F",
  },
  {
    id: "industrial",
    bank: "Banco Industrial",
    logo: <img src="/BI.png" alt="Logo banco industrial" style={{ width: "100px", borderRadius: "15px" }} />,
    accountType: "Ahorro",
    accountNumber: "214-000987-6",
    accountHolder: "Asociación HuellaViva",
    currency: "Quetzales (GTQ)",
    color: "#FF8C42",
  },
  {
    id: "gt",
    bank: "Banco G&T Continental",
    logo: <img src="/gyt.png" alt="Logo G&T Continental" style={{ width: "100px", borderRadius: "15px" }} />,
    accountType: "Monetaria",
    accountNumber: "0-21000-44512-3",
    accountHolder: "Asociación HuellaViva",
    currency: "Dólares (USD)",
    color: "#D8F3DC",
  },
];

export const IMPACT_STATS = [
  { value: "Q248K", label: "donados este año", accent: "#2DA14F" },
  { value: "1,200+", label: "animales rescatados", accent: "#FF8C42" },
  { value: "94%", label: "va directo al rescate", accent: "#D8F3DC" },
];

export const DONORS = [
  { initials: "MR", color: "#2DA14F" },
  { initials: "AL", color: "#FF8C42" },
  { initials: "CF", color: "#D8F3DC" },
  { initials: "JP", color: "#2DA14F" },
  { initials: "SK", color: "#FF8C42" },
];

export const FUND_BREAKDOWN = [
  { label: "Alimentación y agua", pct: 38, color: "#2DA14F", icon: <LuHandPlatter size={16} color="#2DA14F" /> },
  { label: "Medicina y cirugías", pct: 33, color: "#FF8C42", icon: <FaSyringe size={16} color="#FF8C42" /> },
  { label: "Refugio y transporte", pct: 20, color: "#D8F3DC", icon: <FaHome size={16} color="#D8F3DC" /> },
  { label: "Admin & comunicación", pct: 9, color: "#D8F3DC55", icon: <FaBullhorn size={16} color="#D8F3DC55" /> },
];

export const WA_NUMBER = "50258694127";
export const WA_MESSAGE = "¡Hola! Me gustaría hacer una donación a HuellaViva. ¿Me pueden orientar sobre el proceso? 🐾";
export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
