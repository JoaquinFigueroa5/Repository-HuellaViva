import { useState, useEffect, memo } from "react";
import {
  m,
  LazyMotion,
  domMax,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { FaPaw, FaArrowUp } from "react-icons/fa";

const SHOW_AFTER_PX = 400;
const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    y: 16,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

const ScrollToTop = memo(function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0;

      if (scrollY > SHOW_AFTER_PX !== visible)
        setVisible(scrollY > SHOW_AFTER_PX);

      const roundedPct = Math.round(pct);
      setProgress((prev) => (prev !== roundedPct ? roundedPct : prev));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [visible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "instant" : "smooth",
    });
  };

  const strokeDashoffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

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
            aria-label="Volver al inicio"
            className="fixed bottom-8 right-6 md:right-10 z-50 w-14 h-14 flex items-center justify-center rounded-full border-0 cursor-pointer will-change-transform"
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
            <svg
              className="absolute inset-0 -rotate-90"
              width="56"
              height="56"
              viewBox="0 0 56 56"
            >
              <circle
                cx="28"
                cy="28"
                r={RADIUS}
                fill="none"
                stroke="rgba(216,243,220,0.08)"
                strokeWidth="2.5"
              />
              <m.circle
                cx="28"
                cy="28"
                r={RADIUS}
                fill="none"
                stroke="#2DA14F"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{ strokeDashoffset }}
                style={{ strokeDasharray: CIRCUMFERENCE }}
                transition={{ type: "tween", ease: "linear", duration: 0.1 }}
              />
            </svg>

            <m.div className="relative z-10">
              <AnimatePresence mode="wait">
                {hovered ? (
                  <m.div
                    key="arrow"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    <FaArrowUp size={18} color="#D8F3DC" />
                  </m.div>
                ) : (
                  <m.div
                    key="paw"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FaPaw size={18} color="#D8F3DC" />
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>

            <AnimatePresence>
              {progress > 5 && !hovered && (
                <m.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute -top-2 -right-1 w-5.5 h-5.5 rounded-full flex items-center justify-center text-[0.5rem] font-bold"
                  style={{ background: "#2DA14F", color: "#212529" }}
                >
                  {progress}
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
