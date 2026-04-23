import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { m, AnimatePresence, LazyMotion, domMax } from "framer-motion";

const languages = [
  { code: "es", flag: "gt", label: "Español", short: "ES" },
  { code: "en", flag: "us", label: "English", short: "EN" },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = useMemo(() => 
    languages.find((l) => l.code === i18n.language) || languages[0],
    [i18n.language]
  );

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeDropdown = useCallback(() => setIsOpen(false), []);

  const changeLanguage = useCallback((code) => {
    i18n.changeLanguage(code);
    closeDropdown();
  }, [i18n, closeDropdown]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeDropdown]);

  return (
    <LazyMotion features={domMax} strict>
      <div className="relative" ref={dropdownRef}>
        {/* Trigger */}
        <m.button
          onClick={toggleOpen}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl border outline-none cursor-pointer overflow-hidden transition-all duration-200"
          style={{
            backgroundColor: isOpen
              ? "rgba(45,161,79,0.15)"
              : "rgba(216,243,220,0.04)",
            borderColor: isOpen
              ? "rgba(45,161,79,0.4)"
              : "rgba(216,243,220,0.08)",
            boxShadow: isOpen ? "0 0 20px rgba(45,161,79,0.1)" : "none",
          }}
        >
          {/* Background Glow */}
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(45,161,79,0.1) 0%, transparent 70%)",
            }}
          />

          {/* Flag Container */}
          <div className="relative z-10 w-5 h-3.5 flex items-center justify-center overflow-hidden rounded-sm shadow-sm border border-white/10 shrink-0">
            <img
              src={`https://flagcdn.com/${currentLang.flag}.svg`}
              alt={currentLang.label}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* Language Code */}
          <span
            className="relative z-10 text-[0.7rem] font-bold tracking-widest uppercase"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: isOpen ? "#2DA14F" : "rgba(216,243,220,0.7)",
            }}
          >
            {currentLang.short}
          </span>

          {/* Label (Desktop) */}
          <span
            className="hidden md:inline relative z-10 text-[0.75rem] font-medium"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: isOpen ? "#2DA14F" : "rgba(216,243,220,0.5)",
            }}
          >
            {currentLang.label}
          </span>

          {/* Chevron */}
          <m.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isOpen ? "#2DA14F" : "rgba(216,243,220,0.3)"}
            strokeWidth="3"
            className="relative z-10 shrink-0"
          >
            <polyline points="6 9 12 15 18 9" />
          </m.svg>
        </m.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              role="listbox"
              className="absolute top-full right-0 mt-2.5 min-w-44 rounded-2xl overflow-hidden z-50 origin-top-right"
              style={{
                background: "rgba(18, 22, 25, 0.96)",
                border: "1px solid rgba(216,243,220,0.08)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(45,161,79,0.05)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Header Gradient Line */}
              <div
                className="h-px w-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(45,161,79,0.5), transparent)",
                }}
              />

              <div className="p-1.5 flex flex-col gap-1">
                {languages.map((lang, i) => {
                  const isActive = lang.code === i18n.language;
                  return (
                    <m.button
                      key={lang.code}
                      role="option"
                      aria-selected={isActive}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => changeLanguage(lang.code)}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer border border-transparent outline-none transition-all duration-200"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(45,161,79,0.12)"
                          : "transparent",
                      }}
                    >
                      {/* Flag */}
                      <div
                        className="relative z-10 w-5 h-3.5 flex items-center justify-center overflow-hidden rounded-sm shadow-sm border border-white/5"
                        style={{
                          filter: isActive ? "drop-shadow(0 0 8px rgba(45,161,79,0.4))" : "none",
                        }}
                      >
                        <img
                          src={`https://flagcdn.com/${lang.flag}.svg`}
                          alt={lang.label}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Label */}
                      <span
                        className="flex-1 text-left text-[0.8rem] font-semibold relative z-10"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: isActive ? "#2DA14F" : "rgba(216,243,220,0.7)",
                        }}
                      >
                        {lang.label}
                      </span>

                      {/* Active Indicator */}
                      {isActive && (
                        <m.div
                          layoutId="active-lang"
                          className="relative z-10 w-1.5 h-1.5 rounded-full bg-[#2DA14F]"
                          style={{ boxShadow: "0 0 10px rgba(45,161,79,0.6)" }}
                        />
                      )}

                      {/* Hover Highlight */}
                      {!isActive && (
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/3 pointer-events-none" />
                      )}
                    </m.button>
                  );
                })}
              </div>

              {/* Footer Decor */}
              <div
                className="px-4 py-2 flex items-center justify-center border-t border-white/3"
              >
                <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/10 font-mono">
                  Region · GT / US
                </span>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}