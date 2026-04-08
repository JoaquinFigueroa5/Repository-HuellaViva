import { useState, useEffect, useRef, useCallback, memo } from "react";
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
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaLocationArrow,
  FaUpload,
  FaSpinner,
  FaDove,
  FaDog,
  FaCat,
  FaVirus,
  FaQuestionCircle,
  FaShieldAlt,
  FaEye,
  FaEyeSlash,
  FaHandHoldingMedical,
  FaHeartBroken,
  FaHome,
  FaHeart,
  FaNewspaper
} from "react-icons/fa";
import { GiStickingPlaster } from "react-icons/gi";
import { MdWbTwilight } from "react-icons/md";
import { IoWarning } from "react-icons/io5";
import { PiProhibitBold } from "react-icons/pi";

// ─────────────────────────────────────────────────────────────────────────────
// DATOS COMPARTIDOS
// ─────────────────────────────────────────────────────────────────────────────

const SPECIES_OPTIONS = [
  { value: "dog", label: "Perro", emoji: <FaDog className="text-[#D8F3DC]" /> },
  { value: "cat", label: "Gato", emoji: <FaCat className="text-[#D8F3DC]" /> },
  { value: "bird", label: "Ave", emoji: <FaDove className="text-[#D8F3DC]" /> },
  {
    value: "other",
    label: "Otro",
    emoji: <FaPaw className="text-[#D8F3DC]" />,
  },
];

const CONDITION_OPTIONS = [
  {
    value: "healthy",
    label: "Aparentemente sano",
    emoji: <FaCheck className="text-[#D8F3DC]" />,
    color: "#2DA14F",
  },
  {
    value: "injured",
    label: "Herido o lastimado",
    emoji: <GiStickingPlaster className="text-[#D8F3DC]" />,
    color: "#FF8C42",
  },
  {
    value: "sick",
    label: "Parece enfermo",
    emoji: <FaVirus className="text-[#D8F3DC]" />,
    color: "#FF8C42",
  },
  {
    value: "critical",
    label: "Estado crítico",
    emoji: <MdWbTwilight className="text-[#D8F3DC]" />,
    color: "#FF4444",
  },
  {
    value: "unknown",
    label: "No lo pude evaluar",
    emoji: <FaQuestionCircle className="text-[#D8F3DC]" />,
    color: "#D8F3DC",
  },
];

const SIZE_OPTIONS = [
  { value: "small", label: "Pequeño", sub: "< 10 kg" },
  { value: "medium", label: "Mediano", sub: "10–25 kg" },
  { value: "large", label: "Grande", sub: "> 25 kg" },
];

// Tipos de maltrato
const ABUSE_TYPES = [
  {
    value: "physical",
    label: "Maltrato físico",
    emoji: <FaHandHoldingMedical className="text-[#D8F3DC]" />,
    color: "#FF4444",
    desc: "Golpes, heridas, quemaduras, mutilaciones",
  },
  {
    value: "abandonment",
    label: "Abandono con riesgo",
    emoji: <PiProhibitBold className="text-[#D8F3DC]" />,
    color: "#FF8C42",
    desc: "Animal encadenado, encerrado o sin acceso a agua/comida",
  },
  {
    value: "neglect",
    label: "Negligencia grave",
    emoji: <FaHeartBroken className="text-[#D8F3DC]" />,
    color: "#FF8C42",
    desc: "Desnutrición severa, condiciones insalubres, sin atención médica",
  },
  {
    value: "hoarding",
    label: "Acumulación de animales",
    emoji: <FaHome className="text-[#D8F3DC]" />,
    color: "#FF8C42",
    desc: "Demasiados animales en condiciones precarias",
  },
  {
    value: "other",
    label: "Otro tipo de maltrato",
    emoji: <IoWarning className="text-[#D8F3DC]" />,
    color: "#D8F3DC",
    desc: "Situación no contemplada en las anteriores",
  },
];

// Urgencia del caso
const URGENCY_LEVELS = [
  {
    value: "immediate",
    label: "Inmediata — vida en peligro",
    color: "#FF4444",
    emoji: <MdWbTwilight className="text-[#D8F3DC]" />,
  },
  {
    value: "urgent",
    label: "Urgente — requiere atención hoy",
    color: "#FF8C42",
    emoji: <IoWarning className="text-[#D8F3DC]" />,
  },
  {
    value: "moderate",
    label: "Moderada — situación estable",
    color: "#FFD166",
    emoji: <FaHeart className="text-[#D8F3DC]" />,
  },
  {
    value: "low",
    label: "Baja — es recurrente pero estable",
    color: "#2DA14F",
    emoji: <FaNewspaper className="text-[#D8F3DC]" />,
  },
];

const WA_NUMBER = "50258694127";

// ─────────────────────────────────────────────────────────────────────────────
// VARIANTES
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
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

const VIEWPORT = { once: true, margin: "-50px" };

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const now = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};
const nowDate = () => new Date().toISOString().split("T")[0];

async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
    );
    const data = await res.json();
    const a = data.address ?? {};
    const parts = [
      [a.road, a.house_number].filter(Boolean).join(" "),
      a.neighbourhood || a.suburb || a.quarter || a.hamlet,
      a.city_district,
      a.city || a.town || a.village || a.municipality,
      a.country,
    ].filter(Boolean);
    return parts.length > 0
      ? parts.join(", ")
      : `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  } catch {
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTES COMPARTIDOS
// ─────────────────────────────────────────────────────────────────────────────

const Field = memo(function Field({ label, children, required, hint }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[0.68rem] font-semibold tracking-widest uppercase"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "rgba(216,243,220,0.40)",
        }}
      >
        {label}
        {required && <span className="text-[#FF8C42] ml-0.5">*</span>}
      </label>
      {children}
      {hint && (
        <p
          className="text-[0.62rem]"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(216,243,220,0.25)",
          }}
        >
          {hint}
        </p>
      )}
    </div>
  );
});

const StyledInput = memo(function StyledInput({
  className = "",
  style = {},
  ...props
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      onFocus={(e) => {
        setFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        props.onBlur?.(e);
      }}
      className={`w-full px-4 py-3 rounded-xl text-sm border-0 outline-none transition-all duration-200 ${className}`}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        backgroundColor: focused
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${focused ? "rgba(45,161,79,0.50)" : "rgba(216,243,220,0.10)"}`,
        color: "#D8F3DC",
        boxShadow: focused ? "0 0 0 3px rgba(45,161,79,0.12)" : "none",
        ...style,
      }}
    />
  );
});

const StyledTextarea = memo(function StyledTextarea({
  className = "",
  style = {},
  ...props
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      {...props}
      onFocus={(e) => {
        setFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        props.onBlur?.(e);
      }}
      className={`w-full px-4 py-3 rounded-xl text-sm border-0 outline-none resize-none transition-all duration-200 ${className}`}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        backgroundColor: focused
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${focused ? "rgba(45,161,79,0.50)" : "rgba(216,243,220,0.10)"}`,
        color: "#D8F3DC",
        boxShadow: focused ? "0 0 0 3px rgba(45,161,79,0.12)" : "none",
        ...style,
      }}
    />
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// MAPA LEAFLET
// ─────────────────────────────────────────────────────────────────────────────

function LeafletMap({
  position,
  onPositionChange,
  onAddressChange,
  accentColor = "#2DA14F",
}) {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markerRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current || !mapRef.current) return;

    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);
    }

    const loadLeaflet = () => {
      if (window.L) {
        initMap();
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
      script.onload = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current || leafletMap.current) return;
      const L = window.L;
      const lat = position?.lat ?? 14.6349;
      const lng = position?.lng ?? -90.5069;

      const map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: 15,
        zoomControl: true,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        },
      ).addTo(map);

      const icon = L.divIcon({
        html: `<div style="width:36px;height:36px;border-radius:50% 50% 50% 0;background:linear-gradient(135deg,${accentColor},${accentColor}99);transform:rotate(-45deg);border:2px solid #D8F3DC;box-shadow:0 4px 16px ${accentColor}50;display:flex;align-items:center;justify-content:center;"><span style="transform:rotate(45deg);font-size:16px;line-height:1;">🐾</span></div>`,
        className: "",
        iconSize: [36, 36],
        iconAnchor: [18, 36],
      });

      const marker = L.marker([lat, lng], { icon, draggable: true }).addTo(map);
      marker.on("dragend", async () => {
        const { lat: nLat, lng: nLng } = marker.getLatLng();
        onPositionChange({ lat: nLat, lng: nLng });
        if (onAddressChange) {
          const addr = await reverseGeocode(nLat, nLng);
          onAddressChange(addr);
        }
      });
      map.on("click", async (e) => {
        marker.setLatLng(e.latlng);
        onPositionChange({ lat: e.latlng.lat, lng: e.latlng.lng });
        if (onAddressChange) {
          const addr = await reverseGeocode(e.latlng.lat, e.latlng.lng);
          onAddressChange(addr);
        }
      });

      leafletMap.current = map;
      markerRef.current = marker;
      mountedRef.current = true;
    };

    loadLeaflet();
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
        mountedRef.current = false;
      }
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!leafletMap.current || !markerRef.current || !position) return;
    markerRef.current.setLatLng([position.lat, position.lng]);
    leafletMap.current.setView([position.lat, position.lng], 15, {
      animate: true,
    });
  }, [position?.lat, position?.lng]); // eslint-disable-line

  return (
    <div
      ref={mapRef}
      className="w-full rounded-2xl overflow-hidden"
      style={{ height: 260, border: `1px solid ${accentColor}30`, zIndex: 1 }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHOTO UPLOAD
// ─────────────────────────────────────────────────────────────────────────────

function PhotoUpload({ photos, onChange, accentColor = "#2DA14F" }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const addFiles = useCallback(
    (files) => {
      const valid = [...files]
        .filter((f) => f.type.startsWith("image/"))
        .slice(0, 5 - photos.length);
      if (!valid.length) return;
      Promise.all(
        valid.map(
          (file) =>
            new Promise((res) => {
              const r = new FileReader();
              r.onload = (e) => res({ url: e.target.result, name: file.name });
              r.readAsDataURL(file);
            }),
        ),
      ).then((p) => onChange([...photos, ...p]));
    },
    [photos, onChange],
  );

  const removePhoto = useCallback(
    (i) => onChange(photos.filter((_, idx) => idx !== i)),
    [photos, onChange],
  );

  return (
    <div className="flex flex-col gap-3">
      <m.div
        animate={{
          borderColor: dragging ? `${accentColor}70` : "rgba(216,243,220,0.12)",
          backgroundColor: dragging
            ? `${accentColor}08`
            : "rgba(255,255,255,0.02)",
        }}
        transition={{ duration: 0.2 }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className="relative flex flex-col items-center justify-center gap-3 py-8 rounded-2xl border border-dashed cursor-pointer"
        style={{ minHeight: 120 }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: `${accentColor}12`,
            border: `1px solid ${accentColor}25`,
          }}
        >
          <FaUpload size={17} color={accentColor} />
        </div>
        <div className="text-center">
          <p
            className="text-[#D8F3DC]/70 text-sm font-semibold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Arrastra fotos o{" "}
            <span style={{ color: accentColor }}>selecciona</span>
          </p>
          <p
            className="text-[#D8F3DC]/30 text-xs mt-0.5"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Máx. 5 fotos
          </p>
        </div>
        {photos.length >= 5 && (
          <div
            className="absolute inset-0 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "rgba(33,37,41,0.85)" }}
          >
            <p
              className="text-[#FF8C42] text-sm font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Máximo 5 fotos alcanzado
            </p>
          </div>
        )}
      </m.div>

      <AnimatePresence>
        {photos.length > 0 && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-5 gap-2"
          >
            {photos.map((photo, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-square rounded-xl overflow-hidden"
                style={{ border: `1px solid ${accentColor}25` }}
              >
                <img
                  src={photo.url}
                  alt={`Foto ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#212529]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removePhoto(i);
                    }}
                    className="w-7 h-7 rounded-full flex items-center justify-center border-0 cursor-pointer"
                    style={{ backgroundColor: "#FF4444", color: "#fff" }}
                  >
                    <FaTimes size={10} />
                  </button>
                </div>
                <div
                  className="absolute bottom-1 left-1 text-[0.5rem] font-bold px-1 rounded"
                  style={{
                    backgroundColor: "rgba(33,37,41,0.85)",
                    color: "#D8F3DC",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  #{i + 1}
                </div>
              </m.div>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GPS HOOK — reutilizable en ambos formularios
// ─────────────────────────────────────────────────────────────────────────────

function useGps() {
  const [position, setPosition] = useState(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState(null);
  const [gpsAddress, setGpsAddress] = useState("");

  const requestGps = useCallback(() => {
    if (!navigator.geolocation) {
      setGpsError("Tu dispositivo no soporta GPS.");
      return;
    }
    setGpsLoading(true);
    setGpsError(null);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        setPosition({ lat, lng });
        setGpsLoading(false);
        const addr = await reverseGeocode(lat, lng);
        setGpsAddress(addr);
      },
      (err) => {
        setGpsLoading(false);
        setGpsError(
          err.code === 1
            ? "Permiso de ubicación denegado."
            : "No se pudo obtener la ubicación.",
        );
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  return {
    position,
    setPosition,
    gpsLoading,
    gpsError,
    gpsAddress,
    setGpsAddress,
    requestGps,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOQUE DE UBICACIÓN — reutilizable
// ─────────────────────────────────────────────────────────────────────────────

function LocationBlock({ gps, accentColor = "#2DA14F" }) {
  const {
    position,
    setPosition,
    gpsLoading,
    gpsError,
    gpsAddress,
    setGpsAddress,
    requestGps,
  } = gps;
  const [useManualAddr, setUseManualAddr] = useState(false);
  const [manualAddr, setManualAddr] = useState("");

  // Expose manual addr state upward via gps object
  useEffect(() => {
    gps._manualAddr = manualAddr;
    gps._useManualAddr = useManualAddr;
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 flex-wrap">
        <m.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={requestGps}
          disabled={gpsLoading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-0 cursor-pointer text-sm font-semibold transition-all duration-200"
          style={{
            backgroundColor: gpsLoading
              ? `${accentColor}08`
              : `${accentColor}14`,
            border: `1px solid ${accentColor}35`,
            color: accentColor,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {gpsLoading ? (
            <>
              <FaSpinner size={12} className="animate-spin" /> Obteniendo
              ubicación...
            </>
          ) : (
            <>
              <FaLocationArrow size={12} /> Usar mi ubicación GPS
            </>
          )}
        </m.button>
        {position && !gpsLoading && (
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1.5"
          >
            <FaCheck size={11} color={accentColor} />
            <span
              className="text-xs font-semibold"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: accentColor,
              }}
            >
              Ubicación detectada
            </span>
          </m.div>
        )}
      </div>

      <AnimatePresence>
        {gpsError && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl"
            style={{
              backgroundColor: "rgba(255,68,68,0.08)",
              border: "1px solid rgba(255,68,68,0.25)",
            }}
          >
            <FaExclamationTriangle size={13} color="#FF4444" />
            <p
              className="text-[#FF4444] text-xs"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {gpsError}
            </p>
          </m.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          {!useManualAddr ? (
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(216,243,220,0.10)",
              }}
            >
              <FaMapMarkerAlt
                size={12}
                color={gpsAddress ? accentColor : "rgba(216,243,220,0.25)"}
              />
              <p
                className="text-sm flex-1 truncate"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: gpsAddress
                    ? "rgba(216,243,220,0.75)"
                    : "rgba(216,243,220,0.25)",
                }}
              >
                {gpsLoading
                  ? "Detectando ubicación..."
                  : gpsAddress || "Esperando GPS o ingresa dirección manual"}
              </p>
            </div>
          ) : (
            <StyledInput
              type="text"
              placeholder="Ej: Av. Reforma 15-50, Zona 10, Ciudad de Guatemala"
              value={manualAddr}
              onChange={(e) => setManualAddr(e.target.value)}
            />
          )}
        </div>
        <button
          onClick={() => setUseManualAddr(!useManualAddr)}
          className="shrink-0 px-3 py-2 rounded-xl border-0 cursor-pointer text-xs font-semibold transition-all duration-200"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            backgroundColor: useManualAddr
              ? "rgba(255,140,66,0.12)"
              : "rgba(255,255,255,0.04)",
            border: `1px solid ${useManualAddr ? "rgba(255,140,66,0.35)" : "rgba(216,243,220,0.10)"}`,
            color: useManualAddr ? "#FF8C42" : "rgba(216,243,220,0.45)",
            whiteSpace: "nowrap",
          }}
        >
          {useManualAddr ? "✏️ Manual" : "📝 Ingresar manual"}
        </button>
      </div>

      <Field
        label="Ajusta el punto exacto en el mapa"
        hint="Arrastra el marcador o haz clic para ajustar"
      >
        <LeafletMap
          position={position}
          onPositionChange={setPosition}
          onAddressChange={setGpsAddress}
          accentColor={accentColor}
        />
        {position && (
          <p
            className="text-[#D8F3DC]/30 text-[0.62rem] mt-1"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Coordenadas: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
          </p>
        )}
      </Field>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FORMULARIO 1 — Reporte de animal callejero (código existente)
// ─────────────────────────────────────────────────────────────────────────────

const INITIAL_STREET = {
  species: "",
  condition: "",
  size: "",
  color: "",
  description: "",
  collarOrTag: false,
  aggressive: false,
  name: "",
  phone: "",
  email: "",
  notes: "",
};

function StreetAnimalForm() {
  const [form, setForm] = useState(INITIAL_STREET);
  const [time, setTime] = useState(now());
  const [date, setDate] = useState(nowDate());
  const [useManualTime, setUseManualTime] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const prefersReduced = useReducedMotion();

  const gps = useGps();

  useEffect(() => {
    gps.requestGps();
  }, []); // eslint-disable-line
  useEffect(() => {
    if (useManualTime) return;
    const tick = setInterval(() => {
      setTime(now());
      setDate(nowDate());
    }, 30000);
    return () => clearInterval(tick);
  }, [useManualTime]);

  const handleForm = useCallback(
    (key, value) => setForm((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const handleWhatsApp = useCallback(() => {
    const addr = gps._useManualAddr
      ? gps._manualAddr
      : gps.gpsAddress ||
        (gps.position
          ? `${gps.position.lat.toFixed(5)}, ${gps.position.lng.toFixed(5)}`
          : "No disponible");
    const coords = gps.position
      ? `${gps.position.lat.toFixed(6)}, ${gps.position.lng.toFixed(6)}`
      : "—";
    const msg = encodeURIComponent(
      `*REPORTE DE ANIMAL - HuellaViva*\n------------------------------\n\n*UBICACION*\n- Direccion: ${addr}\n- Coordenadas: ${coords}\n- Fecha y hora: ${date}  ${time}\n\n*INFORMACION DEL ANIMAL*\n- Especie: ${SPECIES_OPTIONS.find((s) => s.value === form.species)?.label ?? "—"}\n- Condicion: ${CONDITION_OPTIONS.find((c) => c.value === form.condition)?.label ?? "—"}\n- Tamano: ${SIZE_OPTIONS.find((s) => s.value === form.size)?.label ?? "No indicado"}\n- Color / marcas: ${form.color || "No indicado"}\n- Collar o placa: ${form.collarOrTag === true ? "Si" : "No"}\n- Agresivo: ${form.aggressive ? "SI - tener precaucion" : "No"}\n- Descripcion: ${form.description || "Sin descripcion"}\n\n*FOTOS*\n- Fotos adjuntas: ${photos.length > 0 ? `${photos.length} foto(s) (se envian por separado)` : "Ninguna"}\n\n*DATOS DEL REPORTANTE*\n- Nombre: ${form.name || "Anonimo"}\n- Telefono / WA: ${form.phone || "No indicado"}\n- Correo: ${form.email || "No indicado"}\n- Disponibilidad: ${form.notes || "No indicado"}\n- ENVIAR FOTOS POR ESTE MEDIO\n------------------------------\n_Enviado desde HuellaViva_`,
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
  }, [form, photos, gps, time, date]);

  const canContinue = {
    1: form.species && form.condition,
    2: gps.position || gps._manualAddr,
    3: true,
  };
  const STEPS = [
    { n: 1, label: "Animal", icon: "🐾" },
    { n: 2, label: "Ubicación", icon: "📍" },
    { n: 3, label: "Contacto", icon: "📞" },
  ];

  if (submitted)
    return (
      <m.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="flex flex-col items-center text-center gap-6 max-w-md mx-auto p-10 rounded-3xl border border-[#2DA14F]/30"
        style={{
          backgroundColor: "rgba(45,161,79,0.06)",
          boxShadow: "0 8px 48px rgba(45,161,79,0.15)",
        }}
      >
        <m.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -5, 0] }}
          transition={{ duration: 0.8 }}
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
          style={{
            backgroundColor: "rgba(45,161,79,0.15)",
            border: "2px solid rgba(45,161,79,0.40)",
          }}
        >
          🐾
        </m.div>
        <div>
          <h3
            className="text-[#2DA14F] mb-2"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "1.8rem",
              fontWeight: 700,
            }}
          >
            ¡Reporte enviado!
          </h3>
          <p
            className="text-[#D8F3DC]/60 text-sm leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Nuestro equipo revisará tu reporte y te contactará pronto. Gracias
            por cuidar a quienes no tienen voz.
          </p>
        </div>
        <m.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            setSubmitted(false);
            setStep(1);
            setForm(INITIAL_STREET);
            setPhotos([]);
          }}
          className="px-6 py-3 rounded-xl text-sm font-semibold border-0 cursor-pointer"
          style={{
            backgroundColor: "#2DA14F",
            color: "#212529",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Hacer otro reporte
        </m.button>
      </m.div>
    );

  return (
    <>
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-0 mb-8">
        {STEPS.map((s, i) => (
          <div key={s.n} className="flex items-center">
            <button
              onClick={() => s.n < step && setStep(s.n)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border-0 transition-all duration-300"
              style={{
                cursor:
                  s.n === step
                    ? "default"
                    : s.n < step
                      ? "pointer"
                      : "not-allowed",
                backgroundColor:
                  s.n === step
                    ? "rgba(45,161,79,0.15)"
                    : s.n < step
                      ? "rgba(45,161,79,0.08)"
                      : "transparent",
                border: `1px solid ${s.n === step ? "rgba(45,161,79,0.40)" : s.n < step ? "rgba(45,161,79,0.20)" : "rgba(216,243,220,0.08)"}`,
              }}
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor:
                    s.n <= step ? "#2DA14F" : "rgba(216,243,220,0.10)",
                  color: s.n <= step ? "#212529" : "rgba(216,243,220,0.30)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {s.n < step ? <FaCheck size={9} /> : s.n}
              </span>
              <span
                className="text-xs font-semibold hidden sm:inline"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color:
                    s.n === step
                      ? "#2DA14F"
                      : s.n < step
                        ? "rgba(45,161,79,0.70)"
                        : "rgba(216,243,220,0.25)",
                }}
              >
                {s.label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <div
                className="w-8 h-px mx-1"
                style={{
                  backgroundColor:
                    step > s.n
                      ? "rgba(45,161,79,0.40)"
                      : "rgba(216,243,220,0.10)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <m.div
          key={step}
          initial={{ opacity: 0, x: prefersReduced ? 0 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: prefersReduced ? 0 : -30 }}
          transition={{ type: "spring", stiffness: 200, damping: 28 }}
          className="rounded-3xl p-6 md:p-8 flex flex-col gap-7"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(216,243,220,0.08)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.30)",
          }}
        >
          {/* ── PASO 1 ── */}
          {step === 1 && (
            <>
              <div className="flex items-center gap-3 pb-2 border-b border-[#D8F3DC]/[0.07]">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(45,161,79,0.15)",
                    border: "1px solid rgba(45,161,79,0.30)",
                  }}
                >
                  <FaPaw className="text-[#2DA14F]" />
                </div>
                <div>
                  <h3
                    className="text-[#D8F3DC] font-bold text-base"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Información del animal
                  </h3>
                  <p
                    className="text-[#D8F3DC]/35 text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Cuéntanos qué tipo de animal encontraste y cómo está
                  </p>
                </div>
              </div>

              <Field label="Especie" required>
                <div className="grid grid-cols-4 gap-2">
                  {SPECIES_OPTIONS.map((sp) => (
                    <m.button
                      key={sp.value}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleForm("species", sp.value)}
                      className="flex flex-col items-center gap-1.5 py-3 rounded-xl border-0 cursor-pointer transition-all duration-200"
                      style={{
                        backgroundColor:
                          form.species === sp.value
                            ? "rgba(45,161,79,0.18)"
                            : "rgba(255,255,255,0.03)",
                        border: `2px solid ${form.species === sp.value ? "rgba(45,161,79,0.55)" : "rgba(216,243,220,0.10)"}`,
                      }}
                    >
                      <span className="text-2xl">{sp.emoji}</span>
                      <span
                        className="text-[0.68rem] font-semibold"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color:
                            form.species === sp.value
                              ? "#2DA14F"
                              : "rgba(216,243,220,0.50)",
                        }}
                      >
                        {sp.label}
                      </span>
                    </m.button>
                  ))}
                </div>
              </Field>

              <Field label="Condición aparente" required>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CONDITION_OPTIONS.map((c) => (
                    <m.button
                      key={c.value}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleForm("condition", c.value)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border-0 cursor-pointer text-left transition-all duration-200"
                      style={{
                        backgroundColor:
                          form.condition === c.value
                            ? `${c.color}12`
                            : "rgba(255,255,255,0.025)",
                        border: `1px solid ${form.condition === c.value ? `${c.color}45` : "rgba(216,243,220,0.08)"}`,
                      }}
                    >
                      <span className="text-lg">{c.emoji}</span>
                      <span
                        className="text-sm font-medium"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color:
                            form.condition === c.value
                              ? c.color
                              : "rgba(216,243,220,0.55)",
                        }}
                      >
                        {c.label}
                      </span>
                      {form.condition === c.value && (
                        <m.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto"
                        >
                          <FaCheck size={11} color={c.color} />
                        </m.span>
                      )}
                    </m.button>
                  ))}
                </div>
              </Field>

              <Field label="Tamaño aproximado">
                <div className="grid grid-cols-3 gap-2">
                  {SIZE_OPTIONS.map((sz) => (
                    <m.button
                      key={sz.value}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleForm("size", sz.value)}
                      className="flex flex-col items-center gap-0.5 py-3 rounded-xl border-0 cursor-pointer transition-all duration-200"
                      style={{
                        backgroundColor:
                          form.size === sz.value
                            ? "rgba(255,140,66,0.14)"
                            : "rgba(255,255,255,0.025)",
                        border: `1px solid ${form.size === sz.value ? "rgba(255,140,66,0.45)" : "rgba(216,243,220,0.08)"}`,
                      }}
                    >
                      <span
                        className="text-sm font-bold"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color:
                            form.size === sz.value
                              ? "#FF8C42"
                              : "rgba(216,243,220,0.60)",
                        }}
                      >
                        {sz.label}
                      </span>
                      <span
                        className="text-[0.6rem]"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: "rgba(216,243,220,0.28)",
                        }}
                      >
                        {sz.sub}
                      </span>
                    </m.button>
                  ))}
                </div>
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Color o marcas distintivas">
                  <StyledInput
                    type="text"
                    placeholder="Ej: negro con manchas blancas"
                    value={form.color}
                    onChange={(e) => handleForm("color", e.target.value)}
                  />
                </Field>
                <Field label="¿Lleva collar o placa?">
                  <div className="flex gap-2 mt-1">
                    {[
                      { v: true, l: "Sí" },
                      { v: false, l: "No" },
                    ].map(({ v, l }) => (
                      <button
                        key={l}
                        onClick={() => handleForm("collarOrTag", v)}
                        className="flex-1 py-3 rounded-xl border-0 cursor-pointer text-sm font-semibold transition-all duration-200"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          backgroundColor:
                            form.collarOrTag === v
                              ? "rgba(45,161,79,0.15)"
                              : "rgba(255,255,255,0.03)",
                          border: `1px solid ${form.collarOrTag === v ? "rgba(45,161,79,0.45)" : "rgba(216,243,220,0.08)"}`,
                          color:
                            form.collarOrTag === v
                              ? "#2DA14F"
                              : "rgba(216,243,220,0.45)",
                        }}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <Field
                label="Descripción adicional"
                hint="Comportamiento, señas particulares, si se deja tocar, etc."
              >
                <StyledTextarea
                  rows={3}
                  placeholder="Ej: El perro estaba temblando pero dejó que me acercara..."
                  value={form.description}
                  onChange={(e) => handleForm("description", e.target.value)}
                />
              </Field>

              <div
                className="flex items-center justify-between p-4 rounded-xl"
                style={{
                  backgroundColor: "rgba(255,68,68,0.06)",
                  border: "1px solid rgba(255,68,68,0.18)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    <IoWarning className="text-[#D8F3DC]" />
                  </span>
                  <div>
                    <p
                      className="text-[#D8F3DC]/75 text-sm font-semibold"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      ¿El animal muestra agresividad?
                    </p>
                    <p
                      className="text-[#D8F3DC]/35 text-xs"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Importante para la seguridad del equipo de rescate
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleForm("aggressive", !form.aggressive)}
                  className="w-12 h-6 rounded-full border-0 cursor-pointer relative transition-colors duration-300"
                  style={{
                    backgroundColor: form.aggressive
                      ? "#FF4444"
                      : "rgba(216,243,220,0.12)",
                  }}
                >
                  <m.div
                    animate={{ x: form.aggressive ? 24 : 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 26 }}
                    className="absolute top-0.75 w-4.5 h-4.5 rounded-full bg-white"
                  />
                </button>
              </div>
            </>
          )}

          {/* ── PASO 2 ── */}
          {step === 2 && (
            <>
              <div className="flex items-center gap-3 pb-2 border-b border-[#D8F3DC]/[0.07]">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{
                    backgroundColor: "rgba(255,140,66,0.15)",
                    border: "1px solid rgba(255,140,66,0.30)",
                  }}
                >
                  📍
                </div>
                <div>
                  <h3
                    className="text-[#D8F3DC] font-bold text-base"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Ubicación y hora
                  </h3>
                  <p
                    className="text-[#D8F3DC]/35 text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    GPS automático — ajusta el punto en el mapa
                  </p>
                </div>
              </div>
              <LocationBlock gps={gps} accentColor="#2DA14F" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Hora del avistamiento"
                  hint={
                    useManualTime
                      ? "Modo manual activo"
                      : "Se actualiza automáticamente"
                  }
                >
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <FaClock
                        size={13}
                        color={useManualTime ? "#FF8C42" : "#2DA14F"}
                        style={{
                          position: "absolute",
                          left: 14,
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      />
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => {
                          setTime(e.target.value);
                          setUseManualTime(true);
                        }}
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-sm border-0 outline-none"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          backgroundColor: "rgba(255,255,255,0.03)",
                          border: `1px solid ${useManualTime ? "rgba(255,140,66,0.40)" : "rgba(45,161,79,0.30)"}`,
                          color: "#D8F3DC",
                          colorScheme: "dark",
                        }}
                      />
                    </div>
                    {useManualTime && (
                      <button
                        onClick={() => {
                          setUseManualTime(false);
                          setTime(now());
                        }}
                        className="px-3 rounded-xl border-0 cursor-pointer text-xs"
                        style={{
                          backgroundColor: "rgba(45,161,79,0.12)",
                          border: "1px solid rgba(45,161,79,0.30)",
                          color: "#2DA14F",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        Auto
                      </button>
                    )}
                  </div>
                </Field>
                <Field label="Fecha">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm border-0 outline-none"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      backgroundColor: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(216,243,220,0.10)",
                      color: "#D8F3DC",
                      colorScheme: "dark",
                    }}
                  />
                </Field>
              </div>
            </>
          )}

          {/* ── PASO 3 ── */}
          {step === 3 && (
            <>
              <div className="flex items-center gap-3 pb-2 border-b border-[#D8F3DC]/[0.07]">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{
                    backgroundColor: "rgba(216,243,220,0.10)",
                    border: "1px solid rgba(216,243,220,0.20)",
                  }}
                >
                  📸
                </div>
                <div>
                  <h3
                    className="text-[#D8F3DC] font-bold text-base"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Fotos y datos de contacto
                  </h3>
                  <p
                    className="text-[#D8F3DC]/35 text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Las fotos ayudan enormemente al equipo de rescate
                  </p>
                </div>
              </div>
              <Field label="Fotografías del animal" hint="Máximo 5 fotos.">
                <PhotoUpload
                  photos={photos}
                  onChange={setPhotos}
                  accentColor="#2DA14F"
                />
              </Field>
              <div
                className="p-5 rounded-2xl flex flex-col gap-4"
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(216,243,220,0.07)",
                }}
              >
                <p
                  className="text-[#D8F3DC]/40 text-[0.68rem] font-semibold tracking-widest uppercase"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Tus datos (opcionales pero recomendados)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Tu nombre">
                    <StyledInput
                      type="text"
                      placeholder="Ana García"
                      value={form.name}
                      onChange={(e) => handleForm("name", e.target.value)}
                    />
                  </Field>
                  <Field label="Teléfono / WhatsApp">
                    <StyledInput
                      type="tel"
                      placeholder="+502 1234-5678"
                      value={form.phone}
                      onChange={(e) => handleForm("phone", e.target.value)}
                    />
                  </Field>
                </div>
                <Field label="Correo electrónico">
                  <StyledInput
                    type="email"
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={(e) => handleForm("email", e.target.value)}
                  />
                </Field>
                <Field label="¿Puedes quedarte cerca del animal?">
                  <div className="flex gap-2">
                    {[
                      "Sí, puedo esperar",
                      "Solo un momento",
                      "No puedo quedarme",
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleForm("notes", opt)}
                        className="flex-1 py-2.5 px-2 rounded-xl border-0 cursor-pointer text-[0.65rem] font-semibold text-center transition-all duration-200"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          backgroundColor:
                            form.notes === opt
                              ? "rgba(45,161,79,0.15)"
                              : "rgba(255,255,255,0.03)",
                          border: `1px solid ${form.notes === opt ? "rgba(45,161,79,0.40)" : "rgba(216,243,220,0.08)"}`,
                          color:
                            form.notes === opt
                              ? "#2DA14F"
                              : "rgba(216,243,220,0.45)",
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
              <div
                className="p-4 rounded-2xl flex flex-col gap-2"
                style={{
                  backgroundColor: "rgba(45,161,79,0.06)",
                  border: "1px solid rgba(45,161,79,0.18)",
                }}
              >
                <p
                  className="text-[#2DA14F] text-[0.68rem] font-bold tracking-widest uppercase mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  📋 Resumen del reporte
                </p>
                {[
                  {
                    label: "Animal",
                    value:
                      SPECIES_OPTIONS.find((s) => s.value === form.species)
                        ?.label ?? "—",
                  },
                  {
                    label: "Condición",
                    value:
                      CONDITION_OPTIONS.find((c) => c.value === form.condition)
                        ?.label ?? "—",
                  },
                  { label: "Hora", value: `${time}, ${date}` },
                  { label: "Fotos", value: `${photos.length} foto(s)` },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between"
                  >
                    <span
                      className="text-[#D8F3DC]/35 text-xs"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {row.label}
                    </span>
                    <span
                      className="text-[#D8F3DC]/70 text-xs font-medium"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Nav */}
          <div className="flex items-center justify-between gap-3 pt-2">
            {step > 1 ? (
              <m.button
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border-0 cursor-pointer text-sm font-semibold"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  backgroundColor: "rgba(216,243,220,0.06)",
                  border: "1px solid rgba(216,243,220,0.12)",
                  color: "rgba(216,243,220,0.55)",
                }}
              >
                ← Atrás
              </m.button>
            ) : (
              <div />
            )}
            <div className="flex gap-2">
              {step < 3 ? (
                <m.button
                  whileHover={
                    canContinue[step]
                      ? { y: -2, boxShadow: "0 8px 28px rgba(45,161,79,0.40)" }
                      : {}
                  }
                  whileTap={canContinue[step] ? { scale: 0.97 } : {}}
                  onClick={() => {
                    if (!canContinue[step]) return;
                    setStep(step + 1);
                  }}
                  disabled={!canContinue[step]}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-0 text-sm font-bold transition-all duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    backgroundColor: canContinue[step]
                      ? "#2DA14F"
                      : "rgba(45,161,79,0.20)",
                    color: canContinue[step]
                      ? "#212529"
                      : "rgba(45,161,79,0.40)",
                    cursor: canContinue[step] ? "pointer" : "not-allowed",
                    boxShadow: canContinue[step]
                      ? "0 2px 16px rgba(45,161,79,0.30)"
                      : "none",
                  }}
                >
                  Continuar →
                </m.button>
              ) : (
                <m.button
                  whileHover={{
                    y: -2,
                    boxShadow: "0 8px 28px rgba(37,211,102,0.45)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleWhatsApp}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-0 cursor-pointer text-sm font-bold"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    backgroundColor: "#25D366",
                    color: "#fff",
                    boxShadow: "0 2px 16px rgba(37,211,102,0.35)",
                  }}
                >
                  <FaWhatsapp size={15} /> Enviar por WA
                </m.button>
              )}
            </div>
          </div>
        </m.div>
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FORMULARIO 2 — Informar de maltrato animal (NUEVO)
// ─────────────────────────────────────────────────────────────────────────────

const INITIAL_ABUSE = {
  abuseType: "",
  urgency: "",
  species: "",
  perpetratorKnown: null,
  perpetratorDesc: "",
  animalCount: "",
  location_detail: "",
  description: "",
  evidenceDesc: "",
  anonymous: false,
  name: "",
  phone: "",
  email: "",
};

function AbuseReportForm() {
  const [form, setForm] = useState(INITIAL_ABUSE);
  const [photos, setPhotos] = useState([]);
  const [time, setTime] = useState(now());
  const [date, setDate] = useState(nowDate());
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const prefersReduced = useReducedMotion();

  const gps = useGps();

  useEffect(() => {
    gps.requestGps();
  }, []); // eslint-disable-line

  const handleForm = useCallback(
    (key, value) => setForm((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const handleWhatsApp = useCallback(() => {
    const addr = gps._useManualAddr
      ? gps._manualAddr
      : gps.gpsAddress ||
        (gps.position
          ? `${gps.position.lat.toFixed(5)}, ${gps.position.lng.toFixed(5)}`
          : "No disponible");
    const coords = gps.position
      ? `${gps.position.lat.toFixed(6)}, ${gps.position.lng.toFixed(6)}`
      : "—";
    const msg = encodeURIComponent(
      `🚨 *DENUNCIA DE MALTRATO ANIMAL - HuellaViva*\n=============================\n\n*URGENCIA:* ${URGENCY_LEVELS.find((u) => u.value === form.urgency)?.label ?? "No indicada"}\n\n*TIPO DE MALTRATO*\n- Tipo: ${ABUSE_TYPES.find((a) => a.value === form.abuseType)?.label ?? "No indicado"}\n- Descripcion detallada: ${form.description || "Sin descripcion"}\n\n*UBICACION*\n- Direccion: ${addr}\n- Coordenadas: ${coords}\n- Detalle del lugar: ${form.location_detail || "—"}\n- Fecha y hora: ${date}  ${time}\n\n*SOBRE EL ANIMAL / ANIMALES*\n- Especie(s): ${SPECIES_OPTIONS.find((s) => s.value === form.species)?.label ?? "No indicada"}\n- Cantidad de animales: ${form.animalCount || "No indicado"}\n\n*SOBRE EL RESPONSABLE*\n- Responsable identificado: ${form.perpetratorKnown === true ? "SI" : "form.perpetratorKnown===false" ? "No" : "No indicado"}\n- Descripcion del responsable: ${form.perpetratorDesc || "No proporcionada"}\n\n*EVIDENCIA*\n- Fotos adjuntas: ${photos.length > 0 ? `${photos.length} foto(s) (se envian por separado)` : "Ninguna"}\n- Descripcion de evidencia: ${form.evidenceDesc || "—"}\n\n*DATOS DEL DENUNCIANTE*\n- ${form.anonymous ? "DENUNCIA ANONIMA" : "Nombre: " + form.name + "\n- Telefono / WA: " + (form.phone || "No indicado") + "\n- Correo: " + (form.email || "No indicado")}\n- ENVIAR FOTOS POR ESTE MEDIO\n=============================\n_Enviado desde HuellaViva_`,
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
  }, [form, photos, gps, time, date]);

  const STEPS = [
    { n: 1, label: "Maltrato", icon: "🛡️" },
    { n: 2, label: "Ubicación", icon: "📍" },
    { n: 3, label: "Evidencia", icon: "📷" },
  ];
  const canContinue = {
    1: form.abuseType && form.urgency,
    2: gps.position || gps._manualAddr,
    3: true,
  };

  if (submitted)
    return (
      <m.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="flex flex-col items-center text-center gap-6 max-w-md mx-auto p-10 rounded-3xl border border-[#FF4444]/30"
        style={{
          backgroundColor: "rgba(255,68,68,0.06)",
          boxShadow: "0 8px 48px rgba(255,68,68,0.12)",
        }}
      >
        <m.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.8 }}
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
          style={{
            backgroundColor: "rgba(255,68,68,0.12)",
            border: "2px solid rgba(255,68,68,0.30)",
          }}
        >
          🛡️
        </m.div>
        <div>
          <h3
            className="text-[#FF8C42] mb-2"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "1.8rem",
              fontWeight: 700,
            }}
          >
            ¡Denuncia registrada!
          </h3>
          <p
            className="text-[#D8F3DC]/60 text-sm leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Tu denuncia ha sido recibida. Nuestro equipo la evaluará con
            urgencia y tomará las acciones necesarias. Gracias por ser la voz de
            quienes no pueden hablar.
          </p>
        </div>
        <m.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            setSubmitted(false);
            setStep(1);
            setForm(INITIAL_ABUSE);
            setPhotos([]);
          }}
          className="px-6 py-3 rounded-xl text-sm font-semibold border-0 cursor-pointer"
          style={{
            backgroundColor: "#FF8C42",
            color: "#fff",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Hacer otra denuncia
        </m.button>
      </m.div>
    );

  return (
    <>
      {/* Aviso de confidencialidad */}
      <m.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-6"
        style={{
          backgroundColor: "rgba(255,68,68,0.07)",
          border: "1px solid rgba(255,68,68,0.22)",
        }}
      >
        <FaShieldAlt size={14} color="#FF4444" className="shrink-0" />
        <p
          className="text-[0.72rem] leading-relaxed"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(216,243,220,0.60)",
          }}
        >
          <strong style={{ color: "#FF4444" }}>Tu seguridad primero.</strong>{" "}
          Puedes denunciar de forma completamente anónima. No es necesario que
          te identifiques para que tu denuncia sea procesada.
        </p>
      </m.div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-0 mb-8">
        {STEPS.map((s, i) => (
          <div key={s.n} className="flex items-center">
            <button
              onClick={() => s.n < step && setStep(s.n)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border-0 transition-all duration-300"
              style={{
                cursor:
                  s.n === step
                    ? "default"
                    : s.n < step
                      ? "pointer"
                      : "not-allowed",
                backgroundColor:
                  s.n === step
                    ? "rgba(255,68,68,0.15)"
                    : s.n < step
                      ? "rgba(255,68,68,0.08)"
                      : "transparent",
                border: `1px solid ${s.n === step ? "rgba(255,68,68,0.40)" : s.n < step ? "rgba(255,68,68,0.20)" : "rgba(216,243,220,0.08)"}`,
              }}
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor:
                    s.n <= step ? "#FF4444" : "rgba(216,243,220,0.10)",
                  color: s.n <= step ? "#fff" : "rgba(216,243,220,0.30)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {s.n < step ? <FaCheck size={9} /> : s.n}
              </span>
              <span
                className="text-xs font-semibold hidden sm:inline"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color:
                    s.n === step
                      ? "#FF4444"
                      : s.n < step
                        ? "rgba(255,68,68,0.70)"
                        : "rgba(216,243,220,0.25)",
                }}
              >
                {s.label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <div
                className="w-8 h-px mx-1"
                style={{
                  backgroundColor:
                    step > s.n
                      ? "rgba(255,68,68,0.40)"
                      : "rgba(216,243,220,0.10)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <m.div
          key={step}
          initial={{ opacity: 0, x: prefersReduced ? 0 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: prefersReduced ? 0 : -30 }}
          transition={{ type: "spring", stiffness: 200, damping: 28 }}
          className="rounded-3xl p-6 md:p-8 flex flex-col gap-7"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,68,68,0.05) 0%, rgba(255,255,255,0.01) 100%)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,68,68,0.12)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.30)",
          }}
        >
          {/* ── PASO 1: Tipo de maltrato + urgencia ── */}
          {step === 1 && (
            <>
              <div className="flex items-center gap-3 pb-2 border-b border-[#D8F3DC]/[0.07]">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{
                    backgroundColor: "rgba(255,68,68,0.15)",
                    border: "1px solid rgba(255,68,68,0.30)",
                  }}
                >
                  <FaShieldAlt size={16} color="#FF4444" />
                </div>
                <div>
                  <h3
                    className="text-[#D8F3DC] font-bold text-base"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Tipo de maltrato
                  </h3>
                  <p
                    className="text-[#D8F3DC]/35 text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Describe la situación que estás denunciando
                  </p>
                </div>
              </div>

              {/* Tipo de maltrato */}
              <Field label="Tipo de maltrato" required>
                <div className="flex flex-col gap-2">
                  {ABUSE_TYPES.map((at) => (
                    <m.button
                      key={at.value}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleForm("abuseType", at.value)}
                      className="flex items-center gap-4 px-4 py-3.5 rounded-xl border-0 cursor-pointer text-left transition-all duration-200"
                      style={{
                        backgroundColor:
                          form.abuseType === at.value
                            ? `${at.color}14`
                            : "rgba(255,255,255,0.025)",
                        border: `1px solid ${form.abuseType === at.value ? `${at.color}45` : "rgba(216,243,220,0.08)"}`,
                      }}
                    >
                      <span className="text-xl shrink-0">{at.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-semibold"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            color:
                              form.abuseType === at.value
                                ? at.color
                                : "rgba(216,243,220,0.75)",
                          }}
                        >
                          {at.label}
                        </p>
                        <p
                          className="text-[0.65rem] truncate"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            color: "rgba(216,243,220,0.35)",
                          }}
                        >
                          {at.desc}
                        </p>
                      </div>
                      {form.abuseType === at.value && (
                        <m.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <FaCheck size={12} color={at.color} />
                        </m.span>
                      )}
                    </m.button>
                  ))}
                </div>
              </Field>

              {/* Urgencia */}
              <Field label="Nivel de urgencia" required>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {URGENCY_LEVELS.map((ul) => (
                    <m.button
                      key={ul.value}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleForm("urgency", ul.value)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border-0 cursor-pointer text-left transition-all duration-200"
                      style={{
                        backgroundColor:
                          form.urgency === ul.value
                            ? `${ul.color}14`
                            : "rgba(255,255,255,0.025)",
                        border: `1px solid ${form.urgency === ul.value ? `${ul.color}45` : "rgba(216,243,220,0.08)"}`,
                      }}
                    >
                      <span className="text-lg shrink-0">{ul.emoji}</span>
                      <span
                        className="text-xs font-medium leading-tight"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color:
                            form.urgency === ul.value
                              ? ul.color
                              : "rgba(216,243,220,0.55)",
                        }}
                      >
                        {ul.label}
                      </span>
                      {form.urgency === ul.value && (
                        <m.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto"
                        >
                          <FaCheck size={11} color={ul.color} />
                        </m.span>
                      )}
                    </m.button>
                  ))}
                </div>
              </Field>

              {/* Especie y cantidad */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Especie del animal">
                  <div className="grid grid-cols-4 gap-1.5">
                    {SPECIES_OPTIONS.map((sp) => (
                      <m.button
                        key={sp.value}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleForm("species", sp.value)}
                        className="flex flex-col items-center gap-1 py-2.5 rounded-xl border-0 cursor-pointer transition-all duration-200"
                        style={{
                          backgroundColor:
                            form.species === sp.value
                              ? "rgba(255,68,68,0.15)"
                              : "rgba(255,255,255,0.03)",
                          border: `2px solid ${form.species === sp.value ? "rgba(255,68,68,0.45)" : "rgba(216,243,220,0.10)"}`,
                        }}
                      >
                        <span className="text-lg">{sp.emoji}</span>
                        <span
                          className="text-[0.58rem] font-semibold"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            color:
                              form.species === sp.value
                                ? "#FF4444"
                                : "rgba(216,243,220,0.45)",
                          }}
                        >
                          {sp.label}
                        </span>
                      </m.button>
                    ))}
                  </div>
                </Field>
                <Field label="Cantidad de animales" hint="Aproximado">
                  <StyledInput
                    type="number"
                    placeholder="Ej: 3"
                    min="1"
                    value={form.animalCount}
                    onChange={(e) => handleForm("animalCount", e.target.value)}
                  />
                </Field>
              </div>

              {/* Descripción del maltrato */}
              <Field
                label="Describe el maltrato en detalle"
                required={false}
                hint="Sé tan específico como puedas. Esto ayuda al equipo a evaluar la gravedad."
              >
                <StyledTextarea
                  rows={4}
                  placeholder="Ej: Vi al vecino de la casa amarilla golpear a un perro encadenado en el patio. El animal tiene heridas visibles y no tiene acceso a agua desde hace días..."
                  value={form.description}
                  onChange={(e) => handleForm("description", e.target.value)}
                />
              </Field>

              {/* Responsable conocido */}
              <div
                className="p-4 rounded-2xl flex flex-col gap-3"
                style={{
                  backgroundColor: "rgba(255,140,66,0.06)",
                  border: "1px solid rgba(255,140,66,0.18)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-[#D8F3DC]/75 text-sm font-semibold"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      ¿Conoces o puedes identificar al responsable?
                    </p>
                    <p
                      className="text-[#D8F3DC]/35 text-xs"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      No es obligatorio, pero ayuda mucho en la investigación
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {[
                      { v: true, l: "Sí" },
                      { v: false, l: "No" },
                    ].map(({ v, l }) => (
                      <button
                        key={l}
                        onClick={() => handleForm("perpetratorKnown", v)}
                        className="px-4 py-2 rounded-xl border-0 cursor-pointer text-xs font-semibold transition-all duration-200"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          backgroundColor:
                            form.perpetratorKnown === v
                              ? "rgba(255,140,66,0.20)"
                              : "rgba(255,255,255,0.04)",
                          border: `1px solid ${form.perpetratorKnown === v ? "rgba(255,140,66,0.50)" : "rgba(216,243,220,0.10)"}`,
                          color:
                            form.perpetratorKnown === v
                              ? "#FF8C42"
                              : "rgba(216,243,220,0.45)",
                        }}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <AnimatePresence>
                  {form.perpetratorKnown === true && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <StyledTextarea
                        rows={2}
                        placeholder="Ej: Hombre adulto, ropa azul, vive en la casa #14 de la misma calle. Tiene una camioneta blanca."
                        value={form.perpetratorDesc}
                        onChange={(e) =>
                          handleForm("perpetratorDesc", e.target.value)
                        }
                      />
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}

          {/* ── PASO 2: Ubicación ── */}
          {step === 2 && (
            <>
              <div className="flex items-center gap-3 pb-2 border-b border-[#D8F3DC]/[0.07]">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{
                    backgroundColor: "rgba(255,68,68,0.15)",
                    border: "1px solid rgba(255,68,68,0.30)",
                  }}
                >
                  📍
                </div>
                <div>
                  <h3
                    className="text-[#D8F3DC] font-bold text-base"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Dónde ocurre el maltrato
                  </h3>
                  <p
                    className="text-[#D8F3DC]/35 text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    La ubicación exacta es fundamental para investigar el caso
                  </p>
                </div>
              </div>

              <LocationBlock gps={gps} accentColor="#FF4444" />

              <Field
                label="Detalle adicional del lugar"
                hint="Referencia visual, descripción de la propiedad, nombre del lugar, etc."
              >
                <StyledTextarea
                  rows={2}
                  placeholder="Ej: Casa verde con portón negro, a media cuadra del parque central de Zona 6. El animal está en el patio trasero."
                  value={form.location_detail}
                  onChange={(e) =>
                    handleForm("location_detail", e.target.value)
                  }
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Hora aproximada del incidente">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm border-0 outline-none"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      backgroundColor: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,68,68,0.25)",
                      color: "#D8F3DC",
                      colorScheme: "dark",
                    }}
                  />
                </Field>
                <Field label="Fecha">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm border-0 outline-none"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      backgroundColor: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(216,243,220,0.10)",
                      color: "#D8F3DC",
                      colorScheme: "dark",
                    }}
                  />
                </Field>
              </div>
            </>
          )}

          {/* ── PASO 3: Evidencia + contacto ── */}
          {step === 3 && (
            <>
              <div className="flex items-center gap-3 pb-2 border-b border-[#D8F3DC]/[0.07]">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{
                    backgroundColor: "rgba(255,140,66,0.15)",
                    border: "1px solid rgba(255,140,66,0.30)",
                  }}
                >
                  📷
                </div>
                <div>
                  <h3
                    className="text-[#D8F3DC] font-bold text-base"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Evidencia y datos del denunciante
                  </h3>
                  <p
                    className="text-[#D8F3DC]/35 text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    La evidencia visual fortalece enormemente la denuncia
                  </p>
                </div>
              </div>

              <Field
                label="Fotografías o evidencia visual"
                hint="Si tienes fotos o capturas que evidencien el maltrato, son clave para el proceso."
              >
                <PhotoUpload
                  photos={photos}
                  onChange={setPhotos}
                  accentColor="#FF8C42"
                />
              </Field>

              <Field
                label="Descripción de la evidencia disponible"
                hint="Menciona si tienes videos, audios, testigos u otra evidencia aunque no puedas adjuntarla aquí."
              >
                <StyledTextarea
                  rows={2}
                  placeholder="Ej: Tengo un video de 30 segundos grabado desde la calle. También hay 2 vecinos que presenciaron el hecho."
                  value={form.evidenceDesc}
                  onChange={(e) => handleForm("evidenceDesc", e.target.value)}
                />
              </Field>

              {/* Anonimato toggle */}
              <div
                className="flex items-center justify-between p-4 rounded-xl"
                style={{
                  backgroundColor: "rgba(216,243,220,0.04)",
                  border: "1px solid rgba(216,243,220,0.10)",
                }}
              >
                <div className="flex items-center gap-3">
                  {form.anonymous ? (
                    <FaEyeSlash size={16} color="#D8F3DC" />
                  ) : (
                    <FaEye size={16} color="#D8F3DC" />
                  )}
                  <div>
                    <p
                      className="text-[#D8F3DC]/75 text-sm font-semibold"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Denunciar de forma anónima
                    </p>
                    <p
                      className="text-[#D8F3DC]/35 text-xs"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Tu identidad no será compartida con ninguna parte
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleForm("anonymous", !form.anonymous)}
                  className="w-12 h-6 rounded-full border-0 cursor-pointer relative transition-colors duration-300"
                  style={{
                    backgroundColor: form.anonymous
                      ? "#2DA14F"
                      : "rgba(216,243,220,0.12)",
                  }}
                >
                  <m.div
                    animate={{ x: form.anonymous ? 24 : 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 26 }}
                    className="absolute top-0.75 w-4.5 h-4.5 rounded-full bg-white"
                  />
                </button>
              </div>

              {/* Datos de contacto (opcionales si no es anónimo) */}
              <AnimatePresence>
                {!form.anonymous && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="p-5 rounded-2xl flex flex-col gap-4"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(216,243,220,0.07)",
                      }}
                    >
                      <p
                        className="text-[#D8F3DC]/40 text-[0.68rem] font-semibold tracking-widest uppercase"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Tus datos (opcionales)
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Tu nombre">
                          <StyledInput
                            type="text"
                            placeholder="Ana García"
                            value={form.name}
                            onChange={(e) => handleForm("name", e.target.value)}
                          />
                        </Field>
                        <Field label="Teléfono / WhatsApp">
                          <StyledInput
                            type="tel"
                            placeholder="+502 1234-5678"
                            value={form.phone}
                            onChange={(e) =>
                              handleForm("phone", e.target.value)
                            }
                          />
                        </Field>
                      </div>
                      <Field label="Correo electrónico">
                        <StyledInput
                          type="email"
                          placeholder="tu@email.com"
                          value={form.email}
                          onChange={(e) => handleForm("email", e.target.value)}
                        />
                      </Field>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>

              {/* Resumen */}
              <div
                className="p-4 rounded-2xl flex flex-col gap-2"
                style={{
                  backgroundColor: "rgba(255,68,68,0.05)",
                  border: "1px solid rgba(255,68,68,0.18)",
                }}
              >
                <p
                  className="text-[#FF4444] text-[0.68rem] font-bold tracking-widest uppercase mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  📋 Resumen de la denuncia
                </p>
                {[
                  {
                    label: "Tipo",
                    value:
                      ABUSE_TYPES.find((a) => a.value === form.abuseType)
                        ?.label ?? "—",
                  },
                  {
                    label: "Urgencia",
                    value:
                      URGENCY_LEVELS.find((u) => u.value === form.urgency)
                        ?.label ?? "—",
                  },
                  { label: "Hora", value: `${time}, ${date}` },
                  { label: "Evidencia", value: `${photos.length} foto(s)` },
                  {
                    label: "Modo",
                    value: form.anonymous ? "Anónima" : "Identificada",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between"
                  >
                    <span
                      className="text-[#D8F3DC]/35 text-xs"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {row.label}
                    </span>
                    <span
                      className="text-[#D8F3DC]/70 text-xs font-medium"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Nav */}
          <div className="flex items-center justify-between gap-3 pt-2">
            {step > 1 ? (
              <m.button
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border-0 cursor-pointer text-sm font-semibold"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  backgroundColor: "rgba(216,243,220,0.06)",
                  border: "1px solid rgba(216,243,220,0.12)",
                  color: "rgba(216,243,220,0.55)",
                }}
              >
                ← Atrás
              </m.button>
            ) : (
              <div />
            )}
            <div className="flex gap-2">
              {step < 3 ? (
                <m.button
                  whileHover={
                    canContinue[step]
                      ? { y: -2, boxShadow: "0 8px 28px rgba(255,68,68,0.35)" }
                      : {}
                  }
                  whileTap={canContinue[step] ? { scale: 0.97 } : {}}
                  onClick={() => {
                    if (!canContinue[step]) return;
                    setStep(step + 1);
                  }}
                  disabled={!canContinue[step]}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-0 text-sm font-bold transition-all duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    backgroundColor: canContinue[step]
                      ? "#FF4444"
                      : "rgba(255,68,68,0.18)",
                    color: canContinue[step] ? "#fff" : "rgba(255,68,68,0.40)",
                    cursor: canContinue[step] ? "pointer" : "not-allowed",
                    boxShadow: canContinue[step]
                      ? "0 2px 16px rgba(255,68,68,0.30)"
                      : "none",
                  }}
                >
                  Continuar →
                </m.button>
              ) : (
                <m.button
                  whileHover={{
                    y: -2,
                    boxShadow: "0 8px 28px rgba(37,211,102,0.45)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleWhatsApp}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-0 cursor-pointer text-sm font-bold"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    backgroundColor: "#25D366",
                    color: "#fff",
                    boxShadow: "0 2px 16px rgba(37,211,102,0.35)",
                  }}
                >
                  <FaWhatsapp size={15} /> Enviar denuncia por WA
                </m.button>
              )}
            </div>
          </div>
        </m.div>
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECCIÓN CONTENEDORA — tabs de selección
// ─────────────────────────────────────────────────────────────────────────────

export default function ReportSection() {
  const [activeTab, setActiveTab] = useState("street");
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, VIEWPORT);

  const tabs = [
    {
      id: "street",
      label: "Animal en la calle",
      icon: <FaPaw size={26} color="#2DA14F" />,
      accent: "#2DA14F",
      desc: "Reporta un animal perdido o en situación de calle",
    },
    {
      id: "abuse",
      label: "Informar maltrato",
      icon: <FaShieldAlt size={26} color="#FF4444" />,
      accent: "#FF4444",
      desc: "Denuncia un caso de maltrato o crueldad animal",
    },
  ];

  const activeAccent =
    tabs.find((t) => t.id === activeTab)?.accent ?? "#2DA14F";

  return (
    <LazyMotion features={domMax} strict>
      <section
        ref={sectionRef}
        className="relative w-full bg-[#212529] py-20 px-4 md:px-8 overflow-hidden mt-10"
      >
        {/* Ambient glows */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <m.div
            className="absolute rounded-full blur-[140px]"
            animate={{
              background: activeTab === "street" ? "#2DA14F" : "#FF4444",
              opacity: 0.06,
            }}
            transition={{ duration: 0.8 }}
            style={{ width: 500, height: 500, top: "-5%", left: "-10%" }}
          />
          <m.div
            className="absolute rounded-full blur-[120px]"
            animate={{
              background: activeTab === "street" ? "#FF8C42" : "#FF8C42",
              opacity: 0.05,
            }}
            transition={{ duration: 0.8 }}
            style={{ width: 400, height: 400, bottom: "0%", right: "-5%" }}
          />
        </div>

        <div className="relative max-w-215 mx-auto">
          {/* ── Header ── */}
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
                borderColor: "rgba(255,140,66,0.30)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C42] pulse-dot" />
              <FaMapMarkerAlt size={10} color="#FF8C42" />
              <span
                className="text-[#FF8C42] text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Reportes y denuncias
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
              Sé la <em className="not-italic text-[#FF8C42]">voz de quien</em>
              <br />
              no puede hablar
            </h2>
            <p
              className="text-[#D8F3DC]/50 max-w-md leading-relaxed"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              }}
            >
              Tanto si encontraste un animal en la calle como si presenciaste un
              acto de maltrato, aquí puedes actuar.
            </p>
          </m.div>

          {/* ── Tab selector ── */}
          <m.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="flex gap-3 mb-8 p-1.5 rounded-2xl"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(216,243,220,0.08)",
            }}
          >
            {tabs.map((tab) => (
              <m.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="relative flex-1 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-4 py-4 rounded-xl border-0 cursor-pointer text-center sm:text-left transition-all duration-300"
                style={{
                  backgroundColor:
                    activeTab === tab.id ? `${tab.accent}14` : "transparent",
                  border: `2px solid ${activeTab === tab.id ? `${tab.accent}45` : "transparent"}`,
                  boxShadow:
                    activeTab === tab.id
                      ? `0 4px 20px ${tab.accent}20`
                      : "none",
                }}
              >
                {activeTab === tab.id && (
                  <m.div
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ backgroundColor: `${tab.accent}10` }}
                    transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  />
                )}
                <span className="relative z-10 text-2xl">{tab.icon}</span>
                <div className="relative z-10 flex-1">
                  <p
                    className="text-sm font-bold"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      color:
                        activeTab === tab.id
                          ? tab.accent
                          : "rgba(216,243,220,0.60)",
                    }}
                  >
                    {tab.label}
                  </p>
                  <p
                    className="text-[0.65rem] leading-tight hidden sm:block"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "rgba(216,243,220,0.30)",
                    }}
                  >
                    {tab.desc}
                  </p>
                </div>
              </m.button>
            ))}
          </m.div>

          {/* ── Formularios ── */}
          <AnimatePresence mode="wait">
            <m.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: "spring", stiffness: 180, damping: 26 }}
            >
              {activeTab === "street" ? (
                <StreetAnimalForm />
              ) : (
                <AbuseReportForm />
              )}
            </m.div>
          </AnimatePresence>

          {/* Nota de pie */}
          <m.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="text-center mt-6 text-[0.68rem]"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(216,243,220,0.22)",
            }}
          >
            🔒 Tus datos son confidenciales y se usan únicamente para coordinar
            el rescate o la investigación del caso.
          </m.p>
        </div>
      </section>
    </LazyMotion>
  );
}
