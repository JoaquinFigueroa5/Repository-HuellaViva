import { useState, useRef, useCallback } from "react";
import { LazyMotion, domMax, m, AnimatePresence } from "framer-motion";
import {
  FaPaw,
  FaDog,
  FaCat,
  FaHeart,
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
  FaDownload,
  FaEye,
  FaCheckCircle,
  FaCamera,
  FaUser,
  FaStar,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  POSTER_TYPES,
  SPECIES_OPTIONS,
  SIZE_OPTIONS,
  GENDER_OPTIONS,
} from "@/data/posterData";

/* ─── Sub-componentes ────────────────────────────────────────────── */

function FieldLabel({ children, required }) {
  return (
    <label
      className="block text-[0.7rem] font-semibold tracking-widest uppercase mb-1.5"
      style={{ fontFamily: "'DM Sans', sans-serif", color: "#D8F3DC60" }}
    >
      {children}
      {required && <span className="text-[#FF8C42] ml-1">*</span>}
    </label>
  );
}

function Input({ value, onChange, placeholder, type = "text", maxLength }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition-all duration-200"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        backgroundColor: "rgba(216,243,220,0.04)",
        borderColor: "rgba(216,243,220,0.12)",
        color: "#D8F3DC",
        "::placeholder": { color: "#D8F3DC30" },
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "rgba(216,243,220,0.35)";
        e.target.style.backgroundColor = "rgba(216,243,220,0.06)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "rgba(216,243,220,0.12)";
        e.target.style.backgroundColor = "rgba(216,243,220,0.04)";
      }}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 3, maxLength }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      maxLength={maxLength}
      className="w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition-all duration-200 resize-none"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        backgroundColor: "rgba(216,243,220,0.04)",
        borderColor: "rgba(216,243,220,0.12)",
        color: "#D8F3DC",
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "rgba(216,243,220,0.35)";
        e.target.style.backgroundColor = "rgba(216,243,220,0.06)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "rgba(216,243,220,0.12)";
        e.target.style.backgroundColor = "rgba(216,243,220,0.04)";
      }}
    />
  );
}

function ChipGroup({ options, value, onChange, accent }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const optVal = typeof opt === "object" ? opt.value : opt;
        const optLabel = typeof opt === "object" ? opt.label : opt;
        const optIcon = typeof opt === "object" ? opt.icon : null;
        const isActive = value === optVal;
        return (
          <button
            key={optVal}
            onClick={() => onChange(optVal)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              backgroundColor: isActive
                ? `${accent}20`
                : "rgba(216,243,220,0.04)",
              borderColor: isActive ? `${accent}50` : "rgba(216,243,220,0.12)",
              color: isActive ? accent : "#D8F3DC50",
              transform: isActive ? "scale(1.03)" : "scale(1)",
            }}
          >
            {optIcon && <span>{optIcon}</span>}
            {optLabel}
            {isActive && <FaCheckCircle size={10} />}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Vista previa del cartel ────────────────────────────────────── */

function PosterPreview({ data, posterType }) {
  const pt = POSTER_TYPES.find((p) => p.id === posterType);
  const isAdopt = posterType === "adoptame";
  const accent = pt.accentColor;

  const noPhoto = !data.photo;

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden select-none"
      style={{
        background: "#1a1e22",
        border: `2px solid ${accent}40`,
        boxShadow: `0 0 60px ${accent}20, 0 20px 60px rgba(0,0,0,0.5)`,
        fontFamily: "'DM Sans', sans-serif",
        maxWidth: 420,
        margin: "0 auto",
      }}
      id="poster-preview"
    >
      {/* Header con degradado */}
      <div
        className="relative px-6 pt-6 pb-8"
        style={{ background: pt.headerBg }}
      >
        {/* Logo HuellaViva */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: `${accent}25`,
                border: `1px solid ${accent}40`,
              }}
            >
              <FaPaw size={13} color={accent} />
            </div>
            <span
              className="font-bold text-sm tracking-tight"
              style={{ fontFamily: "'Fraunces', serif", color: "#D8F3DC" }}
            >
              Huella<span style={{ color: accent }}>Viva</span>
            </span>
          </div>
          <span
            className="text-[0.55rem] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
            style={{
              color: pt.tagColor,
              backgroundColor: pt.tagBg,
              border: `1px solid ${pt.tagBorder}`,
            }}
          >
            {pt.badgeText}
          </span>
        </div>

        {/* Nombre del animal */}
        <h2
          className="leading-none mb-0.5"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(2rem, 7vw, 2.8rem)",
            fontWeight: 700,
            color: accent,
          }}
        >
          {data.name || (isAdopt ? "Nombre" : "¿Me viste?")}
        </h2>
        <p
          className="text-[#D8F3DC]/50 text-xs mb-3"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {[
            data.species &&
              data.species.charAt(0).toUpperCase() + data.species.slice(1),
            data.breed,
            data.age && `${data.age} años`,
          ]
            .filter(Boolean)
            .join(" · ") || "Especie · Raza · Edad"}
        </p>

        {/* Badge de género/tamaño */}
        <div className="flex gap-2 flex-wrap">
          {data.gender && data.gender !== "Desconocido" && (
            <span
              className="text-[0.6rem] font-semibold tracking-wider uppercase px-2 py-0.75 rounded-full"
              style={{
                color: "#D8F3DC80",
                backgroundColor: "#D8F3DC10",
                border: "1px solid #D8F3DC15",
              }}
            >
              {data.gender}
            </span>
          )}
          {data.size && (
            <span
              className="text-[0.6rem] font-semibold tracking-wider uppercase px-2 py-0.75 rounded-full"
              style={{
                color: "#D8F3DC80",
                backgroundColor: "#D8F3DC10",
                border: "1px solid #D8F3DC15",
              }}
            >
              Tamaño {data.size}
            </span>
          )}
        </div>
      </div>

      {/* Foto */}
      <div
        className="relative mx-4 -mt-5 mb-4 rounded-xl overflow-hidden flex items-center justify-center"
        style={{
          height: 220,
          border: `2px solid ${accent}30`,
          backgroundColor: "#212529",
          boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 4px ${accent}10`,
        }}
      >
        {noPhoto ? (
          <div className="flex flex-col items-center gap-3 opacity-30">
            <FaCamera size={36} color={accent} />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#D8F3DC" }}
            >
              Foto del animal
            </span>
          </div>
        ) : (
          <img
            src={data.photo}
            alt={data.name}
            className="w-full h-full object-cover"
          />
        )}
        {/* Decorador de esquina */}
        <div
          className="absolute bottom-0 right-0 w-16 h-16 opacity-10"
          style={{
            background: `radial-gradient(circle at bottom right, ${accent}, transparent 70%)`,
          }}
        />
      </div>

      {/* Descripción */}
      {data.description && (
        <div className="px-5 mb-4">
          <p
            className="text-[#D8F3DC]/70 text-[0.72rem] leading-relaxed px-4 py-3 rounded-xl"
            style={{
              backgroundColor: `${accent}08`,
              border: `1px solid ${accent}18`,
            }}
          >
            {data.description}
          </p>
        </div>
      )}

      {/* Tags de características */}
      {data.traits && data.traits.length > 0 && (
        <div className="px-5 mb-4 flex flex-wrap gap-1.5">
          {data.traits
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
            .slice(0, 6)
            .map((t, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-[0.6rem] font-medium px-2 py-0.75 rounded-md"
                style={{
                  color: accent,
                  backgroundColor: `${accent}12`,
                  border: `1px solid ${accent}22`,
                }}
              >
                <span
                  className="w-1 h-1 rounded-full inline-block"
                  style={{ background: accent }}
                />
                {t}
              </span>
            ))}
        </div>
      )}

      {/* Divider */}
      <div
        className="mx-5 h-px mb-4"
        style={{ backgroundColor: "rgba(216,243,220,0.07)" }}
      />

      {/* Contacto */}
      <div className="px-5 pb-5 flex flex-col gap-2">
        {data.location && (
          <div className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${accent}15` }}
            >
              <FaMapMarkerAlt size={10} color={accent} />
            </div>
            <span
              className="text-[0.7rem] text-[#D8F3DC]/60 truncate"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {data.location}
            </span>
          </div>
        )}

        {data.phone && (
          <div className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(37,211,102,0.15)" }}
            >
              <FaWhatsapp size={10} color="#25D366" />
            </div>
            <span
              className="text-[0.7rem] text-[#D8F3DC]/60"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {data.phone}
            </span>
          </div>
        )}

        {data.contactName && (
          <div className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(216,243,220,0.08)" }}
            >
              <FaUser size={10} color="#D8F3DC50" />
            </div>
            <span
              className="text-[0.7rem] text-[#D8F3DC]/60"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {data.contactName}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{
          borderTop: `1px solid ${accent}15`,
          backgroundColor: `${accent}06`,
        }}
      >
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <FaPaw
              key={i}
              size={8}
              color={`${accent}${i === 1 ? "CC" : "40"}`}
            />
          ))}
        </div>
        <span
          className="text-[0.55rem] text-[#D8F3DC]/25 tracking-wider uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          huellaviva.gt
        </span>
        <span
          className="text-[0.55rem] font-semibold"
          style={{ color: `${accent}60`, fontFamily: "'DM Sans', sans-serif" }}
        >
          {isAdopt ? "¡Dale un hogar!" : "¡Ayúdanos a encontrarlo!"}
        </span>
      </div>
    </div>
  );
}

/* ─── Componente principal ───────────────────────────────────────── */

const INITIAL_DATA = {
  name: "",
  species: "perro",
  breed: "",
  age: "",
  gender: "Macho",
  size: "Mediano",
  description: "",
  traits: "",
  location: "",
  phone: "",
  contactName: "",
  photo: null,
};

export default function PosterGenerator() {
  const [posterType, setPosterType] = useState("adoptame");
  const [data, setData] = useState(INITIAL_DATA);
  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const fileRef = useRef(null);
  const pt = POSTER_TYPES.find((p) => p.id === posterType);
  const accent = pt.accentColor;

  const set = useCallback(
    (field) => (val) => setData((prev) => ({ ...prev, [field]: val })),
    [],
  );

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setData((prev) => ({ ...prev, photo: objectUrl }));
  };

  const steps = [
    { id: 1, label: "Tipo" },
    { id: 2, label: "Animal" },
    { id: 3, label: "Detalles" },
    { id: 4, label: "Contacto" },
  ];

  const isAdopt = posterType === "adoptame";

  return (
    <LazyMotion features={domMax} strict>
      <section
        className="w-full min-h-screen bg-[#212529] py-16 px-4 md:px-8"
        style={{
          "--accent": accent,
          "--accent-dark": isAdopt ? "#1a7a3a" : "#cc6b28",
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Encabezado */}
          <m.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 20 }}
            className="flex flex-col items-center text-center mb-12"
          >
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border"
              style={{
                backgroundColor: `${accent}12`,
                borderColor: `${accent}30`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
              <FaPaw size={10} color={accent} />
              <span
                className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif", color: accent }}
              >
                Generador de Carteles
              </span>
            </div>

            <h2
              className="leading-[1.1] tracking-[-0.03em] mb-4 text-[#D8F3DC]"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 700,
              }}
            >
              Crea tu cartel{" "}
              <em className="not-italic" style={{ color: accent }}>
                en segundos
              </em>
            </h2>

            <p
              className="text-[#D8F3DC]/50 max-w-md leading-relaxed"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              }}
            >
              Diseña carteles profesionales de adopción o búsqueda para los
              animales de HuellaViva.
            </p>
          </m.div>

          {/* Stepper */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 100,
              damping: 22,
            }}
            className="flex items-center justify-center gap-0 mb-10"
          >
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <button
                  onClick={() => setStep(s.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer border"
                  style={{
                    backgroundColor:
                      step === s.id
                        ? `${accent}20`
                        : step > s.id
                          ? `${accent}10`
                          : "transparent",
                    borderColor:
                      step === s.id
                        ? `${accent}50`
                        : step > s.id
                          ? `${accent}25`
                          : "rgba(216,243,220,0.08)",
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[0.6rem] font-bold shrink-0"
                    style={{
                      backgroundColor:
                        step === s.id
                          ? accent
                          : step > s.id
                            ? `${accent}30`
                            : "rgba(216,243,220,0.08)",
                      color:
                        step === s.id
                          ? "#212529"
                          : step > s.id
                            ? accent
                            : "#D8F3DC40",
                    }}
                  >
                    {step > s.id ? "✓" : s.id}
                  </div>
                  <span
                    className="text-[0.68rem] font-semibold hidden sm:inline"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color:
                        step === s.id
                          ? accent
                          : step > s.id
                            ? `${accent}80`
                            : "#D8F3DC30",
                    }}
                  >
                    {s.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div
                    className="w-6 h-px mx-1"
                    style={{
                      backgroundColor:
                        step > s.id ? `${accent}40` : "rgba(216,243,220,0.08)",
                    }}
                  />
                )}
              </div>
            ))}
          </m.div>

          {/* Layout principal */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 xl:gap-12 items-start">
            {/* Panel izquierdo: formulario */}
            <div className="flex flex-col gap-5">
              <AnimatePresence mode="wait">
                {/* PASO 1: Tipo de cartel */}
                {step === 1 && (
                  <m.div
                    key="step1"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ type: "spring", stiffness: 120, damping: 22 }}
                    className="flex flex-col gap-5"
                  >
                    <SectionCard
                      title="¿Qué tipo de cartel necesitas?"
                      accent={accent}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {POSTER_TYPES.map((pt) => (
                          <m.button
                            key={pt.id}
                            onClick={() => setPosterType(pt.id)}
                            whileHover={{
                              y: -3,
                              boxShadow: `0 8px 28px ${pt.accentColor}25`,
                            }}
                            whileTap={{ scale: 0.97 }}
                            className="relative flex flex-col items-center gap-4 p-6 rounded-2xl border text-center cursor-pointer transition-all duration-200 will-change-transform"
                            style={{
                              backgroundColor:
                                posterType === pt.id
                                  ? `${pt.accentColor}15`
                                  : "rgba(216,243,220,0.03)",
                              borderColor:
                                posterType === pt.id
                                  ? `${pt.accentColor}50`
                                  : "rgba(216,243,220,0.10)",
                              boxShadow:
                                posterType === pt.id
                                  ? `0 4px 32px ${pt.accentColor}20, 0 0 0 1px ${pt.accentColor}25`
                                  : "none",
                            }}
                          >
                            {posterType === pt.id && (
                              <div
                                className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: pt.accentColor }}
                              >
                                <FaCheckCircle size={12} color="#212529" />
                              </div>
                            )}
                            <div
                              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                              style={{
                                backgroundColor: `${pt.accentColor}15`,
                                border: `2px solid ${pt.accentColor}35`,
                              }}
                            >
                              <span
                                style={{ color: pt.accentColor, fontSize: 28 }}
                              >
                                {pt.id === "adoptame" ? (
                                  <FaHeart />
                                ) : (
                                  <FaExclamationTriangle />
                                )}
                              </span>
                            </div>
                            <div>
                              <p
                                className="font-bold text-base mb-1"
                                style={{
                                  fontFamily: "'Fraunces', serif",
                                  color:
                                    posterType === pt.id
                                      ? pt.accentColor
                                      : "#D8F3DC",
                                }}
                              >
                                {pt.label}
                              </p>
                              <p
                                className="text-xs text-[#D8F3DC]/40 leading-snug"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                              >
                                {pt.id === "adoptame"
                                  ? "Para animales que buscan un hogar permanente"
                                  : "Para animales perdidos o robados"}
                              </p>
                            </div>
                          </m.button>
                        ))}
                      </div>
                    </SectionCard>
                  </m.div>
                )}

                {/* PASO 2: Datos del animal */}
                {step === 2 && (
                  <m.div
                    key="step2"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ type: "spring", stiffness: 120, damping: 22 }}
                    className="flex flex-col gap-5"
                  >
                    <SectionCard title="Información del animal" accent={accent}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <FieldLabel required>Nombre</FieldLabel>
                          <Input
                            value={data.name}
                            onChange={set("name")}
                            placeholder={isAdopt ? "Ej: Toby" : "Ej: Rocky"}
                            maxLength={30}
                          />
                        </div>
                        <div>
                          <FieldLabel>Raza</FieldLabel>
                          <Input
                            value={data.breed}
                            onChange={set("breed")}
                            placeholder="Ej: Labrador, mestizo..."
                            maxLength={40}
                          />
                        </div>
                        <div>
                          <FieldLabel>Edad aproximada</FieldLabel>
                          <Input
                            value={data.age}
                            onChange={set("age")}
                            placeholder="Ej: 2, 6 meses..."
                            maxLength={20}
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <FieldLabel>Especie</FieldLabel>
                        <ChipGroup
                          options={SPECIES_OPTIONS}
                          value={data.species}
                          onChange={set("species")}
                          accent={accent}
                        />
                      </div>

                      <div className="mt-4">
                        <FieldLabel>Género</FieldLabel>
                        <ChipGroup
                          options={GENDER_OPTIONS}
                          value={data.gender}
                          onChange={set("gender")}
                          accent={accent}
                        />
                      </div>

                      <div className="mt-4">
                        <FieldLabel>Tamaño</FieldLabel>
                        <ChipGroup
                          options={SIZE_OPTIONS}
                          value={data.size}
                          onChange={set("size")}
                          accent={accent}
                        />
                      </div>
                    </SectionCard>

                    {/* Foto */}
                    <SectionCard title="Foto del animal" accent={accent}>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileRef}
                        className="hidden"
                        onChange={handlePhoto}
                      />
                      <m.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => fileRef.current?.click()}
                        className="w-full flex flex-col items-center justify-center gap-3 py-10 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200"
                        style={{
                          borderColor: data.photo
                            ? `${accent}50`
                            : "rgba(216,243,220,0.15)",
                          backgroundColor: data.photo
                            ? `${accent}08`
                            : "rgba(216,243,220,0.02)",
                        }}
                      >
                        {data.photo ? (
                          <>
                            <img
                              src={data.photo}
                              alt="preview"
                              className="w-24 h-24 rounded-2xl object-cover"
                              style={{ border: `2px solid ${accent}40` }}
                            />
                            <span
                              className="text-xs font-semibold"
                              style={{
                                color: accent,
                                fontFamily: "'DM Sans', sans-serif",
                              }}
                            >
                              ✓ Foto cargada · Toca para cambiar
                            </span>
                          </>
                        ) : (
                          <>
                            <div
                              className="w-14 h-14 rounded-2xl flex items-center justify-center"
                              style={{
                                backgroundColor: `${accent}15`,
                                border: `1px solid ${accent}30`,
                              }}
                            >
                              <FaCamera size={22} color={accent} />
                            </div>
                            <div className="text-center">
                              <p
                                className="text-sm font-semibold text-[#D8F3DC]/70 mb-1"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                              >
                                Subir foto
                              </p>
                              <p
                                className="text-[0.65rem] text-[#D8F3DC]/30"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                              >
                                JPG, PNG · Máx 10MB
                              </p>
                            </div>
                          </>
                        )}
                      </m.button>
                    </SectionCard>
                  </m.div>
                )}

                {/* PASO 3: Descripción y características */}
                {step === 3 && (
                  <m.div
                    key="step3"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ type: "spring", stiffness: 120, damping: 22 }}
                    className="flex flex-col gap-5"
                  >
                    <SectionCard title="Descripción" accent={accent}>
                      <FieldLabel>
                        {isAdopt
                          ? "¿Cómo es su personalidad?"
                          : "¿Cómo lo puedo reconocer?"}
                      </FieldLabel>
                      <Textarea
                        value={data.description}
                        onChange={set("description")}
                        placeholder={
                          isAdopt
                            ? "Ej: Es muy cariñoso y juguetón, le encanta salir a pasear y se lleva bien con niños..."
                            : "Ej: Collar azul, cicatriz en la pata derecha, muy asustadizo con desconocidos..."
                        }
                        rows={4}
                        maxLength={200}
                      />
                      <p
                        className="text-right text-[0.6rem] mt-1"
                        style={{
                          color: "#D8F3DC30",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {data.description.length}/200
                      </p>
                    </SectionCard>

                    <SectionCard
                      title="Características (etiquetas)"
                      accent={accent}
                    >
                      <FieldLabel>Separa con comas</FieldLabel>
                      <Input
                        value={data.traits}
                        onChange={set("traits")}
                        placeholder={
                          isAdopt
                            ? "Ej: Vacunado, Esterilizado, Apto con niños, Sociable"
                            : "Ej: Marrón, Ojos verdes, Collar rojo, Sin cola"
                        }
                        maxLength={120}
                      />
                      {data.traits && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {data.traits
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean)
                            .slice(0, 6)
                            .map((t, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1 text-[0.65rem] font-medium px-2.5 py-1 rounded-lg"
                                style={{
                                  color: accent,
                                  backgroundColor: `${accent}12`,
                                  border: `1px solid ${accent}22`,
                                  fontFamily: "'DM Sans', sans-serif",
                                }}
                              >
                                <span
                                  className="w-1 h-1 rounded-full"
                                  style={{ background: accent }}
                                />
                                {t}
                              </span>
                            ))}
                        </div>
                      )}
                    </SectionCard>
                  </m.div>
                )}

                {/* PASO 4: Contacto */}
                {step === 4 && (
                  <m.div
                    key="step4"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ type: "spring", stiffness: 120, damping: 22 }}
                    className="flex flex-col gap-5"
                  >
                    <SectionCard
                      title="Información de contacto"
                      accent={accent}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <FieldLabel>Nombre del contacto</FieldLabel>
                          <Input
                            value={data.contactName}
                            onChange={set("contactName")}
                            placeholder="Ej: Ana García / HuellaViva"
                            maxLength={40}
                          />
                        </div>
                        <div>
                          <FieldLabel required>WhatsApp / Teléfono</FieldLabel>
                          <Input
                            value={data.phone}
                            onChange={set("phone")}
                            placeholder="Ej: +502 5555-1234"
                            maxLength={25}
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <FieldLabel>Ubicación o zona</FieldLabel>
                        <Input
                          value={data.location}
                          onChange={set("location")}
                          placeholder={
                            isAdopt
                              ? "Ej: Zona 10, Guatemala"
                              : "Ej: Colonia El Prado, Zona 3"
                          }
                          maxLength={60}
                        />
                      </div>
                    </SectionCard>

                    {/* Aviso de descarga */}
                    <m.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-start gap-3 px-4 py-3.5 rounded-2xl"
                      style={{
                        backgroundColor: `${accent}08`,
                        border: `1px solid ${accent}20`,
                      }}
                    >
                      <FaStar
                        size={14}
                        color={accent}
                        className="shrink-0 mt-0.5"
                      />
                      <p
                        className="text-[0.72rem] leading-relaxed"
                        style={{
                          color: "#D8F3DC60",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        Para descargar el cartel, toma una captura de pantalla
                        de la vista previa o usa el botón{" "}
                        <strong style={{ color: accent }}>Descargar</strong> en
                        la previsualización.
                      </p>
                    </m.div>
                  </m.div>
                )}
              </AnimatePresence>

              {/* Botones de navegación */}
              <div className="flex gap-3 mt-2">
                {step > 1 && (
                  <m.button
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold border cursor-pointer transition-all duration-200"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#D8F3DC50",
                      borderColor: "rgba(216,243,220,0.12)",
                      backgroundColor: "rgba(216,243,220,0.03)",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Atrás
                  </m.button>
                )}

                {step < 4 ? (
                  <m.button
                    whileHover={{ y: -2, boxShadow: `0 8px 28px ${accent}40` }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setStep((s) => s + 1)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold cursor-pointer border-0 transition-all duration-200"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      backgroundColor: accent,
                      color: "#212529",
                      boxShadow: `0 2px 16px ${accent}35`,
                    }}
                  >
                    Siguiente
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </m.button>
                ) : (
                  <m.button
                    whileHover={{ y: -2, boxShadow: `0 8px 28px ${accent}40` }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowPreview(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold cursor-pointer border-0 lg:hidden transition-all duration-200"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      backgroundColor: accent,
                      color: "#212529",
                      boxShadow: `0 2px 16px ${accent}35`,
                    }}
                  >
                    <FaEye size={14} />
                    Ver cartel completo
                  </m.button>
                )}
              </div>
            </div>

            {/* Panel derecho: vista previa (desktop) */}
            <div className="hidden lg:block lg:sticky lg:top-24">
              <div className="mb-4 flex items-center justify-between px-1">
                <span
                  className="text-[0.68rem] text-[#D8F3DC]/30 font-semibold tracking-widest uppercase"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Vista previa
                </span>
                <div
                  className="flex items-center gap-1.5 text-[0.65rem] px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: `${accent}10`,
                    color: accent,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  En tiempo real
                </div>
              </div>
              <PosterPreview data={data} posterType={posterType} />

              <m.button
                whileHover={{ y: -2, boxShadow: `0 8px 28px ${accent}35` }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 mt-5 py-3 rounded-xl text-sm font-bold cursor-pointer border-0"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  backgroundColor: `${accent}15`,
                  color: accent,
                  border: `1px solid ${accent}30`,
                }}
                onClick={() => window.print()}
              >
                <FaDownload size={13} />
                Imprimir / Guardar como PDF
              </m.button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de preview mobile */}
      <AnimatePresence>
        {showPreview && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end lg:hidden"
            style={{
              backgroundColor: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(6px)",
            }}
            onClick={() => setShowPreview(false)}
          >
            <m.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full rounded-t-3xl overflow-y-auto"
              style={{
                backgroundColor: "#212529",
                maxHeight: "90vh",
                padding: "24px 16px 40px",
              }}
            >
              <div
                className="w-12 h-1 rounded-full mx-auto mb-6"
                style={{ backgroundColor: "rgba(216,243,220,0.15)" }}
              />
              <PosterPreview data={data} posterType={posterType} />
              <button
                onClick={() => setShowPreview(false)}
                className="w-full mt-5 py-3 rounded-xl text-sm font-semibold cursor-pointer border-0"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  backgroundColor: "rgba(216,243,220,0.06)",
                  color: "#D8F3DC60",
                  border: "1px solid rgba(216,243,220,0.10)",
                }}
              >
                Cerrar
              </button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

/* ─── SectionCard helper ─────────────────────────────────────────── */
function SectionCard({ title, accent, children }) {
  return (
    <div
      className="rounded-2xl border p-5 flex flex-col gap-4"
      style={{
        backgroundColor: "rgba(255,255,255,0.018)",
        borderColor: "rgba(216,243,220,0.08)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex items-center gap-2.5 mb-1">
        <div
          className="w-1 h-5 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <h3
          className="font-semibold text-sm text-[#D8F3DC]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
