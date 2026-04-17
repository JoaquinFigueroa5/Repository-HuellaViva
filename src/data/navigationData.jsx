import {
  FaInstagram,
  FaFacebook,
  FaTiktok
} from "react-icons/fa";

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Guia emergencia", href: "/emergency" },
  { label: "Reportar animal", href: "/report" },
  { label: "Test de mascota", href: "/test" },
  { label: "Carteles", href: "/poster" },
];

export const NAV_COLUMNS = [
  {
    title: "Conoce la causa",
    links: [
      { label: "Mitos vs Realidad", href: "#mitos"      },
      { label: "Guía de rescate",   href: "/emergency"  },
      { label: "Historias reales",  href: "#historias"  },
      { label: "Calculadora de huella",  href: "/calculator"  },
    ],
  },
  {
    title: "Acciones rápidas",
    links: [
      { label: "Reportar animal",   href: "/report"     },
      { label: "Crear cartel",      href: "/poster"     },
      { label: "Test de mascota",   href: "/test"       },
      { label: "Donaciones",        href: "#donaciones" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Quiénes somos",     href: "#inicio"     },
      { label: "Nuestra labor",     href: "#donaciones" },
      { label: "Privacidad",        href: "/privacy"    },
      { label: "Condiciones",       href: "/terms"      },
    ],
  },
];

export const CONTACT_INFO = {
  phone: "+502 5869-4127",
  email: "info@huellaviva.gt",
  address: "Guatemala City, GT",
  whatsapp: "https://wa.me/50258694127",
};

export const SOCIAL_LINKS = [
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", color: "#E1306C", hoverBg: "rgba(225,48,108,0.15)" },
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook", color: "#1877F2", hoverBg: "rgba(24,119,242,0.15)" },
  { icon: FaTiktok, href: "https://tiktok.com", label: "TikTok", color: "#D8F3DC", hoverBg: "rgba(216,243,220,0.10)" },
];
