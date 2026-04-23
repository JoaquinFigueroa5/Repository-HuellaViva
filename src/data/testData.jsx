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

export const PROFILES = {
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

export const QUESTIONS = [
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
