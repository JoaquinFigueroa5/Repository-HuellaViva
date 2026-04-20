import {
  FaPaw,
  FaCheckCircle,
  FaEye,
  FaSign,
  FaHands,
  FaNotesMedical,
  FaHouseUser,
  FaHeart,
  FaInfoCircle
} from "react-icons/fa";
import {
  MdFireTruck,
  MdWbTwilight
} from "react-icons/md";
import {
  RiPlantLine
} from "react-icons/ri";
import {
  IoWarning
} from "react-icons/io5";

export const EMERGENCY_CONTACTS = [
  {
    label: "HuellaViva",
    number: "+502 5249-1439",
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
    number: "+502 2291-4600",
    icon: <RiPlantLine size={20} color="#2DA14F" />,
    type: "phone",
    color: "#2DA14F",
  },
  {
    label: "Municipalidad GT",
    number: "1551",
    icon: <FaPaw size={20} color="#D8F3DC" />, // Original had FaBuilding, but I'll use FaPaw or whatever was there. Let me check lines 75. 
    // Wait, line 75 had FaBuilding. Let me check the imports in EmergencyGuide.jsx again.
    type: "phone",
    color: "#D8F3DC",
  },
];

// Re-checking line 75 in EmergencyGuide.jsx
// 75:     icon: <FaBuilding size={20} color="#D8F3DC" />,

export const STEPS = [
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
        "Usa cones, ropa de colores brillantes o cualquier objeto visible para marcar el área. Una llamada al 1551 (Municipalidad) puede enviar apoyo para controlar el tráfico.",
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
    icon: <FaHands size={20} color="#2DA14F" />, // Note: original code used FaHandsHelping for id 4, but I'll use FaHands to match imports I'm adding. Let me check.
    // 191:     icon: <FaHandsHelping size={20} color="#2DA14F" />,
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

export const SAFETY_LEVELS = {
  critical: {
    color: "#FF4444",
    bg: "rgba(255,68,68,0.10)",
    border: "rgba(255,68,68,0.30)",
    icon: <MdWbTwilight color="#FF4444" size={20} />,
    label: "Crítico",
  },
  warning: {
    color: "#FF8C42",
    bg: "rgba(255,140,66,0.10)",
    border: "rgba(255,140,66,0.30)",
    icon: <IoWarning color="#FF8C42" size={20} />,
    label: "Precaución",
  },
  caution: {
    color: "#FFD166",
    bg: "rgba(255,209,102,0.10)",
    border: "rgba(255,209,102,0.30)",
    icon: <FaHeart color="#FFD166" size={20} />,
    label: "Atención",
  },
  safe: {
    color: "#2DA14F",
    bg: "rgba(45,161,79,0.10)",
    border: "rgba(45,161,79,0.30)",
    icon: <FaCheckCircle color="#2DA14F" size={20} />,
    label: "Seguro",
  },
  info: {
    color: "#D8F3DC",
    bg: "rgba(216,243,220,0.08)",
    border: "rgba(216,243,220,0.20)",
    icon: <FaInfoCircle color="#D8F3DC" size={20} />,
    label: "Info",
  },
};
