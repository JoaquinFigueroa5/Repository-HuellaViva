import { useRef, memo } from "react";
import { FaEye, FaHeart, FaShareAlt, FaHandshake, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import {
  LazyMotion,
  domMax,
  m,
  useInView,
} from "framer-motion";

import { BRAND_INVITE } from "@/data/brandInviteData";

const BENEFIT_ICONS = {
  eye: <FaEye size={20} />,
  heart: <FaHeart size={20} />,
  share: <FaShareAlt size={20} />,
};

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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 18,
      delay: i * 0.07,
    },
  }),
};

const VIEWPORT_ONCE = { once: true, margin: "-40px" };
const VIEWPORT_ONCE_80 = { once: true, margin: "-80px" };

const WA_LINK = `https://wa.me/${BRAND_INVITE.waNumber}?text=${encodeURIComponent(BRAND_INVITE.waMessage)}`;
const MAIL_LINK = `mailto:${BRAND_INVITE.email}`;

const BenefitCard = memo(function BenefitCard({ benefit, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT_ONCE);

  return (
    <m.div
      ref={ref}
      custom={index}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="rounded-2xl border overflow-hidden will-change-transform"
      style={{
        borderColor: "rgba(232,251,253,0.08)",
        backgroundColor: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="p-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{
            backgroundColor: "var(--color-hv-primary)15",
            border: "1px solid var(--color-hv-primary)30",
            color: "var(--color-hv-primary)",
          }}
        >
          {BENEFIT_ICONS[benefit.iconId]}
        </div>
        <h3
          className="font-bold text-sm leading-snug mb-2"
          style={{ fontFamily: "'Fraunces', serif", color: "var(--color-hv-text-primary)" }}
        >
          {benefit.label}
        </h3>
        <p
          className="text-[0.72rem] leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(232,251,253,0.45)" }}
        >
          {benefit.desc}
        </p>
      </div>
    </m.div>
  );
});

export default function BrandInvite() {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, VIEWPORT_ONCE_80);

  return (
    <LazyMotion features={domMax} strict>
      <section
        ref={sectionRef}
        id="marcas-aliadas"
        className="relative w-full bg-[var(--color-hv-base)] py-10 px-4 md:px-8 overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute rounded-full blur-[130px] opacity-[0.07]"
            style={{
              width: 600,
              height: 600,
              background: "var(--color-hv-primary)",
              top: "10%",
              left: "-10%",
            }}
          />
          <div
            className="absolute rounded-full blur-[100px] opacity-[0.06]"
            style={{
              width: 400,
              height: 400,
              background: "var(--color-hv-accent-emerald)",
              bottom: "10%",
              right: "5%",
            }}
          />
        </div>

        <div className="relative max-w-300 mx-auto">
          <m.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="flex flex-col items-center text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-[var(--color-hv-primary)]/12 border border-[var(--color-hv-primary)]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-hv-primary)]" />
              <span>
                <FaHandshake size={10} style={{ color: "var(--color-hv-primary)" }} />
              </span>
              <span
                className="text-[var(--color-hv-primary)] text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {BRAND_INVITE.badge}
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
              {BRAND_INVITE.title}
            </h2>

            <p
              className="text-[var(--color-hv-text-primary)]/50 max-w-lg leading-relaxed"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              }}
            >
              {BRAND_INVITE.description}
            </p>
          </m.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {BRAND_INVITE.benefits.map((benefit, i) => (
              <BenefitCard key={benefit.iconId} benefit={benefit} index={i} />
            ))}
          </div>

          <m.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
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
              WhatsApp
            </m.a>

            <m.a
              href={MAIL_LINK}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl no-underline font-semibold text-sm border will-change-transform"
              style={{
                borderColor: "rgba(232,251,253,0.15)",
                color: "var(--color-hv-text-primary)",
                fontFamily: "'DM Sans', sans-serif",
                backgroundColor: "rgba(255,255,255,0.03)",
              }}
            >
              <FaEnvelope size={16} />
              Escríbenos
            </m.a>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
