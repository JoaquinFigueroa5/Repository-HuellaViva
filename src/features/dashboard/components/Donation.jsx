import { useState, useRef, memo } from "react";
import {
  FaHeart,
  FaWhatsapp,
  FaArrowRight,
  FaChevronDown,
  FaDog,
  FaSyringe,
  FaPills,
  FaFlask,
  FaEye,
  FaShieldAlt,
  FaBandAid,
} from "react-icons/fa";
import {
  LazyMotion,
  domMax,
  m,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";

import {
  MEDICATIONS,
  HYGIENE_PRODUCTS,
  DELIVERY_INFO,
  WA_LINK,
} from "@/data/donationData";

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

const CategoryCard = memo(function CategoryCard({ category, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT_ONCE);

  return (
    <m.div
      ref={ref}
      custom={index}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="rounded-2xl border overflow-hidden will-change-transform cursor-pointer"
      style={{
        borderColor: `${category.color}28`,
        backgroundColor: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(10px)",
      }}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: `${category.color}15`,
              border: `1px solid ${category.color}30`,
            }}
          >
            {category.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="font-bold text-sm leading-snug mb-0.5"
              style={{ fontFamily: "'Fraunces', serif", color: "#D8F3DC" }}
            >
              {category.title}
            </p>
            <p
              className="text-[0.65rem] text-[#D8F3DC]/50"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {category.description}
            </p>
          </div>
          <m.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ color: `${category.color}60` }}
          >
            <FaChevronDown size={14} />
          </m.div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <m.div
              key="items"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="h-px bg-[#D8F3DC]/6 my-3" />
              <div className="flex flex-col gap-2">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-xl"
                    style={{
                      backgroundColor: `${category.color}06`,
                      border: `1px solid ${category.color}12`,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    <div className="min-w-0">
                      <p
                        className="text-[0.82rem] font-semibold text-[#D8F3DC] leading-snug mb-0.5"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {item.name}
                      </p>
                      {item.brand && (
                        <p
                          className="text-[0.65rem] text-[#D8F3DC]/40 mb-0.5"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {item.brand}
                        </p>
                      )}
                      <p
                        className="text-[0.6rem] text-[#D8F3DC]/30 italic"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {item.use}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
});

const DeliverySteps = memo(function DeliverySteps() {
  const steps = [
    { num: "1", title: "Revisa la lista", desc: "Elige los productos que puedas donar de las categorías disponibles arriba." },
    { num: "2", title: "Coordina por WhatsApp", desc: "Escríbenos para acordar el día y punto de entrega más cercano." },
    { num: "3", title: "Entrega tus insumos", desc: "Cada producto donado se convierte en tratamiento directo para un animal rescatado." },
  ];

  return (
    <div className="flex flex-col gap-4">
      {steps.map((step, i) => (
        <m.div
          key={step.num}
          custom={i}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="flex items-center gap-4 px-4 py-3.5 rounded-2xl border"
          style={{
            borderColor: "rgba(216,243,220,0.08)",
            backgroundColor: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shrink-0"
            style={{
              backgroundColor: "#2DA14F20",
              border: "1px solid #2DA14F50",
              color: "#2DA14F",
              fontFamily: "'Fraunces', serif",
            }}
          >
            {step.num}
          </div>
          <div className="min-w-0">
            <p
              className="font-semibold text-sm text-[#D8F3DC] leading-snug"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {step.title}
            </p>
            <p
              className="text-[0.7rem] text-[#D8F3DC]/50 leading-tight mt-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {step.desc}
            </p>
          </div>
        </m.div>
      ))}
    </div>
  );
});

const WhatsAppCard = memo(function WhatsAppCard() {
  return (
    <m.a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(37,211,102,0.35)" }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-5 p-5 rounded-2xl border no-underline group will-change-transform"
      style={{
        borderColor: "rgba(37,211,102,0.3)",
        background:
          "linear-gradient(135deg, rgba(37,211,102,0.10) 0%, rgba(37,211,102,0.04) 100%)",
        boxShadow: "0 4px 24px rgba(37,211,102,0.12)",
      }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={{
          backgroundColor: "#25D36620",
          border: "2px solid #25D36645",
        }}
      >
        <FaWhatsapp size={26} color="#25D366" />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="font-bold text-[#D8F3DC] text-base mb-1 leading-none"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Escríbenos ahora
        </p>
        <p
          className="text-[#D8F3DC]/50 text-xs leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Coordinamos la entrega de tus insumos y resolvemos cualquier duda.
        </p>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] pulse-dot" />
          <span
            className="text-[#25D366] text-[0.65rem] font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Respuesta rápida · Todos los días
          </span>
        </div>
      </div>
      <m.div
        animate={{ x: [0, 5, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.6,
          ease: "easeInOut",
        }}
        className="shrink-0 text-[#25D366]/50 group-hover:text-[#25D366] transition-colors duration-200"
      >
        <FaArrowRight />
      </m.div>
    </m.a>
  );
});

export default function DonationSection() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, VIEWPORT_ONCE_80);

  return (
    <LazyMotion features={domMax} strict>
      <section
        ref={sectionRef}
        id="donaciones"
        className="relative w-full bg-[#212529] py-10 px-4 md:px-8 overflow-hidden"
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
              background: "#2DA14F",
              top: "10%",
              left: "-10%",
            }}
          />
          <div
            className="absolute rounded-full blur-[100px] opacity-[0.06]"
            style={{
              width: 400,
              height: 400,
              background: "#FF8C42",
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
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-[#2DA14F]/12 border border-[#2DA14F]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2DA14F]" />
              <span>
                <FaSyringe size={10} color="#2DA14F" />
              </span>
              <span
                className="text-[#2DA14F] text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Ayuda con insumos
              </span>
            </div>

            <h2
              className="leading-[1.1] tracking-[-0.03em] mb-4 text-[#D8F3DC]"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(2rem, 5vw, 3.4rem)",
                fontWeight: 700,
              }}
            >
              Dona medicamentos{" "}
              <em className="not-italic text-[#FF8C42]">e insumos</em>
            </h2>

            <p
              className="text-[#D8F3DC]/50 max-w-md leading-relaxed"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              }}
            >
              Cada producto donado se convierte en tratamiento directo para un
              animal rescatado.
            </p>
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 xl:gap-12 items-start">
            <m.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
              className="flex flex-col gap-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      backgroundColor: "#2DA14F20",
                      border: "1px solid #2DA14F50",
                      color: "#2DA14F",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    1
                  </div>
                  <h3
                    className="text-[#D8F3DC] font-semibold text-base"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Medicamentos veterinarios
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MEDICATIONS.map((cat, i) => (
                    <CategoryCard key={cat.id} category={cat} index={i} />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#D8F3DC]/8" />
                <span
                  className="text-[#D8F3DC]/20 text-[0.65rem] uppercase tracking-widest"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  también necesitamos
                </span>
                <div className="flex-1 h-px bg-[#D8F3DC]/8" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      backgroundColor: "#FF8C4220",
                      border: "1px solid #FF8C4250",
                      color: "#FF8C42",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    2
                  </div>
                  <h3
                    className="text-[#D8F3DC] font-semibold text-base"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Productos de higiene medicados
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {HYGIENE_PRODUCTS.map((cat, i) => (
                    <CategoryCard key={cat.id} category={cat} index={i} />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#D8F3DC]/8" />
                <span
                  className="text-[#D8F3DC]/20 text-[0.65rem] uppercase tracking-widest"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  ¿cómo entregar?
                </span>
                <div className="flex-1 h-px bg-[#D8F3DC]/8" />
              </div>

              <DeliverySteps />

              <div
                className="rounded-2xl border p-4"
                style={{
                  borderColor: "rgba(255,140,66,0.2)",
                  backgroundColor: "rgba(255,140,66,0.05)",
                }}
              >
                <p
                  className="text-[0.72rem] text-[#FF8C42]/70 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span className="font-semibold text-[#FF8C42]">
                    Requisito:
                  </span>{" "}
                  {DELIVERY_INFO.requirementNote}
                </p>
              </div>

              <WhatsAppCard />
            </m.div>

            <m.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
              className="flex flex-col gap-5 lg:sticky lg:top-24"
            >
              <div
                className="p-6 rounded-3xl border"
                style={{
                  borderColor: "#2DA14F20",
                  backgroundColor: "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 32px rgba(45,161,79,0.10)",
                }}
              >
                <p
                  className="text-[#D8F3DC]/40 text-[0.68rem] font-semibold tracking-widest uppercase mb-4"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Así ayudan tus donaciones
                </p>

                <div className="flex flex-col gap-4">
                  {[
                    { icon: <FaSyringe size={16} color="#2DA14F" />, step: "Medicamento donado", desc: "Se aplica directamente a animales rescatados" },
                    { icon: <FaHeart size={16} color="#FF8C42" />, step: "Tratamiento completo", desc: "Cubrimos desparasitación, curación y recuperación" },
                    { icon: <FaDog size={16} color="#2DA14F" />, step: "Animal sano y adoptable", desc: "Cada insumo ayuda a prepararlos para su adopción" },
                  ].map((item, i) => (
                    <div
                      key={item.step}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: i % 2 === 0 ? "#2DA14F15" : "#FF8C4215",
                          border: `1px solid ${i % 2 === 0 ? "#2DA14F30" : "#FF8C4230"}`,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-[0.78rem] font-semibold text-[#D8F3DC] leading-snug"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {item.step}
                        </p>
                        <p
                          className="text-[0.65rem] text-[#D8F3DC]/40 leading-tight"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <m.div
                whileHover={{ y: -2 }}
                className="p-5 rounded-2xl border border-[#D8F3DC]/8 relative overflow-hidden cursor-default will-change-transform"
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                  style={{ backgroundColor: "#FF8C42" }}
                />
                <p
                  className="text-[#D8F3DC]/65 text-sm leading-relaxed mb-3 pl-3"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  "Gracias a la donación de medicamentos e insumos de nuestra
                  comunidad, hemos logrado tratar a cientos de animales
                  rescatados este año. Cada producto cuenta."
                </p>
              </m.div>

              <m.a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -2,
                  boxShadow: "0 8px 28px rgba(37,211,102,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl no-underline font-semibold text-sm border-0 will-change-transform"
                style={{
                  backgroundColor: "#25D366",
                  color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 2px 16px rgba(37,211,102,0.35)",
                }}
              >
                <FaWhatsapp size={16} />
                ¿Dudas? Escríbenos
              </m.a>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
