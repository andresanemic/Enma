"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const SERVICES = [
  {
    num: "01",
    title: "Consultoría y estudios energéticos",
    desc: "Estudios socio-técnicos de soluciones energéticas para empresas y sector público.",
  },
  {
    num: "02",
    title: "Desarrollo de Prototipos",
    desc: "Diseño y fabricación de prototipos para validación tecnológica.",
  },
  {
    num: "03",
    title: "Simulaciones CFD",
    desc: "Optimización de diseño de sistemas que interactúan con fluidos mediante simulaciones fluidodinámicas.",
  },
  {
    num: "04",
    title: "Formulación de proyectos",
    desc: "Postulación y acompañamiento a fondos concursables, con foco energético y ambiental.",
  },
  {
    num: "05",
    title: "Huella de carbono",
    desc: "Cuantificación de emisiones de gases de efecto invernadero para empresas y municipios.",
  },
  {
    num: "06",
    title: "Charlas y difusión",
    desc: "Eficiencia energética, cambio climático y difusión tecnológica para comunidades e instituciones.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
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
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="bg-green-dark relative overflow-hidden"
    >
      {/* Decorative concentric arcs — bottom-left, inspired by brochure p.3 */}
      <svg
        ref={decoRef}
        viewBox="0 0 280 280"
        className="absolute bottom-0 left-0 w-48 md:w-64 opacity-20 pointer-events-none"
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
          </div>

          {/* Right — service cards 2×3 */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 gap-4">
            {SERVICES.map((s) => (
              <div
                key={s.num}
                className="service-card bg-cream-light rounded-2xl p-6 lg:p-7 card-hover"
                style={{ opacity: 0 }}
              >
                <span className="block font-display text-teal/40 text-xl font-light mb-3 tracking-tight">
                  {s.num}
                </span>
                <h3 className="font-display font-semibold text-teal text-[0.95rem] leading-snug mb-3">
                  {s.title}
                </h3>
                <p className="text-ink/55 font-body text-sm leading-[1.7]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
