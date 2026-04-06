import { useState, useCallback, useRef, useMemo, memo } from "react";
import {
  LazyMotion,
  domMax,
  m,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  FaPaw,
  FaWhatsapp,
  FaRedo,
  FaArrowRight,
  FaRunning,
  FaRegClock,
  FaHome,
  FaHeart,
  FaGraduationCap,
  FaUsers,
  FaWallet,
  FaRegUser,
} from "react-icons/fa";

const PROFILES = {
  active_dog: {
    id: "active_dog",
    title: "El Compañero Aventurero",
    pet: "Perro mediano o grande",
    emoji: "🐕",
    accent: "#FF8C42",
    bg: "rgba(255,140,66,0.10)",
    border: "rgba(255,140,66,0.30)",
    tagline:
      "Eres energético, social y necesitas un compañero que siga tu ritmo.",
    traits: ["Activo", "Social", "Al aire libre", "Aventurero"],
    suggestedBreeds: [
      "Labrador Retriever",
      "Golden Retriever",
      "Border Collie",
      "Pastor Alemán",
      "Mestizos de talla grande",
    ],
    description:
      "Tu estilo de vida dinámico y tu amor por la actividad física hacen de ti el compañero ideal para un perro mediano o grande. Necesitas una mascota que comparta tu energía, disfrute las caminatas largas y te motive a salir cada día. Un perro rescatado de tamaño mediano o grande — como un labrador, pastor o cruce de razas activas — se convertirá en tu mejor cómplice de aventuras.",
    whyRescued:
      "Los perros adultos rescatados ya superaron la etapa destructiva del cachorro. Son leales, agradecidos y se adaptan rápidamente a un hogar activo.",
    monthlyEst: "Q 350–600",
    timeDay: "1–2 horas de actividad",
    space: "Casa con patio o cerca de parque",
    tips: [
      "Busca razas o cruces con alta energía: border collie, labrador, mestizos activos.",
      "Un perro adulto (2–5 años) ya tiene su carácter definido — sabrás exactamente con quién convives.",
    ],
  },
  calm_dog: {
    id: "calm_dog",
    title: "El Amigo Tranquilo",
    pet: "Perro pequeño o mediano",
    emoji: "🐩",
    accent: "#2DA14F",
    bg: "rgba(45,161,79,0.10)",
    border: "rgba(45,161,79,0.30)",
    tagline:
      "Valoras la compañía cercana, la rutina y los momentos tranquilos en casa.",
    traits: ["Hogareño", "Rutinario", "Afectuoso", "Tranquilo"],
    suggestedBreeds: [
      "Shih Tzu",
      "Pug",
      "Cavalier King Charles",
      "Poodle",
      "Mestizos pequeños o Senior",
    ],
    description:
      "Prefieres una mascota que comparta tus momentos de calma, sea un compañero constante en casa y no requiera dos horas diarias de ejercicio intenso. Un perro pequeño o mediano de temperamento tranquilo — como un shih tzu, poodle o muchos mestizos pequeños — es tu match perfecto. Son ideales para apartamentos y ofrecen compañía sin sobredemanda.",
    whyRescued:
      "Muchos perros pequeños en refugios fueron abandonados simplemente por cambios de vida de sus dueños. Son completamente domesticados y buscan exactamente lo que tú ofreces: un hogar estable.",
    monthlyEst: "Q 200–400",
    timeDay: "30–45 minutos de paseos",
    space: "Apartamento o casa pequeña",
    tips: [
      "Busca perros adultos de temperamento calmado en los refugios.",
      "Los perros senior (7+ años) son especialmente tranquilos y a menudo los más difíciles de adoptar.",
    ],
  },
  independent_cat: {
    id: "independent_cat",
    title: "El Alma Independiente",
    pet: "Gato adulto",
    emoji: "🐈",
    accent: "#D8F3DC",
    bg: "rgba(216,243,220,0.08)",
    border: "rgba(216,243,220,0.25)",
    tagline:
      "Respetas la autonomía, tienes una vida ocupada y quieres compañía sin dependencia.",
    traits: ["Independiente", "Ocupado", "Analítico", "Respetuoso"],
    suggestedBreeds: [
      "Azul Ruso",
      "British Shorthair",
      "Gato Común Europeo (Adulto)",
      "Persa",
    ],
    description:
      "Tu ritmo de vida ocupado y tu apreciación por el espacio personal hacen del gato adulto tu compañero ideal. Los gatos no requieren paseos diarios, se entretienen solos y ofrecen una compañía genuina pero sin demandas excesivas. Un gato rescatado adulto ya tiene su personalidad definida — tranquilo, observador o juguetón — y se adapta perfectamente a hogares con personas activas.",
    whyRescued:
      "Los gatos adultos en refugios son los más difíciles de adoptar. Son completamente independientes, ya pasaron la etapa de arañar todo, y agradecen profundamente a quien les da una segunda oportunidad.",
    monthlyEst: "Q 150–280",
    timeDay: "15–30 minutos de juego activo",
    space: "Apartamento o casa, interior",
    tips: [
      "Un gato adulto (2–7 años) ya tiene su carácter definido.",
      "Dos gatos se hacen compañía mutuamente si trabajas largas horas.",
    ],
  },
  playful_cat: {
    id: "playful_cat",
    title: "El Espíritu Juguetón",
    pet: "Gato joven o dos gatos",
    emoji: "🐱",
    accent: "#FF8C42",
    bg: "rgba(255,140,66,0.10)",
    border: "rgba(255,140,66,0.28)",
    tagline:
      "Eres creativo, curioso y buscas una mascota con personalidad y carácter propio.",
    traits: ["Creativo", "Curioso", "Juguetón", "Divertido"],
    suggestedBreeds: [
      "Siamés",
      "Bengala (o cruces)",
      "Gatitos jóvenes mestizos",
      "Abisinio",
    ],
    description:
      "Te gusta la interacción, disfrutas de los momentos espontáneos y valoras una mascota con mucha personalidad. Un gato joven o la combinación de dos gatos es perfecta para ti. Son entretenidos, curiosos y cada día traen algo nuevo. Además, dos gatos juntos se cuidan entre sí cuando no estás.",
    whyRescued:
      "Los gatos jóvenes en refugios suelen entrar en parejas o grupos. Adoptar dos a la vez es más económico en términos de entretenimiento mutuo y bienestar emocional de ambos.",
    monthlyEst: "Q 200–380",
    timeDay: "20–40 minutos de juego",
    space: "Apartamento con enriquecimiento ambiental",
    tips: [
      "Considera adoptar dos gatitos juntos — se hacen compañía y se calman mutuamente.",
      "El enriquecimiento ambiental (rascadores, torres, juguetes) es clave para gatos activos.",
    ],
  },
  multi_pet: {
    id: "multi_pet",
    title: "El Corazón Generoso",
    pet: "Más de una mascota",
    emoji: "🐕🐈",
    accent: "#2DA14F",
    bg: "rgba(45,161,79,0.10)",
    border: "rgba(45,161,79,0.30)",
    tagline: "Tienes espacio, tiempo y amor suficiente para más de un animal.",
    traits: ["Generoso", "Organizado", "Empático", "Comprometido"],
    suggestedBreeds: [
      "Parejas de hermanos",
      "Perro senior + Gato tranquilo",
      "Gatos sociables",
      "Mestizos rescatados en grupo",
    ],
    description:
      "Tienes la capacidad emocional, el espacio y la estabilidad para dar hogar a más de una mascota. Ya sea un perro y un gato, dos perros o una pequeña manada, tu perfil es el de alguien que puede ofrecer un hogar multi-animal rico en estímulos y amor. Eres exactamente la persona que los refugios necesitan.",
    whyRescued:
      "En los refugios hay muchos animales que llegaron juntos y sufren al ser separados. Adoptar una pareja o un grupo ya conviviente es uno de los actos más significativos de bienestar animal.",
    monthlyEst: "Q 500–1,000+",
    timeDay: "2–3 horas combinadas",
    space: "Casa con espacio amplio",
    tips: [
      "Habla con el refugio sobre pares o grupos que ya conviven.",
      "Asegúrate de tener recursos veterinarios para múltiples mascotas antes de adoptar.",
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGUNTAS DEL TEST
// ─────────────────────────────────────────────────────────────────────────────

// Sistema de puntuación: cada opción suma puntos a uno o varios perfiles
const QUESTIONS = [
  {
    id: 1,
    question: "¿Cómo describirías tu nivel de actividad física diaria?",
    icon: <FaRunning className="text-white" size={30} />,
    options: [
      {
        label: "Alta — hago ejercicio o salgo a caminar todos los días",
        scores: { active_dog: 3 },
      },
      {
        label: "Moderada — salgo, pero no soy de rutinas intensas",
        scores: { calm_dog: 3, playful_cat: 1 },
      },
      {
        label: "Baja — prefiero actividades tranquilas en casa",
        scores: { independent_cat: 3, calm_dog: 1 },
      },
      {
        label: "Variable — a veces mucho, a veces poco",
        scores: { playful_cat: 2, calm_dog: 1 },
      },
    ],
  },
  {
    id: 2,
    question: "¿Cuántas horas estás fuera de casa en un día promedio?",
    icon: <FaRegClock className="text-white" size={30} />,
    options: [
      {
        label: "Menos de 4 horas — casi siempre estoy en casa",
        scores: { calm_dog: 3, active_dog: 1 },
      },
      {
        label: "4–8 horas — jornada laboral normal",
        scores: { independent_cat: 2, playful_cat: 2 },
      },
      {
        label: "Más de 8 horas — trabajo mucho tiempo fuera",
        scores: { independent_cat: 3 },
      },
      {
        label: "Varía mucho cada día",
        scores: { independent_cat: 2, playful_cat: 1 },
      },
    ],
  },
  {
    id: 3,
    question: "¿Qué tipo de espacio tienes en casa?",
    icon: <FaHome className="text-white" size={30} />,
    options: [
      {
        label: "Casa amplia con jardín o patio",
        scores: { active_dog: 3, multi_pet: 2 },
      },
      {
        label: "Casa sin jardín pero con buen espacio interior",
        scores: { calm_dog: 2, playful_cat: 2 },
      },
      {
        label: "Apartamento amplio",
        scores: { calm_dog: 2, independent_cat: 2 },
      },
      {
        label: "Apartamento pequeño o habitación",
        scores: { independent_cat: 3, playful_cat: 1 },
      },
    ],
  },
  {
    id: 4,
    question: "¿Qué tipo de vínculo buscas con tu mascota?",
    icon: <FaHeart className="text-white" size={30} />,
    options: [
      {
        label: "Un compañero inseparable que esté siempre conmigo",
        scores: { active_dog: 2, calm_dog: 3 },
      },
      {
        label: "Presencia cercana pero que respete mi espacio",
        scores: { independent_cat: 3 },
      },
      {
        label: "Alguien juguetón y entretenido que me haga reír",
        scores: { playful_cat: 3, active_dog: 1 },
      },
      {
        label: "Una familia animal completa — cuantos más mejor",
        scores: { multi_pet: 4 },
      },
    ],
  },
  {
    id: 5,
    question: "¿Tienes experiencia previa con mascotas?",
    icon: <FaGraduationCap className="text-white" size={30} />,
    options: [
      {
        label: "Sí, crecí con perros y sé cuidarlos bien",
        scores: { active_dog: 2, calm_dog: 2 },
      },
      {
        label: "Sí, pero con gatos principalmente",
        scores: { independent_cat: 2, playful_cat: 2 },
      },
      {
        label: "Poca experiencia, soy principiante",
        scores: { independent_cat: 2, calm_dog: 1 },
      },
      {
        label: "Mucha experiencia con múltiples tipos de animales",
        scores: { multi_pet: 3, active_dog: 1 },
      },
    ],
  },
  {
    id: 6,
    question: "¿Hay niños pequeños o personas mayores en tu hogar?",
    icon: <FaUsers className="text-white" size={30} />,
    options: [
      {
        label: "Sí, niños menores de 10 años",
        scores: { calm_dog: 2, playful_cat: 2 },
      },
      {
        label: "Sí, adultos mayores",
        scores: { calm_dog: 3, independent_cat: 1 },
      },
      {
        label: "Solo adultos jóvenes o de mediana edad",
        scores: { active_dog: 2, multi_pet: 2 },
      },
      {
        label: "Vivo solo o con pareja sin hijos",
        scores: { independent_cat: 2, active_dog: 1, playful_cat: 1 },
      },
    ],
  },
  {
    id: 7,
    question: "¿Cuánto presupuesto mensual podrías destinar a tu mascota?",
    icon: <FaWallet className="text-white" size={30} />,
    options: [
      {
        label: "Q 100–200 — presupuesto ajustado",
        scores: { independent_cat: 3 },
      },
      {
        label: "Q 200–400 — presupuesto moderado",
        scores: { calm_dog: 2, playful_cat: 2, independent_cat: 1 },
      },
      {
        label: "Q 400–700 — presupuesto cómodo",
        scores: { active_dog: 2, calm_dog: 1, multi_pet: 1 },
      },
      {
        label: "Q 700+ — sin restricciones mayores",
        scores: { multi_pet: 3, active_dog: 2 },
      },
    ],
  },
  {
    id: 8,
    question: "¿Cuál de estas palabras te describe mejor?",
    icon: <FaRegUser className="text-white" size={30} />,
    options: [
      {
        label: "Aventurero — me encanta explorar y moverme",
        scores: { active_dog: 4 },
      },
      {
        label: "Tranquilo — valoro la paz y la rutina",
        scores: { calm_dog: 3, independent_cat: 1 },
      },
      {
        label: "Independiente — necesito mi propio espacio",
        scores: { independent_cat: 4 },
      },
      {
        label: "Empático — tengo mucho amor para dar",
        scores: { multi_pet: 3, calm_dog: 1 },
      },
    ],
  },
];

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

const questionVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.97 }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 28 },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
    scale: 0.97,
    transition: { duration: 0.22, ease: "easeIn" },
  }),
};

const resultVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 22 },
  },
};

const VIEWPORT = { once: true, margin: "-50px" };

const AnswerOption = memo(function AnswerOption({
  option,
  index,
  isSelected,
  onSelect,
  accent,
}) {
  return (
    <m.button
      custom={index}
      variants={{
        hidden: { opacity: 0, x: -16 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            type: "spring",
            stiffness: 160,
            damping: 22,
            delay: index * 0.07,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      whileHover={{ x: 6, backgroundColor: `${accent}10` }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-0 cursor-pointer text-left transition-colors duration-200 will-change-transform"
      style={{
        backgroundColor: isSelected ? `${accent}16` : "rgba(255,255,255,0.025)",
        border: `2px solid ${isSelected ? `${accent}55` : "rgba(216,243,220,0.10)"}`,
        boxShadow: isSelected ? `0 4px 20px ${accent}20` : "none",
      }}
    >
      <span
        className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-200"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          backgroundColor: isSelected ? accent : "rgba(216,243,220,0.07)",
          color: isSelected ? "#212529" : "rgba(216,243,220,0.40)",
          border: `1px solid ${isSelected ? accent : "rgba(216,243,220,0.12)"}`,
        }}
      >
        {["A", "B", "C", "D"][index]}
      </span>

      <span
        className="text-sm leading-relaxed flex-1"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: isSelected ? "#D8F3DC" : "rgba(216,243,220,0.60)",
          fontWeight: isSelected ? 600 : 400,
        }}
      >
        {option.label}
      </span>

      <AnimatePresence>
        {isSelected && (
          <m.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 22 }}
            className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: accent }}
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <polyline
                points="2 6 5 9 10 3"
                stroke="#212529"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </m.span>
        )}
      </AnimatePresence>
    </m.button>
  );
});

const ResultCard = memo(function ResultCard({ profile, scores, onRetry }) {
  const topScores = useMemo(() => {
    return Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id, score]) => ({ profile: PROFILES[id], score }));
  }, [scores]);

  const maxScore = topScores[0]?.score || 1;
  const waMessage = encodeURIComponent(
    `¡Hola! Hice el test de personalidad en HuellaViva y me recomendaron: "${profile.pet}". Me gustaría conocer más sobre el proceso de adopción.`,
  );

  return (
    <m.div
      variants={resultVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      <div
        className="relative overflow-hidden rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-start md:items-center"
        style={{
          background: `linear-gradient(135deg, ${profile.bg}, rgba(33,37,41,0.95))`,
          border: `1px solid ${profile.border}`,
          boxShadow: `0 12px 48px ${profile.accent}18`,
        }}
      >
        <div
          className="absolute top-0 right-0 rounded-full blur-[80px] opacity-20 pointer-events-none"
          style={{
            width: 300,
            height: 300,
            background: profile.accent,
            transform: "translate(30%, -30%)",
          }}
        />

        <m.div
          animate={{ rotate: [0, 8, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
          className="relative z-10 shrink-0 text-7xl md:text-8xl select-none"
          style={{ filter: `drop-shadow(0 8px 24px ${profile.accent}50)` }}
        >
          {profile.emoji}
        </m.div>

        <div className="relative z-10 flex-1">
          <div
            className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-[0.65rem] font-bold tracking-widest uppercase"
            style={{
              backgroundColor: `${profile.accent}20`,
              border: `1px solid ${profile.accent}40`,
              color: profile.accent,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <FaPaw size={9} />
            Tu perfil
          </div>
          <h3
            className="text-[#D8F3DC] leading-tight mb-1"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 700,
            }}
          >
            {profile.title}
          </h3>
          <p
            className="font-bold mb-3"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: profile.accent,
              fontStyle: "italic",
            }}
          >
            Te recomendamos: {profile.pet}
          </p>
          <p
            className="text-[#D8F3DC]/65 text-sm leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {profile.tagline}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {profile.suggestedBreeds.map((t) => (
              <span
                key={t}
                className="text-[0.65rem] font-semibold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: `${profile.accent}15`,
                  border: `1px solid ${profile.accent}30`,
                  color: profile.accent,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-5">
        <div
          className="p-6 rounded-2xl flex flex-col gap-5"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(216,243,220,0.08)",
          }}
        >
          <div>
            <p
              className="text-[0.65rem] font-bold tracking-widest uppercase mb-3"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(216,243,220,0.30)",
              }}
            >
              ¿Por qué este perfil?
            </p>
            <p
              className="text-[#D8F3DC]/70 text-sm leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {profile.description}
            </p>
          </div>

          <div
            className="p-4 rounded-xl"
            style={{
              backgroundColor: `${profile.accent}0C`,
              border: `1px solid ${profile.accent}22`,
            }}
          >
            <p
              className="text-[0.65rem] font-bold tracking-widest uppercase mb-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: profile.accent,
              }}
            >
              🐾 ¿Por qué un animal rescatado?
            </p>
            <p
              className="text-[#D8F3DC]/60 text-xs leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {profile.whyRescued}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {profile.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <span
                  className="text-sm mt-0.5 shrink-0"
                  style={{ color: profile.accent }}
                >
                  →
                </span>
                <p
                  className="text-[#D8F3DC]/55 text-xs leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div
            className="p-5 rounded-2xl flex flex-col gap-3"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(216,243,220,0.07)",
            }}
          >
            <p
              className="text-[0.65rem] font-bold tracking-widest uppercase"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(216,243,220,0.28)",
              }}
            >
              Lo que implica
            </p>
            {[
              {
                icon: "💰",
                label: "Gasto mensual est.",
                value: profile.monthlyEst,
              },
              { icon: "⏰", label: "Tiempo diario", value: profile.timeDay },
              { icon: "🏠", label: "Espacio ideal", value: profile.space },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-0.5 py-2 border-b border-[#D8F3DC]/6 last:border-0"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{item.icon}</span>
                  <span
                    className="text-[0.62rem] text-[#D8F3DC]/35"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.label}
                  </span>
                </div>
                <span
                  className="text-xs font-semibold text-[#D8F3DC]/75 pl-5"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div
            className="p-5 rounded-2xl flex flex-col gap-3"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(216,243,220,0.07)",
            }}
          >
            <p
              className="text-[0.65rem] font-bold tracking-widest uppercase"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(216,243,220,0.28)",
              }}
            >
              Tu puntuación por perfil
            </p>
            {topScores.map(({ profile: p, score }) => (
              <div key={p.id} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{p.emoji}</span>
                    <span
                      className="text-[0.65rem]"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: "rgba(216,243,220,0.50)",
                      }}
                    >
                      {p.title.split(" ").slice(0, 2).join(" ")}
                    </span>
                  </div>
                  <span
                    className="text-[0.62rem] font-bold tabular-nums"
                    style={{
                      color: p.accent,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {score} pts
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: "rgba(216,243,220,0.07)" }}
                >
                  <m.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: p.accent }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${(score / maxScore) * 100}%` }}
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      damping: 20,
                      delay: 0.3,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <m.a
          href={`https://wa.me/50258694127?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -3, boxShadow: `0 10px 32px ${profile.accent}45` }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl no-underline font-bold text-sm will-change-transform"
          style={{
            backgroundColor: profile.accent,
            color: profile.accent === "#D8F3DC" ? "#212529" : "#fff",
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: `0 4px 20px ${profile.accent}35`,
          }}
        >
          <FaPaw size={14} />
          Quiero adoptar mi {profile.pet.split(" ")[0].toLowerCase()}
          <FaArrowRight size={12} />
        </m.a>

        <m.a
          href="https://wa.me/50258694127"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl no-underline font-semibold text-sm will-change-transform"
          style={{
            backgroundColor: "rgba(37,211,102,0.12)",
            border: "1px solid rgba(37,211,102,0.30)",
            color: "#25D366",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <FaWhatsapp size={14} />
          Consultar por WhatsApp
        </m.a>

        <m.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.96 }}
          onClick={onRetry}
          className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border-0 cursor-pointer font-semibold text-sm"
          style={{
            backgroundColor: "rgba(216,243,220,0.06)",
            border: "1px solid rgba(216,243,220,0.12)",
            color: "rgba(216,243,220,0.45)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <FaRedo size={11} />
          Repetir test
        </m.button>
      </div>
    </m.div>
  );
});

export default function PersonalityTest() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, VIEWPORT);

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(1);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);

  const question = QUESTIONS[currentQ];
  const totalQ = QUESTIONS.length;
  const progressPct = (currentQ / totalQ) * 100;
  const selected = answers[question.id];
  const canAdvance = selected !== undefined;

  const computeResult = useCallback((finalAnswers) => {
    const scores = Object.fromEntries(Object.keys(PROFILES).map((k) => [k, 0]));
    QUESTIONS.forEach((q) => {
      const optIdx = finalAnswers[q.id];
      if (optIdx === undefined) return;
      const opt = q.options[optIdx];
      Object.entries(opt.scores).forEach(([profileId, pts]) => {
        scores[profileId] = (scores[profileId] || 0) + pts;
      });
    });
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    return { profile: PROFILES[winner], scores };
  }, []);

  const handleAnswer = useCallback(
    (optIndex) => {
      setAnswers((prev) => ({ ...prev, [question.id]: optIndex }));
    },
    [question.id],
  );

  const handleNext = useCallback(() => {
    if (!canAdvance) return;
    if (currentQ < totalQ - 1) {
      setDirection(1);
      setCurrentQ((q) => q + 1);
    } else {
      const { profile, scores } = computeResult(answers);
      setResult({ profile, scores });
      setFinished(true);
    }
  }, [canAdvance, currentQ, totalQ, answers, computeResult]);

  const handlePrev = useCallback(() => {
    if (currentQ === 0) return;
    setDirection(-1);
    setCurrentQ((q) => q - 1);
  }, [currentQ]);

  const handleRetry = useCallback(() => {
    setAnswers({});
    setCurrentQ(0);
    setDirection(1);
    setFinished(false);
    setResult(null);
  }, []);

  return (
    <LazyMotion features={domMax} strict>
      <section
        ref={sectionRef}
        className="relative w-full bg-[#212529] py-30 px-4 md:px-8 overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute rounded-full blur-[140px] opacity-[0.07]"
            style={{
              width: 550,
              height: 550,
              background: "#FF8C42",
              top: "-10%",
              right: "-10%",
            }}
          />
          <div
            className="absolute rounded-full blur-[120px] opacity-[0.05]"
            style={{
              width: 400,
              height: 400,
              background: "#2DA14F",
              bottom: "5%",
              left: "-5%",
            }}
          />
        </div>

        <div className="relative max-w-205 mx-auto">
          <m.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="flex flex-col items-center text-center mb-10"
          >
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border"
              style={{
                backgroundColor: "rgba(255,140,66,0.10)",
                borderColor: "rgba(255,140,66,0.28)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C42] pulse-dot" />
              <span
                className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#FF8C42",
                }}
              >
                Descubre tu compañero ideal
              </span>
            </div>

            <h2
              className="text-[#D8F3DC] leading-[1.1] tracking-[-0.03em] mb-4"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 700,
              }}
            >
              ¿Qué mascota va{" "}
              <em className="not-italic text-[#FF8C42]">contigo?</em>
            </h2>
            <p
              className="text-[#D8F3DC]/50 max-w-md leading-relaxed"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              }}
            >
              8 preguntas. 5 perfiles posibles. Descubre qué tipo de animal
              rescatado encaja con tu personalidad y estilo de vida.
            </p>
          </m.div>

          <AnimatePresence mode="wait">
            {!finished ? (
              <m.div
                key="quiz"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="flex-1 h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: "rgba(216,243,220,0.08)" }}
                  >
                    <m.div
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #FF8C42, #ffaa6b)",
                        boxShadow: "0 0 8px rgba(255,140,66,0.5)",
                      }}
                      animate={{ width: `${progressPct}%` }}
                      transition={{
                        type: "spring",
                        stiffness: 80,
                        damping: 22,
                      }}
                    />
                  </div>
                  <span
                    className="shrink-0 text-xs font-semibold tabular-nums"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "rgba(216,243,220,0.40)",
                    }}
                  >
                    {currentQ + 1} / {totalQ}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-1.5 mb-6">
                  {QUESTIONS.map((_, i) => (
                    <m.div
                      key={i}
                      animate={{
                        width: i === currentQ ? 20 : 6,
                        backgroundColor:
                          i < currentQ
                            ? "#2DA14F"
                            : i === currentQ
                              ? "#FF8C42"
                              : "rgba(216,243,220,0.15)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 26,
                      }}
                      className="h-1.5 rounded-full"
                    />
                  ))}
                </div>

                <div
                  className="rounded-3xl overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(216,243,220,0.08)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.28)",
                  }}
                >
                  <div className="px-6 md:px-8 pt-8 pb-6 border-b border-[#D8F3DC]/6">
                    <AnimatePresence custom={direction} mode="wait">
                      <m.div
                        key={question.id}
                        custom={direction}
                        variants={prefersReduced ? {} : questionVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className="text-2xl w-12 h-12 flex items-center justify-center rounded-2xl shrink-0"
                            style={{
                              backgroundColor: "rgba(255,140,66,0.12)",
                              border: "1px solid rgba(255,140,66,0.25)",
                            }}
                          >
                            {question.icon}
                          </span>
                          <div>
                            <p
                              className="text-[0.62rem] font-bold tracking-widest uppercase"
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                color: "rgba(216,243,220,0.28)",
                              }}
                            >
                              Pregunta {currentQ + 1}
                            </p>
                            <h3
                              className="text-[#D8F3DC] leading-snug"
                              style={{
                                fontFamily: "'Fraunces', serif",
                                fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                                fontWeight: 700,
                              }}
                            >
                              {question.question}
                            </h3>
                          </div>
                        </div>
                      </m.div>
                    </AnimatePresence>
                  </div>

                  <div className="px-6 md:px-8 py-6 flex flex-col gap-3">
                    <AnimatePresence mode="wait">
                      <m.div
                        key={`opts-${question.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-col gap-3"
                      >
                        {question.options.map((opt, i) => (
                          <AnswerOption
                            key={i}
                            option={opt}
                            index={i}
                            isSelected={selected === i}
                            onSelect={() => handleAnswer(i)}
                            accent="#FF8C42"
                          />
                        ))}
                      </m.div>
                    </AnimatePresence>
                  </div>

                  <div className="px-6 md:px-8 pb-6 flex items-center justify-between gap-3">
                    <m.button
                      whileHover={currentQ > 0 ? { x: -2 } : {}}
                      whileTap={currentQ > 0 ? { scale: 0.97 } : {}}
                      onClick={handlePrev}
                      disabled={currentQ === 0}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl border-0 cursor-pointer text-sm font-semibold transition-all duration-200"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        backgroundColor: "rgba(216,243,220,0.05)",
                        border: "1px solid rgba(216,243,220,0.10)",
                        color:
                          currentQ > 0
                            ? "rgba(216,243,220,0.55)"
                            : "rgba(216,243,220,0.18)",
                        cursor: currentQ === 0 ? "not-allowed" : "pointer",
                      }}
                    >
                      ← Anterior
                    </m.button>

                    <m.button
                      whileHover={
                        canAdvance
                          ? {
                              x: 2,
                              boxShadow: "0 6px 24px rgba(255,140,66,0.40)",
                            }
                          : {}
                      }
                      whileTap={canAdvance ? { scale: 0.97 } : {}}
                      onClick={handleNext}
                      disabled={!canAdvance}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border-0 text-sm font-bold transition-all duration-200"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        backgroundColor: canAdvance
                          ? "#FF8C42"
                          : "rgba(255,140,66,0.15)",
                        color: canAdvance ? "#fff" : "rgba(255,140,66,0.35)",
                        cursor: canAdvance ? "pointer" : "not-allowed",
                        boxShadow: canAdvance
                          ? "0 2px 16px rgba(255,140,66,0.35)"
                          : "none",
                      }}
                    >
                      {currentQ < totalQ - 1
                        ? "Siguiente →"
                        : "Ver mi resultado 🐾"}
                    </m.button>
                  </div>
                </div>
              </m.div>
            ) : (
              <m.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {result && (
                  <ResultCard
                    profile={result.profile}
                    scores={result.scores}
                    onRetry={handleRetry}
                  />
                )}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </LazyMotion>
  );
}
