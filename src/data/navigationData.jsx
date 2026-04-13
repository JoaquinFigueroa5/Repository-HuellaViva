import {
  FaInstagram,
  FaFacebook,
  FaTiktok
} from "react-icons/fa";

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Guia emergencia", href: "/emergency" },
  { label: "Reportar animal", href: "/report" },
  { label: "Test de personalidad", href: "/test" },
  { label: "Carteles", href: "/poster" },
];

export const NAV_COLUMNS = [
  {
    title: "Conoce la causa",
    links: [
      { label: "Donar",       href: "#donaciones"   },
      { label: "Mitos vs Realidad", href: "#mitos"      },
      { label: "Guía de rescate",   href: "/emergency"       },
      { label: "Historias reales",  href: "#historias"  },
      { label: "Calculadora de huella",  href: "/calculator"  },
    ],
  },
  {
    title: "Cómo ayudar",
    links: [
      { label: "Adoptar",           href: "#adopciones" },
      { label: "Donar",             href: "#donaciones" },
      { label: "Ser voluntario",    href: "#voluntariado"},
      { label: "Hogar temporal",    href: "#temporal"   },
    ],
  },
  {
    title: "Organización",
    links: [
      { label: "Quiénes somos",     href: "#nosotros"   },
      { label: "Nuestro equipo",    href: "#equipo"     },
      { label: "Transparencia",     href: "#fondos"     },
      { label: "Contacto",          href: "#contacto"   },
    ],
  },
];

export const SOCIAL_LINKS = [
  { icon: FaInstagram, href: "#", label: "Instagram", color: "#E1306C", hoverBg: "rgba(225,48,108,0.15)" },
  { icon: FaFacebook, href: "#", label: "Facebook", color: "#1877F2", hoverBg: "rgba(24,119,242,0.15)" },
  { icon: FaTiktok, href: "#", label: "TikTok", color: "#D8F3DC", hoverBg: "rgba(216,243,220,0.10)" },
];
