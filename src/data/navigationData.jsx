import {
  FaInstagram,
  FaFacebook,
  FaTiktok
} from "react-icons/fa";

export const NAV_LINKS = [
  { labelKey: "common.home", href: "/" },
  { labelKey: "common.emergencyGuide", href: "/emergency" },
  { labelKey: "common.reportAnimal", href: "/report" },
  { labelKey: "common.testPet", href: "/test" },
  { labelKey: "common.posters", href: "/poster" },
];

export const NAV_COLUMNS = [
  {
    titleKey: "common.knowCause",
    links: [
      { labelKey: "common.mythsVsReality", href: "#mitos"      },
      { labelKey: "common.rescueGuide",   href: "/emergency"  },
      { labelKey: "common.realStories",  href: "#historias"  },
      { labelKey: "common.footprintCalculator",  href: "/calculator"  },
    ],
  },
  {
    titleKey: "common.quickActions",
    links: [
      { labelKey: "common.reportAnimal",   href: "/report"     },
      { labelKey: "common.createPoster",   href: "/poster"     },
      { labelKey: "common.testPet",        href: "/test"       },
      { labelKey: "common.donations",      href: "#donaciones" },
    ],
  },
  {
    titleKey: "common.institutional",
    links: [
      { labelKey: "common.whoWeAre",       href: "#inicio"     },
      { labelKey: "common.ourWork",        href: "#donaciones" },
      { labelKey: "common.privacy",        href: "/privacy"    },
      { labelKey: "common.terms",          href: "/terms"      },
    ],
  },
];

export const CONTACT_INFO = {
  phone: "+502 5249-1439",
  email: "info@huellaviva.gt",
  address: "Guatemala City, GT",
  whatsapp: "https://wa.me/50252491439",
};

export const SOCIAL_LINKS = [
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", color: "#E1306C", hoverBg: "rgba(225,48,108,0.15)" },
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook", color: "#1877F2", hoverBg: "rgba(24,119,242,0.15)" },
  { icon: FaTiktok, href: "https://tiktok.com", label: "TikTok", color: "#D8F3DC", hoverBg: "rgba(216,243,220,0.10)" },
];
