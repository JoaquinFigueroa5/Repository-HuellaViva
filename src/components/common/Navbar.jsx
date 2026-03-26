import { useState, useEffect } from "react";
import { FaRegHeart as HeartIcon, FaPaw as PawIcon } from "react-icons/fa";
import { IoMenu as MenuIcon, IoClose as CloseIcon } from "react-icons/io5";
import { IoIosArrowForward as ArrowIcon } from "react-icons/io";
import { useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Guia emergencia", href: "/emergency-guide" },
  { label: "Cómo Ayudar", href: "#mitos" },
  { label: "Adopciones", href: "#donaciones" },
  { label: "Historias", href: "#historias" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Inicio");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8
          transition-all duration-500
          ${
            scrolled
              ? "bg-[#212529]/90 backdrop-blur-xl border-b border-[#D8F3DC]/8 shadow-[0_4px_32px_rgba(0,0,0,0.45)]"
              : "bg-transparent"
          }`}
      >
        <div className="max-w-300 mx-auto h-17.5 flex items-center justify-between gap-6">
          <a
            href="#inicio"
            className="group flex items-center gap-3 no-underline"
          >
            <div
              className="
              w-10 h-10 rounded-xl flex items-center justify-center shrink-0
              bg-[#2DA14F] text-[#D8F3DC]
              shadow-[0_2px_16px_rgba(45,161,79,0.4)]
              transition-all duration-300
              group-hover:bg-[#FF8C42]
              group-hover:-rotate-6
              group-hover:scale-110
              group-hover:shadow-[0_4px_24px_rgba(255,140,66,0.5)]
            "
            >
              <PawIcon />
            </div>

            <div className="flex flex-col leading-none">
              <span
                className="text-[#D8F3DC] text-[1.15rem] font-bold tracking-tight"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                HuellaViva
              </span>
              <span
                className="text-[#2DA14F] text-[0.6rem] font-semibold tracking-[0.13em] uppercase mt-0.75"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Por los que no tienen voz
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(({ label, href }) => {
              const active =
                location.pathname === href ||
                (href.startsWith("#") && location.hash === href);
              return (
                <a
                  key={label}
                  href={href}
                  onClick={() => setActiveLink(label)}
                  className={`
                    group relative px-3.5 py-2 rounded-lg
                    text-sm font-medium tracking-wide no-underline
                    transition-all duration-200
                    ${
                      active
                        ? "text-[#D8F3DC]"
                        : "text-[#D8F3DC]/55 hover:text-[#D8F3DC] hover:bg-[#D8F3DC]/6"
                    }
                  `}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {label}
                  <span
                    className={`
                    absolute bottom-1.25 left-1/2 -translate-x-1/2
                    h-0.5 rounded-full bg-[#FF8C42]
                    transition-all duration-300
                    ${active ? "w-[58%]" : "w-0 group-hover:w-[58%]"}
                  `}
                  />
                </a>
              );
            })}
          </nav>

          <button
            className="
              hidden lg:flex items-center gap-2 shrink-0
              bg-[#FF8C42] text-white text-sm font-semibold
              px-5 py-2.25 rounded-xl border-0 cursor-pointer
              shadow-[0_2px_18px_rgba(255,140,66,0.42)]
              transition-all duration-200
              hover:-translate-y-0.5
              hover:shadow-[0_6px_28px_rgba(255,140,66,0.55)]
              hover:bg-[#ff9a57]
              active:translate-y-0
            "
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            onClick={() => (document.location.href = "#donaciones")}
          >
            <span style={{ animation: "hb 2s ease-in-out infinite" }}>
              <HeartIcon />
            </span>
            Quiero Ayudar
          </button>

          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Abrir menú"
            className="
              lg:hidden flex items-center justify-center
              w-9 h-9 rounded-lg cursor-pointer
              bg-[#D8F3DC]/6 border border-[#D8F3DC]/12
              text-[#D8F3DC]
              transition-all duration-200
              hover:bg-[#D8F3DC]/10
            "
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <div
          className={`
          lg:hidden overflow-hidden
          transition-all duration-400 ease-in-out
          ${isOpen ? "max-h-120 opacity-100" : "max-h-0 opacity-0"}
        `}
        >
          <div className="h-px bg-[#D8F3DC]/8 mx-2" />

          <div className="flex flex-col gap-0.5 pt-2 pb-4 px-1">
            {NAV_LINKS.map(({ label, href }) => {
              const active = activeLink === label;
              return (
                <a
                  key={label}
                  href={href}
                  onClick={() => {
                    setActiveLink(label);
                    setIsOpen(false);
                  }}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl no-underline
                    text-[0.95rem] font-medium
                    transition-all duration-200
                    ${
                      active
                        ? "text-[#D8F3DC] bg-[#2DA14F]/12"
                        : "text-[#D8F3DC]/60 hover:text-[#D8F3DC] hover:bg-[#2DA14F]/[0.07]"
                    }
                  `}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span
                    className={`
                    w-1.5 h-1.5 rounded-full shrink-0 bg-[#2DA14F]
                    transition-all duration-200
                    ${active ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                  `}
                  />

                  <span className="flex-1">{label}</span>

                  {active && (
                    <span className="text-[#2DA14F]/50 ml-auto">
                      <ArrowIcon />
                    </span>
                  )}
                </a>
              );
            })}

            <div className="mt-2 pt-3 border-t border-[#D8F3DC]/8 px-1">
              <button
                className="
                  w-full flex items-center justify-center gap-2
                  bg-[#FF8C42] text-white text-[0.95rem] font-semibold
                  py-3.25 rounded-xl border-0 cursor-pointer
                  shadow-[0_2px_18px_rgba(255,140,66,0.35)]
                  transition-all duration-200
                  hover:bg-[#ff9a57] hover:-translate-y-px
                  active:translate-y-0
                "
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <HeartIcon /> Quiero Ayudar
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
