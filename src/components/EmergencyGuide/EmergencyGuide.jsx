import { useState, useRef, useCallback, memo } from "react";
import {
  FaPaw,
  FaWhatsapp,
  FaPhoneAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaChevronDown,
  FaPhone,
  FaBuilding,
  FaShieldAlt,
  FaHandSparkles,
  FaHandsHelping,
  FaEye,
  FaSign,
  FaHands,
  FaNotesMedical,
  FaHouseUser
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
  MdOutlineEmergency,
  MdFireTruck
} from "react-icons/md";
import {
  RiPlantLine
} from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";
import { MdDoNotDisturbOnTotalSilence } from "react-icons/md";

const EMERGENCY_CONTACTS = [
  {
    label: "HuellaViva",
    number: "+502 1234-5678",
    icon: <FaPaw />,
    type: "wa",
    color: "#25D366",
  },
  {
    label: "Bomberos",
    number: "122",
    icon: <MdFireTruck size={20} color="#FF8C42" />,
    type: "phone",
    color: "#FF8C42",
  },
  {
    label: "CONAP",
    number: "+502 2422-6700",
    icon: <RiPlantLine size={20} color="#2DA14F" />,
    type: "phone",
    color: "#2DA14F",
  },
  {
    label: "Municipalidad GT",
    number: "1551",
    icon: <FaBuilding size={20} color="#D8F3DC" />,
    type: "phone",
    color: "#D8F3DC",
  },
];

const STEPS = [
  {
    id: 1,
    phase: "Evalúa desde lejos",
    phaseTag: "Seguridad primero",
    tagColor: "#FF8C42",
    icon: <FaEye size={20} color="#FF8C42" />,
    accentColor: "#FF8C42",
    safetyLevel: "critical",
    safetyNote:
      "NO te acerques de inmediato. Un animal asustado o herido puede morder o arañar por instinto de supervivencia, incluso si normalmente es dócil.",
    actions: [
      { text: "Mantén al menos 3–4 metros de distancia inicial", icon: "📏" },
      {
        text: "Observa su postura: orejas hacia atrás, cola baja o erizada indican miedo o agresión",
        icon: "🔍",
      },
      {
        text: "Verifica si tiene heridas visibles, dificultad para moverse o signos de enfermedad",
        icon: "🩺",
      },
      {
        text: "Anota la ubicación exacta con GPS o referencia de calle",
        icon: "📍",
      },
    ],
    tip: {
      title: "¿Cómo leer el lenguaje corporal?",
      content:
        "Cola baja + cuerpo encogido = miedo. Cola alta + pelo erizado = alerta/agresión. Tumbado sin moverse = posible herida grave. Gruñidos o ladridos al acercarte = no te aproximes solo.",
    },
  },
  {
    id: 2,
    phase: "Asegura el área",
    phaseTag: "Prevenir más daño",
    tagColor: "#FF8C42",
    icon: <FaSign size={20} color="#FF8C42" />,
    accentColor: "#FF8C42",
    safetyLevel: "warning",
    safetyNote:
      "Si el animal está en la vía, señaliza el área para evitar accidentes. Tu seguridad vial también importa.",
    actions: [
      {
        text: "Si está en carretera, activa las luces de emergencia de tu vehículo",
        icon: "🚗",
      },
      {
        text: "Pide a alguien que dirija el tráfico si es necesario",
        icon: "🙋",
      },
      {
        text: "No muevas al animal si sospechas fractura de columna (caída de altura, atropellamiento)",
        icon: "⚠️",
      },
      {
        text: "Aleja a niños y personas no involucradas del área inmediata",
        icon: "👨‍👩‍👧",
      },
    ],
    tip: {
      title: "Señalización de emergencia",
      content:
        "Usa conos, ropa de colores brillantes o cualquier objeto visible para marcar el área. Una llamada al 1551 (Municipalidad) puede enviar apoyo para controlar el tráfico.",
    },
  },
  {
    id: 3,
    phase: "Primer contacto",
    phaseTag: "Con calma y método",
    tagColor: "#D8F3DC",
    icon: <FaHands size={20} color="#2DA14F" />,
    accentColor: "#2DA14F",
    safetyLevel: "caution",
    safetyNote:
      "Si el animal parece calmado, puedes intentar el primer contacto. Nunca lo hagas de frente ni de forma brusca.",
    actions: [
      {
        text: "Agáchate a su nivel — parece menos amenazante que estar de pie",
        icon: "🧎",
      },
      {
        text: "Evita el contacto visual directo sostenido — puede interpretarse como amenaza",
        icon: "👀",
      },
      {
        text: "Extiende el dorso de la mano (nunca la palma) a unos 30 cm y espera que él se acerque",
        icon: "🤚",
      },
      {
        text: "Habla en tono bajo y tranquilo, sin movimientos bruscos",
        icon: "🗣️",
      },
      {
        text: "Si tienes comida, colócala en el suelo a poca distancia, no la ofrezcas en la mano",
        icon: "🍖",
      },
    ],
    tip: {
      title: "Nunca hagas esto",
      content:
        "No grites su nombre ni hagas ruidos fuertes. No lo persigas si huye. No lo levantes del suelo de forma repentina. No mires directamente a sus ojos si está asustado.",
    },
    tipIsWarning: true,
  },
  {
    id: 4,
    phase: "Manejo seguro",
    phaseTag: "Si decides moverlo",
    tagColor: "#2DA14F",
    icon: <FaHandsHelping size={20} color="#2DA14F" />,
    accentColor: "#2DA14F",
    safetyLevel: "safe",
    safetyNote:
      "Usa guantes si los tienes. Si no, usa ropa gruesa, una toalla o cualquier tela para protegerte.",
    actions: [
      {
        text: "Usa guantes de trabajo, guantes de cocina o envuelve tus manos con una prenda gruesa",
        icon: "🧤",
      },
      {
        text: "Para perros: desliza una correa improvisada (cuerda, cinturón) con un lazo suave alrededor del cuello",
        icon: "🐕",
      },
      {
        text: "Para gatos: envuélvelo en una toalla o chamarra, cubriendo la cabeza primero",
        icon: "🐈",
      },
      {
        text: "Sostén al animal cerca de tu cuerpo para que se sienta contenido y seguro",
        icon: "🤗",
      },
      {
        text: "Colócalo en una caja, canasta o vehículo en zona tranquila y ventilada",
        icon: "📦",
      },
    ],
    tip: {
      title: "Improvisando un transporte seguro",
      content:
        "Una caja de cartón con agujeros, una canasta de compras, o el asiento trasero de un auto con alguien que lo sostenga son opciones válidas. Lo importante es mantenerlo calmado y seguro.",
    },
  },
  {
    id: 5,
    phase: "Atención veterinaria",
    phaseTag: "Paso crucial",
    tagColor: "#2DA14F",
    icon: <FaNotesMedical size={20} color="#2DA14F" />,
    accentColor: "#2DA14F",
    safetyLevel: "safe",
    safetyNote:
      "Aunque el animal parezca bien, una revisión veterinaria es indispensable. Heridas internas, fracturas o infecciones pueden no ser visibles.",
    actions: [
      {
        text: "Llama a HuellaViva o una clínica veterinaria antes de llegar para que se preparen",
        icon: "📞",
      },
      {
        text: "Informa si el animal mordió o arañó a alguien — puede requerir protocolo antirrábico",
        icon: "💉",
      },
      {
        text: "No le des medicamentos humanos (ibuprofeno, acetaminofén son tóxicos para animales)",
        icon: "🚫",
      },
      {
        text: "Si no puede moverse, intenta no flexionar ni girar su cuerpo — mantenerlo plano",
        icon: "🛏️",
      },
      {
        text: "Toma fotos del estado del animal y la ubicación donde lo encontraste",
        icon: "📸",
      },
    ],
    tip: {
      title: "¿No puedes llevarlo tú?",
      content:
        "¡Está bien! Contacta a HuellaViva con la ubicación GPS del animal. Nuestro equipo puede coordinar el rescate. Tu llamada puede ser suficiente para salvar su vida.",
    },
  },
  {
    id: 6,
    phase: "¿Qué sigue?",
    phaseTag: "Opciones post-rescate",
    tagColor: "#D8F3DC",
    icon: <FaHouseUser size={20} color="#D8F3DC" />,
    accentColor: "#D8F3DC",
    safetyLevel: "info",
    safetyNote:
      "Rescatar no significa necesariamente adoptarlo. Hay muchas formas de ayudar sin llevártelo a casa.",
    actions: [
      {
        text: "Hogar temporal: brindar refugio mientras se encuentra adoptante permanente",
        icon: "🏡",
      },
      {
        text: "Publicarlo en redes con fotos y ubicación para encontrar dueño o adoptante",
        icon: "📱",
      },
      {
        text: "Donarlo a un refugio como HuellaViva si no puedes cuidarlo",
        icon: "❤️",
      },
      {
        text: "Apoyar los costos veterinarios aunque no puedas adoptarlo",
        icon: "💊",
      },
      { text: "Convertirte en voluntario para casos futuros", icon: "🙌" },
    ],
    tip: {
      title: "El mayor regalo",
      content:
        "Encontrar un hogar temporal por unas semanas puede ser la diferencia entre la vida y la muerte para un animal rescatado. No hace falta adoptarlo para salvarlo.",
    },
  },
];

const SAFETY_LEVELS = {
  critical: {
    color: "#FF4444",
    bg: "rgba(255,68,68,0.10)",
    border: "rgba(255,68,68,0.30)",
    icon: "🚨",
    label: "Crítico",
  },
  warning: {
    color: "#FF8C42",
    bg: "rgba(255,140,66,0.10)",
    border: "rgba(255,140,66,0.30)",
    icon: "⚠️",
    label: "Precaución",
  },
  caution: {
    color: "#FFD166",
    bg: "rgba(255,209,102,0.10)",
    border: "rgba(255,209,102,0.30)",
    icon: "💛",
    label: "Atención",
  },
  safe: {
    color: "#2DA14F",
    bg: "rgba(45,161,79,0.10)",
    border: "rgba(45,161,79,0.30)",
    icon: "✅",
    label: "Seguro",
  },
  info: {
    color: "#D8F3DC",
    bg: "rgba(216,243,220,0.08)",
    border: "rgba(216,243,220,0.20)",
    icon: "ℹ️",
    label: "Info",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 22,
      delay: i * 0.08,
    },
  }),
};

const expandVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] },
  },
};

const VIEWPORT_ONCE = { once: true, margin: "-60px" };

const ContactCard = memo(function ContactCard({ contact, index }) {
  const isWa = contact.type === "wa";
  const href = isWa
    ? `https://wa.me/${contact.number.replace(/\D/g, "")}?text=${encodeURIComponent("¡Hola! Encontré un animal en la calle y necesito ayuda urgente. 🐾")}`
    : `tel:${contact.number.replace(/\s/g, "")}`;

  return (
    <m.a
      href={href}
      target={isWa ? "_blank" : "_self"}
      rel="noopener noreferrer"
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      whileHover={{ y: -3, boxShadow: `0 8px 28px ${contact.color}30` }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-3 p-3.5 rounded-xl border no-underline transition-colors duration-200 will-change-transform"
      style={{
        borderColor: `${contact.color}30`,
        backgroundColor: `${contact.color}0A`,
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
        style={{
          backgroundColor: `${contact.color}18`,
          border: `1px solid ${contact.color}30`,
        }}
      >
        {isWa ? (
          <FaWhatsapp size={16} color={contact.color} />
        ) : (
          <span>{contact.icon}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-[#D8F3DC]/80 text-xs font-semibold truncate"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {contact.label}
        </p>
        <p
          className="font-bold tabular-nums"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "0.9rem",
            color: contact.color,
          }}
        >
          {contact.number}
        </p>
      </div>
      <div style={{ color: `${contact.color}60` }}>
        {isWa ? <FaWhatsapp size={13} /> : <FaPhone size={13} />}
      </div>
    </m.a>
  );
});

const StepCard = memo(function StepCard({
  step,
  isActive,
  isCompleted,
  onToggle,
  totalSteps,
}) {
  const safety = SAFETY_LEVELS[step.safetyLevel];

  return (
    <m.div
      layout
      className="relative"
      transition={{ type: "spring", stiffness: 200, damping: 28 }}
    >
      {step.id < totalSteps && (
        <div
          className="absolute left-6.75 top-15 w-0.5 z-0"
          style={{
            height: "calc(100% - 20px)",
            background: isCompleted
              ? `linear-gradient(to bottom, ${step.accentColor}, ${STEPS[step.id]?.accentColor ?? step.accentColor})`
              : "rgba(216,243,220,0.08)",
            transition: "background 0.6s ease",
          }}
        />
      )}

      <div className="relative z-10 flex gap-4">
        <div className="shrink-0 pt-0.5">
          <m.div
            animate={{
              scale: isActive ? 1.1 : 1,
              boxShadow: isActive
                ? `0 0 0 6px ${step.accentColor}25, 0 0 20px ${step.accentColor}35`
                : "0 0 0 0px transparent",
            }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-0 cursor-pointer select-none"
            style={{
              backgroundColor:
                isCompleted || isActive
                  ? `${step.accentColor}20`
                  : "rgba(255,255,255,0.04)",
              border: `2px solid ${isCompleted || isActive ? step.accentColor : "rgba(216,243,220,0.12)"}`,
            }}
            onClick={onToggle}
          >
            <span className="text-xl leading-none">
              {isCompleted && !isActive ? <FaCheckCircle size={20} color="#2DA14F" /> : step.icon}
            </span>
            <span
              className="text-[0.55rem] font-bold mt-0.75"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: isActive ? step.accentColor : "rgba(216,243,220,0.3)",
              }}
            >
              PASO {step.id}
            </span>
          </m.div>
        </div>

        <div className="flex-1 min-w-0 pb-6">
          <button
            onClick={onToggle}
            className="w-full flex items-start justify-between gap-3 mb-0 text-left cursor-pointer border-0 bg-transparent p-0"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span
                  className="text-[0.6rem] font-bold tracking-[0.13em] uppercase px-2 py-0.75 rounded-full"
                  style={{
                    color: step.tagColor,
                    backgroundColor: `${step.tagColor}15`,
                    border: `1px solid ${step.tagColor}30`,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {step.phaseTag}
                </span>
              </div>
              <h3
                className="leading-tight"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  fontWeight: 700,
                  color: isActive ? step.accentColor : "#D8F3DC",
                  transition: "color 0.2s ease",
                }}
              >
                {step.phase}
              </h3>
            </div>

            <m.div
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="shrink-0 mt-1"
              style={{
                color: isActive ? step.accentColor : "rgba(216,243,220,0.25)",
              }}
            >
              <FaChevronDown size={14} />
            </m.div>
          </button>

          <AnimatePresence initial={false}>
            {isActive && (
              <m.div
                key="expanded"
                variants={expandVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="overflow-hidden"
              >
                <div className="pt-4 flex flex-col gap-4">
                  <div
                    className="flex gap-3 p-4 rounded-xl"
                    style={{
                      backgroundColor: safety.bg,
                      border: `1px solid ${safety.border}`,
                    }}
                  >
                    <span className="text-lg shrink-0 mt-0.5">
                      {safety.icon}
                    </span>
                    <div>
                      <p
                        className="text-[0.65rem] font-bold tracking-wider uppercase mb-1"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: safety.color,
                        }}
                      >
                        {safety.label}
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: `${safety.color}CC`,
                        }}
                      >
                        {step.safetyNote}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {step.actions.map((action, i) => (
                      <m.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.06,
                          type: "spring",
                          stiffness: 200,
                          damping: 24,
                        }}
                        className="flex items-start gap-3 p-3 rounded-xl"
                        style={{
                          backgroundColor: `${step.accentColor}08`,
                          border: `1px solid ${step.accentColor}15`,
                        }}
                      >
                        <span className="text-base shrink-0 mt-px">
                          {action.icon}
                        </span>
                        <p
                          className="text-[#D8F3DC]/75 text-sm leading-relaxed"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {action.text}
                        </p>
                      </m.div>
                    ))}
                  </div>

                  <div
                    className="relative p-4 rounded-xl overflow-hidden"
                    style={{
                      backgroundColor: step.tipIsWarning
                        ? "rgba(255,68,68,0.06)"
                        : `${step.accentColor}0A`,
                      border: `1px solid ${step.tipIsWarning ? "rgba(255,68,68,0.20)" : `${step.accentColor}20`}`,
                    }}
                  >
                    <div
                      className="absolute left-0 top-0 w-0.5 h-full rounded-l-xl"
                      style={{
                        backgroundColor: step.tipIsWarning
                          ? "#FF4444"
                          : step.accentColor,
                      }}
                    />
                    <div className="pl-2">
                      <p
                        className="text-[0.65rem] font-bold tracking-widest uppercase mb-1.5"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: step.tipIsWarning
                            ? "#FF4444"
                            : step.accentColor,
                        }}
                      >
                        {step.tipIsWarning ? "🚫 Importante" : "💡 Consejo"}
                      </p>
                      <p
                        className="font-semibold text-sm text-[#D8F3DC]/80 mb-1"
                        style={{ fontFamily: "'Fraunces', serif" }}
                      >
                        {step.tip.title}
                      </p>
                      <p
                        className="text-[#D8F3DC]/55 text-xs leading-relaxed"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {step.tip.content}
                      </p>
                    </div>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </m.div>
  );
});

export default function EmergencyGuide() {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompleted] = useState(new Set());

  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, VIEWPORT_ONCE);

  const handleToggle = useCallback((id) => {
    setActiveStep((prev) => {
      if (prev === id) {
        setCompleted((c) => {
          const n = new Set(c);
          n.add(id);
          return n;
        });
        const next = id < STEPS.length ? id + 1 : null;
        return next;
      }
      return id;
    });
  }, []);

  const completedCount = completedSteps.size;
  const progressPct = Math.round((completedCount / STEPS.length) * 100);

  return (
    <LazyMotion features={domMax} strict>
      <section
        ref={sectionRef}
        className="relative w-full bg-[#212529] py-20 px-4 md:px-8 overflow-hidden mt-10"
      >
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute rounded-full blur-[140px] opacity-[0.06]"
            style={{
              width: 500,
              height: 500,
              background: "#FF8C42",
              top: "5%",
              right: "-5%",
            }}
          />
          <div
            className="absolute rounded-full blur-[120px] opacity-[0.05]"
            style={{
              width: 450,
              height: 450,
              background: "#2DA14F",
              bottom: "5%",
              left: "-5%",
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
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border"
              style={{
                backgroundColor: "rgba(255,68,68,0.10)",
                borderColor: "rgba(255,68,68,0.30)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4444] pulse-dot" />
              <FaExclamationTriangle size={10} color="#FF4444" />
              <span
                className="text-[#FF4444] text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Guía de emergencia
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
              Encontré un animal,{" "}
              <em className="not-italic text-[#FF8C42]">¿qué hago?</em>
            </h2>

            <p
              className="text-[#D8F3DC]/50 max-w-lg leading-relaxed"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              }}
            >
              Sigue esta guía paso a paso. Está diseñada para protegerte a ti y
              al animal al mismo tiempo.
            </p>
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 xl:gap-16 items-start">
            <m.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
            >
              <div
                className="flex items-center gap-4 mb-8 p-4 rounded-2xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(216,243,220,0.07)",
                }}
              >
                <div className="flex items-center gap-2">
                  <FaCheckCircle
                    size={14}
                    color={
                      progressPct === 100 ? "#2DA14F" : "rgba(216,243,220,0.25)"
                    }
                  />
                  <span
                    className="text-xs text-[#D8F3DC]/50"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span
                      className="font-bold"
                      style={{
                        color:
                          progressPct > 0 ? "#2DA14F" : "rgba(216,243,220,0.3)",
                      }}
                    >
                      {completedCount}
                    </span>
                    <span className="text-[#D8F3DC]/30">
                      {" "}
                      / {STEPS.length} pasos completados
                    </span>
                  </span>
                </div>
                <div className="flex-1 h-1.5 rounded-full bg-[#D8F3DC]/10 overflow-hidden">
                  <m.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #FF8C42, #2DA14F)",
                      boxShadow:
                        progressPct > 0
                          ? "0 0 8px rgba(45,161,79,0.5)"
                          : "none",
                    }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                  />
                </div>
                <span
                  className="text-xs font-bold tabular-nums w-8 text-right"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color:
                      progressPct > 0 ? "#2DA14F" : "rgba(216,243,220,0.2)",
                  }}
                >
                  {progressPct}%
                </span>
              </div>

              <div className="flex flex-col">
                {STEPS.map((step) => (
                  <StepCard
                    key={step.id}
                    step={step}
                    isActive={activeStep === step.id}
                    isCompleted={completedSteps.has(step.id)}
                    onToggle={() => handleToggle(step.id)}
                    totalSteps={STEPS.length}
                  />
                ))}
              </div>
            </m.div>

            <m.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
              className="flex flex-col gap-5 lg:sticky lg:top-24"
            >
              <div
                className="p-5 rounded-2xl relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,68,68,0.15) 0%, rgba(255,140,66,0.10) 100%)",
                  border: "1px solid rgba(255,68,68,0.30)",
                  boxShadow: "0 4px 24px rgba(255,68,68,0.12)",
                }}
              >
                <m.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full"
                  style={{ backgroundColor: "rgba(255,68,68,0.25)" }}
                />
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl"><MdOutlineEmergency color="#FF4444" /></span>
                  <p
                    className="font-bold text-sm"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      color: "#FF4444",
                    }}
                  >
                    ¿Es una emergencia grave?
                  </p>
                </div>
                <p
                  className="text-[#D8F3DC]/60 text-xs leading-relaxed mb-4"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Si el animal está inconsciente, sangra abundantemente o fue
                  atropellado, llama de inmediato.
                </p>
                <m.a
                  href="tel:122"
                  whileHover={{
                    y: -2,
                    boxShadow: "0 8px 24px rgba(255,68,68,0.40)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl no-underline font-bold text-sm"
                  style={{
                    backgroundColor: "#FF4444",
                    color: "#fff",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: "0 2px 14px rgba(255,68,68,0.35)",
                  }}
                >
                  <FaPhoneAlt size={13} />
                  Llamar Bomberos · 122
                </m.a>
              </div>

              <div
                className="p-5 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(216,243,220,0.08)",
                }}
              >
                <p
                  className="text-[#D8F3DC]/40 text-[0.68rem] font-semibold tracking-widest uppercase mb-4"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Contactos de rescate
                </p>
                <div className="flex flex-col gap-2">
                  {EMERGENCY_CONTACTS.map((c, i) => (
                    <ContactCard key={c.label} contact={c} index={i} />
                  ))}
                </div>
              </div>

              <div
                className="p-5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(216,243,220,0.07)",
                }}
              >
                <p
                  className="text-[#D8F3DC]/40 text-[0.68rem] font-semibold tracking-widest uppercase mb-4"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Reglas de oro
                </p>
                <div className="flex flex-col gap-2.5">
                  {[
                    {
                      rule: "Tu seguridad primero, siempre",
                      icon: <FaShieldAlt size={12} color="#FF4444" />,
                      accent: "#FF4444",
                    },
                    {
                      rule: "Nunca toques sin protección en las manos",
                      icon: <FaHandSparkles size={12} color="#FF8C42" />,
                      accent: "#FF8C42",
                    },
                    {
                      rule: "Un animal asustado puede atacar sin querer",
                      icon: <IoIosWarning size={12} color="#FFD166" />,
                      accent: "#FFD166",
                    },
                    {
                      rule: "Movimientos lentos y voz calmada siempre",
                      icon: <MdDoNotDisturbOnTotalSilence size={12} color="#2DA14F" />,
                      accent: "#2DA14F",
                    },
                    {
                      rule: "Llama antes de llevar al veterinario",
                      icon: <FaPhoneAlt size={12} color="#2DA14F" />,
                      accent: "#2DA14F",
                    },
                    {
                      rule: "No tienes que hacerlo solo — pide ayuda",
                      icon: <FaHandsHelping size={12} color="#D8F3DC" />,
                      accent: "#D8F3DC",
                    },
                  ].map((item, i) => (
                    <m.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={VIEWPORT_ONCE}
                      transition={{
                        delay: i * 0.07,
                        type: "spring",
                        stiffness: 200,
                        damping: 24,
                      }}
                      className="flex items-center gap-2.5"
                    >
                      <span
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0"
                        style={{
                          backgroundColor: `${item.accent}15`,
                          border: `1px solid ${item.accent}25`,
                        }}
                      >
                        {item.icon}
                      </span>
                      <span
                        className="text-[0.72rem] leading-tight"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: "rgba(216,243,220,0.60)",
                        }}
                      >
                        {item.rule}
                      </span>
                    </m.div>
                  ))}
                </div>
              </div>

              <m.button
                whileHover={{
                  y: -2,
                  boxShadow: "0 8px 28px rgba(45,161,79,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold border-0 cursor-pointer"
                style={{
                  backgroundColor: "#2DA14F",
                  color: "#212529",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 2px 16px rgba(45,161,79,0.30)",
                }}
              >
                <FaPaw size={13} />
                Compartir esta guía
              </m.button>
            </m.div>
          </div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ type: "spring", stiffness: 90, damping: 20 }}
            className="mt-14 flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl border border-[#D8F3DC]/[0.07]"
            style={{ backgroundColor: "rgba(216,243,220,0.03)" }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
              style={{
                backgroundColor: "rgba(45,161,79,0.12)",
                border: "1px solid rgba(45,161,79,0.25)",
              }}
            >
              📋
            </div>
            <div className="text-center sm:text-left">
              <p
                className="text-[#D8F3DC]/70 text-sm font-semibold mb-0.5"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                ¿Quieres tener esta guía siempre contigo?
              </p>
              <p
                className="text-[#D8F3DC]/35 text-xs"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Guarda este sitio en tu pantalla de inicio o compártelo con
                quien pueda necesitarlo. Podría salvar una vida.
              </p>
            </div>
            <m.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
              style={{
                color: "#D8F3DC",
                backgroundColor: "rgba(216,243,220,0.08)",
                border: "1px solid rgba(216,243,220,0.15)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              📤 Compartir
            </m.button>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
