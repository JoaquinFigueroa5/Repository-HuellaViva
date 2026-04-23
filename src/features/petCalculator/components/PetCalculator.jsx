import { useState, useCallback, useRef, useMemo, memo } from "react";
import {
  LazyMotion, domMax, m, AnimatePresence, useInView, useReducedMotion,
} from "framer-motion";
import { 
  FaPaw, 
  FaInfoCircle,
  FaWhatsapp
} from "react-icons/fa";

import {
  SPECIES,
  SIZES,
  BASE_COSTS,
  ONE_TIME_COSTS,
  EXPENSE_META,
  ONE_TIME_META,
  SAVINGS_TIPS
} from "@/data/calculatorData";

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 110, damping: 22, delay: i * 0.08 },
  }),
};

const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 18, delay: i * 0.06 },
  }),
};

const VIEWPORT = { once: true, margin: "-50px" };

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const avg = ([min, max]) => Math.round((min + max) / 2);
const fmt = (n) => `Q ${n.toLocaleString("es-GT")}`;

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTES
// ─────────────────────────────────────────────────────────────────────────────

/** Selector de opción tipo chip */
const OptionChip = memo(function OptionChip({ option, isSelected, onClick, accentColor = "#2DA14F" }) {
  return (
    <m.button
      whileHover={{ y: -2, boxShadow: isSelected ? `0 6px 20px ${accentColor}30` : "none" }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 py-3.5 px-3 rounded-2xl border-0 cursor-pointer transition-all duration-200 will-change-transform"
      style={{
        backgroundColor: isSelected ? `${accentColor}18` : "rgba(255,255,255,0.03)",
        border: `2px solid ${isSelected ? `${accentColor}55` : "rgba(216,243,220,0.10)"}`,
        boxShadow: isSelected ? `0 4px 18px ${accentColor}18` : "none",
      }}
    >
      <span className="text-2xl">{option.emoji}</span>
      <span
        className="text-sm font-bold"
        style={{ fontFamily: "'DM Sans', sans-serif", color: isSelected ? accentColor : "rgba(216,243,220,0.60)" }}
      >
        {option.label}
      </span>
      {option.sub && (
        <span className="text-[0.62rem]" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.28)" }}>
          {option.sub}
        </span>
      )}
    </m.button>
  );
});

/** Slider de gasto individual */
const ExpenseSlider = memo(function ExpenseSlider({ expKey, meta, baseCosts, value, onChange }) {
  const [min, max] = baseCosts[expKey] ?? [0, 0];
  const [showTip, setShowTip] = useState(false);

  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">{meta.icon}</span>
          <span className="text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.80)" }}>
            {meta.label}
          </span>
          <button
            onClick={() => setShowTip(!showTip)}
            className="border-0 bg-transparent cursor-pointer p-0 transition-colors duration-200"
            style={{ color: showTip ? meta.color : "rgba(216,243,220,0.25)" }}
          >
            <FaInfoCircle size={11} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-sm font-bold tabular-nums"
            style={{ fontFamily: "'Fraunces', serif", color: meta.color }}
          >
            {fmt(value)}
          </span>
          <span className="text-[0.6rem] text-[#D8F3DC]/25" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            /mes
          </span>
        </div>
      </div>

      {/* Tip */}
      <AnimatePresence>
        {showTip && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div
              className="flex items-start gap-2 px-3 py-2 rounded-xl mb-1"
              style={{ backgroundColor: `${meta.color}0D`, border: `1px solid ${meta.color}25` }}
            >
              <span style={{ color: meta.color, fontSize: 11, marginTop: 2, flexShrink: 0 }}>💡</span>
              <p className="text-[0.68rem] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: `${meta.color}CC` }}>
                {meta.tip}
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Slider track */}
      <div className="relative h-8 flex items-center group">
        <div className="relative w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(216,243,220,0.08)" }}>
          <m.div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${meta.color}90, ${meta.color})` }}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 28 }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={10}
          value={value}
          onChange={(e) => onChange(expKey, Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          style={{ zIndex: 2 }}
        />
        {/* Thumb visible */}
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-[#212529] -translate-x-1/2 pointer-events-none transition-shadow duration-200"
          style={{
            left: `${pct}%`,
            backgroundColor: meta.color,
            boxShadow: `0 0 8px ${meta.color}80`,
            zIndex: 1,
          }}
        />
      </div>

      {/* Range labels */}
      <div className="flex justify-between">
        <span className="text-[0.58rem] text-[#D8F3DC]/20" style={{ fontFamily: "'DM Sans', sans-serif" }}>{fmt(min)}</span>
        <span className="text-[0.58rem] text-[#D8F3DC]/20" style={{ fontFamily: "'DM Sans', sans-serif" }}>{fmt(max)}</span>
      </div>
    </div>
  );
});

/** Donut chart SVG */
const DonutChart = memo(function DonutChart({ segments }) {
  const R  = 56;
  const CX = 70;
  const CY = 70;
  const CIRC = 2 * Math.PI * R;

  const total = segments.reduce((a, s) => a + s.value, 0);
  let offset  = 0;

  return (
    <svg width="140" height="140" viewBox="0 0 140 140" className="drop-shadow-lg">
      {/* Background circle */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(216,243,220,0.06)" strokeWidth="18" />
      {segments.map((seg, i) => {
        if (seg.value === 0) return null;
        const pct  = seg.value / total;
        const dash = pct * CIRC;
        const gap  = CIRC - dash;
        const arc  = (
          <circle
            key={i}
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke={seg.color}
            strokeWidth="18"
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
            style={{ transform: "rotate(-90deg)", transformOrigin: "center", filter: `drop-shadow(0 0 4px ${seg.color}60)` }}
          />
        );
        offset += dash;
        return arc;
      })}
      {/* Center */}
      <circle cx={CX} cy={CY} r={40} fill="rgba(33,37,41,0.95)" />
    </svg>
  );
});

/** Barra de item en el desglose */
const BreakdownBar = memo(function BreakdownBar({ label, icon, color, value, total, isInView }) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">{icon}</span>
          <span className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.60)" }}>
            {label}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold tabular-nums" style={{ fontFamily: "'Fraunces', serif", color }}>
            {fmt(value)}
          </span>
          <span className="text-[0.58rem]" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.25)" }}>
            {Math.round(pct)}%
          </span>
        </div>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(216,243,220,0.07)" }}>
        <m.div
          className="h-full rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}60` }}
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${pct}%` } : { width: "0%" }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
        />
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

export default function PetCostCalculator() {
  const prefersReduced = useReducedMotion();
  const sectionRef     = useRef(null);
  const resultsRef     = useRef(null);
  const sectionInView  = useInView(sectionRef,  VIEWPORT);
  const resultsInView  = useInView(resultsRef,  VIEWPORT);

  const [species,   setSpecies]  = useState("dog");
  const [size,      setSize]     = useState("medium");
  const [showOnce,  setShowOnce] = useState(true); // incluir gastos únicos en el resumen anual

  // Estado de sliders: inicializado con los valores promedio
  const initExpenses = useCallback((sp, sz) => {
    const base = BASE_COSTS[sp][sz];
    return Object.fromEntries(Object.keys(base).map((k) => [k, avg(base[k])]));
  }, []);

  const [expenses, setExpenses] = useState(() => initExpenses("dog", "medium"));

  // Recalcular cuando cambia especie o tamaño
  const handleSpecies = useCallback((sp) => {
    setSpecies(sp);
    setExpenses(initExpenses(sp, size));
  }, [size, initExpenses]);

  const handleSize = useCallback((sz) => {
    setSize(sz);
    setExpenses(initExpenses(species, sz));
  }, [species, initExpenses]);

  const handleExpense = useCallback((key, val) => {
    setExpenses((prev) => ({ ...prev, [key]: val }));
  }, []);

  // ── Cálculos derivados (memoizados) ──────────────────────────────────────
  const monthlyTotal = useMemo(() =>
    Object.values(expenses).reduce((a, v) => a + v, 0),
  [expenses]);

  const oneTimeCosts = useMemo(() => {
    const ot = ONE_TIME_COSTS[species];
    return Object.fromEntries(Object.entries(ot).map(([k, range]) => [k, avg(range)]));
  }, [species]);

  const oneTimeTotal = useMemo(() =>
    Object.values(oneTimeCosts).reduce((a, v) => a + v, 0),
  [oneTimeCosts]);

  const annualTotal = useMemo(() =>
    monthlyTotal * 12 + (showOnce ? oneTimeTotal : 0),
  [monthlyTotal, oneTimeTotal, showOnce]);

  const dailyCost = useMemo(() => Math.round(monthlyTotal / 30), [monthlyTotal]);

  // Segmentos del donut
  const donutSegments = useMemo(() => {
    const keys   = Object.keys(expenses);
    const colors = ["#2DA14F", "#FF8C42", "#D8F3DC", "#52c97a", "#ffaa6b"];
    return keys.map((k, i) => ({
      key:   k,
      value: expenses[k],
      color: EXPENSE_META[k]?.color ?? colors[i % colors.length],
    }));
  }, [expenses]);

  // Nivel de accesibilidad del gasto
  const affordability = useMemo(() => {
    if (monthlyTotal < 300) return { label: "Muy accesible",   color: "#2DA14F", emoji: "✅", desc: "Este nivel de gasto es alcanzable para la mayoría de familias guatemaltecas." };
    if (monthlyTotal < 500) return { label: "Accesible",       color: "#2DA14F", emoji: "👍", desc: "Un gasto manejable con planificación mensual." };
    if (monthlyTotal < 800) return { label: "Moderado",        color: "#FF8C42", emoji: "💛", desc: "Considera los consejos de ahorro para optimizar este presupuesto." };
    return                         { label: "Presupuesto alto", color: "#FF8C42", emoji: "⚠️", desc: "Ajusta los sliders o revisa los tips para reducir costos sin sacrificar bienestar." };
  }, [monthlyTotal]);

  const baseCosts = BASE_COSTS[species][size];

  return (
    <LazyMotion features={domMax} strict>
      <section
        ref={sectionRef}
        className="relative w-full bg-[#212529] py-20 px-4 md:px-8 overflow-hidden mt-10"
      >
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute rounded-full blur-[150px] opacity-[0.06]"
            style={{ width: 600, height: 600, background: "#2DA14F", top: "-10%", left: "-15%" }} />
          <div className="absolute rounded-full blur-[120px] opacity-[0.05]"
            style={{ width: 400, height: 400, background: "#FF8C42", bottom: "5%", right: "-5%" }} />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage: "linear-gradient(rgba(216,243,220,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(216,243,220,0.8) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }} />
        </div>

        <div className="relative max-w-300 mx-auto">

          {/* ── Header ── */}
          <m.div
            custom={0} variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="flex flex-col items-center text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-[#2DA14F]/12 border border-[#2DA14F]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2DA14F] pulse-dot" />
              <FaPaw size={10} color="#2DA14F" />
              <span className="text-[#2DA14F] text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Herramienta de planificación
              </span>
            </div>

            <h2
              className="text-[#D8F3DC] leading-[1.1] tracking-[-0.03em] mb-4"
              style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700 }}
            >
              ¿Cuánto cuesta{" "}
              <em className="not-italic text-[#2DA14F]">tener una mascota?</em>
            </h2>
            <p className="text-[#D8F3DC]/50 max-w-lg leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.9rem, 1.5vw, 1rem)" }}>
              Calcula el presupuesto mensual real para un animal rescatado. Ajusta cada categoría según tu estilo de vida y descubre consejos de ahorro.
            </p>
          </m.div>

          {/* ── Configuración: especie + tamaño ── */}
          <m.div
            custom={1} variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="flex flex-col sm:flex-row gap-6 mb-8"
          >
            {/* Especie */}
            <div className="flex-1">
              <p className="text-[0.65rem] font-bold tracking-widest uppercase mb-3"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.35)" }}>
                Especie
              </p>
              <div className="grid grid-cols-2 gap-3">
                {SPECIES.map((sp) => (
                  <OptionChip
                    key={sp.id}
                    option={sp}
                    isSelected={species === sp.id}
                    onClick={() => handleSpecies(sp.id)}
                    accentColor="#2DA14F"
                  />
                ))}
              </div>
            </div>

            {/* Tamaño */}
            <div className="flex-1">
              <p className="text-[0.65rem] font-bold tracking-widest uppercase mb-3"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.35)" }}>
                Tamaño
              </p>
              <div className="grid grid-cols-3 gap-3">
                {SIZES.map((sz) => (
                  <OptionChip
                    key={sz.id}
                    option={sz}
                    isSelected={size === sz.id}
                    onClick={() => handleSize(sz.id)}
                    accentColor="#FF8C42"
                  />
                ))}
              </div>
            </div>
          </m.div>

          {/* ── Main layout: sliders + resultados ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 xl:gap-10">

            {/* ══ IZQUIERDA: Sliders de gastos ══ */}
            <m.div
              custom={2} variants={fadeUp}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
            >
              <div
                className="p-6 md:p-8 rounded-3xl flex flex-col gap-6"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(216,243,220,0.08)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.28)",
                }}
              >
                {/* Header card */}
                <div className="flex items-center justify-between pb-4 border-b border-[#D8F3DC]/[0.07]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                      style={{ backgroundColor: "rgba(45,161,79,0.15)", border: "1px solid rgba(45,161,79,0.30)" }}>
                      🎚️
                    </div>
                    <div>
                      <h3 className="text-[#D8F3DC] font-bold text-base" style={{ fontFamily: "'Fraunces', serif" }}>
                        Gastos mensuales
                      </h3>
                      <p className="text-[#D8F3DC]/35 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Ajusta cada slider según tu realidad
                      </p>
                    </div>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-xl"
                    style={{ backgroundColor: "rgba(45,161,79,0.12)", border: "1px solid rgba(45,161,79,0.28)" }}
                  >
                    <span className="font-bold" style={{ fontFamily: "'Fraunces', serif", fontSize: "1.1rem", color: "#2DA14F" }}>
                      {fmt(monthlyTotal)}
                    </span>
                    <span className="text-[0.62rem] text-[#2DA14F]/60 ml-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>/mes</span>
                  </div>
                </div>

                {/* Sliders */}
                <div className="flex flex-col gap-6">
                  {Object.keys(expenses).map((key) => (
                    <ExpenseSlider
                      key={`${species}-${size}-${key}`}
                      expKey={key}
                      meta={EXPENSE_META[key]}
                      baseCosts={baseCosts}
                      value={expenses[key]}
                      onChange={handleExpense}
                    />
                  ))}
                </div>

                {/* Affordability indicator */}
                <AnimatePresence mode="wait">
                  <m.div
                    key={affordability.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ type: "spring", stiffness: 200, damping: 24 }}
                    className="flex items-center gap-3 p-4 rounded-2xl"
                    style={{
                      backgroundColor: `${affordability.color}0C`,
                      border: `1px solid ${affordability.color}28`,
                    }}
                  >
                    <span className="text-xl shrink-0">{affordability.emoji}</span>
                    <div>
                      <p className="text-xs font-bold mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif", color: affordability.color }}>
                        {affordability.label}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.50)" }}>
                        {affordability.desc}
                      </p>
                    </div>
                  </m.div>
                </AnimatePresence>
              </div>
            </m.div>

            {/* ══ DERECHA: Resultados ══ */}
            <div ref={resultsRef} className="flex flex-col gap-5 lg:sticky lg:top-24">

              {/* Resumen mensual/anual */}
              <m.div
                custom={0} variants={scaleIn}
                initial="hidden"
                animate={sectionInView ? "visible" : "hidden"}
                className="p-6 rounded-3xl flex flex-col gap-5"
                style={{
                  background: "linear-gradient(145deg, rgba(45,161,79,0.10) 0%, rgba(45,161,79,0.04) 100%)",
                  border: "1px solid rgba(45,161,79,0.25)",
                  boxShadow: "0 6px 32px rgba(45,161,79,0.10)",
                }}
              >
                {/* Donut + valores */}
                <div className="flex items-center gap-5">
                  <div className="relative shrink-0">
                    <DonutChart segments={donutSegments} />
                    {/* Centro del donut */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[0.6rem] font-semibold uppercase tracking-widest"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.35)" }}>
                        mensual
                      </span>
                      <m.span
                        key={monthlyTotal}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="font-bold leading-none"
                        style={{ fontFamily: "'Fraunces', serif", fontSize: "1.1rem", color: "#2DA14F" }}
                      >
                        {fmt(monthlyTotal)}
                      </m.span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 flex-1">
                    {[
                      { label: "Al día",    value: fmt(dailyCost),        accent: "#D8F3DC", sub: "" },
                      { label: "Al mes",    value: fmt(monthlyTotal),     accent: "#2DA14F", sub: "" },
                      { label: "Al año",    value: fmt(monthlyTotal * 12),accent: "#FF8C42", sub: "gastos recurrentes" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-[0.65rem] text-[#D8F3DC]/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {item.label}
                        </span>
                        <div className="flex flex-col items-end">
                          <m.span
                            key={item.value}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                            className="font-bold tabular-nums"
                            style={{ fontFamily: "'Fraunces', serif", fontSize: "0.95rem", color: item.accent }}
                          >
                            {item.value}
                          </m.span>
                          {item.sub && (
                            <span className="text-[0.55rem] text-[#D8F3DC]/25" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {item.sub}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-[#D8F3DC]/[0.07]" />

                {/* Toggle gastos únicos */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-[#D8F3DC]/70 text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Incluir gastos únicos del primer año
                      </p>
                      <p className="text-[#D8F3DC]/30 text-[0.62rem]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Esterilización, vacunas, microchip, etc.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowOnce(!showOnce)}
                      className="w-12 h-6 rounded-full border-0 cursor-pointer relative transition-colors duration-300 shrink-0"
                      style={{ backgroundColor: showOnce ? "#2DA14F" : "rgba(216,243,220,0.12)" }}
                    >
                      <m.div
                        animate={{ x: showOnce ? 24 : 2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 26 }}
                        className="absolute top-0.75 w-4.5 h-4.5 rounded-full bg-white"
                      />
                    </button>
                  </div>

                  {/* Total primer año */}
                  <div
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ backgroundColor: "rgba(255,140,66,0.08)", border: "1px solid rgba(255,140,66,0.22)" }}
                  >
                    <span className="text-xs font-semibold text-[#FF8C42]/80" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      🗓️ Total primer año estimado
                    </span>
                    <m.span
                      key={annualTotal}
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className="font-bold tabular-nums"
                      style={{ fontFamily: "'Fraunces', serif", fontSize: "1rem", color: "#FF8C42" }}
                    >
                      {fmt(annualTotal)}
                    </m.span>
                  </div>
                </div>
              </m.div>

              {/* Desglose por categoría */}
              <m.div
                custom={1} variants={scaleIn}
                initial="hidden"
                animate={sectionInView ? "visible" : "hidden"}
                className="p-5 rounded-2xl flex flex-col gap-4"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(216,243,220,0.08)",
                }}
              >
                <p className="text-[0.65rem] font-bold tracking-widest uppercase"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.30)" }}>
                  Desglose mensual
                </p>
                <div className="flex flex-col gap-3.5">
                  {Object.keys(expenses).map((key) => (
                    <BreakdownBar
                      key={key}
                      label={EXPENSE_META[key].label}
                      icon={EXPENSE_META[key].icon}
                      color={EXPENSE_META[key].color}
                      value={expenses[key]}
                      total={monthlyTotal}
                      isInView={resultsInView}
                    />
                  ))}
                </div>
              </m.div>

              {/* Gastos únicos del primer año */}
              <m.div
                custom={2} variants={scaleIn}
                initial="hidden"
                animate={sectionInView ? "visible" : "hidden"}
                className="p-5 rounded-2xl flex flex-col gap-3"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(216,243,220,0.07)",
                }}
              >
                <p className="text-[0.65rem] font-bold tracking-widest uppercase"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.30)" }}>
                  Gastos únicos — primer año
                </p>
                <div className="flex flex-col gap-2">
                  {Object.entries(oneTimeCosts).map(([key, val]) => {
                    const meta = ONE_TIME_META[key];
                    if (!meta) return null;
                    return (
                      <div key={key} className="flex items-center justify-between py-1.5 border-b border-[#D8F3DC]/5 last:border-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{meta.icon}</span>
                          <span className="text-xs text-[#D8F3DC]/55" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {meta.label}
                          </span>
                        </div>
                        <span className="text-xs font-bold tabular-nums" style={{ fontFamily: "'Fraunces', serif", color: meta.color }}>
                          {fmt(val)}
                        </span>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-[#D8F3DC]/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Total
                    </span>
                    <span className="text-sm font-bold" style={{ fontFamily: "'Fraunces', serif", color: "#FF8C42" }}>
                      {fmt(oneTimeTotal)}
                    </span>
                  </div>
                </div>
              </m.div>

            </div>
          </div>

          {/* ── Consejos de ahorro ── */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ type: "spring", stiffness: 90, damping: 20 }}
            className="mt-10"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-[#D8F3DC]/8" />
              <span className="text-[0.65rem] font-bold tracking-widest uppercase px-3"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.30)" }}>
                💡 Consejos para reducir costos
              </span>
              <div className="h-px flex-1 bg-[#D8F3DC]/8" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SAVINGS_TIPS.map((tip, i) => (
                <m.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  whileHover={{ y: -3 }}
                  className="flex items-start gap-3 p-4 rounded-2xl cursor-default will-change-transform"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(216,243,220,0.07)",
                  }}
                >
                  <span
                    className="w-9 h-9 flex items-center justify-center text-lg rounded-xl shrink-0"
                    style={{ backgroundColor: "rgba(45,161,79,0.12)", border: "1px solid rgba(45,161,79,0.22)" }}
                  >
                    {tip.icon}
                  </span>
                  <p className="text-sm text-[#D8F3DC]/60 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {tip.tip}
                  </p>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* ── CTA inferior ── */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ type: "spring", stiffness: 90, damping: 20 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 p-6 md:p-7 rounded-2xl border border-[#2DA14F]/20"
            style={{ backgroundColor: "rgba(45,161,79,0.06)" }}
          >
            <div>
              <h4
                className="text-[#D8F3DC] mb-1"
                style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)", fontWeight: 700 }}
              >
                ¿Listo para{" "}
                <em className="not-italic text-[#2DA14F]">dar el paso?</em>
              </h4>
              <p className="text-[#D8F3DC]/40 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Nuestro equipo puede orientarte en el proceso de adopción y preparación del hogar.
              </p>
            </div>
            <div className="flex gap-3 shrink-0 flex-wrap justify-center">
              <m.a
                href={`https://wa.me/50252491439?text=${encodeURIComponent(`¡Hola! Calculé que puedo gastar Q${monthlyTotal}/mes en una mascota. ¿Me orientan en el proceso de adopción?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(37,211,102,0.35)" }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-5 py-2.75 rounded-xl text-sm font-semibold no-underline will-change-transform"
                style={{
                  backgroundColor: "rgba(37,211,102,0.12)",
                  border: "1px solid rgba(37,211,102,0.30)",
                  color: "#25D366",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <FaWhatsapp size={14} />
                Consultar por WA
              </m.a>
            </div>
          </m.div>

        </div>
      </section>
    </LazyMotion>
  );
}