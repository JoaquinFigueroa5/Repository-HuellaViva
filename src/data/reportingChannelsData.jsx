import { FaShieldAlt, FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaDownload, FaCamera, FaIdCard, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const LEGAL_CONTEXT = {
  title: "Contexto legal importante",
  content:
    "La ley en Guatemala no cuenta con un protocolo de 'recogida o reporte de animales callejeros' por el simple hecho de estar en la calle o no tener hogar. Sin embargo, sí es completamente legal y oficial reportar o denunciar situaciones si el animal callejero está sufriendo maltrato, crueldad, abandono evidente o si representa un peligro inmediato.",
  note: "Debido a que el Estado no cuenta actualmente con una red pública de albergues masivos para retirar a todos los animales de la calle, las autoridades priorizan de forma estricta los casos donde hay crueldad humana evidente o riesgo de salud pública. Para el rescate y posterior adopción de animales que solo deambulan pacíficamente, la ciudadanía suele apoyarse de forma paralela en plataformas independientes, refugios locales y ONGs de bienestar animal.",
};

export const CHANNELS = [
  {
    id: "uba",
    title: "Unidad de Bienestar Animal (UBA)",
    subtitle: "Ministerio de Agricultura, Ganadería y Alimentación — MAGA",
    accentColor: "#2DA14F",
    icon: <FaShieldAlt size={28} />,
    description:
      "Es el órgano oficial encargado de hacer cumplir la Ley de Protección y Bienestar Animal (Decreto 5-2017). Las denuncias ante la UBA son confidenciales.",
    contacts: [
      {
        label: "Correo electrónico",
        value: "denunciasbienestaranimal@maga.gob.gt",
        href: "mailto:denunciasbienestaranimal@maga.gob.gt",
        icon: <MdEmail size={16} />,
        color: "#2DA14F",
      },
      {
        label: "Vía telefónica / PBX",
        value: "1557 (extensiones 7070 o 7299) • 2413-7070",
        href: "tel:1557",
        icon: <FaPhone size={16} />,
        color: "#FF8C42",
      },
      {
        label: "Oficinas centrales",
        value: "7a. avenida 13-21, zona 9, Ciudad de Guatemala",
        href: "https://maps.google.com/?q=7a+avenida+13-21+zona+9+Guatemala",
        icon: <FaMapMarkerAlt size={16} />,
        color: "#D8F3DC",
      },
    ],
    schedule: "Horario de atención: 8:00 a 16:30 horas",
    requirements: [
      {
        icon: <FaDownload size={14} />,
        text: "Formulario de denuncia — descargarlo desde la página web del MAGA o del portal del Gobierno de Guatemala, debidamente lleno y firmado",
      },
      {
        icon: <FaCamera size={14} />,
        text: "Evidencias — fotografías, videos o documentos que demuestren el estado del animal (lesiones, desnutrición extrema, espacio inadecuado, abandono)",
      },
      {
        icon: <FaExclamationTriangle size={14} />,
        text: "Si deseas mantener el anonimato, asegúrate de que en las fotos o videos no aparezca tu rostro, tu vehículo o tu casa",
      },
      {
        icon: <FaMapMarkerAlt size={14} />,
        text: "Ubicación exacta — dirección clara y detallada del lugar donde se encuentra el animal",
      },
      {
        icon: <FaIdCard size={14} />,
        text: "Fotocopia de ambos lados de tu DPI (el manejo de tus datos es estrictamente confidencial por ley)",
      },
    ],
  },
  {
    id: "municipalidades",
    title: "Municipalidades",
    subtitle: "Gobiernos Locales",
    accentColor: "#FF8C42",
    icon: <FaBuilding size={28} />,
    description:
      "Según la ley, las municipalidades tienen la obligación de actuar en conjunto con la UBA para la protección y bienestar animal.",
    contacts: [
      {
        label: "Oficina municipal",
        value: "Acude a la oficina municipal de tu localidad",
        icon: <FaBuilding size={16} />,
        color: "#FF8C42",
      },
      {
        label: "Policía Municipal",
        value: "También puedes acudir al Juzgado de Asuntos Municipales",
        icon: <FaShieldAlt size={16} />,
        color: "#FF8C42",
      },
    ],
    schedule: "Horario variable según cada municipalidad",
    requirements: [
      {
        icon: <FaInfoCircle size={14} />,
        text: "Muchas municipalidades cuentan con regulaciones locales sobre bienestar animal o salud pública",
      },
      {
        icon: <FaInfoCircle size={14} />,
        text: "Están facultadas para intervenir en casos de abandono en la vía pública o si un animal en situación de calle muestra conductas sumamente agresivas que pongan en riesgo a la comunidad",
      },
    ],
  },
  {
    id: "pnc",
    title: "Policía Nacional Civil",
    subtitle: "Ministerio de Gobernación",
    accentColor: "#FF4444",
    icon: <FaShieldAlt size={28} />,
    description:
      "Si presencias un acto flagrante de crueldad o si el animal representa un peligro inminente (según el Decreto 22-2003, Ley de Animales Peligrosos).",
    contacts: [
      {
        label: "Emergencias",
        value: "110",
        href: "tel:110",
        icon: <FaPhone size={16} />,
        color: "#FF4444",
      },
      {
        label: "Subestación PNC",
        value: "Preséntate a la subestación más cercana para interponer una denuncia formal",
        icon: <FaMapMarkerAlt size={16} />,
        color: "#FF4444",
      },
    ],
    schedule: "Servicio 24 horas — emergencias",
    requirements: [
      {
        icon: <FaInfoCircle size={14} />,
        text: "Los agentes tienen la obligación legal de intervenir ante un delito o falta evidente contra el bienestar animal",
      },
      {
        icon: <FaInfoCircle size={14} />,
        text: "Deben coordinar con el Ministerio Público o la UBA según el caso",
      },
    ],
  },
];
