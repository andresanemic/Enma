"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const FOUNDERS = [
  {
    name: "Bruno Ortega",
    role: "Socio Fundador",
    initials: "BO",
    // Avatar: teal sólido, texto siempre cream para contraste legible
    avatarBg: "#205358",
    avatarText: "#F7DFBA",
    cardBg: "bg-teal/15",
    border: "border-teal/25",
    tagBorder: "#3E7C6C80",
    tagText: "#F7DFBA99",
    desc: "Aporta la mirada de la energía renovable, eléctrica y térmica, con experiencia en proyectos eólicos, solares, geotérmicos e hidráulicos. Supervisó el proyecto de calefacción con geotermia que dio origen a Enma.",
    tags: ["Energía eólica", "Geotermia", "Hidráulica", "Solar"],
  },
  {
    name: "Patricio Campos",
    role: "Socio Fundador",
    initials: "PC",
    avatarBg: "#F1541C",
    avatarText: "#F8EDDD",
    cardBg: "bg-orange/10",
    border: "border-orange/25",
    tagBorder: "#FEA94F60",
    tagText: "#F7DFBA99",
    desc: "Diseñó e implementó el proyecto de upcycling de residuos salmoneros que originó la empresa, lideró estudios energéticos para el CIEP y aporta experiencia en formulación de proyectos, simulaciones CFD y huella de carbono.",
    tags: ["CFD", "Huella de carbono", "UpCycling", "Formulación"],
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const valoresRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const trigger = { trigger: sectionRef.current, start: "top 85%" };

    gsap.fromTo(
      titleRef.current?.querySelectorAll(".reveal-line") ?? [],
      { y: "108%", filter: "blur(8px)" },
      {
        y: "0%", filter: "blur(0px)",
        duration: 0.95, ease: "power3.out", stagger: 0.15,
        scrollTrigger: trigger,
      }
    );

    gsap.fromTo(
      cardsRef.current?.querySelectorAll(".founder-card") ?? [],
      { opacity: 0, y: 32, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8, ease: "power2.out", stagger: 0.14, delay: 0.35,
        scrollTrigger: trigger,
      }
    );

    gsap.fromTo(
      valoresRef.current,
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0,
        duration: 0.7, ease: "power2.out", delay: 0.7,
        scrollTrigger: trigger,
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="equipo"
      className="bg-green-dark relative overflow-hidden"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#F7DFBA 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-6 md:px-14 lg:px-24 py-24 md:py-32">

        <p className="text-green text-[11px] tracking-[0.25em] uppercase font-body mb-8">
          El equipo
        </p>

        <div ref={titleRef} className="mb-16" style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}>
          <div className="overflow-hidden pb-[0.06em]">
            <span
              className="reveal-line block font-display font-light text-cream leading-[1.08] tracking-[-0.02em]"
              style={{ transform: "translateY(108%)", filter: "blur(8px)" }}
            >
              Dos ingenieros,
            </span>
          </div>
          <div className="overflow-hidden pb-[0.06em]">
            <span
              className="reveal-line block font-display font-light leading-[1.08] tracking-[-0.02em]"
              style={{ transform: "translateY(108%)", filter: "blur(8px)", color: "#FEA94F" }}
            >
              un territorio
            </span>
          </div>
        </div>

        <p className="text-cream/45 font-body text-sm leading-relaxed max-w-lg mb-14">
          Somos dos ingenieros mecánicos con experiencia comprobada como consultores independientes, comprometidos con el territorio y su gente.
        </p>

        {/* Founder cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-5 mb-12">
          {FOUNDERS.map((f) => (
            <div
              key={f.name}
              className={`founder-card rounded-2xl border ${f.border} ${f.cardBg} p-7 lg:p-9 card-hover`}
              style={{ opacity: 0 }}
            >
              {/* Avatar */}
              <div className="flex items-start gap-5 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-display font-semibold text-lg select-none"
                  style={{ background: f.avatarBg, color: f.avatarText }}
                >
                  {f.initials}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-cream text-lg leading-tight mb-1">
                    {f.name}
                  </h3>
                  <span className="inline-block bg-cream/10 text-cream/70 text-[10px] tracking-wider uppercase px-3 py-1 rounded-full font-body">
                    {f.role}
                  </span>
                </div>
              </div>

              <p className="text-cream/65 font-body text-sm leading-[1.75] mb-6">{f.desc}</p>

              {/* Tags — cream text sobre fondo oscuro, legible siempre */}
              <div className="flex flex-wrap gap-2">
                {f.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-wide font-body px-3 py-1 rounded-full border"
                    style={{ borderColor: f.tagBorder, color: f.tagText }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Valores */}
        <div
          ref={valoresRef}
          className="border-t border-cream/[0.08] pt-8"
          style={{ opacity: 0 }}
        >
          <p className="text-cream/30 text-[10px] tracking-[0.22em] uppercase font-body mb-4">
            Valores
          </p>
          <div className="flex flex-wrap gap-3">
            {["Honestidad", "Transparencia", "Templanza", "Disciplina"].map((v) => (
              <span
                key={v}
                className="text-cream/55 font-body text-sm border border-cream/15 rounded-full px-4 py-1.5"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
