import { useRef, memo } from "react";
import { NAV_COLUMNS, SOCIAL_LINKS, CONTACT_INFO } from "@/data/navigationData";
import { motion as m, useInView, LazyMotion, domMax, useReducedMotion } from "framer-motion";
import { FaPaw, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaHeart,
  FaWhatsapp,
  FaPaperPlane
} from "react-icons/fa";
import { scrollToHash } from "@/utils/scrollToHash";
import { useLocation, useNavigate } from "react-router-dom";

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 110, damping: 22, delay: i * 0.08 },
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
      className="w-9 h-9 rounded-xl flex items-center justify-center border no-underline will-change-transform transition-all duration-300"
      style={{
        borderColor: `${item.color}20`,
        backgroundColor: "rgba(255,255,255,0.02)",
        color: `${item.color}BB`,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = item.hoverBg; e.currentTarget.style.borderColor = `${item.color}50`; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = `${item.color}20`; }}
    >
      <Icon size={15} />
    </m.a>
  );
});

const NavColumn = memo(function NavColumn({ col, index, onNavigate }) {
  const ref    = useRef(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <m.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-col gap-5"
    >
      <p
        className="text-[0.65rem] font-bold tracking-[0.2em] uppercase"
        style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.35)" }}
      >
        {col.title}
      </p>
      <ul className="flex flex-col gap-3 list-none p-0 m-0">
        {col.links.map((link) => (
          <li key={link.label}>
            <m.a
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(link.href);
              }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="group flex items-center gap-2.5 no-underline cursor-pointer"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <div
                className="w-1 h-1 rounded-full transition-all duration-300"
                style={{ backgroundColor: "rgba(216,243,220,0.15)" }}
              />
              <span
                className="text-[0.82rem] transition-colors duration-300"
                style={{ color: "rgba(216,243,220,0.45)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#D8F3DC"; e.currentTarget.previousSibling.style.backgroundColor = "#2DA14F"; e.currentTarget.previousSibling.style.boxShadow = "0 0 8px #2DA14F"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(216,243,220,0.45)"; e.currentTarget.previousSibling.style.backgroundColor = "rgba(216,243,220,0.15)"; e.currentTarget.previousSibling.style.boxShadow = "none"; }}
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
  const location = useLocation();
  const navigate = useNavigate();
  const year     = new Date().getFullYear();

  const handleNavigation = (href) => {
    if (href.startsWith("#")) {
      const hashId = href.replace("#", "");
      if (location.pathname === "/") {
        scrollToHash(hashId);
      } else {
        navigate("/");
        setTimeout(() => scrollToHash(hashId), 800);
      }
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  return (
    <LazyMotion features={domMax} strict>
      <footer className="relative w-full bg-[#111315] pt-20 pb-10 overflow-hidden border-t border-white/3">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] blur-[120px] rounded-full" style={{ background: "radial-gradient(circle, rgba(45,161,79,0.1) 0%, transparent 70%)" }} />
          <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[50%] blur-[100px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,140,66,0.05) 0%, transparent 70%)" }} />
        </div>

        <div className="max-w-300 mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr] gap-x-12 gap-y-16">
            
            {/* Column 1: Brand */}
            <m.div
              custom={0} variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={VIEWPORT}
              className="flex flex-col gap-6"
            >
              <a 
                href="#inicio" 
                onClick={(e) => { e.preventDefault(); handleNavigation("#inicio"); }}
                className="group flex items-center gap-3.5 no-underline w-fit cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-360 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #2DA14F 0%, #1a7a35 100%)",
                    color: "#D8F3DC",
                    boxShadow: "0 8px 24px rgba(45,161,79,0.25)",
                  }}
                >
                  <FaPaw size={22} />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-[#D8F3DC] text-[1.25rem] font-bold tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    HuellaViva
                  </span>
                  <span
                    className="text-[0.6rem] font-bold tracking-[0.2em] uppercase mt-0.5"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "#2DA14F" }}
                  >
                    Por los que no tienen voz
                  </span>
                </div>
              </a>

              <p
                className="text-[0.85rem] leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.4)", maxWidth: 280 }}
              >
                Red de esperanza para los animales vulnerables en Guatemala. Transformamos vidas a través del rescate ético y la conciencia social.
              </p>

              <div className="mt-2">
                <p className="text-[0.6rem] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(216,243,220,0.3)" }}>Conecta con nosotros</p>
                <div className="flex gap-2.5">
                  {SOCIAL_LINKS.map((s) => <SocialBtn key={s.label} item={s} />)}
                </div>
              </div>
            </m.div>

            {/* Columns 2, 3, 4: Navigation */}
            {NAV_COLUMNS.map((col, i) => (
              <NavColumn key={col.title} col={col} index={i + 1} onNavigate={handleNavigation} />
            ))}

            {/* Column 5: Newsletter & Contact */}
            <m.div
              custom={4} variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={VIEWPORT}
              className="flex flex-col gap-8"
            >

                <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-white/3 flex items-center justify-center text-[#2DA14F] group-hover:bg-[#2DA14F]/10 transition-colors">
                    <FaEnvelope size={12} />
                  </div>
                  <span className="text-[0.8rem] transition-opacity cursor-pointer" style={{ color: "rgba(216,243,220,0.5)" }} onMouseEnter={(e) => e.currentTarget.style.color = "rgba(216,243,220,1)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(216,243,220,0.5)"}>
                    <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
                  </span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-white/3 flex items-center justify-center text-[#2DA14F] group-hover:bg-[#2DA14F]/10 transition-colors">
                    <FaPhone size={12} />
                  </div>
                  <span className="text-[0.8rem] transition-opacity cursor-pointer" style={{ color: "rgba(216,243,220,0.5)" }} onMouseEnter={(e) => e.currentTarget.style.color = "rgba(216,243,220,1)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(216,243,220,0.5)"}>
                    <a href={`tel:${CONTACT_INFO.phone}`}>{CONTACT_INFO.phone}</a>
                  </span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-white/3 flex items-center justify-center text-[#2DA14F] group-hover:bg-[#2DA14F]/10 transition-colors">
                    <FaMapMarkerAlt size={12} />
                  </div>
                  <span className="text-[0.8rem]" style={{ color: "rgba(216,243,220,0.5)" }}>{CONTACT_INFO.address}</span>
                </div>
              </div>

            </m.div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 border-t border-white/5">
          <div className="max-w-300 mx-auto px-6 md:px-12 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                <p
                  className="text-[0.7rem]"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.25)" }}
                >
                  © {year} HuellaViva Guatemala. Todos los derechos reservados.
                </p>
                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/5" />
                <div className="flex items-center gap-4">
                  <a href="/privacy" onClick={(e) => { e.preventDefault(); handleNavigation("/privacy"); }} className="text-[0.7rem] transition-opacity no-underline" style={{ color: "rgba(216,243,220,0.25)" }} onMouseEnter={(e) => e.currentTarget.style.color = "rgba(216,243,220,1)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(216,243,220,0.25)"}>Privacidad</a>
                  <a href="/terms" onClick={(e) => { e.preventDefault(); handleNavigation("/terms"); }} className="text-[0.7rem] transition-opacity no-underline" style={{ color: "rgba(216,243,220,0.25)" }} onMouseEnter={(e) => e.currentTarget.style.color = "rgba(216,243,220,1)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(216,243,220,0.25)"}>Términos</a>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/2 border border-white/5">
                <span className="text-[0.7rem]" style={{ color: "rgba(216,243,220,0.3)" }}>Hecho con</span>
                <m.span
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FaHeart size={10} className="text-[#FF8C42]" />
                </m.span>
                <span className="text-[0.7rem]" style={{ color: "rgba(216,243,220,0.3)" }}>por los animales de Guatemala</span>
              </div>

            </div>
          </div>
        </div>
      </footer>
    </LazyMotion>
  );
}