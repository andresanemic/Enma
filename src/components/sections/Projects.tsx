"use client";

import Link from "next/link";
import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const PROJECTS = [
  {
    id: "01",
    tag: "UpCycling",
    category: "Puerto Cisnes · 2022",
    title: "Taller de UpCycling para residuos salmoneros",
    desc: "Diseño y montaje de taller para la revalorización de residuos plásticos de la industria salmonera en productos comerciables.",
    accentColor: "#3E7C6C",
    bgFrom: "#304B3D",
    bgTo: "#205358",
    pattern: "rings",
  },
  {
    id: "02",
    tag: "Turbina eólica",
    category: "ANID · Proyecto destacado",
    title: "Turbina eólica de baja escala para condiciones extremas",
    desc: "Diseño, simulación CFD y ensayos de una turbina resiliente a vientos turbulentos y ráfagas súbitas. Financiado por ANID.",
    accentColor: "#FEA94F",
    bgFrom: "#2D1A00",
    bgTo: "#3D2200",
    pattern: "blades",
    featured: true,
  },
  {
    id: "03",
    tag: "I+D · Infraestructura",
    category: "Santiago · 2024",
    title: "Diseño y montaje de túnel de viento",
    desc: "Infraestructura propia para la validación física de prototipos, complementando las simulaciones fluidodinámicas con resultados reproducibles.",
    accentColor: "#205358",
    bgFrom: "#0E1F21",
    bgTo: "#152E31",
    pattern: "grid",
  },
];

type PatternProps = { color: string; type: string };

function CardPattern({ color, type }: PatternProps) {
  if (type === "rings") {
    return (
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 300 220"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        fill="none"
      >
        {[40, 75, 110, 145, 180, 220].map((r, i) => (
          <circle
            key={i}
            cx="260"
            cy="220"
            r={r}
            stroke={color}
            strokeWidth="1"
            opacity={0.18 - i * 0.02}
          />
        ))}
      </svg>
    );
  }

  if (type === "blades") {
    return (
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 300 220"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        fill="none"
      >
        <g transform="translate(150,110)">
          {[0, 120, 240].map((deg, i) => (
            <path
              key={i}
              d={`M 0 0 C 8 -40 22 -70 10 -100 C -4 -70 -8 -40 0 0`}
              fill={color}
              opacity="0.15"
              transform={`rotate(${deg})`}
            />
          ))}
          <circle cx="0" cy="0" r="6" fill={color} opacity="0.25" />
        </g>
        {/* Background grid */}
        <pattern id="bgl" patternUnits="userSpaceOnUse" width="24" height="24">
          <circle cx="12" cy="12" r="0.8" fill={color} opacity="0.12" />
        </pattern>
        <rect width="300" height="220" fill="url(#bgl)" />
      </svg>
    );
  }

  // grid / default
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 300 220"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <pattern id="tg" patternUnits="userSpaceOnUse" width="30" height="30">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
      </pattern>
      <rect width="300" height="220" fill="url(#tg)" />
      {/* Diagonal accent */}
      <line x1="0" y1="220" x2="300" y2="0" stroke={color} strokeWidth="0.5" opacity="0.12" />
      <line x1="0" y1="160" x2="220" y2="0" stroke={color} strokeWidth="0.5" opacity="0.08" />
    </svg>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // GSAP hover: image parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>, cardEl: HTMLAnchorElement) => {
    const img = cardEl.querySelector<HTMLElement>(".card-img-inner");
    if (!img) return;
    const rect = cardEl.getBoundingClientRect();
    const xRel = (e.clientX - rect.left) / rect.width - 0.5;
    const yRel = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(img, { x: xRel * 8, y: yRel * 8, duration: 0.3, ease: "power2.out", overwrite: "auto" });
  }, []);

  const handleMouseLeave = useCallback((cardEl: HTMLAnchorElement) => {
    const img = cardEl.querySelector<HTMLElement>(".card-img-inner");
    if (!img) return;
    gsap.to(img, { x: 0, y: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
  }, []);

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
      gridRef.current?.querySelectorAll(".project-card") ?? [],
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0,
        duration: 0.75, ease: "power2.out", stagger: 0.13, delay: 0.3,
        scrollTrigger: trigger,
      }
    );

    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.7, ease: "power2.out", delay: 0.8,
          scrollTrigger: trigger,
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      className="bg-cream-light relative overflow-hidden"
    >
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#205358 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-6 md:px-14 lg:px-24 py-24 md:py-32">

        {/* Header */}
        <div className="mb-14 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="text-teal/50 text-[11px] tracking-[0.25em] uppercase font-body mb-8">
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

          {/* Section CTA — desktop */}
          <div ref={ctaRef} className="hidden md:block flex-shrink-0" style={{ opacity: 0 }}>
            <Link
              href="/proyectos"
              className="group inline-flex items-center gap-3 text-teal/60 hover:text-teal font-body text-sm tracking-[0.08em] uppercase transition-colors duration-300"
            >
              <span>Ver todos</span>
              <span
                className="inline-block w-6 h-px bg-current transition-all duration-300 group-hover:w-10"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* Project grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {PROJECTS.map((project) => (
            <Link
              key={project.id}
              href="/proyectos"
              className={`project-card group block rounded-2xl overflow-hidden border transition-all duration-300 ${
                project.featured
                  ? "border-orange/25 hover:border-orange/45"
                  : "border-teal/10 hover:border-teal/20"
              } hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-1.5`}
              style={{ opacity: 0 }}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              {/* Image area */}
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "4/3",
                  background: `linear-gradient(135deg, ${project.bgFrom}, ${project.bgTo})`,
                }}
              >
                {/* Pattern */}
                <div className="card-img-inner absolute inset-0">
                  <CardPattern color={project.accentColor} type={project.pattern} />
                </div>

                {/* Project number */}
                <span
                  className="absolute bottom-4 left-5 font-display font-light text-7xl leading-none select-none"
                  style={{ color: project.accentColor, opacity: 0.12 }}
                >
                  {project.id}
                </span>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.25), transparent 60%)" }}
                />
              </div>

              {/* Content */}
              <div
                className="p-5 md:p-6 flex flex-col gap-3"
                style={{ background: project.featured ? "#FFF8F0" : "#F8EDDD" }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-body text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: project.accentColor }}
                  >
                    {project.tag}
                  </span>
                  <span className="font-body text-[10px] tracking-[0.12em] text-ink/30 uppercase">
                    {project.category}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-teal text-base leading-snug tracking-[-0.01em]">
                  {project.title}
                </h3>

                <p className="text-ink/55 font-body text-[0.8rem] leading-[1.7]">
                  {project.desc}
                </p>

                <div className="pt-1">
                  <span
                    className="relative inline-block font-body text-[11px] tracking-[0.16em] uppercase text-teal/60 group-hover:text-teal transition-colors duration-300"
                  >
                    Ver proyecto
                    <span
                      className="absolute -bottom-0.5 left-0 h-px w-5 bg-teal/40 group-hover:w-full transition-all duration-300"
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 md:hidden text-center">
          <Link
            href="/proyectos"
            className="group inline-flex items-center gap-3 text-teal/60 hover:text-teal font-body text-sm tracking-[0.08em] uppercase transition-colors duration-300"
          >
            <span>Ver todos los proyectos</span>
            <span
              className="inline-block w-6 h-px bg-current transition-all duration-300 group-hover:w-10"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
