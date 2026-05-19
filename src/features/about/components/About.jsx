import { useRef, memo } from "react";
import {
  FaArrowLeft,
  FaBroadcastTower,
  FaExternalLinkAlt,
  FaMicrophone,
  FaPaw,
  FaUserTie,
  FaCalendarAlt,
  FaTv,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  LazyMotion,
  domMax,
  m,
  useInView,
} from "framer-motion";

import { PROGRAM } from "@/data/aboutData";

// ─── Iconos ──────────────────────────────────────────────────────────────────

const SEGMENT_ICONS = {
  paw: <FaPaw size={22} />,
  "user-tie": <FaUserTie size={22} />,
  tv: <FaTv size={22} />,
  calendar: <FaCalendarAlt size={22} />,
};

const FORMAT_ICONS = {
  Entrevistas: <FaMicrophone size={16} />,
  Reportajes: <FaPaw size={16} />,
  Historias: <FaBroadcastTower size={16} />,
};

// ─── Variantes de animación ───────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 110, damping: 22, delay: i * 0.09 },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.06 },
  }),
};

const VIEWPORT = { once: true, margin: "-40px" };
const VIEWPORT_80 = { once: true, margin: "-80px" };

// ─── SectionHeader ───────────────────────────────────────────────────────────

function SectionHeader({ number, title, accent = "var(--color-hv-primary)" }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
        style={{
          backgroundColor: `${accent}20`,
          border: `1px solid ${accent}45`,
          color: accent,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {number}
      </div>
      <h2
        className="font-semibold text-base"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "var(--color-hv-text-primary)",
        }}
      >
        {title}
      </h2>
      {/* Línea decorativa */}
      <div
        className="flex-1 h-px"
        style={{ background: `linear-gradient(90deg, ${accent}30, transparent)` }}
      />
    </div>
  );
}

// ─── SegmentCard ─────────────────────────────────────────────────────────────

const SegmentCard = memo(function SegmentCard({ segment, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <m.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,184,204,0.12)" }}
      className="relative rounded-2xl overflow-hidden will-change-transform cursor-default"
      style={{
        border: "1px solid rgba(232,251,253,0.08)",
        backgroundColor: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(12px)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Línea superior de color */}
      <div
        className="h-0.5 w-full"
        style={{ background: "linear-gradient(90deg, var(--color-hv-accent-emerald), transparent)" }}
      />

      <div className="p-5">
        {/* Ícono + número */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: "var(--color-hv-accent-emerald)15",
              border: "1px solid var(--color-hv-accent-emerald)30",
              color: "var(--color-hv-accent-emerald)",
            }}
          >
            {SEGMENT_ICONS[segment.iconId]}
          </div>
          <span
            className="text-[2rem] font-bold leading-none select-none"
            style={{
              fontFamily: "'Fraunces', serif",
              color: "rgba(232,251,253,0.04)",
              lineHeight: 1,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          className="font-bold text-sm leading-snug mb-2.5"
          style={{
            fontFamily: "'Fraunces', serif",
            color: "var(--color-hv-text-primary)",
          }}
        >
          {segment.title}
        </h3>
        <p
          className="text-[0.72rem] leading-relaxed"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(232,251,253,0.45)",
          }}
        >
          {segment.description}
        </p>
      </div>
    </m.div>
  );
});

// ─── ScheduleCard ─────────────────────────────────────────────────────────────

const ScheduleCard = memo(function ScheduleCard({ data, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);
  const isRadio = data.title.includes("Sónica");

  return (
    <m.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative rounded-2xl overflow-hidden will-change-transform"
      style={{
        border: `1px solid ${data.color}22`,
        backgroundColor: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Fondo decorativo interior */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: 200,
          height: 200,
          background: `radial-gradient(circle at 100% 0%, ${data.color}12 0%, transparent 70%)`,
        }}
      />

      <div className="relative p-6 flex flex-col gap-5">
        {/* Top row */}
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: `${data.color}15`,
              border: `1px solid ${data.color}30`,
              color: data.color,
            }}
          >
            <FaBroadcastTower size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <h3
              className="font-bold text-lg leading-tight mb-0.5"
              style={{
                fontFamily: "'Fraunces', serif",
                color: "var(--color-hv-text-primary)",
              }}
            >
              {data.title}
            </h3>
            {data.detail && (
              <p
                className="text-[0.7rem]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(232,251,253,0.35)",
                }}
              >
                {data.detail}
              </p>
            )}
          </div>
        </div>

        {/* Horario destacado */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{
            backgroundColor: `${data.color}10`,
            border: `1px solid ${data.color}22`,
          }}
        >
          <FaCalendarAlt size={13} color={data.color} />
          <span
            className="text-sm font-bold"
            style={{ fontFamily: "'DM Sans', sans-serif", color: data.color }}
          >
            {data.time}
          </span>
        </div>

        {/* CTA */}
        <m.a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2, boxShadow: `0 8px 28px ${data.color}35` }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl no-underline font-semibold text-sm border-0 will-change-transform"
          style={{
            backgroundColor: `${data.color}18`,
            color: data.color,
            border: `1px solid ${data.color}40`,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {isRadio ? "Escuchar en vivo" : "Ver en vivo"}
          <FaExternalLinkAlt size={10} />
        </m.a>
      </div>
    </m.div>
  );
});

// ─── FormatTag ────────────────────────────────────────────────────────────────

const FormatTag = memo(function FormatTag({ label }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl"
      style={{
        backgroundColor: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(232,251,253,0.08)",
        color: "rgba(232,251,253,0.55)",
      }}
    >
      <span style={{ color: "var(--color-hv-primary)" }}>
        {FORMAT_ICONS[label]}
      </span>
      <span
        className="text-[0.72rem] font-medium"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
});

// ─── StatPill ─────────────────────────────────────────────────────────────────

function StatPill({ value, label, color = "var(--color-hv-primary)" }) {
  return (
    <div
      className="flex flex-col items-center gap-0.5 px-5 py-3 rounded-xl"
      style={{ backgroundColor: `${color}08`, border: `1px solid ${color}18` }}
    >
      <span
        className="font-bold text-xl leading-none"
        style={{ fontFamily: "'Fraunces', serif", color }}
      >
        {value}
      </span>
      <span
        className="text-[0.6rem] uppercase tracking-widest text-center"
        style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(232,251,253,0.35)" }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── AboutSection principal ───────────────────────────────────────────────────

export default function AboutSection() {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, VIEWPORT_80);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });

  return (
    <LazyMotion features={domMax} strict>
      <section
        ref={sectionRef}
        className="relative w-full bg-[var(--color-hv-base)] px-4 md:px-8 overflow-hidden"
        style={{ paddingBottom: "6rem" }}
      >
        {/* ── Orbes de fondo ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute rounded-full blur-[160px] opacity-[0.07]"
            style={{ width: 700, height: 500, background: "var(--color-hv-primary)", top: "5%", left: "-15%" }}
          />
          <div
            className="absolute rounded-full blur-[120px] opacity-[0.05]"
            style={{ width: 500, height: 500, background: "var(--color-hv-accent-emerald)", bottom: "10%", right: "-8%" }}
          />
          {/* Grid sutil */}
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage: "linear-gradient(rgba(232,251,253,1) 1px, transparent 1px), linear-gradient(90deg, rgba(232,251,253,1) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto mt-10">

          {/* ══════════════════════════════════════════
              HERO — Identidad del programa
          ══════════════════════════════════════════ */}
          <div ref={heroRef} className="py-14 pb-16">

            {/* Eyebrow */}
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                backgroundColor: "var(--color-hv-primary)12",
                border: "1px solid var(--color-hv-primary)30",
              }}
            >
              <FaBroadcastTower size={10} style={{ color: "var(--color-hv-primary)" }} />
              <span
                className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--color-hv-primary)" }}
              >
                Radio y TV
              </span>
            </m.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-start">

              {/* Título + descripción */}
              <div>
                <m.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.06, type: "spring", stiffness: 90, damping: 20 }}
                  className="leading-[1.05] tracking-[-0.03em] mb-5"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "clamp(2.4rem, 6vw, 4rem)",
                    fontWeight: 700,
                    color: "var(--color-hv-text-primary)",
                  }}
                >
                  {PROGRAM.title}
                </m.h1>

                <m.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.12, type: "spring", stiffness: 90, damping: 20 }}
                  className="max-w-xl leading-relaxed mb-8"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
                    color: "rgba(232,251,253,0.50)",
                  }}
                >
                  {PROGRAM.tagline}
                </m.p>

                {/* Host info */}
                <m.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.18, type: "spring", stiffness: 90, damping: 20 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <div
                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(232,251,253,0.07)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: "var(--color-hv-primary)15",
                        border: "1px solid var(--color-hv-primary)30",
                        color: "var(--color-hv-primary)",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <p
                        className="text-[0.62rem] font-semibold uppercase tracking-wider"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(232,251,253,0.30)" }}
                      >
                        {PROGRAM.hostRole}
                      </p>
                      <p
                        className="text-sm font-semibold me-5"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--color-hv-text-primary)" }}
                      >
                        {PROGRAM.host}
                      </p>
                    </div>
                  </div>

                  {/* Formatos */}
                  <div className="flex flex-wrap gap-2">
                    {PROGRAM.format.map((label) => (
                      <FormatTag key={label} label={label} />
                    ))}
                  </div>
                </m.div>
              </div>

              {/* Columna derecha: ícono grande + descripción */}
              <m.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.15, type: "spring", stiffness: 100, damping: 22 }}
                className="hidden lg:flex flex-col items-center gap-5 shrink-0"
                style={{ width: 240 }}
              >
                <div
                  className="w-40 h-40 rounded-3xl flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, var(--color-hv-primary)18 0%, var(--color-hv-accent-emerald)10 100%)",
                    border: "1px solid var(--color-hv-primary)28",
                  }}
                >
                  {/* Anillo pulsante decorativo */}
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{ border: "1px solid var(--color-hv-primary)15" }}
                  />
                  <FaBroadcastTower size={52} style={{ color: "var(--color-hv-primary)", opacity: 0.85 }} />
                </div>

                {/* Stats rápidos */}
                <div className="grid grid-cols-2 gap-2 w-full">
                  <StatPill value={PROGRAM.segments?.length || 4} label="Segmentos" />
                  <StatPill value="2" label="Canales" color="var(--color-hv-accent-emerald)" />
                </div>
              </m.div>

            </div>
          </div>

          {/* ── Divider decorativo ── */}
          <div
            className="w-full h-px mb-16"
            style={{ background: "linear-gradient(90deg, transparent, rgba(232,251,253,0.08) 30%, rgba(232,251,253,0.08) 70%, transparent)" }}
          />

          {/* ══════════════════════════════════════════
              SECCIÓN 1 — Sobre el programa
          ══════════════════════════════════════════ */}
          <m.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="mb-20"
          >
            <SectionHeader number="1" title="Sobre el programa" />

            <div
              className="rounded-3xl overflow-hidden"
              style={{
                border: "1px solid rgba(232,251,253,0.07)",
                backgroundColor: "rgba(255,255,255,0.018)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_260px]">

                {/* Texto */}
                <div className="p-7 md:p-8 flex flex-col justify-between gap-6">
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "rgba(232,251,253,0.50)",
                      fontSize: "0.92rem",
                    }}
                  >
                    {PROGRAM.description}
                  </p>
                </div>

                {/* Panel derecho: imagen/placeholder del host */}
                <div
                  className="flex flex-col items-center justify-center gap-4 p-6 md:border-l"
                  style={{
                    background: "linear-gradient(135deg, var(--color-hv-primary)08 0%, var(--color-hv-accent-emerald)06 100%)",
                    borderColor: "rgba(232,251,253,0.06)",
                  }}
                >
                  {/* Avatar placeholder */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, var(--color-hv-primary)20 0%, var(--color-hv-accent-emerald)12 100%)",
                      border: "1px solid var(--color-hv-primary)25",
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-hv-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p
                      className="text-[0.65rem] font-semibold uppercase tracking-widest mb-1"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(232,251,253,0.30)" }}
                    >
                      {PROGRAM.hostRole}
                    </p>
                    <p
                      className="text-sm font-bold"
                      style={{ fontFamily: "'Fraunces', serif", color: "var(--color-hv-text-primary)" }}
                    >
                      {PROGRAM.host}
                    </p>
                  </div>
                  {/* Divisor */}
                  <div className="w-12 h-px" style={{ backgroundColor: "rgba(232,251,253,0.08)" }} />
                  <div className="flex flex-wrap justify-center gap-2">
                    {PROGRAM.format.map((label) => (
                      <span
                        key={label}
                        className="text-[0.6rem] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-lg"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: "var(--color-hv-primary)",
                          backgroundColor: "var(--color-hv-primary)12",
                          border: "1px solid var(--color-hv-primary)22",
                        }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </m.div>

          {/* ══════════════════════════════════════════
              SECCIÓN 2 — Segmentos
          ══════════════════════════════════════════ */}
          <m.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="mb-20"
          >
            <SectionHeader
              number="2"
              title="Nuestros segmentos"
              accent="var(--color-hv-accent-emerald)"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PROGRAM.segments.map((seg, i) => (
                <SegmentCard key={seg.id} segment={seg} index={i} />
              ))}
            </div>
          </m.div>

          {/* ══════════════════════════════════════════
              SECCIÓN 3 — Horarios / Dónde vernos
          ══════════════════════════════════════════ */}
          <m.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
          >
            <SectionHeader number="3" title="Dónde vernos" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ScheduleCard data={PROGRAM.schedule.radio} index={0} />
              <ScheduleCard data={PROGRAM.schedule.tv} index={1} />
            </div>
          </m.div>

        </div>
      </section>
    </LazyMotion>
  );
}