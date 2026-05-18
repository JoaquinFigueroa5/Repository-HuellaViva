import { useRef } from "react";
import { m, useInView, LazyMotion, domMax } from "framer-motion";
import { FaPaw } from "react-icons/fa";

const LOGOS = [
  { id: 1, name: "Armonia Animal Radio y TV", src: "/logo_radioTV.png" },
  { id: 2, name: "Armonia Animal Radio", src: "/logo_radio.png" },
  { id: 3, name: "Armonia Animal TV", src: "/logo_TV.png" },
];

const COPIES = 5;
const TRACK = Array.from({ length: COPIES }, () => LOGOS).flat();

const CARD_W = 148;
const GAP = 20;
const SET_W = LOGOS.length * (CARD_W + GAP);

const DURATION = 20;

export default function LogoSlider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <LazyMotion features={domMax} strict>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,400&display=swap');

        @keyframes hv-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(${-SET_W}px); }
        }
        .hv-track {
          animation: hv-marquee ${DURATION}s linear infinite;
          will-change: transform;
        }
        .hv-track:hover { animation-play-state: paused; }

        @keyframes hv-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .hv-divider-shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(45,161,79,0.55) 40%,
            rgba(216,243,220,0.25) 50%,
            rgba(45,161,79,0.55) 60%,
            transparent 100%
          );
          background-size: 200% auto;
          animation: hv-shimmer 3.5s linear infinite;
        }

        .hv-logo-card {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.3s ease,
                      border-color 0.3s ease;
        }
        .hv-logo-card:hover {
          transform: translateY(-4px) scale(1.06);
          box-shadow: 0 12px 36px rgba(45,161,79,0.22);
          border-color: rgba(45,161,79,0.40) !important;
        }
        .hv-logo-card img {
          filter: grayscale(1) brightness(0.65);
          transition: filter 0.35s ease;
        }
        .hv-logo-card:hover img {
          filter: grayscale(0) brightness(1);
        }
      `}</style>

      <section
        ref={ref}
        className="relative w-full bg-[#212529] py-16 overflow-hidden"
      >
        {/* ── Fondo decorativo ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          {/* Patrón de puntos sutil */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #D8F3DC 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          {/* ── Línea shimmer superior ── */}
          <m.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="hv-divider-shimmer h-px w-full mb-8"
          />

          {/* ── Carrusel ── */}
          {/* overflow-x:clip corta los logos laterales sin crear scroll
              overflow-y:visible deja que box-shadow y scale del hover respiren */}
          <div
            className="relative"
            style={{ overflowX: "clip", overflowY: "visible" }}
          >
            {/* Fade izquierda */}
            <div
              className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, #212529 0%, transparent 100%)",
              }}
            />
            {/* Fade derecha */}
            <div
              className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(270deg, #212529 0%, transparent 100%)",
              }}
            />

            <div
              className="hv-track flex items-center gap-5"
              style={{ paddingTop: 16, paddingBottom: 16 }}
            >
              {TRACK.map((logo, i) => (
                <LogoCard key={`${logo.id}-${i}`} logo={logo} />
              ))}
            </div>
          </div>

          {/* ── Línea shimmer inferior ── */}
          <m.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
            className="hv-divider-shimmer h-px w-full mt-8"
          />
        </div>
      </section>
    </LazyMotion>
  );
}

/* ── Tarjeta individual de logo ── */
function LogoCard({ logo }) {
  return (
    <div
      className="hv-logo-card shrink-0 flex items-center justify-center rounded-2xl border cursor-default"
      style={{
        width: 148,
        height: 72,
        backgroundColor: "rgba(216,243,220,0.032)",
        borderColor: "rgba(216,243,220,0.08)",
      }}
      title={logo.name}
    >
      {logo.src ? (
        <img
          src={logo.src}
          alt={logo.name}
          className="max-w-24 max-h-24 object-contain select-none"
          draggable={false}
        />
      ) : (
        /* Placeholder cuando no hay imagen */
        <span
          className="text-[0.7rem] font-semibold text-center px-3 leading-tight"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(216,243,220,0.25)",
          }}
        >
          {logo.name}
        </span>
      )}
    </div>
  );
}
