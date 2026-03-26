/**
 * MythsVsReality.jsx
 * Sección interactiva "Mitos vs Realidad" sobre el abandono animal.
 *
 * Mecánica: tarjetas con flip 3D — el mito se muestra al frente (rojo/naranja),
 * al hacer clic revela la realidad (verde). Filtros por categoría, contador de
 * mitos "derribados" y progress bar de revelación.
 *
 * Optimizaciones:
 *  - Variantes y datos fuera del componente
 *  - React.memo en MythCard
 *  - useCallback en handlers
 *  - Animaciones solo en transform + opacity
 *  - useReducedMotion
 */

import { useState, useCallback, useRef, memo } from "react";
import { FaPaw } from "react-icons/fa";
import {
  LazyMotion,
  domMax,
  m,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// DATOS
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all", label: "Todos", emoji: "🐾" },
  { id: "adopcion", label: "Adopción", emoji: "🏠" },
  { id: "salud", label: "Salud", emoji: "💊" },
  { id: "conducta", label: "Conducta", emoji: "🧠" },
  { id: "sociedad", label: "Sociedad", emoji: "🌍" },
];

const MYTHS = [
  {
    id: 1,
    category: "adopcion",
    myth: "Los animales de la calle o refugios están enfermos y son peligrosos.",
    mythShort: "Son peligrosos y enfermos",
    mythIcon: "⚠️",
    reality:
      "La mayoría de los animales rescatados reciben atención veterinaria completa antes de ser dados en adopción: vacunas, desparasitación y revisión general. Muchos son más saludables que los de criaderos.",
    realityShort: "Son sanos y revisados",
    realityIcon: "✅",
    source: "WSPA Guatemala, 2023",
    impact: "Este mito reduce las adopciones en un 40%",
  },
  {
    id: 2,
    category: "conducta",
    myth: "Un perro adulto rescatado nunca podrá adaptarse a un nuevo hogar.",
    mythShort: "No se adaptan",
    mythIcon: "🚫",
    reality:
      "Los perros adultos suelen adaptarse más rápido que los cachorros. Ya superaron la etapa destructiva, duermen más, y agradecen profundamente tener un hogar seguro. El vínculo que forman es extraordinario.",
    realityShort: "Se adaptan rápido y aman más",
    realityIcon: "💛",
    source: "American Humane Society",
    impact: "Los adultos tienen 3x más dificultad para ser adoptados",
  },
  {
    id: 3,
    category: "sociedad",
    myth: "El abandono de animales es un problema menor comparado con otros sociales.",
    mythShort: "Es un problema menor",
    mythIcon: "📉",
    reality:
      "El abandono animal está directamente relacionado con la salud pública, transmisión de enfermedades zoonóticas, accidentes viales y bienestar mental de comunidades. Es un indicador social de primer orden.",
    realityShort: "Afecta directamente a las personas",
    realityIcon: "🌱",
    source: "OPS / OMS, 2022",
    impact: "3M+ animales en calle solo en Centroamérica",
  },
  {
    id: 4,
    category: "adopcion",
    myth: "Comprar una mascota de raza es mejor que adoptar porque conoces su origen.",
    mythShort: "Comprar es mejor que adoptar",
    mythIcon: "💰",
    reality:
      "Los criaderos ilegales y tiendas de mascotas frecuentemente operan en condiciones de maltrato. Al comprar, se financia esa cadena. Adoptar rompe el ciclo y salva una vida real con historia.",
    realityShort: "Adoptar salva y no financia maltrato",
    realityIcon: "❤️",
    source: "Red de Bienestar Animal GT",
    impact: "80% de criaderos operan sin regulación en GT",
  },
  {
    id: 5,
    category: "salud",
    myth: "Esterilizar a mi mascota afecta su salud y cambia su personalidad.",
    mythShort: "La esterilización daña",
    mythIcon: "😟",
    reality:
      "La esterilización previene cánceres de mama, uterinos y prostáticos, y reduce comportamientos agresivos ligados a hormonas. La personalidad no cambia; el animal vive más y mejor.",
    realityShort: "Alarga vida y mejora salud",
    realityIcon: "🩺",
    source: "Colegio de Médicos Veterinarios GT",
    impact: "Reduce el 90% de la sobrepoblación callejera",
  },
  {
    id: 6,
    category: "conducta",
    myth: "Los gatos callejeros son independientes y no necesitan ser rescatados.",
    mythShort: "Los gatos no necesitan ayuda",
    mythIcon: "😼",
    reality:
      "Un gato callejero tiene una esperanza de vida de 2-5 años frente a los 15-20 de uno doméstico. Sufren frío, hambre, enfermedades y violencia. Su autonomía es una respuesta a la supervivencia, no bienestar.",
    realityShort: "Su vida en calle es corta y difícil",
    realityIcon: "🐱",
    source: "Asociación Felina de Guatemala",
    impact: "Esperanza de vida: 3 años en calle vs 18 en hogar",
  },
  {
    id: 7,
    category: "sociedad",
    myth: "Las personas que abandonan animales son simplemente malas personas.",
    mythShort: "Solo los malos abandonan",
    mythIcon: "😤",
    reality:
      "La mayoría de abandonos ocurren por falta de educación, crisis económicas, migración o desconocimiento de alternativas. Juzgar sin entender impide crear soluciones estructurales reales.",
    realityShort: "Es un problema estructural y educativo",
    realityIcon: "🤝",
    source: "CONAP Guatemala, 2023",
    impact: "El 65% de abandonos tienen causa socioeconómica",
  },
  {
    id: 8,
    category: "salud",
    myth: "Los animales callejeros contagian enfermedades solo por acercarse a ellos.",
    mythShort: "Solo acercarse contagia",
    mythIcon: "🦠",
    reality:
      "La transmisión de zoonosis requiere condiciones específicas. Con vacunación, desparasitación y manejo adecuado, el riesgo es mínimo. El programa de captura, esterilización y retorno (CER) protege a comunidades y animales.",
    realityShort: "Con manejo correcto el riesgo es mínimo",
    realityIcon: "🛡️",
    source: "Ministerio de Salud Pública GT",
    impact: "La vacunación masiva reduce rabia en 98%",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// VARIANTES — fuera del componente, estables entre renders
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 22,
      delay: i * 0.07,
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 130,
      damping: 20,
      delay: i * 0.06,
    },
  }),
};

const cardListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 22 },
  },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.18 } },
};

const VIEWPORT_ONCE = { once: true, margin: "-60px" };

// ─────────────────────────────────────────────────────────────────────────────
// SUBCOMPONENTES
// ─────────────────────────────────────────────────────────────────────────────

/** Tarjeta individual con flip 3D */
const MythCard = memo(function MythCard({ myth, index, isRevealed, onFlip }) {
  const prefersReduced = useReducedMotion();

  const mythBg =
    "linear-gradient(135deg, rgba(255,140,66,0.14) 0%, rgba(255,80,50,0.10) 100%)";
  const realityBg =
    "linear-gradient(135deg, rgba(45,161,79,0.14) 0%, rgba(30,120,60,0.10) 100%)";

  return (
    <m.div
      variants={cardItemVariants}
      className="relative cursor-pointer"
      style={{ perspective: 1000, minHeight: 260 }}
      onClick={onFlip}
      role="button"
      aria-pressed={isRevealed}
      aria-label={
        isRevealed
          ? `Realidad: ${myth.realityShort}`
          : `Mito: ${myth.mythShort}`
      }
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onFlip();
      }}
    >
      <m.div
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={
          prefersReduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 160, damping: 26 }
        }
        style={{
          transformStyle: "preserve-3d",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* ── CARA FRONTAL: Mito ── */}
        <div
          className="absolute inset-0 rounded-2xl border p-5 flex flex-col gap-3 select-none"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: mythBg,
            borderColor: "rgba(255,140,66,0.30)",
            boxShadow: "0 4px 24px rgba(255,140,66,0.10)",
            minHeight: 260,
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <span
              className="text-[0.6rem] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full shrink-0"
              style={{
                backgroundColor: "rgba(255,140,66,0.18)",
                color: "#FF8C42",
                border: "1px solid rgba(255,140,66,0.35)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              🚫 Mito
            </span>
            <span className="text-2xl shrink-0">{myth.mythIcon}</span>
          </div>

          {/* Myth text */}
          <p
            className="text-[#D8F3DC]/85 leading-relaxed flex-1"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
              fontWeight: 600,
            }}
          >
            "{myth.myth}"
          </p>

          {/* Impact badge */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl mt-auto"
            style={{
              backgroundColor: "rgba(255,140,66,0.08)",
              border: "1px solid rgba(255,140,66,0.18)",
            }}
          >
            <span className="text-[#FF8C42]/60 text-[0.6rem]">📊</span>
            <span
              className="text-[#FF8C42]/70 text-[0.62rem] leading-tight"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {myth.impact}
            </span>
          </div>

          {/* Tap hint */}
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <m.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                ease: "easeInOut",
              }}
              className="text-[#FF8C42]/40"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </m.span>
            <span
              className="text-[#D8F3DC]/25 text-[0.6rem] tracking-widest uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Toca para ver la realidad
            </span>
          </div>
        </div>

        {/* ── CARA TRASERA: Realidad ── */}
        <div
          className="absolute inset-0 rounded-2xl border p-5 flex flex-col gap-3 select-none"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: realityBg,
            borderColor: "rgba(45,161,79,0.35)",
            boxShadow: "0 4px 24px rgba(45,161,79,0.15)",
            minHeight: 260,
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <span
              className="text-[0.6rem] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full shrink-0"
              style={{
                backgroundColor: "rgba(45,161,79,0.18)",
                color: "#2DA14F",
                border: "1px solid rgba(45,161,79,0.35)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              ✅ Realidad
            </span>
            <span className="text-2xl shrink-0">{myth.realityIcon}</span>
          </div>

          {/* Reality text */}
          <p
            className="text-[#D8F3DC]/80 leading-relaxed flex-1 text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif", lineHeight: 1.65 }}
          >
            {myth.reality}
          </p>

          {/* Source */}
          <div className="flex items-center gap-2 mt-auto">
            <FaPaw size={9} color="#2DA14F" />
            <span
              className="text-[#2DA14F]/60 text-[0.6rem]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Fuente: {myth.source}
            </span>
          </div>

          {/* Tap hint back */}
          <div className="flex items-center justify-center gap-1.5">
            <span
              className="text-[#D8F3DC]/20 text-[0.6rem] tracking-widest uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Toca para volver
            </span>
          </div>
        </div>
      </m.div>
    </m.div>
  );
});

/** Botón de filtro de categoría */
const FilterButton = memo(function FilterButton({ cat, isActive, onClick }) {
  return (
    <m.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border-0 cursor-pointer transition-colors duration-200 whitespace-nowrap"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        backgroundColor: isActive ? "#2DA14F" : "rgba(216,243,220,0.06)",
        color: isActive ? "#212529" : "rgba(216,243,220,0.55)",
        boxShadow: isActive ? "0 3px 14px rgba(45,161,79,0.40)" : "none",
      }}
    >
      {isActive && (
        <m.div
          layoutId="filter-active"
          className="absolute inset-0 rounded-xl"
          style={{ backgroundColor: "#2DA14F", zIndex: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
        />
      )}
      <span className="relative z-10 text-sm">{cat.emoji}</span>
      <span className="relative z-10">{cat.label}</span>
    </m.button>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

export default function MythsVsReality() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [revealed, setRevealed] = useState(new Set());

  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, VIEWPORT_ONCE);

  // Filtrado
  const filtered =
    activeCategory === "all"
      ? MYTHS
      : MYTHS.filter((m) => m.category === activeCategory);

  // Métricas
  const totalRevealed = revealed.size;
  const totalMyths = MYTHS.length;
  const progressPct = Math.round((totalRevealed / totalMyths) * 100);
  const allCurrentShown = filtered.every((m) => revealed.has(m.id));

  // Handlers
  const handleFlip = useCallback((id) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleFilter = useCallback((id) => {
    setActiveCategory(id);
  }, []);

  const revealAll = useCallback(() => {
    if (allCurrentShown) {
      setRevealed((prev) => {
        const next = new Set(prev);
        filtered.forEach((m) => next.delete(m.id));
        return next;
      });
    } else {
      setRevealed((prev) => {
        const next = new Set(prev);
        filtered.forEach((m) => next.add(m.id));
        return next;
      });
    }
  }, [allCurrentShown, filtered]);

  return (
    <LazyMotion features={domMax} strict>
      <section
        ref={sectionRef}
        id="mitos"
        className="relative w-full bg-[#212529] py-20 px-4 md:px-8 overflow-hidden"
      >
        {/* Ambient glows */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute rounded-full blur-[140px] opacity-[0.06]"
            style={{
              width: 500,
              height: 500,
              background: "#FF8C42",
              top: "-5%",
              right: "10%",
            }}
          />
          <div
            className="absolute rounded-full blur-[120px] opacity-[0.05]"
            style={{
              width: 400,
              height: 400,
              background: "#2DA14F",
              bottom: "10%",
              left: "5%",
            }}
          />
        </div>

        <div className="relative max-w-300 mx-auto">
          {/* ── Header ── */}
          <m.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="flex flex-col items-center text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-[#FF8C42]/12 border border-[#FF8C42]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C42] pulse-dot" />
              <span
                className="text-[#FF8C42] text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Derribando barreras
              </span>
            </div>

            <h2
              className="text-[#D8F3DC] leading-[1.1] tracking-[-0.03em] mb-4"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(2rem, 5vw, 3.4rem)",
                fontWeight: 700,
              }}
            >
              Mitos que{" "}
              <em className="not-italic text-[#FF8C42]">cuestan vidas</em>
            </h2>

            <p
              className="text-[#D8F3DC]/50 max-w-lg leading-relaxed"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              }}
            >
              Toca cada tarjeta para revelar la verdad detrás de las creencias
              más comunes sobre el abandono y la tenencia responsable de
              animales.
            </p>
          </m.div>

          {/* ── Progress + contador ── */}
          <m.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 px-1"
          >
            {/* Counter */}
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-xl"
                style={{
                  backgroundColor: "rgba(45,161,79,0.10)",
                  border: "1px solid rgba(45,161,79,0.25)",
                }}
              >
                <FaPaw size={12} color="#2DA14F" />
                <span
                  className="text-[#D8F3DC]/70 text-xs"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span className="text-[#2DA14F] font-bold text-sm">
                    {totalRevealed}
                  </span>
                  <span className="text-[#D8F3DC]/40">
                    {" "}
                    / {totalMyths} mitos revelados
                  </span>
                </span>
              </div>

              {totalRevealed === totalMyths && (
                <m.span
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "#2DA14F20",
                    color: "#2DA14F",
                    border: "1px solid #2DA14F40",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  🎉 ¡Completado!
                </m.span>
              )}
            </div>

            {/* Global progress bar */}
            <div className="flex items-center gap-3 flex-1 max-w-xs">
              <div className="flex-1 h-1.5 rounded-full bg-[#D8F3DC]/10 overflow-hidden">
                <m.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #2DA14F, #52c97a)",
                    boxShadow: "0 0 8px rgba(45,161,79,0.5)",
                  }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ type: "spring", stiffness: 80, damping: 20 }}
                />
              </div>
              <span
                className="text-[#2DA14F] text-xs font-semibold tabular-nums w-8 text-right"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {progressPct}%
              </span>
            </div>
          </m.div>

          {/* ── Filtros de categoría ── */}
          <m.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="flex items-center gap-2 mb-8 flex-wrap"
          >
            {CATEGORIES.map((cat) => (
              <FilterButton
                key={cat.id}
                cat={cat}
                isActive={activeCategory === cat.id}
                onClick={() => handleFilter(cat.id)}
              />
            ))}

            {/* Spacer */}
            <div className="flex-1 hidden sm:block" />

            {/* Reveal all toggle */}
            <m.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={revealAll}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border cursor-pointer transition-all duration-200"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                borderColor: allCurrentShown
                  ? "rgba(255,140,66,0.35)"
                  : "rgba(216,243,220,0.15)",
                backgroundColor: allCurrentShown
                  ? "rgba(255,140,66,0.08)"
                  : "rgba(216,243,220,0.04)",
                color: allCurrentShown ? "#FF8C42" : "rgba(216,243,220,0.45)",
              }}
            >
              {allCurrentShown ? (
                <>
                  <span>🔄</span> Ocultar todos
                </>
              ) : (
                <>
                  <span>⚡</span> Revelar todos
                </>
              )}
            </m.button>
          </m.div>

          {/* ── Grid de tarjetas ── */}
          <AnimatePresence mode="wait">
            <m.div
              key={activeCategory}
              variants={cardListVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {filtered.map((myth, i) => (
                <MythCard
                  key={myth.id}
                  myth={myth}
                  index={i}
                  isRevealed={revealed.has(myth.id)}
                  onFlip={() => handleFlip(myth.id)}
                />
              ))}
            </m.div>
          </AnimatePresence>

          {/* ── CTA inferior ── */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ type: "spring", stiffness: 90, damping: 20 }}
            className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 md:p-8 rounded-2xl border border-[#2DA14F]/20"
            style={{ backgroundColor: "rgba(45,161,79,0.06)" }}
          >
            <div className="text-center sm:text-left">
              <h4
                className="text-[#D8F3DC] mb-1"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
                  fontWeight: 700,
                }}
              >
                ¿Quieres compartir la{" "}
                <em className="not-italic text-[#2DA14F]">verdad</em>?
              </h4>
              <p
                className="text-[#D8F3DC]/45 text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Comparte estos datos con quienes conoces. La educación es el
                primer paso para el cambio.
              </p>
            </div>
            <div className="flex gap-3 shrink-0 flex-wrap justify-center">
              <m.button
                whileHover={{
                  y: -2,
                  boxShadow: "0 8px 28px rgba(45,161,79,0.40)",
                }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-5 py-2.75 rounded-xl text-sm font-semibold border-0 cursor-pointer"
                style={{
                  backgroundColor: "#2DA14F",
                  color: "#212529",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 2px 14px rgba(45,161,79,0.35)",
                }}
              >
                🐾 Compartir datos
              </m.button>
              <m.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-5 py-2.75 rounded-xl text-sm font-semibold cursor-pointer"
                style={{
                  color: "#FF8C42",
                  backgroundColor: "rgba(255,140,66,0.10)",
                  border: "1px solid rgba(255,140,66,0.30)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                📖 Más información
              </m.button>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
