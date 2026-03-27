import { useRef, memo } from "react";
import {
  FaPaw,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";
import {
  LazyMotion,
  domMax,
  m,
  useInView,
  useReducedMotion,
} from "framer-motion";

const NAV_COLUMNS = [
  {
    title: "Conoce la causa",
    links: [
      { label: "Donar",       href: "#donaciones"   },
      { label: "Mitos vs Realidad", href: "#mitos"      },
      { label: "Guía de rescate",   href: "/emergency"       },
      { label: "Historias reales",  href: "#historias"  },
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

const SOCIAL_LINKS = [
  { icon: FaInstagram, href: "#", label: "Instagram", color: "#E1306C", hoverBg: "rgba(225,48,108,0.15)" },
  { icon: FaFacebook, href: "#", label: "Facebook", color: "#1877F2", hoverBg: "rgba(24,119,242,0.15)" },
  { icon: FaTiktok, href: "#", label: "TikTok", color: "#D8F3DC", hoverBg: "rgba(216,243,220,0.10)" },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 110, damping: 22, delay: i * 0.09 },
  }),
};

const VIEWPORT = { once: true, margin: "-50px" };

const SocialBtn = memo(function SocialBtn({ item }) {
  const Icon = item.icon;
  return (
    <m.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.label}
      whileHover={{ y: -3, scale: 1.08, boxShadow: `0 8px 22px ${item.color}35` }}
      whileTap={{ scale: 0.93 }}
      className="w-10 h-10 rounded-xl flex items-center justify-center border no-underline will-change-transform transition-colors duration-200"
      style={{
        borderColor: `${item.color}28`,
        backgroundColor: "rgba(255,255,255,0.04)",
        color: `${item.color}CC`,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = item.hoverBg; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)"; }}
    >
      <Icon size={16} />
    </m.a>
  );
});

const NavColumn = memo(function NavColumn({ col, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <m.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <p
        className="text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-4"
        style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.30)" }}
      >
        {col.title}
      </p>
      <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
        {col.links.map((link) => (
          <li key={link.label}>
            <m.a
              href={link.href}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="group flex items-center gap-2 no-underline will-change-transform"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span
                className="w-1 h-1 rounded-full shrink-0 transition-colors duration-200"
                style={{ backgroundColor: "rgba(216,243,220,0.20)" }}
              />
              <span
                className="text-sm transition-colors duration-200"
                style={{ color: "rgba(216,243,220,0.50)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#D8F3DC"; e.currentTarget.previousSibling.style.backgroundColor = "#2DA14F"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(216,243,220,0.50)"; e.currentTarget.previousSibling.style.backgroundColor = "rgba(216,243,220,0.20)"; }}
              >
                {link.label}
              </span>
            </m.a>
          </li>
        ))}
      </ul>
    </m.div>
  );
});

export default function Footer() {
  const prefersReduced = useReducedMotion();
  const ctaRef         = useRef(null);
  const ctaInView      = useInView(ctaRef, VIEWPORT);

  const year = new Date().getFullYear();

  return (
    <LazyMotion features={domMax} strict>
      <footer className="relative w-full bg-[#1a1d20] overflow-hidden">
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(216,243,220,0.10) 30%, rgba(45,161,79,0.25) 50%, rgba(216,243,220,0.10) 70%, transparent)" }}
        />
        <div className="max-w-300 mx-auto px-4 md:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
            <m.div
              custom={0} variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="flex flex-col gap-5"
            >
              <a href="#inicio" className="group inline-flex items-center gap-3 no-underline w-fit">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110"
                  style={{
                    backgroundColor: "#2DA14F",
                    color: "#D8F3DC",
                    boxShadow: "0 2px 16px rgba(45,161,79,0.40)",
                  }}
                >
                  <FaPaw size={18} />
                </div>
                <div className="flex flex-col leading-none">
                  <span
                    className="text-[#D8F3DC] text-[1.1rem] font-bold tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    HuellaViva
                  </span>
                  <span
                    className="text-[0.58rem] font-semibold tracking-[0.14em] uppercase mt-0.75"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "#2DA14F" }}
                  >
                    Por los que no tienen voz
                  </span>
                </div>
              </a>

              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.40)", maxWidth: 260 }}
              >
                Organización guatemalteca dedicada al rescate, rehabilitación y adopción responsable de animales en situación de calle desde -.
              </p>

              <div>
                <p
                  className="text-[0.6rem] font-semibold tracking-widest uppercase mb-3"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.25)" }}
                >
                  Síguenos
                </p>
                <div className="flex gap-2">
                  {SOCIAL_LINKS.map((s) => (
                    <SocialBtn key={s.label} item={s} />
                  ))}
                </div>
              </div>

              <m.a
                href="https://wa.me/50258694127"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(37,211,102,0.30)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl no-underline will-change-transform w-fit"
                style={{
                  backgroundColor: "rgba(37,211,102,0.10)",
                  border: "1px solid rgba(37,211,102,0.28)",
                  color: "#25D366",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}
              >
                <FaWhatsapp size={14} />
                Escríbenos ahora
                <span className="w-1.25 h-1.25 rounded-full bg-[#25D366] pulse-dot" />
              </m.a>
            </m.div>

            {NAV_COLUMNS.map((col, i) => (
              <NavColumn key={col.title} col={col} index={i + 1} />
            ))}

          </div>
        </div>

        <div
          className="h-px mx-4 md:mx-8"
          style={{ background: "linear-gradient(90deg, transparent, rgba(216,243,220,0.07) 20%, rgba(216,243,220,0.07) 80%, transparent)" }}
        />
        <div className="max-w-300 mx-auto px-4 md:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p
              className="text-[0.68rem] text-center sm:text-left"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.22)" }}
            >
              © {year} HuellaViva Guatemala · Todos los derechos reservados
            </p>

            <div className="flex items-center gap-1.5">
              <span
                className="text-[0.68rem]"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.22)" }}
              >
                Hecho con
              </span>
              <m.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaHeart size={10} color="#FF8C42" />
              </m.span>
              <span
                className="text-[0.68rem]"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.22)" }}
              >
                para los animales de Guatemala
              </span>
            </div>

            <div className="flex items-center gap-4">
              {["Privacidad", "Términos"].map((label) => (
                <m.a
                  key={label}
                  href="#"
                  whileHover={{ color: "#D8F3DC" }}
                  className="no-underline transition-colors duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.68rem",
                    color: "rgba(216,243,220,0.22)",
                  }}
                >
                  {label}
                </m.a>
              ))}
            </div>

          </div>
        </div>

      </footer>
    </LazyMotion>
  );
}