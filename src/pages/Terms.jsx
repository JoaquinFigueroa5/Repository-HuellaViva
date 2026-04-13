import { memo } from "react";
import { FaPaw, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "1. Aceptación de los términos",
    content:
      "Al acceder y utilizar el sitio web de HuellaViva, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con alguna parte, te pedimos que no utilices nuestros servicios.",
  },
  {
    title: "2. Uso del sitio web",
    content:
      "El contenido de este sitio es para tu información y uso personal. No puedes reproducir, distribuir ni utilizar el contenido de manera comercial sin nuestro consentimiento previo por escrito.",
  },
  {
    title: "3. Reportes de animales",
    content:
      "Los reportes de animales deben ser veraces y contener información precisa. No nos hacemos responsables por reportes falsos o malintencionados. Nos reservamos el derecho de verificar la información antes de actuar.",
  },
  {
    title: "4. Adopciones",
    content:
      "El proceso de adopción está sujeto a evaluación y aprobación por parte de nuestro equipo. La adopción implica un compromiso responsable con el bienestar del animal.",
  },
  {
    title: "5. Donaciones",
    content:
      "Todas las donaciones son voluntarias y no reembolsables. Los fondos se destinan exclusivamente al rescate, rehabilitación y cuidado de animales. Emitimos comprobantes de donación cuando es solicitado.",
  },
  {
    title: "6. Limitación de responsabilidad",
    content:
      "HuellaViva no se hace responsable por daños directos o indirectos derivados del uso de este sitio web o de la información proporcionada en el mismo. Nuestro compromiso es brindar información precisa y actualizada.",
  },
  {
    title: "7. Propiedad intelectual",
    content:
      "Todo el contenido del sitio, incluyendo textos, imágenes, logotipos y diseño, es propiedad de HuellaViva y está protegido por las leyes de propiedad intelectual vigentes en Guatemala.",
  },
  {
    title: "8. Modificaciones",
    content:
      "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor desde su publicación en este sitio.",
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#1a1d20]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm mb-10 no-underline transition-colors duration-200"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.50)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#D8F3DC"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(216,243,220,0.50)"; }}
        >
          <FaArrowLeft size={12} />
          Volver al inicio
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#2DA14F", color: "#D8F3DC" }}
          >
            <FaPaw size={18} />
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold text-[#D8F3DC]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Términos y Condiciones
          </h1>
        </div>

        <p
          className="text-sm mb-10"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.40)" }}
        >
          Última actualización: Abril de 2026
        </p>

        <div className="flex flex-col gap-8">
          {sections.map((section) => (
            <Section key={section.title} {...section} />
          ))}
        </div>

        <div
          className="mt-14 p-6 rounded-2xl"
          style={{
            backgroundColor: "rgba(45,161,79,0.08)",
            border: "1px solid rgba(45,161,79,0.20)",
          }}
        >
          <p
            className="text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.50)" }}
          >
            Si tienes dudas sobre estos términos,{" "}
            <a
              href="https://wa.me/50258694127"
              className="underline"
              style={{ color: "#2DA14F" }}
            >
              contáctanos
            </a>{" "}
            en cualquier momento.
          </p>
        </div>
      </div>
    </div>
  );
}

const Section = memo(function Section({ title, content }) {
  return (
    <div>
      <h2
        className="text-lg font-bold mb-3"
        style={{ fontFamily: "'DM Sans', sans-serif", color: "#D8F3DC" }}
      >
        {title}
      </h2>
      <p
        className="text-sm leading-relaxed"
        style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(216,243,220,0.40)" }}
      >
        {content}
      </p>
    </div>
  );
});
