import { useState, useRef, useCallback } from "react";
import {
  LazyMotion,
  domMax,
  m,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  FaChevronDown,
  FaShieldAlt,
  FaPhone,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle
} from "react-icons/fa";
import { CHANNELS, LEGAL_CONTEXT } from "@/data/reportingChannelsData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
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

function ChannelCard({ channel, index, isOpen, onToggle }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, VIEWPORT);

  return (
    <m.div
      ref={cardRef}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: "rgba(255,255,255,0.02)",
        borderColor: `${channel.accentColor}25`,
        boxShadow: isOpen ? `0 8px 40px ${channel.accentColor}12` : "none",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-6 py-5 border-0 bg-transparent cursor-pointer text-left transition-all duration-200"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            backgroundColor: isOpen
              ? `${channel.accentColor}20`
              : `${channel.accentColor}10`,
            border: `2px solid ${isOpen ? `${channel.accentColor}50` : `${channel.accentColor}25`}`,
            color: channel.accentColor,
          }}
        >
          {channel.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3
              className="text-[#D8F3DC] font-bold truncate"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
              }}
            >
              {channel.title}
            </h3>
            {isOpen && (
              <m.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="shrink-0"
              >
                <FaCheckCircle size={14} color={channel.accentColor} />
              </m.span>
            )}
          </div>
          <p
            className="text-xs truncate"
            style={{ color: `${channel.accentColor}AA` }}
          >
            {channel.subtitle}
          </p>
        </div>

        <m.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{
            backgroundColor: `${channel.accentColor}10`,
            color: channel.accentColor,
          }}
        >
          <FaChevronDown size={12} />
        </m.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
            className="overflow-hidden"
          >
            <div
              className="px-6 pb-6 flex flex-col gap-5"
              style={{ borderTop: `1px solid ${channel.accentColor}15` }}
            >
              <p
                className="text-sm leading-relaxed pt-4"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(216,243,220,0.65)",
                }}
              >
                {channel.description}
              </p>

              <div className="flex flex-col gap-2.5">
                <p
                  className="text-[0.62rem] font-bold tracking-widest uppercase"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: channel.accentColor,
                  }}
                >
                  Vías de contacto
                </p>
                <div className="flex flex-col gap-2">
                  {channel.contacts.map((contact, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{
                        backgroundColor: `${channel.accentColor}06`,
                        border: `1px solid ${channel.accentColor}15`,
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: `${contact.color}15`,
                          color: contact.color,
                        }}
                      >
                        {contact.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[0.62rem] font-semibold"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            color: "rgba(216,243,220,0.35)",
                          }}
                        >
                          {contact.label}
                        </p>
                        {contact.href ? (
                          <a
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium no-underline transition-colors hover:underline"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              color: contact.color,
                            }}
                          >
                            {contact.value}
                            <FaExternalLinkAlt
                              size={8}
                              className="inline ml-1.5"
                              style={{ opacity: 0.6 }}
                            />
                          </a>
                        ) : (
                          <p
                            className="text-sm"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              color: "rgba(216,243,220,0.55)",
                            }}
                          >
                            {contact.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {channel.schedule && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: channel.accentColor }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "rgba(216,243,220,0.40)",
                    }}
                  >
                    {channel.schedule}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-2.5">
                <p
                  className="text-[0.62rem] font-bold tracking-widest uppercase"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: channel.accentColor,
                  }}
                >
                  Requisitos
                </p>
                <div className="flex flex-col gap-2">
                  {channel.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          backgroundColor: `${channel.accentColor}10`,
                          color: channel.accentColor,
                        }}
                      >
                        {req.icon}
                      </div>
                      <p
                        className="text-xs leading-relaxed"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: "rgba(216,243,220,0.55)",
                        }}
                      >
                        {req.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

export default function ReportSection() {
  const [openId, setOpenId] = useState(null);
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, VIEWPORT);

  const toggle = useCallback(
    (id) => setOpenId((prev) => (prev === id ? null : id)),
    [],
  );

  return (
    <LazyMotion features={domMax} strict>
      <section
        ref={sectionRef}
        className="relative w-full bg-[#212529] py-20 px-4 md:px-8 overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute rounded-full blur-[140px] opacity-[0.06]"
            style={{
              width: 500,
              height: 500,
              background: "#2DA14F",
              top: "-15%",
              left: "-10%",
            }}
          />
          <div
            className="absolute rounded-full blur-[120px] opacity-[0.04]"
            style={{
              width: 400,
              height: 400,
              background: "#FF8C42",
              bottom: "-10%",
              right: "-5%",
            }}
          />
        </div>

        <div className="relative max-w-215 mx-auto">
          <m.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="flex flex-col items-center text-center mb-12"
          >
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border"
              style={{
                backgroundColor: "rgba(45,161,79,0.10)",
                borderColor: "rgba(45,161,79,0.30)",
              }}
            >
              <FaShieldAlt size={10} color="#2DA14F" />
              <span
                className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#2DA14F",
                }}
              >
                Canales oficiales
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
              ¿Cómo reportar{" "}
              <em className="not-italic text-[#FF8C42]">maltrato animal</em> en
              Guatemala?
            </h2>
            <p
              className="text-[#D8F3DC]/50 max-w-lg leading-relaxed"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              }}
            >
              Conoce las vías oficiales respaldadas por la Ley de Protección y
              Bienestar Animal (Decreto 5-2017) para denunciar casos de crueldad,
              abandono o peligro inminente.
            </p>
          </m.div>

          <div className="flex flex-col gap-4 mb-10">
            {CHANNELS.map((channel, i) => (
              <ChannelCard
                key={channel.id}
                channel={channel}
                index={i + 1}
                isOpen={openId === channel.id}
                onToggle={() => toggle(channel.id)}
              />
            ))}
          </div>

          <m.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="rounded-2xl p-6 border"
            style={{
              backgroundColor: "rgba(255,140,66,0.05)",
              borderColor: "rgba(255,140,66,0.18)",
            }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  backgroundColor: "rgba(255,140,66,0.15)",
                  border: "1px solid rgba(255,140,66,0.30)",
                }}
              >
                <FaExclamationTriangle size={14} color="#FF8C42" />
              </div>
              <div>
                <h3
                  className="font-bold text-sm mb-1"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    color: "#FF8C42",
                  }}
                >
                  {LEGAL_CONTEXT.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(216,243,220,0.55)",
                  }}
                >
                  {LEGAL_CONTEXT.content}
                </p>
              </div>
            </div>
            <div
              className="mt-3 pt-3 flex items-start gap-3"
              style={{
                borderTop: "1px solid rgba(255,140,66,0.12)",
              }}
            >
              <FaInfoCircle
                size={14}
                color="#D8F3DC"
                className="shrink-0 mt-0.5"
                style={{ opacity: 0.4 }}
              />
              <p
                className="text-xs leading-relaxed"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(216,243,220,0.35)",
                }}
              >
                {LEGAL_CONTEXT.note}
              </p>
            </div>
          </m.div>

          <m.p
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="text-center mt-8 text-[0.68rem]"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(216,243,220,0.20)",
            }}
          >
            Tu denuncia puede salvar una vida. Infórmate y actúa con
            responsabilidad.
          </m.p>
        </div>
      </section>
    </LazyMotion>
  );
}
