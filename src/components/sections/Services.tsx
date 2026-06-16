"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const SERVICES = [
  {
    num: "01",
    title: "Consultoría y estudios energéticos",
    desc: "Estudios socio-técnicos de soluciones energéticas para empresas y sector público.",
    bullets: ["Evaluación de recursos renovables", "Estudios de prefactibilidad", "Diagnósticos en terreno"],
  },
  {
    num: "02",
    title: "Formulación y acompañamiento",
    desc: "Formulamos y ejecutamos proyectos energéticos y ambientales con fondos Corfo, ANID y GORE.",
    bullets: ["Postulación a fondos concursables", "Acompañamiento desde la idea", "Gestión y ejecución"],
  },
  {
    num: "03",
    title: "Simulaciones CFD",
    desc: "Optimización de diseño de sistemas fluidodinámicos: turbinas eólicas, hidráulicas y embarcaciones.",
    bullets: ["Modelos computacionales verificados", "Diseño más rápido y eficiente", "Reducción de costos de prototipado"],
  },
  {
    num: "04",
    title: "Ensayos en túnel de viento",
    desc: "Validación física de diseños aerodinámicos en nuestro túnel de viento, complementando las simulaciones CFD.",
    bullets: ["Prototipado y ensayos reales", "Resultados reproducibles", "Base para patentamiento"],
  },
  {
    num: "05",
    title: "Huella de carbono",
    desc: "Cuantificación de emisiones de GEI para empresas y municipios, conducente a sellos del Ministerio del Medio Ambiente.",
    bullets: ["Alcances 1, 2 y 3", "Reportes auditables", "Sellos de calidad MMA"],
  },
  {
    num: "06",
    title: "Charlas y difusión",
    desc: "Eficiencia energética y cambio climático para comunidades, municipios e instituciones regionales.",
    bullets: ["Talleres en la región", "Presentaciones ante consejos", "Entrevistas radiales y televisivas"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decoRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const trigger = { trigger: sectionRef.current, start: "top 85%" };

    // Decorative arcs draw in
    if (decoRef.current) {
      const paths = Array.from(decoRef.current.querySelectorAll<SVGPathElement>("path"));
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = String(len);
      });
      gsap.fromTo(
        paths,
        { strokeDashoffset: (i) => paths[i].getTotalLength() },
        { strokeDashoffset: 0, duration: 2, ease: "power2.out", stagger: 0.1, scrollTrigger: trigger }
      );
    }

    // Title reveal
    gsap.fromTo(
      titleRef.current?.querySelectorAll(".reveal-line") ?? [],
      { y: "108%", filter: "blur(8px)" },
      {
        y: "0%", filter: "blur(0px)",
        duration: 0.95, ease: "power3.out", stagger: 0.14,
        scrollTrigger: trigger,
      }
    );

    // Cards stagger
    gsap.fromTo(
      cardsRef.current?.querySelectorAll(".service-card") ?? [],
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0,
        duration: 0.65, ease: "power2.out", stagger: 0.08, delay: 0.3,
        scrollTrigger: trigger,
      }
    );

    // CTA fade in
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
      id="servicios"
      className="bg-green-dark relative overflow-hidden"
    >
      {/* Decorative concentric arcs — bottom-left */}
      <svg
        ref={decoRef}
        viewBox="0 0 280 280"
        className="absolute bottom-0 left-0 w-48 md:w-72 opacity-[0.18] pointer-events-none"
        aria-hidden="true"
        fill="none"
      >
        {[40, 70, 100, 130, 160, 190, 220, 250].map((r, i) => (
          <path
            key={i}
            d={`M 0 ${280} Q ${0} ${280 - r} ${r} ${280 - r}`}
            stroke="#3E7C6C"
            strokeWidth="1.5"
          />
        ))}
      </svg>

      {/* Subtle dot texture — top right */}
      <div
        className="absolute top-0 right-0 w-72 h-72 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#F7DFBA 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-6 md:px-14 lg:px-24 py-24 md:py-32">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">

          {/* Left — sticky title panel */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-green text-[11px] tracking-[0.25em] uppercase font-body mb-8">
              Nuestros servicios
            </p>

            <div ref={titleRef} style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              <div className="overflow-hidden pb-[0.06em]">
                <span
                  className="reveal-line block font-display font-light text-cream leading-[1.05] tracking-[-0.02em]"
                  style={{ transform: "translateY(108%)", filter: "blur(8px)" }}
                >
                  Qué
                </span>
              </div>
              <div className="overflow-hidden pb-[0.06em]">
                <span
                  className="reveal-line block font-display font-light leading-[1.05] tracking-[-0.02em]"
                  style={{ transform: "translateY(108%)", filter: "blur(8px)", color: "#FEA94F" }}
                >
                  ofrecemos
                </span>
              </div>
            </div>

            <p className="text-cream/40 font-body text-sm leading-relaxed mt-6 max-w-xs hidden lg:block">
              Desde la consultoría hasta el prototipado físico, acompañamos cada etapa del proyecto.
            </p>

            {/* Desktop CTA */}
            <div ref={ctaRef} className="mt-10 hidden lg:block" style={{ opacity: 0 }}>
              <Link
                href="/servicios"
                className="group inline-flex items-center gap-3 text-cream/60 hover:text-cream font-body text-sm tracking-[0.08em] uppercase transition-colors duration-300"
              >
                <span>Ver en detalle</span>
                <span
                  className="inline-block w-6 h-px bg-current transition-all duration-300 group-hover:w-10"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Right — service cards 2×3 */}
          <div>
            <div ref={cardsRef} className="grid sm:grid-cols-2 gap-4">
              {SERVICES.map((s) => (
                <div
                  key={s.num}
                  className="service-card group bg-cream-light/[0.07] border border-cream/[0.08] rounded-2xl p-6 lg:p-7 flex flex-col gap-3 hover:bg-cream-light/[0.11] hover:border-cream/[0.15] transition-all duration-300"
                  style={{ opacity: 0 }}
                >
                  <span className="block font-display text-cream/20 text-xl font-light tracking-tight">
                    {s.num}
                  </span>
                  <h3 className="font-display font-semibold text-cream text-[0.9rem] leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-cream/45 font-body text-[0.8rem] leading-[1.7]">{s.desc}</p>
                  <ul className="mt-1 space-y-1">
                    {s.bullets.map((b, i) => (
                      <li key={i} className="text-green text-[0.75rem] font-body leading-snug flex items-start gap-2">
                        <span className="mt-[0.35em] w-1 h-1 rounded-full bg-green flex-shrink-0" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-8 lg:hidden">
              <Link
                href="/servicios"
                className="group inline-flex items-center gap-3 text-cream/60 hover:text-cream font-body text-sm tracking-[0.08em] uppercase transition-colors duration-300"
              >
                <span>Ver en detalle</span>
                <span
                  className="inline-block w-6 h-px bg-current transition-all duration-300 group-hover:w-10"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
