import {
  FaPaw,
  FaHeart,
  FaRegSadCry,
  FaDog,
  FaCat
} from "react-icons/fa";

export const RESCUES = [
  {
    id: 1,
    name: "Toby",
    species: "Perrito",
    date: "-",
    location: "-",
    before: {
      label: "Antes",
      tag: "Encontrado",
      tagColor: "#FF8C42",
      summary: "Mi mami me adoptó cuando tenía 3 meses de Nacido soy una mezcla de chihuahua y alguna otra raza. Era muy delgado cuando llegue a ella.",
      details: ["Desnutrición severa", "3 meses en la calle"],
      mood: "Asustado",
      moodIcon: <FaRegSadCry color="#FF8C42" />,
      imagePlaceholder: "bg-gradient-to-br from-[#2a1f1a] to-[#3d2b1f]",
      image: "/timeline/toby/tobyBefore.png"
    },
    after: {
      label: "Después",
      tag: "Adoptado",
      tagColor: "#2DA14F",
      summary: "Me considero un perro afortunado al llegar a la vida de mami, ella me ama , espero que mis hermanos perrunos tan bien  sean adoptados por una persona así.",
      details: ["Peso saludable restaurado", "Juguetón y cariñoso"],
      mood: "Feliz",
      moodIcon: <FaPaw color="#2DA14F" />,
      imagePlaceholder: "bg-gradient-to-br from-[#0d2b17] to-[#1a4a2a]",
      image: "/timeline/toby/tobyAfter.png"
    },
    accentColor: "#2DA14F",
    duration: "Semanas de recuperación",
    rescuedBy: "Equipo HuellaViva",
    logo: <FaDog size={24} />
  },
  {
    id: 2,
    name: "Sisi",
    species: "Gata",
    date: "--",
    location: "--",
    before: {
      label: "Antes",
      tag: "Abandonado",
      tagColor: "#FF8C42",
      summary: "Hola soy Sisi, mis dueños pasaban por un basurero y se percataron que 2 adolescentes llevaban 2 gatitos, más adelante entre la basura me encontraron maullando.",
      details: ["Deshidratación", "Sin desparasitar"],
      mood: "Traumatizado",
      moodIcon: <FaRegSadCry color="#FF8C42" />,
      imagePlaceholder: "bg-gradient-to-br from-[#1a1a2a] to-[#2a2a3d]",
      image: "/timeline/sisi/sisiBefore.png"
    },
    after: {
      label: "Después",
      tag: "En hogar",
      tagColor: "#2DA14F",
      summary: "No me gustan las fotos, pero esta soy yo, los buenos cuidados se ven en mi pelaje el cual ahora brilla, y tengo una familia que me ama. ",
      details: ["Salud recuperada al 100%", "Pelaje saludable"],
      mood: "Amado",
      moodIcon: <FaHeart color="#2DA14F" />,
      imagePlaceholder: "bg-gradient-to-br from-[#0a2010] to-[#153520]",
      image: "/timeline/sisi/sisiAfter.png"
    },
    accentColor: "#FF8C42",
    duration: "Semanas de recuperación",
    rescuedBy: "Equipo HuellaViva",
    logo: <FaCat size={24} />
  },
  {
    id: 3,
    name: "Michi",
    species: "Gata",
    date: "Abril 2024",
    location: "Mercado Central, Zona 1",
    before: {
      label: "Antes",
      tag: "Rescatada",
      tagColor: "#FF8C42",
      summary: "Vivía entre los puestos del mercado, con una infección ocular grave que le había dejado ciego el ojo derecho.",
      details: ["Infección ocular grave", "Parasitosis severa", "Pelaje en muy mal estado", "Anemia por desnutrición"],
      mood: "Sufriendo",
      moodIcon: <FaRegSadCry color="#FF8C42" />,
      imagePlaceholder: "bg-gradient-to-br from-[#251a0a] to-[#3d2b10]",
      image: ""
    },
    after: {
      label: "Después",
      tag: "Adoptada",
      tagColor: "#2DA14F",
      summary: "Aunque perdió la visión en un ojo, Michi es hoy la reina del hogar de la familia Pérez en Antigua.",
      details: ["Ojo tratado y estabilizado", "Pelaje suave y brillante", "Independiente y curiosa", "Dueña del sofá"],
      mood: "Reina",
      moodIcon: <FaHeart color="#2DA14F" />,
      imagePlaceholder: "bg-gradient-to-br from-[#0d2b17] to-[#163d24]",
      image: ""
    },
    accentColor: "#D8F3DC",
    duration: "8 semanas de recuperación",
    rescuedBy: "Clínica VetAmigos",
    logo: <FaCat size={24} />
  },
  {
    id: 4,
    name: "Rocky",
    species: "Perro",
    date: "Febrero 2024",
    location: "Escombros, Zona 6",
    before: {
      label: "Antes",
      tag: "Encontrado",
      tagColor: "#FF8C42",
      summary: "Encontrado entre escombros de una demolición. Tenía una pata fracturada y múltiples cortes.",
      details: ["Fractura de pata delantera", "Múltiples laceraciones", "Sin microchip ni dueño", "Extremadamente delgado"],
      mood: "En dolor",
      moodIcon: <FaRegSadCry color="#FF8C42" />,
      imagePlaceholder: "bg-gradient-to-br from-[#1f1a10] to-[#332a18]",
      image: ""
    },
    after: {
      label: "Después",
      tag: "Adoptado",
      tagColor: "#2DA14F",
      summary: "Tras una cirugía exitosa, Rocky corre sin problemas. Vive con una familia joven con dos niños.",
      details: ["Cirugía ortopédica exitosa", "Corre y salta con alegría", "Ama a los niños", "Guardián del hogar"],
      mood: "Guerrero",
      moodIcon: <FaHeart color="#2DA14F" />,
      imagePlaceholder: "bg-gradient-to-br from-[#0d2b17] to-[#1a4a2a]",
      image: ""
    },
    accentColor: "#FF8C42",
    duration: "10 semanas de recuperación",
    rescuedBy: "Dr. Mendoza & Equipo",
    logo: <FaDog size={24} />
  },
];
