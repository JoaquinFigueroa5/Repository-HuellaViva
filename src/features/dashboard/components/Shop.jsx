import { useRef, memo } from "react";
import { FaShoppingCart, FaWhatsapp, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import {
  LazyMotion,
  domMax,
  m,
  useInView,
} from "framer-motion";

import { SHOP } from "@/data/shopData";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 22,
      delay: i * 0.09,
    },
  }),
};

const VIEWPORT_ONCE = { once: true, margin: "-40px" };
const VIEWPORT_ONCE_80 = { once: true, margin: "-80px" };

const WA_LINK = `https://wa.me/${SHOP.waNumber}?text=${encodeURIComponent(SHOP.waMessage)}`;

const BenefitItem = memo(function BenefitItem({ label, desc, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT_ONCE);

  return (
    <m.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex items-start gap-3"
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
        style={{
          backgroundColor: "var(--color-hv-accent-emerald)15",
          border: "1px solid var(--color-hv-accent-emerald)30",
          color: "var(--color-hv-accent-emerald)",
        }}
      >
        <FaCheckCircle size={14} />
      </div>
      <div className="min-w-0">
        <p
          className="text-sm font-semibold text-[var(--color-hv-text-primary)] leading-snug"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {label}
        </p>
        <p
          className="text-[0.7rem] text-[var(--color-hv-text-primary)]/45 leading-tight mt-0.5"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {desc}
        </p>
      </div>
    </m.div>
  );
});

export default function ShopSection() {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, VIEWPORT_ONCE_80);

  return (
    <LazyMotion features={domMax} strict>
      <section
        ref={sectionRef}
        id="tienda-peluda"
        className="relative w-full bg-[var(--color-hv-base)] py-10 px-4 md:px-8 overflow-hidden"
      >
        <div className="relative max-w-300 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-center">
            {/* Brand side */}
            <m.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
            >
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-[var(--color-hv-accent-emerald)]/12 border border-[var(--color-hv-accent-emerald)]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-hv-accent-emerald)]" />
                <FaShoppingCart size={10} style={{ color: "var(--color-hv-accent-emerald)" }} />
                <span
                  className="text-[var(--color-hv-accent-emerald)] text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Tienda
                </span>
              </div>

              <h2
                className="leading-[1.1] tracking-[-0.03em] mb-4 text-[var(--color-hv-text-primary)]"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(2rem, 5vw, 3.4rem)",
                  fontWeight: 700,
                }}
              >
                {SHOP.name}
              </h2>

              <p
                className="text-[var(--color-hv-text-primary)]/50 max-w-md leading-relaxed mb-7"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                }}
              >
                {SHOP.tagline}
              </p>

              <m.a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -2,
                  boxShadow: "0 8px 28px rgba(37,211,102,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 py-3 px-6 rounded-xl no-underline font-semibold text-sm border-0 will-change-transform"
                style={{
                  backgroundColor: "#25D366",
                  color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 4px 20px rgba(37,211,102,0.25)",
                }}
              >
                <FaWhatsapp size={16} />
                Cotiza por WhatsApp
                <m.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                >
                  <FaArrowRight size={10} />
                </m.span>
              </m.a>
            </m.div>

            {/* Benefits side */}
            <div
              className="rounded-2xl border p-6 md:p-8"
              style={{
                borderColor: "rgba(232,251,253,0.08)",
                backgroundColor: "rgba(255,255,255,0.025)",
                backdropFilter: "blur(10px)",
              }}
            >
              <p
                className="text-[var(--color-hv-text-primary)]/40 text-[0.68rem] font-semibold tracking-widest uppercase mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                ¿Qué ofrecemos?
              </p>

              <div className="flex flex-col gap-5">
                {SHOP.benefits.map((item, i) => (
                  <BenefitItem key={item.label} label={item.label} desc={item.desc} index={i} />
                ))}
              </div>

              <div className="h-px bg-[var(--color-hv-text-primary)]/8 my-6" />

              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] pulse-dot" />
                <span
                  className="text-[#25D366] text-[0.65rem] font-semibold"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Cotiza hoy · Sin compromiso
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
