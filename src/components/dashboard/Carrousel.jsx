import { useState, useEffect, useCallback, useRef } from "react";
import {
  FaPaw as PawSmall,
  FaChevronLeft as ChevronLeft,
  FaChevronRight as ChevronRight,
  FaArrowRight as ArrowRight,
  FaPlay as PlayIcon,
  FaPause as PauseIcon,
} from "react-icons/fa";
import {
  LazyMotion,
  domMax,
  m,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";


const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1600&q=80",
    badge: "El abandono es una crisis",
    title: "Millones de animales buscan un hogar",
    description:
      "Cada año, miles de perros y gatos son abandonados en las calles de Guatemala. Solos, hambrientos y sin esperanza. Tú puedes ser su voz.",
    stat: { value: "3M+", label: "animales en situación de calle" },
    accent: "#2DA14F",
    cta: "Conoce el problema",
    ref: "#mitos"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&q=80",
    badge: "Adopta, no compres",
    title: "Un acto de amor que transforma vidas",
    description:
      "Adoptar a un animal rescatado no solo le da un hogar: transforma tu vida y la de toda una familia. El amor de un animal rescatado no tiene comparación.",
    stat: { value: "68%", label: "de adoptantes reportan mayor bienestar" },
    accent: "#FF8C42",
    cta: "Ver mitos y realidades",
    ref: "#mitos"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1600&q=80",
    badge: "Juntos podemos más",
    title: "Tu apoyo marca la diferencia",
    description:
      "Con donaciones, voluntariado o simplemente compartiendo nuestra causa, contribuyes a rescatar, curar y encontrar hogar a los animales más vulnerables.",
    stat: { value: "1,200+", label: "animales rescatados este año" },
    accent: "#D8F3DC",
    cta: "Quiero ayudar",
    ref: "#donaciones"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1472491235688-bdc81a63246e?w=1600&q=80",
    badge: "Historias reales",
    title: "Cada rescate tiene nombre propio",
    description:
      "Detrás de cada animal hay una historia de sufrimiento convertida en esperanza. Conoce a quienes encontraron su segunda oportunidad gracias a personas como tú.",
    stat: { value: "94%", label: "de rescates terminan en adopción exitosa" },
    accent: "#FF8C42",
    cta: "Leer historias",
    ref: "#historias"
  },
];

const DURATION = 6000;

const bgVariants = {
  enter: (dir) => ({
    x: dir === "next" ? "6%" : "-6%",
    scale: 1.08,
    opacity: 0,
  }),
  center: {
    x: "0%",
    scale: 1,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 220, damping: 30 },
      scale: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
      opacity: { duration: 0.6 },
    },
  },
  exit: (dir) => ({
    x: dir === "next" ? "-6%" : "6%",
    scale: 1.04,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 220, damping: 30 },
      scale: { duration: 0.7 },
      opacity: { duration: 0.5 },
    },
  }),
};

const kenBurnsVariants = {
  animate: {
    scale: [1, 1.06],
    transition: { duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
  exit: {
    opacity: 0,
    transition: { when: "afterChildren", staggerChildren: 0.03, staggerDirection: -1, duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 260, damping: 25 },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(2px)",
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.82, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 130, damping: 18 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

const chipVariants = {
  hidden: { opacity: 0, x: 12, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { delay: 0.5 + i * 0.1, type: "spring", stiffness: 200, damping: 24 },
  }),
  exit: { opacity: 0, x: 8, transition: { duration: 0.2 } },
};

const controlsVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5, ease: "easeOut" } },
};


export default function HeroCarousel() {
  const prefersReduced = useReducedMotion();

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("next");
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const intervalRef = useRef(null);
  const rafRef = useRef(null);
  const startTs = useRef(null);
  const isAnimating = useRef(false);

  const startProgress = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    startTs.current = null;
    setProgress(0);

    const step = (ts) => {
      if (!startTs.current) startTs.current = ts;
      const pct = Math.min(((ts - startTs.current) / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  const goTo = useCallback((index, dir = "next") => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setDirection(dir);
    setCurrent(index);
    setTimeout(() => { isAnimating.current = false; }, 750);
  }, []);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length, "next"), [current, goTo]);
  const prev_ = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length, "prev"), [current, goTo]);

  useEffect(() => {
    if (paused) {
      clearInterval(intervalRef.current);
      cancelAnimationFrame(rafRef.current);
      return;
    }
    startProgress();
    intervalRef.current = setInterval(next, DURATION);
    return () => {
      clearInterval(intervalRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [current, paused, next, startProgress]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev_();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [next, prev_]);

  const slide = SLIDES[current];

  const safeItem = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : itemVariants;

  const safeBg = prefersReduced
    ? { enter: { opacity: 0 }, center: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0 } }
    : bgVariants;

  return (
    <>
      <LazyMotion features={domMax} strict>
        <section
          className="relative w-full overflow-hidden bg-[#212529]"
          style={{ height: "100svh", minHeight: 520 }}
        >

          <AnimatePresence custom={direction} mode="sync">
            <m.div
              key={`bg-${current}`}
              custom={direction}
              variants={safeBg}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 will-change-transform"
              style={{ zIndex: 0 }}
            >
              {!prefersReduced ? (
                <m.div
                  className="absolute inset-0 bg-center bg-cover"
                  style={{ backgroundImage: `url(${slide.image})` }}
                  variants={kenBurnsVariants}
                  animate="animate"
                />
              ) : (
                <div
                  className="absolute inset-0 bg-center bg-cover"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
              )}
            </m.div>
          </AnimatePresence>

          <AnimatePresence mode="sync">
            <m.div
              key={`overlay-${current}`}
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 1 }}
            >
              <div className="absolute inset-0 bg-[#212529]/58" />
              <div className="absolute inset-0 bg-linear-to-r from-[#212529]/88 via-[#212529]/40 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-t from-[#212529]/72 via-transparent to-[#212529]/15" />
            </m.div>
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            <m.div
              key={`content-${current}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 flex items-center"
              style={{ zIndex: 2 }}
            >
              <div className="w-full max-w-300 mx-auto px-6 md:px-12 lg:px-16">
                <div className="max-w-155">

                  <m.div variants={safeItem} className="inline-flex items-center gap-2 mb-5">
                    <span
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.67rem] font-semibold tracking-[0.13em] uppercase border"
                      style={{
                        color: slide.accent,
                        borderColor: `${slide.accent}55`,
                        backgroundColor: `${slide.accent}18`,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      <span className="live-dot w-1.5 h-1.5 rounded-full" style={{ background: slide.accent }} />
                      <PawSmall size={11} />
                      {slide.badge}
                    </span>
                  </m.div>

                  <m.h2
                    variants={safeItem}
                    className="text-[#D8F3DC] leading-[1.08] tracking-[-0.03em] mb-5"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: "clamp(2rem, 5.5vw, 4rem)",
                      fontWeight: 700,
                    }}
                  >
                    {slide.title.split(" ").map((word, wi, arr) =>
                      wi >= arr.length - 2 ? (
                        <em key={wi} className="not-italic" style={{ color: slide.accent }}>{word} </em>
                      ) : (
                        <span key={wi}>{word} </span>
                      )
                    )}
                  </m.h2>

                  <m.p
                    variants={safeItem}
                    className="text-[#D8F3DC]/70 leading-relaxed mb-8"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
                      maxWidth: 480,
                    }}
                  >
                    {slide.description}
                  </m.p>

                  <m.div variants={statVariants} className="flex flex-wrap items-center gap-4 md:gap-6">

                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl border"
                      style={{
                        borderColor: `${slide.accent}30`,
                        backgroundColor: `${slide.accent}12`,
                      }}
                    >
                      <span
                        className="font-bold leading-none"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontSize: "clamp(1.6rem, 3vw, 2rem)",
                          color: slide.accent,
                        }}
                      >
                        {slide.stat.value}
                      </span>
                      <span
                        className="text-[#D8F3DC]/60 text-xs leading-tight max-w-27.5"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {slide.stat.label}
                      </span>
                    </div>

                    <m.button
                      whileHover={{ y: -3, boxShadow: `0 10px 32px ${slide.accent}55` }}
                      whileTap={{ y: 0, scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      className="group flex items-center gap-2 border-0 cursor-pointer rounded-xl px-6 py-3.25 text-sm font-semibold transition-colors duration-200"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        backgroundColor: slide.accent,
                        boxShadow: `0 2px 18px ${slide.accent}45`,
                        color: slide.accent === "#D8F3DC" ? "#212529" : "#fff",
                      }}
                      onClick={() => document.location.href = slide.ref}
                    >
                      {slide.cta}
                      <m.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                      >
                        <ArrowRight size={14} />
                      </m.span>
                    </m.button>
                  </m.div>
                </div>
              </div>
            </m.div>
          </AnimatePresence>

          <m.div
            variants={controlsVariants}
            initial="hidden"
            animate="visible"
            className="absolute bottom-0 left-0 right-0 z-20 flex gap-0.75"
          >
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i, i > current ? "next" : "prev")}
                className="relative flex-1 h-0.75 bg-[#D8F3DC]/20 cursor-pointer border-0 p-0 overflow-hidden"
              >
                <span
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    backgroundColor:
                      i === current ? slide.accent : i < current ? "#D8F3DC" : "transparent",
                    width: i === current ? `${progress}%` : i < current ? "100%" : "0%",
                    transition: i === current ? "none" : "width 0.3s ease",
                  }}
                />
              </button>
            ))}
          </m.div>

          <m.div
            variants={controlsVariants}
            initial="hidden"
            animate="visible"
            className="absolute bottom-8 right-6 md:right-12 z-20 flex items-center gap-3"
          >
            <span
              className="text-[#D8F3DC]/50 text-xs font-medium tabular-nums"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="text-[#D8F3DC] font-semibold">
                {String(current + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(SLIDES.length).padStart(2, "0")}
            </span>

            <m.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setPaused((p) => !p)}
              className="w-8 h-8 rounded-full flex items-center justify-center border-0 cursor-pointer text-[#D8F3DC]/60 bg-[#D8F3DC]/10 hover:bg-[#D8F3DC]/20 hover:text-[#D8F3DC] transition-colors duration-200"
            >
              {paused ? <PlayIcon size={12} /> : <PauseIcon size={12} />}
            </m.button>
          </m.div>

          <m.div
            variants={controlsVariants}
            initial="hidden"
            animate="visible"
            className="absolute bottom-6 left-6 md:left-12 z-20 flex gap-2"
          >
            {[{ fn: prev_, icon: <ChevronLeft size={16} />, dir: -1 }, { fn: next, icon: <ChevronRight size={16} />, dir: 1 }].map(
              ({ fn, icon, dir: d }, idx) => (
                <m.button
                  key={idx}
                  onClick={fn}
                  whileHover={{ x: d * 2, backgroundColor: "rgba(216,243,220,0.15)" }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center border border-[#D8F3DC]/20 bg-[#D8F3DC]/[0.07] text-[#D8F3DC]/60 cursor-pointer hover:text-[#D8F3DC] hover:border-[#D8F3DC]/35 transition-colors duration-200"
                >
                  {icon}
                </m.button>
              )
            )}
          </m.div>

          <m.div
            variants={controlsVariants}
            initial="hidden"
            animate="visible"
            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2.5"
          >
            {SLIDES.map((s, i) => (
              <m.button
                key={s.id}
                onClick={() => goTo(i, i > current ? "next" : "prev")}
                animate={{
                  width: i === current ? 10 : 6,
                  height: i === current ? 10 : 6,
                  opacity: i === current ? 1 : 0.4,
                  boxShadow: i === current ? `0 0 12px ${slide.accent}90` : "none",
                }}
                whileHover={{ opacity: 0.8, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="rounded-full border-0 cursor-pointer p-0"
                style={{ backgroundColor: i === current ? slide.accent : "#D8F3DC" }}
              />
            ))}
          </m.div>

          <div className="hidden lg:flex absolute right-20 top-1/2 -translate-y-1/2 z-20 flex-col gap-2">
            <AnimatePresence mode="popLayout">
              {SLIDES.map((s, i) => {
                if (i === current) return null;
                return (
                  <m.button
                    key={`chip-${s.id}`}
                    custom={i}
                    variants={chipVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{ x: -3, opacity: 0.85 }}
                    onClick={() => goTo(i, i > current ? "next" : "prev")}
                    className="text-left max-w-32.5 px-3 py-1.5 rounded-lg bg-[#212529]/50 backdrop-blur-sm border border-[#D8F3DC]/10 text-[#D8F3DC]/45 text-[0.65rem] leading-tight cursor-pointer transition-colors duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {s.badge}
                  </m.button>
                );
              })}
            </AnimatePresence>
          </div>
        </section>
      </LazyMotion>
    </>
  );
}