import { useRef } from "react"
import { m, useInView, LazyMotion, domMax } from "framer-motion"
import { FaPaw } from "react-icons/fa"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 },
  }),
}

export default function RecognitionBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <LazyMotion features={domMax} strict>
      <section
        ref={ref}
        className="relative w-full bg-[var(--color-hv-base)] py-14 md:py-18 overflow-hidden"
      >
        <div className="relative max-w-lg mx-auto px-4 text-center">
          <m.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border"
            style={{
              backgroundColor: "rgba(0,184,204,0.10)",
              borderColor: "rgba(0,184,204,0.28)",
            }}
          >
            <FaPaw size={10} color="var(--color-hv-primary)" />
            <span
              className="text-[0.62rem] font-semibold tracking-[0.16em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--color-hv-primary)" }}
            >
              Reconocimiento especial
            </span>
          </m.div>

          <m.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mb-5"
          >
            <div
              className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{
                backgroundColor: "rgba(0,184,204,0.12)",
                border: "2px solid rgba(0,184,204,0.30)",
              }}
            >
              <span
                className="font-bold text-lg"
                style={{ fontFamily: "'Fraunces', serif", color: "var(--color-hv-primary)" }}
              >
                MA
              </span>
            </div>

            <h2
              className="leading-[1.1] tracking-[-0.02em] mb-2"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 700,
                color: "var(--color-hv-primary)",
              }}
            >
              Marleny Aguilar
            </h2>

            <p
              className="text-[var(--color-hv-text-primary)]/45 max-w-xs mx-auto leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem" }}
            >
              Por su invaluable compromiso con el bienestar y la protección de los animales en Guatemala.
            </p>
          </m.div>

          <m.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex items-center justify-center gap-3"
          >
            <div
              className="h-px flex-1"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(0,184,204,0.30) 50%, transparent 100%)",
              }}
            />
            <span className="text-[0.6rem] text-[var(--color-hv-text-primary)]/20 uppercase tracking-[0.2em]">
              Gracias
            </span>
            <div
              className="h-px flex-1"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(0,184,204,0.30) 50%, transparent 100%)",
              }}
            />
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
