/**
 * ScrollToTop.jsx
 * Botón flotante para volver al inicio de la página.
 *
 * Optimizaciones aplicadas:
 *  - useReducedMotion → respeta preferencia del sistema
 *  - throttle manual en el scroll listener con rAF → no satura el hilo principal
 *  - React.memo → no se re-renderiza si no cambian props (no tiene props)
 *  - Variantes declaradas fuera del componente → objeto estable entre renders
 *  - Animaciones solo en transform + opacity → GPU-composited
 */

import { useState, useEffect, useRef, memo } from "react";
import { m, LazyMotion, domMax, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaPaw } from "react-icons/fa";

// ─── Constantes ───────────────────────────────────────────────────────────────

/** El botón aparece después de scrollear este número de píxeles */
const SHOW_AFTER_PX = 400;

// ─── Variantes — fuera del componente, se crean una sola vez ─────────────────

/** Entrada/salida del botón completo */
const buttonVariants = {
  hidden: {
    opacity: 0,
    scale: 0.6,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    y: 16,
    transition: {
      duration: 0.22,
      ease: "easeIn",
    },
  },
};

/** Icono de patita — rebote suave en hover */
const pawVariants = {
  rest: { rotate: 0, y: 0 },
  hover: { rotate: -15, y: -3, transition: { type: "spring", stiffness: 400, damping: 18 } },
};

/** Indicador de progreso — no necesita variants, se anima directo */

// ─── Componente ───────────────────────────────────────────────────────────────

const ScrollToTop = memo(function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);   // 0-100, para el arco SVG
  const [hovered, setHovered] = useState(false);

  const rafRef = useRef(null);
  const prefersReduced = useReducedMotion();

  // ── Listener de scroll con throttle via rAF ──────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;           // ya hay un frame pendiente, ignorar

      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0;

        setVisible(scrollY > SHOW_AFTER_PX);
        setProgress(pct);
        rafRef.current = null;             // liberar para el próximo evento
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Scroll suave al top ──────────────────────────────────────────────────
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? "instant" : "smooth" });
  };

  // ── Arco SVG circular de progreso ────────────────────────────────────────
  const RADIUS = 22;                        // radio del círculo (px)
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;    // longitud total del arco
  const strokeDash = (progress / 100) * CIRCUMFERENCE;

  return (
    <LazyMotion features={domMax} strict>
      <AnimatePresence>
        {visible && (
          <m.button
            key="scroll-top"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onClick={scrollToTop}
            aria-label="Volver al inicio de la página"
            className="
              fixed bottom-8 right-6 md:right-10 z-50
              w-14 h-14
              flex items-center justify-center
              rounded-full border-0 cursor-pointer
              will-change-transform
            "
            style={{
              background: "rgba(33, 37, 41, 0.85)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              boxShadow: hovered
                ? "0 8px 32px rgba(45,161,79,0.50), 0 0 0 1px rgba(45,161,79,0.35)"
                : "0 4px 20px rgba(0,0,0,0.45), 0 0 0 1px rgba(216,243,220,0.08)",
              transition: "box-shadow 0.3s ease",
            }}
          >
            {/* ── Anillo de progreso SVG ── */}
            <svg
              className="absolute inset-0 -rotate-90"
              width="56"
              height="56"
              viewBox="0 0 56 56"
              aria-hidden="true"
            >
              {/* Track */}
              <circle
                cx="28"
                cy="28"
                r={RADIUS}
                fill="none"
                stroke="rgba(216,243,220,0.08)"
                strokeWidth="2.5"
              />
              {/* Progress arc */}
              <circle
                cx="28"
                cy="28"
                r={RADIUS}
                fill="none"
                stroke="#2DA14F"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={`${strokeDash} ${CIRCUMFERENCE}`}
                style={{
                  transition: prefersReduced ? "none" : "stroke-dasharray 0.15s linear",
                  filter: progress > 10 ? "drop-shadow(0 0 4px rgba(45,161,79,0.7))" : "none",
                }}
              />
            </svg>

            {/* ── Icono central ── */}
            <m.span
              variants={pawVariants}
              animate={hovered ? "hover" : "rest"}
              className="relative z-10 flex items-center justify-center"
            >
              {hovered ? (
                /* Flecha hacia arriba al hacer hover */
                <m.svg
                  key="arrow"
                  initial={{ opacity: 0, y: 6, scale: 0.7 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 340, damping: 22 }}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2DA14F"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </m.svg>
              ) : (
                /* Patita en reposo */
                <m.span
                  key="paw"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 340, damping: 22 }}
                >
                  <FaPaw size={18} color="#D8F3DC" />
                </m.span>
              )}
            </m.span>

            {/* ── Tooltip ── */}
            <AnimatePresence>
              {hovered && (
                <m.span
                  key="tooltip"
                  initial={{ opacity: 0, x: 8, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 6, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  className="
                    absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2
                    whitespace-nowrap
                    px-3 py-1.5 rounded-lg
                    text-[0.68rem] font-semibold
                    pointer-events-none select-none
                  "
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "rgba(33,37,41,0.92)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(45,161,79,0.3)",
                    color: "#D8F3DC",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
                  }}
                >
                  Volver al inicio
                  {/* Triángulo apuntando al botón */}
                  <span
                    className="absolute top-1/2 -translate-y-1/2 -right-1.25"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "5px solid transparent",
                      borderBottom: "5px solid transparent",
                      borderLeft: "5px solid rgba(45,161,79,0.3)",
                    }}
                  />
                </m.span>
              )}
            </AnimatePresence>

            {/* ── Porcentaje de scroll (solo si >5%) ── */}
            <AnimatePresence>
              {progress > 5 && !hovered && (
                <m.span
                  key="pct"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="
                    absolute -top-2 -right-1
                    w-5.5 h-5.5
                    rounded-full
                    flex items-center justify-center
                    text-[0.5rem] font-bold
                    pointer-events-none
                  "
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "#2DA14F",
                    color: "#212529",
                    boxShadow: "0 2px 8px rgba(45,161,79,0.5)",
                  }}
                >
                  {Math.round(progress)}
                </m.span>
              )}
            </AnimatePresence>

          </m.button>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
});

export default ScrollToTop;