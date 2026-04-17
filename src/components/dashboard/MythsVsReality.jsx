import { useState, useCallback, useRef, useMemo, memo, cloneElement } from "react";
import { CATEGORIES, MYTHS, CARD_THEMES } from "@/data/mythsData";
import {
  motion as m,
  useReducedMotion,
  useInView,
  LazyMotion,
  domMax,
  AnimatePresence,
} from "framer-motion";
import { RiProhibitedLine } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { FaCheckCircle, FaPaw, FaShare, FaBookOpen } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";
import { BiParty } from "react-icons/bi";
import { LuSparkles } from "react-icons/lu";

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
const CardIcon = memo(function CardIcon({ icon, color, size = 26 }) {
  return (
    <span className="shrink-0 flex items-center justify-center">
      {cloneElement(icon, { color, size })}
    </span>
  );
});

const MythCardFront = memo(function MythCardFront({ myth, theme }) {
  return (
    <div
      className="absolute inset-0 rounded-2xl border p-5 flex flex-col gap-3 select-none overflow-hidden"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        background: `${theme.bg}, radial-gradient(circle at 85% 10%, ${theme.primary}25 0%, transparent 60%)`,
        borderColor: theme.border,
        boxShadow: `0 4px 20px ${theme.shadow}`,
        minHeight: 280,
        willChange: "transform",
      }}
    >
      <div className="flex items-start justify-between gap-2 relative z-10">
        <span
          className="text-[0.6rem] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full shrink-0 flex items-center gap-2"
          style={{
            backgroundColor: theme.badge,
            color: theme.primary,
            border: `1px solid ${theme.border}`,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <RiProhibitedLine /> Mito
        </span>
        <CardIcon icon={myth.mythIcon} color={theme.primary} />
      </div>

      <p
        className="text-[#D8F3DC]/85 leading-relaxed flex-1 relative z-10"
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
          fontWeight: 500,
        }}
      >
        "{myth.myth}"
      </p>

      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl mt-auto relative z-10"
        style={{
          backgroundColor: theme.footerBg,
          border: `1px solid ${theme.border}`,
        }}
      >
        <span className="text-white/60 shrink-0" style={{ color: theme.primary }}>
          <IoStatsChart size={14} />
        </span>
        <span
          className="text-white/70 text-[0.62rem] leading-tight"
          style={{ fontFamily: "'DM Sans', sans-serif", color: `${theme.primary}CC` }}
        >
          {myth.impact}
        </span>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-2 relative z-10 w-full px-1">
        <span
          className="shrink-0 myth-arrow-bounce"
          style={{ color: `${theme.primary}66` }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
        <span
          className="text-[#D8F3DC]/25 text-[0.58rem] tracking-[0.05em] uppercase text-center leading-none"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Toca para ver la realidad
        </span>
      </div>
    </div>
  );
});

const MythCardBack = memo(function MythCardBack({ myth, theme }) {
  return (
    <div
      className="absolute inset-0 rounded-2xl border p-5 flex flex-col gap-3 select-none overflow-hidden"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        background: `${theme.bg}, radial-gradient(circle at 85% 10%, ${theme.primary}25 0%, transparent 60%)`,
        borderColor: theme.border,
        boxShadow: `0 4px 20px ${theme.shadow}`,
        minHeight: 280,
        willChange: "transform",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className="text-[0.6rem] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full shrink-0 flex items-center gap-2"
          style={{
            backgroundColor: theme.badge,
            color: theme.primary,
            border: `1px solid ${theme.border}`,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <FaCheckCircle /> Realidad
        </span>
        <CardIcon icon={myth.realityIcon} color={theme.primary} />
      </div>

      <p
        className="text-[#D8F3DC]/80 leading-relaxed flex-1 text-sm"
        style={{ fontFamily: "'DM Sans', sans-serif", lineHeight: 1.65 }}
      >
        {myth.reality}
      </p>

      <div className="flex items-center gap-2 mt-auto">
        <FaPaw size={9} style={{ color: theme.primary }} />
        <span
          className="text-[0.6rem]"
          style={{ fontFamily: "'DM Sans', sans-serif", color: `${theme.primary}99` }}
        >
          Fuente: {myth.source}
        </span>
      </div>

      <div className="flex items-center justify-center gap-1.5">
        <span
          className="text-[#D8F3DC]/20 text-[0.6rem] tracking-widest uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Toca para volver
        </span>
      </div>
    </div>
  );
});

const MythCard = memo(function MythCard({ myth, index, isRevealed, onFlip, theme }) {
  const prefersReduced = useReducedMotion();

  return (
    <m.div
      variants={cardItemVariants}
      className="relative cursor-pointer"
      style={{ perspective: 1000, minHeight: 280 }}
      onClick={() => onFlip(myth.id)}
      role="button"
      aria-pressed={isRevealed}
      aria-label={
        isRevealed ? `Realidad: ${myth.realityShort}` : `Mito: ${myth.mythShort}`
      }
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onFlip(myth.id);
      }}
    >
      <m.div
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={
          prefersReduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 180, damping: 28, mass: 0.8 }
        }
        style={{
          transformStyle: "preserve-3d",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <MythCardFront myth={myth} theme={theme.myth} />
        <MythCardBack myth={myth} theme={theme.reality} />
      </m.div>
    </m.div>
  );
});

const StatsBar = memo(function StatsBar({ totalRevealed, totalMyths, progressPct }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 px-1">
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{
            backgroundColor: "rgba(45,161,79,0.10)",
            border: "1px solid rgba(45,161,79,0.25)",
          }}
        >
          <FaPaw size={12} color="#2DA14F" />
          <span className="text-[#D8F3DC]/70 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <span className="text-[#2DA14F] font-bold text-sm">{totalRevealed}</span>
            <span className="text-[#D8F3DC]/40"> / {totalMyths} mitos revelados</span>
          </span>
        </div>

        {totalRevealed === totalMyths && (
          <m.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-2"
            style={{
              backgroundColor: "#2DA14F20",
              color: "#2DA14F",
              border: "1px solid #2DA14F40",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <BiParty /> ¡Completado!
          </m.span>
        )}
      </div>

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
        <span className="text-[#2DA14F] text-xs font-semibold tabular-nums w-8 text-right" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {progressPct}%
        </span>
      </div>
    </div>
  );
});

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

export default function MythsVsReality() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [revealed, setRevealed] = useState(new Set());
  const [infoTooltip, setInfoTooltip] = useState(false);

  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, VIEWPORT_ONCE);

  const filtered = useMemo(
    () => activeCategory === "all"
      ? MYTHS
      : MYTHS.filter((m) => m.category === activeCategory),
    [activeCategory]
  );

  const totalRevealed = revealed.size;
  const totalMyths = MYTHS.length;
  const progressPct = Math.round((totalRevealed / totalMyths) * 100);
  const allCurrentShown = useMemo(
    () => filtered.every((m) => revealed.has(m.id)),
    [filtered, revealed]
  );

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
    setRevealed((prev) => {
      const next = new Set(prev);
      filtered.forEach((m) =>
        allCurrentShown ? next.delete(m.id) : next.add(m.id),
      );
      return next;
    });
  }, [allCurrentShown, filtered]);

  const handleShare = async (myth) => {
    const shareData = {
      title: "Mito vs realidad: Bienestar animal",
      text: `¡Sabías que es un mito que "${myth.mythShort}"? La realidad es: ${myth.reality}. Informate en: `,
      url: window.location.href,
    };

    try {
      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text} ${shareData.url}`,
        );
        toast.info("Enlace copiado al portapapeles");
      }
    } catch (e) {
      if (e.name !== "AbortError") {
        console.error("Error al compartir", e);
        toast.error("Error al compartir");
      }
    }
  };

  return (
    <LazyMotion features={domMax} strict>
      <section
        ref={sectionRef}
        id="mitos"
        className="relative w-full bg-[#212529] py-10 px-4 md:px-8 overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute rounded-full opacity-[0.06]"
            style={{
              width: 500,
              height: 500,
              background: "radial-gradient(circle, #FF8C42 0%, transparent 70%)",
              top: "10%",
              right: "10%",
            }}
          />
          <div
            className="absolute rounded-full opacity-[0.05]"
            style={{
              width: 400,
              height: 400,
              background: "radial-gradient(circle, #2DA14F 0%, transparent 70%)",
              bottom: "10%",
              left: "5%",
            }}
          />
        </div>

        <div className="relative max-w-300 mx-auto">
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

          <StatsBar 
            totalRevealed={totalRevealed} 
            totalMyths={totalMyths} 
            progressPct={progressPct} 
          />

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

            <div className="flex-1 hidden sm:block" />

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
                  <FaArrowsRotate /> Ocultar todos
                </>
              ) : (
                <>
                  <AiFillThunderbolt /> Revelar todos
                </>
              )}
            </m.button>
          </m.div>

          <AnimatePresence mode="popLayout" initial={false}>
            <m.div
              layout
              key={activeCategory}
              variants={cardListVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {filtered.map((myth, i) => (
                <MythCard
                  key={myth.id}
                  myth={myth}
                  index={i}
                  isRevealed={revealed.has(myth.id)}
                  onFlip={handleFlip}
                  theme={CARD_THEMES[i % CARD_THEMES.length]}
                />
              ))}
            </m.div>
          </AnimatePresence>

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
                onClick={() =>
                  handleShare({
                    mythShort:
                      "Los perros callejeros son agresivos por naturaleza",
                    reality:
                      "La mayoría de los perros callejeros son dóciles y temerosos. Su agresividad suele ser una respuesta al miedo, el dolor o la defensa de su territorio.",
                  })
                }
              >
                <FaShare /> Compartir datos
              </m.button>
              <div
                className="relative"
                onMouseEnter={() => setInfoTooltip(true)}
                onMouseLeave={() => setInfoTooltip(false)}
              >
                <m.button
                  whileHover={{ y: -2, borderColor: "rgba(255,140,66,0.28)" }}
                  className="flex items-center gap-2 px-5 py-2.75 rounded-xl text-sm font-semibold cursor-not-allowed"
                  style={{
                    color: "rgba(255,140,66,0.45)",
                    backgroundColor: "rgba(255,140,66,0.05)",
                    border: "1px solid rgba(255,140,66,0.14)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <FaBookOpen /> Más información
                </m.button>

                <AnimatePresence>
                  {infoTooltip && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "calc(100% + 12px)",
                        left: "50%",
                        translateX: "-50%",
                        zIndex: 50,
                        pointerEvents: "none",
                        display: "flex",
                        justifyContent: "center",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <m.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 24,
                          mass: 0.7,
                        }}
                        style={{
                          transformOrigin: "bottom center",
                          background:
                            "linear-gradient(135deg, rgba(30,32,36,0.97) 0%, rgba(22,24,28,0.99) 100%)",
                          border: "1px solid rgba(255,140,66,0.22)",
                          borderRadius: "14px",
                          padding: "12px 16px",
                          boxShadow:
                            "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,140,66,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
                          minWidth: 200,
                          backdropFilter: "blur(16px)",
                          WebkitBackdropFilter: "blur(16px)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 6,
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 26,
                              height: 26,
                              borderRadius: "8px",
                              background: "rgba(255,140,66,0.14)",
                              border: "1px solid rgba(255,140,66,0.28)",
                              color: "#FF8C42",
                              flexShrink: 0,
                            }}
                          >
                            <LuSparkles size={13} />
                          </span>
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              color: "#F0F0F0",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            Próximamente
                          </span>
                        </div>
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.7rem",
                            color: "rgba(216,243,220,0.45)",
                            lineHeight: 1.5,
                            margin: 0,
                            paddingLeft: "2px",
                            whiteSpace: "normal",
                            maxWidth: 200,
                          }}
                        >
                          Estamos preparando recursos y guías detalladas para ti.
                        </p>
                      </m.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
