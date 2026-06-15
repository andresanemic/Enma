"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const PROJECTS = [
  {
    id: "01",
    tag: "UpCycling · Puerto Cisnes",
    title: "Taller de UpCycling para Puerto Cisnes",
    desc: "Apoyo en emprendimiento local para el diseño, construcción y montaje de taller de reciclaje de residuos plásticos provenientes de la industria salmonera, para su revalorización en nuevos productos comerciables.",
    accent: "green-dark",
    bgClass: "bg-green-dark/8",
    dotColor: "#3E7C6C",
  },
  {
    id: "02",
    tag: "ANID · Proyecto destacado",
    title: "Turbina Eólica de Baja Escala",
    desc: "Diseño y ensayos de nueva propuesta de turbina eólica para condiciones no convencionales de viento: vientos excesivos, ráfagas súbitas y alta turbulencia. Pensada para instalarse en granjas de muchas unidades con foco en NetBilling.",
    accent: "orange",
    bgClass: "bg-orange/8",
    dotColor: "#FEA94F",
    featured: true,
  },
  {
    id: "03",
    tag: "I+D · Infraestructura",
    title: "Diseño y Montaje de Túnel de Viento",
    desc: "Diseño y validación de túnel de viento para ensayos de prototipos, respaldado con simulaciones CFD para diseño específico de rectificadores de flujo.",
    accent: "teal",
    bgClass: "bg-teal/8",
    dotColor: "#205358",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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
      listRef.current?.querySelectorAll(".project-row") ?? [],
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0,
        duration: 0.8, ease: "power2.out", stagger: 0.15, delay: 0.35,
        scrollTrigger: trigger,
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      className="bg-cream-light relative overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#205358 1px, transparent 1px), linear-gradient(90deg, #205358 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-6 md:px-14 lg:px-24 py-24 md:py-32">

        {/* Eyebrow + title */}
        <div className="mb-16">
          <p className="text-teal/60 text-[11px] tracking-[0.25em] uppercase font-body mb-8">
            Proyectos destacados
          </p>
          <div ref={titleRef} style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}>
            <div className="overflow-hidden pb-[0.06em]">
              <span
                className="reveal-line block font-display font-light text-teal leading-[1.08] tracking-[-0.02em]"
                style={{ transform: "translateY(108%)", filter: "blur(8px)" }}
              >
                Casos de ingeniería
              </span>
            </div>
            <div className="overflow-hidden pb-[0.06em]">
              <span
                className="reveal-line block font-display font-light leading-[1.08] tracking-[-0.02em]"
                style={{ transform: "translateY(108%)", filter: "blur(8px)", color: "#FEA94F" }}
              >
                desde el territorio
              </span>
            </div>
          </div>
        </div>

        {/* Project rows */}
        <div ref={listRef} className="space-y-5">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className={`project-row group relative rounded-2xl border border-teal/10 overflow-hidden card-hover cursor-default ${
                project.featured ? "bg-orange/6 border-orange/20" : "bg-teal/4"
              }`}
              style={{ opacity: 0 }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Color accent block — placeholder for real photo */}
                <div
                  className={`w-full md:w-72 lg:w-96 flex-shrink-0 min-h-[180px] md:min-h-[220px] relative overflow-hidden`}
                  style={{
                    background: project.featured
                      ? "linear-gradient(135deg, #FEA94F22, #F1541C22)"
                      : project.id === "01"
                      ? "linear-gradient(135deg, #304B3D33, #3E7C6C22)"
                      : "linear-gradient(135deg, #20535833, #304B3D22)",
                  }}
                >
                  {/* Number overlay */}
                  <span
                    className="absolute bottom-4 left-5 font-display font-light text-6xl leading-none opacity-15"
                    style={{ color: project.dotColor }}
                  >
                    {project.id}
                  </span>
                  {/* Decorative dot pattern */}
                  <div className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(${project.dotColor} 1px, transparent 1px)`,
                      backgroundSize: "18px 18px",
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Text content */}
                <div className="p-7 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: project.dotColor }}
                    />
                    <span className="font-body text-[10px] tracking-[0.22em] uppercase text-ink/45">
                      {project.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-teal text-xl md:text-2xl leading-snug mb-4 tracking-[-0.01em]">
                    {project.title}
                  </h3>
                  <p className="text-ink/60 font-body text-sm leading-[1.75] max-w-lg">
                    {project.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
