import { memo } from "react";
import { FaPaw, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { sections } from "@/data/privacyData";

export default function Privacy() {
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
            Política de Privacidad
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
            Si tienes preguntas sobre nuestra política de privacidad, no dudes en{" "}
            <a
              href="https://wa.me/50252491439"
              className="underline"
              style={{ color: "#2DA14F" }}
            >
              contactarnos
            </a>
            .
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
