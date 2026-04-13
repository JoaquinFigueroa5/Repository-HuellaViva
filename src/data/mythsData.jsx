import { 
  FaPaw,
  FaHome,
  FaSyringe,
  FaHeart,
  FaBrain,
  FaUser,
  FaCheckCircle,
  FaStethoscope,
  FaCat,
  FaRegAngry,
  FaHandsHelping,
  FaVirus,
  FaShieldAlt
} from "react-icons/fa";
import { 
  FaShieldCat
} from "react-icons/fa6";
import { 
  IoWarningOutline
} from "react-icons/io5"; 
import { 
  RiProhibitedLine,
  RiPlantLine
} from "react-icons/ri"; 
import { 
  FaArrowTrendDown
} from "react-icons/fa6"; 
import { TbReportMoney } from "react-icons/tb"; 
import { HiOutlineEmojiSad } from "react-icons/hi"; 

export const CATEGORIES = [
  { id: "all", label: "Todos", emoji: <FaPaw /> },
  { id: "adopcion", label: "Adopción", emoji: <FaHome /> },
  { id: "salud", label: "Salud", emoji: <FaSyringe /> },
  { id: "conducta", label: "Conducta", emoji: <FaBrain /> },
  { id: "sociedad", label: "Sociedad", emoji: <FaUser /> },
];

export const MYTHS = [
  {
    id: 1,
    category: "adopcion",
    myth: "Los animales de la calle o refugios están enfermos y son peligrosos.",
    mythShort: "Son peligrosos y enfermos",
    mythIcon: <IoWarningOutline color="#FF8C42" />,
    reality:
      "La mayoría de los animales rescatados reciben atención veterinaria completa antes de ser dados en adopción: vacunas, desparasitación y revisión general. Muchos son más saludables que los de criaderos.",
    realityShort: "Son sanos y revisados",
    realityIcon: <FaCheckCircle color="#2DA14F" />,
    source: "WSPA Guatemala, 2023",
    impact: "Este mito reduce las adopciones en un 40%",
  },
  {
    id: 2,
    category: "conducta",
    myth: "Un perro adulto rescatado nunca podrá adaptarse a un nuevo hogar.",
    mythShort: "No se adaptan",
    mythIcon: <RiProhibitedLine color="#FF8C42" />,
    reality:
      "Los perros adultos suelen adaptarse más rápido que los cachorros. Ya superaron la etapa destructiva, duermen más, y agradecen profundamente tener un hogar seguro. El vínculo que forman es extraordinario.",
    realityShort: "Se adaptan rápido y aman más",
    realityIcon: <FaHeart color="#2DA14F" />,
    source: "American Humane Society",
    impact: "Los adultos tienen 3x más dificultad para ser adoptados",
  },
  {
    id: 3,
    category: "sociedad",
    myth: "El abandono de animales es un problema menor comparado con otros sociales.",
    mythShort: "Es un problema menor",
    mythIcon: <FaArrowTrendDown color="#FF8C42" />,
    reality:
      "El abandono animal está directamente relacionado con la salud pública, transmisión de enfermedades zoonóticas, accidentes viales y bienestar mental de comunidades. Es un indicador social de primer orden.",
    realityShort: "Afecta directamente a las personas",
    realityIcon: <RiPlantLine color="#2DA14F" />,
    source: "OPS / OMS, 2022",
    impact: "3M+ animales en calle solo en Centroamérica",
  },
  {
    id: 4,
    category: "adopcion",
    myth: "Comprar una mascota de raza es mejor que adoptar porque conoces su origen.",
    mythShort: "Comprar es mejor que adoptar",
    mythIcon: <TbReportMoney color="#FF8C42" />,
    reality:
      "Los criaderos ilegales y tiendas de mascotas frecuentemente operan en condiciones de maltrato. Al comprar, se financia esa cadena. Adoptar rompe el ciclo y salva una vida real con historia.",
    realityShort: "Adoptar salva y no financia maltrato",
    realityIcon: <FaHeart color="#2DA14F" />,
    source: "Red de Bienestar Animal GT",
    impact: "80% de criaderos operan sin regulación en GT",
  },
  {
    id: 5,
    category: "salud",
    myth: "Esterilizar a mi mascota afecta su salud y cambia su personalidad.",
    mythShort: "La esterilización daña",
    mythIcon: <HiOutlineEmojiSad color="#FF8C42" />,
    reality:
      "La esterilización previene cánceres de mama, uterinos y prostáticos, y reduce comportamientos agresivos ligados a hormonas. La personalidad no cambia; el animal vive más y mejor.",
    realityShort: "Alarga vida y mejora salud",
    realityIcon: <FaStethoscope color="#2DA14F" />,
    source: "Colegio de Médicos Veterinarios GT",
    impact: "Reduce el 90% de la sobrepoblación callejera",
  },
  {
    id: 6,
    category: "conducta",
    myth: "Los gatos callejeros son independientes y no necesitan ser rescatados.",
    mythShort: "Los gatos no necesitan ayuda",
    mythIcon: <FaCat color="#FF8C42" />,
    reality:
      "Un gato callejero tiene una esperanza de vida de 2-5 años frente a los 15-20 de uno doméstico. Sufren frío, hambre, enfermedades y violencia. Su autonomía es una respuesta a la supervivencia, no bienestar.",
    realityShort: "Su vida en calle es corta y difícil",
    realityIcon: <FaShieldCat color="#2DA14F" />,
    source: "Asociación Felina de Guatemala",
    impact: "Esperanza de vida: 3 años en calle vs 18 en hogar",
  },
  {
    id: 7,
    category: "sociedad",
    myth: "Las personas que abandonan animales son simplemente malas personas.",
    mythShort: "Solo los malos abandonan",
    mythIcon: <FaRegAngry color="#FF8C42" />,
    reality:
      "La mayoría de abandonos ocurren por falta de educación, crisis económicas, migración o desconocimiento de alternativas. Juzgar sin entender impide crear soluciones estructurales reales.",
    realityShort: "Es un problema estructural y educativo",
    realityIcon: <FaHandsHelping color="#2DA14F" />,
    source: "CONAP Guatemala, 2023",
    impact: "El 65% de abandonos tienen causa socioeconómica",
  },
  {
    id: 8,
    category: "salud",
    myth: "Los animales callejeros contagian enfermedades solo por acercarse a ellos.",
    mythShort: "Solo acercarse contagia",
    mythIcon: <FaVirus color="#FF8C42" />,
    reality:
      "La transmisión de zoonosis requiere condiciones específicas. Con vacunación, desparasitación y manejo adecuado, el riesgo es mínimo. El programa de captura, esterilización y retorno (CER) protege a comunidades y animales.",
    realityShort: "Con manejo correcto el riesgo es mínimo",
    realityIcon: <FaShieldAlt color="#2DA14F" />,
    source: "Ministerio de Salud Pública GT",
    impact: "La vacunación masiva reduce rabia en 98%",
  },
];
