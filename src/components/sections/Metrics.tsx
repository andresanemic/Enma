"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const STATS = [
  {
    value: "2022",
    label: "Fundación",
    hint: "Puerto Cisnes, Región de Aysén, Patagonia chilena.",
  },
  {
    value: "6",
    label: "Líneas de servicio",
    hint: "De consultoría energética a ensayos en túnel de viento.",
  },
  {
    value: "+5",
    label: "Proyectos ejecutados",
    hint: "Energía renovable, manufactura y mitigación ambiental.",
  },
  {
    value: "ANID",
    label: "Fondo adjudicado",
    hint: "Desarrollo de turbina eólica de baja escala financiado por la agencia nacional de I+D.",
  },
];

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const trigger = { trigger: sectionRef.current, start: "top 88%" };

    gsap.fromTo(
      itemsRef.current?.querySelectorAll(".stat-item") ?? [],
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        duration: 0.65, ease: "power2.out", stagger: 0.1,
        scrollTrigger: trigger,
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="numeros"
      className="bg-teal relative overflow-hidden"
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#F7DFBA 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-6 md:px-14 lg:px-24 py-16 md:py-20">
        <div
          ref={itemsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-item" style={{ opacity: 0 }}>
              <div className="border-t border-cream/20 pt-5 mb-4" />
              <p
                className="font-display font-light text-cream tracking-tight leading-none mb-3"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                {stat.value}
              </p>
              <p className="text-green text-[11px] tracking-[0.2em] uppercase font-body mb-2">
                {stat.label}
              </p>
              <p className="text-cream/35 font-body text-xs leading-[1.7]">
                {stat.hint}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
