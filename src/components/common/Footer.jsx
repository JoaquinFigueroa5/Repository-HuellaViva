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
      { label: "El problema",       href: "#problema"   },
      { label: "Mitos vs Realidad", href: "#mitos"      },
      { label: "Guía de rescate",   href: "#guia"       },
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
  { icon: FaWhatsapp,  href: "https://wa.me/50212345678", label: "WhatsApp", color: "#25D366", hoverBg: "rgba(37,211,102,0.15)"  },
  { icon: FaInstagram, href: "#",                         label: "Instagram",color: "#E1306C", hoverBg: "rgba(225,48,108,0.15)"  },
  { icon: FaFacebook,  href: "#",                         label: "Facebook", color: "#1877F2", hoverBg: "rgba(24,119,242,0.15)"  },
  { icon: FaTiktok,    href: "#",                         label: "TikTok",   color: "#D8F3DC", hoverBg: "rgba(216,243,220,0.10)" },
];

const STATS = [
  { value: "1,200+", label: "animales rescatados" },
  { value: "94%",    label: "transparencia de fondos" },
  { value: "5 años", label: "salvando vidas en GT" },
];

// Patas decorativas para la franja superior
const DECO_PAWS = [
  { x: "4%",  top: "18%", size: 18, rotate: -20, opacity: 0.06 },
  { x: "12%", top: "72%", size: 11, rotate: 15,  opacity: 0.04 },
  { x: "88%", top: "15%", size: 14, rotate: 10,  opacity: 0.05 },
  { x: "94%", top: "68%", size: 20, rotate: -15, opacity: 0.06 },
  { x: "50%", top: "8%",  size: 10, rotate: 5,   opacity: 0.04 },
];

// ─────────────────────────────────────────────────────────────────────────────
// VARIANTES
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 110, damping: 22, delay: i * 0.09 },
  }),
};

const VIEWPORT = { once: true, margin: "-50px" };

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTES
// ─────────────────────────────────────────────────────────────────────────────

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
                className="w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-200"
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

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  const prefersReduced = useReducedMotion();
  const ctaRef         = useRef(null);
  const ctaInView      = useInView(ctaRef, VIEWPORT);

  const year = new Date().getFullYear();

  return (
    <LazyMotion features={domMax} strict>
      <footer className="relative w-full bg-[#1a1d20] overflow-hidden">

        {/* ══════════════════════════════════════════════════════
            BLOQUE 1 — CTA hero con fondo texturizado
        ═══════════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden">

          {/* Mesh gradient background */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute rounded-full blur-[160px]"
              style={{ width: 700, height: 700, background: "#2DA14F", opacity: 0.09, top: "-30%", left: "-10%" }}
            />
            <div
              className="absolute rounded-full blur-[120px]"
              style={{ width: 400, height: 400, background: "#FF8C42", opacity: 0.07, bottom: "-20%", right: "5%" }}
            />
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: "linear-gradient(rgba(216,243,220,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(216,243,220,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Decorative paw prints */}
          {!prefersReduced && DECO_PAWS.map((p, i) => (
            <m.div
              key={i}
              className="absolute pointer-events-none"
              style={{ left: p.x, top: p.top, rotate: `${p.rotate}deg`, opacity: p.opacity }}
              animate={{ y: [0, -8, 0], opacity: [p.opacity, p.opacity * 1.8, p.opacity] }}
              transition={{ duration: 5 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
            >
              <FaPaw size={p.size} color="#D8F3DC" />
            </m.div>
          ))}

          <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 py-20 md:py-28">
            <div
              ref={ctaRef}
              className="flex flex-col lg:flex-row items-center justify-between gap-10"
            >

              {/* Left: headline */}
              <m.div
                custom={0} variants={fadeUp}
                initial="hidden"
                animate={ctaInView ? "visible" : "hidden"}
                className="flex-1 max-w-2xl"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-[6px] rounded-full bg-[#2DA14F]/[0.12] border border-[#2DA14F]/30">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#2DA14F] pulse-dot" />
                  <FaPaw size={10} color="#2DA14F" />
                  <span
                    className="text-[#2DA14F] text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Únete al movimiento
                  </span>
                </div>

                <h2
                  className="text-[#D8F3DC] leading-[1.07] tracking-[-0.03em] mb-5"
                  style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2.2rem, 5.5vw, 4rem)", fontWeight: 700 }}
                >
                  Juntos podemos{" "}
                  <em className="not-italic text-[#FF8C42]">acabar</em>
                  <br />
                  con el abandono
                </h2>

                <p
                  className="text-[#D8F3DC]/50 leading-relaxed max-w-md"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)" }}
                >
                  Cada decisión que tomas hoy — adoptar, donar, compartir — se convierte en el refugio de un animal mañana.
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-6 mt-8">
                  {STATS.map((s, i) => (
                    <m.div
                      key={s.label}
                      custom={i + 1}
                      variants={fadeUp}
                      initial="hidden"
                      animate={ctaInView ? "visible" : "hidden"}
                      className="flex flex-col"
                    >
                      <span
                        className="font-bold leading-none"
                        style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: i === 0 ? "#FF8C42" : i === 1 ? "#2DA14F" : "#D8F3DC" }}
                      >
                        {s.value}
                      </span>
                      <span
                        className="text-[#D8F3DC]/35 text-[0.7rem] mt-0.5"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {s.label}
                      </span>
                    </m.div>
                  ))}
                </div>
              </m.div>

              {/* Right: action card */}
              <m.div
                custom={1} variants={fadeUp}
                initial="hidden"
                animate={ctaInView ? "visible" : "hidden"}
                className="flex-shrink-0 w-full lg:w-auto lg:min-w-[300px]"
              >
                <div
                  className="p-6 rounded-3xl flex flex-col gap-4"
                  style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(216,243,220,0.10)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)",
                  }}
                >
                  <p
                    className="text-[#D8F3DC]/40 text-[0.68rem] font-semibold tracking-[0.15em] uppercase"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    ¿Por dónde empiezo?
                  </p>

                  {[
                    { label: "Adoptar un animal",   sub: "Dale un hogar para siempre",      accent: "#2DA14F", emoji: "🏠", href: "#adopciones" },
                    { label: "Hacer una donación",  sub: "Cada quetzal salva una vida",     accent: "#FF8C42", emoji: "❤️", href: "#donaciones" },
                    { label: "Ser voluntario",      sub: "Tu tiempo vale más de lo que crees", accent: "#D8F3DC", emoji: "🤝", href: "#voluntariado" },
                  ].map((action) => (
                    <m.a
                      key={action.label}
                      href={action.href}
                      whileHover={{ x: 4, backgroundColor: `${action.accent}12` }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      className="group flex items-center gap-3 p-3.5 rounded-2xl border no-underline will-change-transform transition-all duration-200"
                      style={{ borderColor: `${action.accent}22`, backgroundColor: `${action.accent}08` }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                        style={{ backgroundColor: `${action.accent}18`, border: `1px solid ${action.accent}30` }}
                      >
                        {action.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-semibold text-[#D8F3DC]/85 leading-none mb-0.5"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {action.label}
                        </p>
                        <p
                          className="text-[0.65rem] truncate"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: `${action.accent}80` }}
                        >
                          {action.sub}
                        </p>
                      </div>
                      <m.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                        style={{ color: `${action.accent}55` }}
                      >
                        <FaArrowRight size={12} />
                      </m.div>
                    </m.a>
                  ))}
                </div>
              </m.div>

            </div>
          </div>
        </div>

        {/* Separador con degradado */}
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(216,243,220,0.10) 30%, rgba(45,161,79,0.25) 50%, rgba(216,243,220,0.10) 70%, transparent)" }}
        />

        {/* ══════════════════════════════════════════════════════
            BLOQUE 2 — Cuerpo informativo del footer
        ═══════════════════════════════════════════════════════ */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">

            {/* Brand column */}
            <m.div
              custom={0} variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="flex flex-col gap-5"
            >
              {/* Logo */}
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
                    className="text-[0.58rem] font-semibold tracking-[0.14em] uppercase mt-[3px]"
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
                Organización guatemalteca dedicada al rescate, rehabilitación y adopción responsable de animales en situación de calle desde 2019.
              </p>

              {/* Social */}
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

              {/* WhatsApp pill */}
              <m.a
                href="https://wa.me/50212345678"
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
                <span className="w-[5px] h-[5px] rounded-full bg-[#25D366] pulse-dot" />
              </m.a>
            </m.div>

            {/* Nav columns */}
            {NAV_COLUMNS.map((col, i) => (
              <NavColumn key={col.title} col={col} index={i + 1} />
            ))}

          </div>
        </div>

        {/* Separador inferior */}
        <div
          className="h-px mx-4 md:mx-8"
          style={{ background: "linear-gradient(90deg, transparent, rgba(216,243,220,0.07) 20%, rgba(216,243,220,0.07) 80%, transparent)" }}
        />

        {/* ══════════════════════════════════════════════════════
            BLOQUE 3 — Barra de cierre
        ═══════════════════════════════════════════════════════ */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

            {/* Copyright */}
            <p
              className="text-[0.68rem] text-center sm:text-left"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.22)" }}
            >
              © {year} HuellaViva Guatemala · Todos los derechos reservados
            </p>

            {/* Made with love */}
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
                por los animales de Guatemala
              </span>
            </div>

            {/* Legal links */}
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