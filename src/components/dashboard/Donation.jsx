import { useState, useRef, useCallback, memo } from "react";
import {
  FaPaw,
  FaHeart,
  FaWhatsapp,
  FaCopy,
  FaCheck,
  FaUniversity,
  FaArrowRight,
  FaDog,
  FaSyringe,
  FaStethoscope,
  FaHeartbeat,
  FaHome,
  FaBullhorn
} from "react-icons/fa";
import { LuHandPlatter } from "react-icons/lu";
import {
  LazyMotion,
  domMax,
  m,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { toast } from "sonner";

const IMPACT_AMOUNTS = [
  {
    value: "Q 50",
    impact: "Alimenta a un rescatado por 1 semana",
    emoji: <FaDog size={32} color="#2DA14F" />,
    color: "#2DA14F",
  },
  {
    value: "Q 150",
    impact: "Cubre vacunas esenciales",
    emoji: <FaSyringe size={32} color="#FF8C42" />,
    color: "#FF8C42",
    popular: true,
  },
  {
    value: "Q 300",
    impact: "Paga una consulta veterinaria",
    emoji: <FaStethoscope size={32} color="#2DA14F" />,
    color: "#2DA14F",
  },
  {
    value: "Lo que desees",
    impact: "Cualquier cantidad es bienvenida y agradecida",
    emoji: <FaHeartbeat size={32} color="#FF8C42" />,
    color: "#FF8C42",
  },
];

const BANK_ACCOUNTS = [
  {
    id: "banrural",
    bank: "Banrural",
    logo: <img src="/banrural.png" alt="Logo banrural" style={{ width: "100px", borderRadius: "15px" }} />,
    accountType: "Monetaria",
    accountNumber: "3-000-12345-6",
    accountHolder: "Asociación HuellaViva",
    currency: "Quetzales (GTQ)",
    color: "#2DA14F",
  },
  {
    id: "industrial",
    bank: "Banco Industrial",
    logo: <img src="/BI.png" alt="Logo banco industrial" style={{ width: "100px", borderRadius: "15px" }} />,
    accountType: "Ahorro",
    accountNumber: "214-000987-6",
    accountHolder: "Asociación HuellaViva",
    currency: "Quetzales (GTQ)",
    color: "#FF8C42",
  },
  {
    id: "gt",
    bank: "Banco G&T Continental",
    logo: <img src="/gyt.png" alt="Logo G&T Continental" style={{ width: "100px", borderRadius: "15px" }} />,
    accountType: "Monetaria",
    accountNumber: "0-21000-44512-3",
    accountHolder: "Asociación HuellaViva",
    currency: "Dólares (USD)",
    color: "#D8F3DC",
  },
];

const IMPACT_STATS = [
  { value: "Q248K", label: "donados este año", accent: "#2DA14F" },
  { value: "1,200+", label: "animales rescatados", accent: "#FF8C42" },
  { value: "94%", label: "va directo al rescate", accent: "#D8F3DC" },
];

const DONORS = [
  { initials: "MR", color: "#2DA14F" },
  { initials: "AL", color: "#FF8C42" },
  { initials: "CF", color: "#D8F3DC" },
  { initials: "JP", color: "#2DA14F" },
  { initials: "SK", color: "#FF8C42" },
];

const FUND_BREAKDOWN = [
  { label: "Alimentación y agua", pct: 38, color: "#2DA14F", icon: <LuHandPlatter size={16} color="#2DA14F" /> },
  { label: "Medicina y cirugías", pct: 33, color: "#FF8C42", icon: <FaSyringe size={16} color="#FF8C42" /> },
  { label: "Refugio y transporte", pct: 20, color: "#D8F3DC", icon: <FaHome size={16} color="#D8F3DC" /> },
  { label: "Admin & comunicación", pct: 9, color: "#D8F3DC55", icon: <FaBullhorn size={16} color="#D8F3DC55" /> },
];

const WA_NUMBER = "50258694127";
const WA_MESSAGE = encodeURIComponent(
  "¡Hola! Me gustaría hacer una donación a HuellaViva. ¿Me pueden orientar sobre el proceso? 🐾",
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

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

const StatPill = memo(function StatPill({ value, label, accent, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT_ONCE);

  return (
    <m.div
      ref={ref}
      custom={index}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-col items-center gap-1 px-5 py-4 rounded-2xl"
      style={{
        backgroundColor: `${accent}10`,
        border: `1px solid ${accent}25`,
      }}
    >
      <span
        className="font-bold leading-none"
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
          color: accent,
        }}
      >
        {value}
      </span>
      <span
        className="text-[#D8F3DC]/50 text-[0.68rem] text-center leading-tight"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
      </span>
    </m.div>
  );
});

const BankCard = memo(function BankCard({ account, index }) {
  const [copied, setCopied] = useState(null);

  const copy = useCallback((text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
      toast.success(
        `¡${field === "number" ? "Número de cuenta" : "Nombre del titular"} copiado!`,
      );
    });
  }, []);

  return (
    <m.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      whileHover={{ y: -3, boxShadow: `0 12px 40px ${account.color}18` }}
      className="relative rounded-2xl border overflow-hidden cursor-default will-change-transform"
      style={{
        borderColor: `${account.color}28`,
        backgroundColor: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{
                backgroundColor: `${account.color}15`,
                border: `1px solid ${account.color}30`,
              }}
            >
              {account.logo}
            </div>
            <div>
              <p
                className="font-bold text-sm leading-none mb-0.75"
                style={{ fontFamily: "'Fraunces', serif", color: "#D8F3DC" }}
              >
                {account.bank}
              </p>
              <p
                className="text-[0.65rem] font-medium"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: `${account.color}CC`,
                }}
              >
                {account.accountType} · {account.currency}
              </p>
            </div>
          </div>
          <FaUniversity size={14} color={`${account.color}50`} />
        </div>

        <div className="h-px bg-[#D8F3DC]/6 mb-4" />

        <div className="flex flex-col gap-3">
          <div
            className="flex items-center justify-between px-3 py-2.5 rounded-xl"
            style={{
              backgroundColor: `${account.color}08`,
              border: `1px solid ${account.color}18`,
            }}
          >
            <div>
              <p
                className="text-[0.6rem] text-[#D8F3DC]/30 uppercase tracking-widest mb-0.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                No. de cuenta
              </p>
              <p
                className="font-semibold text-sm tracking-wider text-[#D8F3DC]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {account.accountNumber}
              </p>
            </div>
            <m.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => copy(account.accountNumber, "number")}
              className="w-8 h-8 rounded-lg flex items-center justify-center border-0 cursor-pointer transition-colors duration-200"
              style={{
                backgroundColor:
                  copied === "number"
                    ? `${account.color}25`
                    : `${account.color}10`,
                color: copied === "number" ? account.color : "#D8F3DC40",
              }}
              title="Copiar número"
            >
              <AnimatePresence mode="wait">
                {copied === "number" ? (
                  <m.span
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <FaCheck size={11} />
                  </m.span>
                ) : (
                  <m.span
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <FaCopy size={11} />
                  </m.span>
                )}
              </AnimatePresence>
            </m.button>
          </div>

          <div
            className="flex items-center justify-between px-3 py-2.5 rounded-xl"
            style={{
              backgroundColor: "rgba(216,243,220,0.03)",
              border: "1px solid rgba(216,243,220,0.07)",
            }}
          >
            <div>
              <p
                className="text-[0.6rem] text-[#D8F3DC]/30 uppercase tracking-widest mb-0.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                A nombre de
              </p>
              <p
                className="font-medium text-sm text-[#D8F3DC]/75"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {account.accountHolder}
              </p>
            </div>
            <m.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => copy(account.accountHolder, "holder")}
              className="w-8 h-8 rounded-lg flex items-center justify-center border-0 cursor-pointer transition-colors duration-200"
              style={{
                backgroundColor:
                  copied === "holder"
                    ? "rgba(216,243,220,0.12)"
                    : "rgba(216,243,220,0.05)",
                color: copied === "holder" ? "#D8F3DC" : "#D8F3DC30",
              }}
              title="Copiar nombre"
            >
              <AnimatePresence mode="wait">
                {copied === "holder" ? (
                  <m.span
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <FaCheck size={11} />
                  </m.span>
                ) : (
                  <m.span
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <FaCopy size={11} />
                  </m.span>
                )}
              </AnimatePresence>
            </m.button>
          </div>
        </div>
      </div>
    </m.div>
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
        className="donation-section relative w-full bg-[#212529] py-20 px-4 md:px-8 overflow-hidden"
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
              top: "-10%",
              left: "-10%",
            }}
          />
          <div
            className="absolute rounded-full blur-[100px] opacity-[0.06]"
            style={{
              width: 400,
              height: 400,
              background: "#FF8C42",
              bottom: "0%",
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
            className="flex flex-col items-center text-center mb-5"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-[#FF8C42]/12 border border-[#FF8C42]/30">
              <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#FF8C42]" />
              <span className="heart-beat inline-block">
                <FaHeart size={10} color="#FF8C42" />
              </span>
              <span
                className="text-[#FF8C42] text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Haz la diferencia hoy
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
              Cada quetzal{" "}
              <em className="not-italic text-[#FF8C42]">salva una vida</em>
            </h2>

            <p
              className="text-[#D8F3DC]/50 max-w-md leading-relaxed mb-8"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              }}
            >
              Tu donación va directamente a alimentación, medicina y refugio
              para los animales que rescatamos cada día.
            </p>

            {/* Avatares de donantes */}
            {/* <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {DONORS.map((d, i) => (
                  <m.div
                    key={i}
                    custom={i}
                    variants={scaleIn}
                    initial="hidden"
                    animate={sectionInView ? "visible" : "hidden"}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[0.6rem] font-bold border-2 border-[#212529]"
                    style={{ backgroundColor: d.color, color: "#212529", zIndex: DONORS.length - i }}
                  >
                    {d.initials}
                  </m.div>
                ))}
              </div>
              <p className="text-[#D8F3DC]/40 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span className="text-[#D8F3DC]/70 font-semibold">+248 personas</span> donaron este mes
              </p>
            </div> */}
          </m.div>

          {/* <m.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="grid grid-cols-3 gap-3 mb-12 max-w-xl mx-auto"
          >
            {IMPACT_STATS.map((s, i) => (
              <StatPill
                key={s.label}
                value={s.value}
                label={s.label}
                accent={s.accent}
                index={i}
              />
            ))}
          </m.div> */}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 xl:gap-12 items-start">
            <m.div
              custom={2}
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
                    Elige cuánto quieres aportar
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {IMPACT_AMOUNTS.map((a, i) => (
                    <m.div
                      key={a.value}
                      custom={i}
                      variants={scaleIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={VIEWPORT_ONCE}
                      whileHover={{
                        y: -4,
                        boxShadow: `0 8px 28px ${a.color}25`,
                      }}
                      className="relative flex flex-col items-center gap-2 p-4 rounded-2xl border text-center cursor-default will-change-transform"
                      style={{
                        borderColor: `${a.color}30`,
                        backgroundColor: `${a.color}08`,
                      }}
                    >
                      {a.popular && (
                        <span
                          className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[0.55rem] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full whitespace-nowrap"
                          style={{ backgroundColor: a.color, color: "#212529" }}
                        >
                          Más popular
                        </span>
                      )}
                      <span className="text-2xl">{a.emoji}</span>
                      <span
                        className="font-bold text-base"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          color: a.color,
                        }}
                      >
                        {a.value}
                      </span>
                      <span
                        className="text-[0.65rem] leading-tight text-[#D8F3DC]/50"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {a.impact}
                      </span>
                    </m.div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#D8F3DC]/8" />
                <span
                  className="text-[#D8F3DC]/20 text-[0.65rem] uppercase tracking-widest"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  elige cómo donar
                </span>
                <div className="flex-1 h-px bg-[#D8F3DC]/8" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      backgroundColor: "#25D36620",
                      border: "1px solid #25D36650",
                      color: "#25D366",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    2A
                  </div>
                  <h3
                    className="text-[#D8F3DC] font-semibold text-base"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Contáctanos por WhatsApp
                  </h3>
                </div>

                <m.a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    y: -3,
                    boxShadow: "0 12px 40px rgba(37,211,102,0.35)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="wa-pulse flex items-center gap-5 p-5 rounded-2xl border no-underline group will-change-transform"
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
                      Te orientamos en el proceso, confirmamos tu donación y te
                      enviamos el comprobante.
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] pulse-dot" />
                      <span
                        className="text-[#25D366] text-[0.65rem] font-semibold"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Disponible todos los días · Respuesta en minutos
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
                    2B
                  </div>
                  <h3
                    className="text-[#D8F3DC] font-semibold text-base"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Deposita o transfiere directamente
                  </h3>
                </div>

                <p
                  className="text-[#D8F3DC]/40 text-xs mb-4 leading-relaxed flex items-center gap-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Después de tu depósito, envíanos el comprobante por WhatsApp
                  para registrar tu donación.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {BANK_ACCOUNTS.map((acc, i) => (
                    <BankCard key={acc.id} account={acc} index={i} />
                  ))}
                </div>
              </div>
            </m.div>

            <m.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
              className="flex flex-col gap-5 lg:sticky lg:top-24"
            >
              <div
                className="glass-card p-6 rounded-3xl border border-[#2DA14F]/20"
                style={{ boxShadow: "0 4px 32px rgba(45,161,79,0.10)" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-[#D8F3DC]/40 text-[0.68rem] font-semibold tracking-widest uppercase mb-1"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Meta mensual
                    </p>
                    <p
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "#D8F3DC",
                      }}
                    >
                      Q 15,000
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      backgroundColor: "#2DA14F20",
                      border: "1px solid #2DA14F40",
                    }}
                  >
                    <FaHeart size={18} color="#2DA14F" />
                  </div>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl border border-[#D8F3DC]/8">
                <p
                  className="text-[#D8F3DC]/40 text-[0.68rem] font-semibold tracking-widest uppercase mb-4"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  ¿A dónde va tu donación?
                </p>

                {FUND_BREAKDOWN.map((item, i) => (
                  <div key={item.label} className="mb-3 last:mb-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{item.icon}</span>
                        <span
                          className="text-[0.7rem]"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            color: "#D8F3DC70",
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                      <span
                        className="text-[0.68rem] font-semibold"
                        style={{
                          color: item.color,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {item.pct}%
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-[#D8F3DC]/10 overflow-hidden">
                      <m.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: "0%" }}
                        animate={
                          sectionInView
                            ? { width: `${item.pct}%` }
                            : { width: "0%" }
                        }
                        transition={{
                          delay: 0.7 + i * 0.12,
                          duration: 1,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <m.div
                whileHover={{ y: -2 }}
                className="glass-card p-5 rounded-2xl border border-[#D8F3DC]/8 relative overflow-hidden cursor-default will-change-transform"
              >
                <div
                  className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                  style={{ backgroundColor: "#FF8C42" }}
                />
                <p
                  className="text-[#D8F3DC]/65 text-sm leading-relaxed mb-3 pl-3"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  "Gracias a las donaciones de nuestra comunidad, hemos
                  rescatado a más de 1,200 animales este año. Cada quetzal
                  cuenta."
                </p>
                <div className="flex items-center gap-3 pl-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: "#FF8C4230", color: "#FF8C42" }}
                  >
                    DR
                  </div>
                  <div>
                    <p
                      className="text-[#D8F3DC]/70 text-xs font-semibold"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Dra. Ramírez
                    </p>
                    <p
                      className="text-[#D8F3DC]/30 text-[0.65rem]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Directora, HuellaViva
                    </p>
                  </div>
                </div>
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
