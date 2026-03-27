import { useState, useRef } from "react";
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
  FaRegClock,
  FaUser,
  FaHeart,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaRegSadCry,
  FaDog,
  FaCat
} from "react-icons/fa";

const RESCUES = [
  {
    id: 1,
    name: "Toby",
    species: "Perrito",
    date: "-",
    location: "-",
    before: {
      label: "Antes",
      tag: "Encontrada",
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
      tag: "Adoptada",
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


function ImagePlaceholder({ gradient, label, tag, tagColor, moodIcon, mood }) {
  return (
    <div className={`relative w-full h-full ${gradient} flex flex-col items-center justify-center gap-3 overflow-hidden`}>
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
      <span className="text-5xl relative z-10">{moodIcon}</span>
      <div className="relative z-10 flex flex-col items-center gap-1">
        <span
          className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{ color: tagColor, backgroundColor: `${tagColor}20`, border: `1px solid ${tagColor}40` }}
        >
          {tag}
        </span>
        <span className="text-[#D8F3DC]/30 text-[0.65rem] tracking-[0.2em] uppercase mt-1">
          Foto próximamente
        </span>
      </div>
    </div>
  );
}

function DetailTag({ text, accent }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-[0.68rem] font-medium px-2 py-0.75 rounded-md"
      style={{
        color: accent,
        backgroundColor: `${accent}15`,
        border: `1px solid ${accent}25`,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <span className="w-1 h-1 rounded-full inline-block" style={{ background: accent }} />
      {text}
    </span>
  );
}

function BeforeAfterCard({ side, data, accent, isActive, index }) {
  const isBefore = side === "before";
  return (
    <m.div
      initial={{ opacity: 0, y: 40 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: isBefore ? 0 : 0.15 }}
      className="flex flex-col rounded-2xl overflow-hidden border border-[#D8F3DC]/8 bg-[#1a1e22]"
      whileHover={{ y: -3, boxShadow: `0 8px 40px ${accent}15` }}
      style={{ boxShadow: isActive ? `0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px ${accent}15` : "none" }}
    >
      <div className="relative h-52 shrink-0">
        {
          data.image ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center gap-3 overflow-hidden">
              <img src={data.image} alt="Foto del antes o después" className="w-full h-full object-cover" />
            </div>
          ) : (
            <ImagePlaceholder
              gradient={data.imagePlaceholder}
              label={data.label}
              tag={data.tag}
              tagColor={data.tagColor}
              moodIcon={data.moodIcon}
              mood={data.mood}
            />
          )
        }
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-xs font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full backdrop-blur-sm"
            style={{
              color: isBefore ? "#FF8C42" : "#2DA14F",
              backgroundColor: isBefore ? "rgba(255,140,66,0.18)" : "rgba(45,161,79,0.18)",
              border: `1px solid ${isBefore ? "rgba(255,140,66,0.35)" : "rgba(45,161,79,0.35)"}`,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {isBefore ?  "Antes" : "Después"}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#212529]/70 backdrop-blur-sm">
          <span className="text-sm">{data.moodIcon}</span>
          <span className="text-[#D8F3DC]/70 text-[0.68rem] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {data.mood}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        <p
          className="text-[#D8F3DC]/75 text-sm leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {data.summary}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {data.details.map((d) => (
            <DetailTag key={d} text={d} accent={data.tagColor} />
          ))}
        </div>
      </div>
    </m.div>
  );
}

function TimelineNode({ rescue, index, isActive, isCompleted, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ type: "spring", stiffness: 120, damping: 22, delay: index * 0.1 }}
      className="relative"
    >
      <button
        onClick={onClick}
        className="w-full text-left group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 border border-transparent cursor-pointer"
        style={{
          backgroundColor: isActive ? `${rescue.accentColor}12` : "transparent",
          borderColor: isActive ? `${rescue.accentColor}30` : "transparent",
          outline: "none",
        }}
      >
        <div className="relative shrink-0">
          <m.div
            animate={{
              scale: isActive ? 1.15 : 1,
              boxShadow: isActive ? `0 0 0 6px ${rescue.accentColor}25, 0 0 20px ${rescue.accentColor}40` : "0 0 0 0px transparent",
            }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg relative z-10"
            style={{
              backgroundColor: isActive ? rescue.accentColor : isCompleted ? `${rescue.accentColor}30` : "#2a2f35",
              border: `2px solid ${isActive || isCompleted ? rescue.accentColor : "#3a4048"}`,
            }}
          >
            {isCompleted && !isActive ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={rescue.accentColor} strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <div style={{ color: isActive ? "#D8F3DC" : rescue.accentColor }}>
                {rescue.logo}
              </div>
            )}
          </m.div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="font-bold text-sm truncate"
              style={{
                fontFamily: "'Fraunces', serif",
                color: isActive ? rescue.accentColor : "#D8F3DC",
              }}
            >
              {rescue.name}
            </span>
            <span
              className="text-[0.6rem] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full shrink-0"
              style={{
                color: rescue.accentColor,
                backgroundColor: `${rescue.accentColor}18`,
              }}
            >
              {rescue.species}
            </span>
          </div>
          <p className="text-[#D8F3DC]/40 text-[0.68rem] truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {rescue.date} · {rescue.location}
          </p>
        </div>

        <m.div
          animate={{ x: isActive ? 0 : -4, opacity: isActive ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={rescue.accentColor} strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </m.div>
      </button>
    </m.div>
  );
}

export default function RescueTimeline() {
  const [activeId, setActiveId] = useState(1);
  const prefersReduced = useReducedMotion();
  const active = RESCUES.find((r) => r.id === activeId);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <>
      <LazyMotion features={domMax} strict>
        <section className="w-full bg-[#212529] py-20 px-4 md:px-8 overflow-hidden" id="historias">
          <div className="max-w-300 mx-auto">

            <m.div
              ref={headerRef}
              initial={{ opacity: 0, y: 32 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
              className="mb-16 flex flex-col items-center text-center"
            >
              <h2
                className="text-[#D8F3DC] leading-[1.1] tracking-[-0.03em] mb-4"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(2rem, 5vw, 3.4rem)",
                  fontWeight: 700,
                }}
              >
                Su historia en{" "}
                <em className="not-italic text-[#FF8C42]">dos momentos</em>
              </h2>

              <p
                className="text-[#D8F3DC]/50 max-w-md leading-relaxed"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                }}
              >
                Del abandono al hogar. Cada rescate es una transformación real, documentada por nuestro equipo.
              </p>
            </m.div>

            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 xl:gap-12 items-start">

              {/* primera columna */}

              <div className="lg:sticky lg:top-24">
                <div className="flex items-center gap-2 mb-5 px-1">
                  <span className="text-[#D8F3DC]/30 text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {RESCUES.length} rescates
                  </span>
                  <div className="flex-1 h-px bg-[#D8F3DC]/10" />
                </div>

                <div className="relative">
                  <div className="absolute left-9 top-5 bottom-5 w-px timeline-line" />

                  <div className="flex flex-col gap-1">
                    {RESCUES.map((r, i) => (
                      <TimelineNode
                        key={r.id}
                        rescue={r}
                        index={i}
                        isActive={r.id === activeId}
                        isCompleted={RESCUES.findIndex((x) => x.id === activeId) > i}
                        onClick={() => setActiveId(r.id)}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-6 px-4">
                  <div className="flex justify-between text-[0.65rem] text-[#D8F3DC]/30 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <span>Progreso</span>
                    <span>{RESCUES.findIndex((r) => r.id === activeId) + 1} / {RESCUES.length}</span>
                  </div>
                  <div className="h-1 rounded-full bg-[#D8F3DC]/10 overflow-hidden">
                    <m.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: active.accentColor }}
                      animate={{ width: `${((RESCUES.findIndex((r) => r.id === activeId) + 1) / RESCUES.length) * 100}%` }}
                      transition={{ type: "spring", stiffness: 120, damping: 24 }}
                    />
                  </div>
                </div>

                <div className="mt-4 px-4 flex gap-2">
                  <m.button
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      const idx = RESCUES.findIndex((r) => r.id === activeId);
                      if (idx > 0) setActiveId(RESCUES[idx - 1].id);
                    }}
                    disabled={RESCUES.findIndex((r) => r.id === activeId) === 0}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[#D8F3DC]/15 bg-[#D8F3DC]/4 text-[#D8F3DC]/50 text-xs font-medium cursor-pointer transition-colors duration-200 hover:bg-[#D8F3DC]/8 hover:text-[#D8F3DC]/75 disabled:opacity-25 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                    Anterior
                  </m.button>
                  <m.button
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      const idx = RESCUES.findIndex((r) => r.id === activeId);
                      if (idx < RESCUES.length - 1) setActiveId(RESCUES[idx + 1].id);
                    }}
                    disabled={RESCUES.findIndex((r) => r.id === activeId) === RESCUES.length - 1}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[#D8F3DC]/15 bg-[#D8F3DC]/4 text-[#D8F3DC]/50 text-xs font-medium cursor-pointer transition-colors duration-200 hover:bg-[#D8F3DC]/8 hover:text-[#D8F3DC]/75 disabled:opacity-25 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Siguiente
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                  </m.button>
                </div>
              </div>

              {/* segunda columna */}

              <AnimatePresence mode="wait">
                <m.div
                  key={activeId}
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReduced ? 0 : -16 }}
                  transition={{ type: "spring", stiffness: 100, damping: 22 }}
                  className="flex flex-col gap-6"
                >

                  <div
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border"
                    style={{
                      borderColor: `${active.accentColor}25`,
                      backgroundColor: `${active.accentColor}08`,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <m.div
                        animate={{ rotate: [0, 8, -4, 0] }}
                        transition={{ delay: 0.3, duration: 0.6, ease: "easeInOut" }}
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                        style={{ backgroundColor: `${active.accentColor}20`, border: `2px solid ${active.accentColor}40` }}
                      >
                        <div style={{ color: active.accentColor }}>
                          {active.logo}
                        </div>
                      </m.div>
                      <div>
                        <h3
                          className="leading-none mb-1"
                          style={{
                            fontFamily: "'Fraunces', serif",
                            fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                            fontWeight: 700,
                            color: active.accentColor,
                          }}
                        >
                          {active.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[#D8F3DC]/50 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {active.species} · {active.date}
                          </span>
                          <span className="text-[#D8F3DC]/30 text-xs hidden sm:inline">·</span>
                          <span className="text-[#D8F3DC]/40 text-xs hidden sm:inline" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {active.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="text-[0.68rem] flex items-center gap-1 font-medium px-3 py-1 rounded-full" style={{ color: "#D8F3DC", backgroundColor: "#D8F3DC15", border: "1px solid #D8F3DC20", fontFamily: "'DM Sans', sans-serif" }}>
                        <FaRegClock /> {active.duration}
                      </span>
                      <span className="text-[0.68rem] flex items-center gap-1 font-medium px-3 py-1 rounded-full" style={{ color: active.accentColor, backgroundColor: `${active.accentColor}15`, border: `1px solid ${active.accentColor}25`, fontFamily: "'DM Sans', sans-serif" }}>
                        <FaUser /> {active.rescuedBy}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-[#D8F3DC]/8" />
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1e22] border border-[#D8F3DC]/10">
                      <span className="text-[0.65rem] font-semibold tracking-widest uppercase text-[#FF8C42]/80" style={{ fontFamily: "'DM Sans', sans-serif" }}>Antes</span>
                      <div className="flex gap-0.75">
                        {[0, 1, 2].map((i) => (
                          <span key={i} className="w-0.75 h-0.75 rounded-full" style={{ backgroundColor: i === 1 ? active.accentColor : "#D8F3DC30" }} />
                        ))}
                      </div>
                      <span className="text-[0.65rem] font-semibold tracking-widest uppercase text-[#2DA14F]/80" style={{ fontFamily: "'DM Sans', sans-serif" }}>Después</span>
                    </div>
                    <div className="flex-1 h-px bg-[#D8F3DC]/8" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <BeforeAfterCard
                      side="before"
                      data={active.before}
                      accent={active.accentColor}
                      isActive={true}
                      index={0}
                    />
                    <BeforeAfterCard
                      side="after"
                      data={active.after}
                      accent={active.accentColor}
                      isActive={true}
                      index={1}
                    />
                  </div>

                  <m.div
                    initial={{ opacity: 0, scaleX: 0.6 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 20 }}
                    className="flex items-center gap-3 px-5 py-4 rounded-2xl"
                    style={{ backgroundColor: `${active.accentColor}08`, border: `1px solid ${active.accentColor}20` }}
                  >
                    <span className="text-xl shrink-0">{active.before.moodIcon}</span>
                    <div className="flex-1 relative h-0.5 rounded-full overflow-hidden bg-[#D8F3DC]/10">
                      <m.div
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{ backgroundColor: active.accentColor }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                      <m.div
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{ color: active.accentColor }}
                        initial={{ left: "0%" }}
                        animate={{ left: "calc(100% - 10px)" }}
                        transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <FaPaw size={10} />
                      </m.div>
                    </div>
                    <span className="text-xl shrink-0">{active.after.moodIcon}</span>
                    <span
                      className="text-xs font-semibold ml-1 shrink-0"
                      style={{ color: active.accentColor, fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Transformación completa
                    </span>
                  </m.div>

                </m.div>
              </AnimatePresence>
            </div>

            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
              className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 md:p-8 rounded-2xl border border-[#2DA14F]/20 bg-[#2DA14F]/6"
            >
              <div>
                <h4
                  className="text-[#D8F3DC] mb-1"
                  style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", fontWeight: 700 }}
                >
                  ¿Quieres ser parte de la{" "}
                  <em className="not-italic text-[#2DA14F]">próxima historia?</em>
                </h4>
                <p className="text-[#D8F3DC]/45 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Adopta, dona o vuélvete voluntario. Cada acto cuenta.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                {/* <m.button
                  whileHover={{ y: -2, boxShadow: "0 8px 28px rgba(255,140,66,0.45)" }}
                  whileTap={{ scale: 0.96 }}
                  className="px-5 py-2.75 rounded-xl text-sm font-semibold border-0 cursor-pointer text-white"
                  style={{ backgroundColor: "#FF8C42", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 2px 16px rgba(255,140,66,0.35)" }}
                >
                  Adoptar ahora
                </m.button> */}
                <m.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-5 py-2.75 rounded-xl text-sm font-semibold cursor-pointer"
                  style={{
                    color: "#2DA14F",
                    backgroundColor: "rgba(45,161,79,0.12)",
                    border: "1px solid rgba(45,161,79,0.3)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onClick={() => document.location.href = "#donaciones"}
                >
                  Donar
                </m.button>
              </div>
            </m.div>

          </div>
        </section>
      </LazyMotion>
    </>
  );
}