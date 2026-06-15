"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const DISTINCTIONS = [
  {
    num: "01",
    title: "Pertenencia territorial",
    desc: "Entendemos la logística, los costos y la idiosincrasia de la Patagonia. Diseñamos para el lugar donde se ejecuta.",
  },
  {
    num: "02",
    title: "Formulación de proyectos",
    desc: "Tomamos todas las variables de forma eficiente para desarrollar proyectos integrales y efectivos en cada ecosistema.",
  },
  {
    num: "03",
    title: "Prototipado y validación",
    desc: 'Validamos soluciones complejas con prototipos de bajo costo y simulaciones computacionales. "Prototipar rápido y barato".',
  },
  {
    num: "04",
    title: "Acompañamiento Estratégico",
    desc: "Co-creamos junto al cliente como un socio tecnológico, adecuándonos a sus necesidades y ritmos.",
  },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const trigger = { trigger: sectionRef.current, start: "top 85%" };

    // Wave lines draw-in
    if (waveRef.current) {
      const paths = Array.from(waveRef.current.querySelectorAll<SVGPathElement>("path"));
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = String(len);
      });
      gsap.fromTo(
        paths,
        { strokeDashoffset: (i) => paths[i].getTotalLength() },
        { strokeDashoffset: 0, duration: 2.2, ease: "power2.out", stagger: 0.12, scrollTrigger: trigger }
      );
    }

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
      cardsRef.current?.querySelectorAll(".why-card") ?? [],
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.7, ease: "power2.out", stagger: 0.1, delay: 0.3,
        scrollTrigger: trigger,
      }
    );

    gsap.fromTo(
      badgeRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.6, scrollTrigger: trigger }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="distintos"
      className="bg-teal relative overflow-hidden"
    >
      {/* Organic wave lines — inspired by brochure p.4 bottom-left */}
      <svg
        ref={waveRef}
        viewBox="0 0 320 200"
        className="absolute bottom-0 left-0 w-56 md:w-80 opacity-25 pointer-events-none"
        fill="none"
        aria-hidden="true"
      >
        {[0, 18, 36, 54, 72, 90, 108].map((offset, i) => (
          <path
            key={i}
            d={`M -10 ${120 + offset} Q 80 ${100 + offset} 160 ${130 + offset} Q 240 ${160 + offset} 330 ${120 + offset}`}
            stroke="#3E7C6C"
            strokeWidth="1.5"
          />
        ))}
      </svg>

      {/* Top-right patagonia gradient accent */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-bl-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top right, #3E7C6C, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-6 md:px-14 lg:px-24 py-24 md:py-32">

        {/* Eyebrow */}
        <p className="text-green text-[11px] tracking-[0.25em] uppercase font-body mb-8">
          Nuestra diferencia
        </p>

        {/* Title */}
        <div ref={titleRef} className="mb-14" style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}>
          <div className="overflow-hidden pb-[0.06em]">
            <span
              className="reveal-line block font-display font-light text-cream leading-[1.08] tracking-[-0.02em]"
              style={{ transform: "translateY(108%)", filter: "blur(8px)" }}
            >
              Lo que nos hace
            </span>
          </div>
          <div className="overflow-hidden pb-[0.06em]">
            <span
              className="reveal-line block font-display font-light leading-[1.08] tracking-[-0.02em]"
              style={{ transform: "translateY(108%)", filter: "blur(8px)", color: "#FEA94F" }}
            >
              distintos
            </span>
          </div>
        </div>

        {/* 2×2 cards */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 gap-4 mb-10">
          {DISTINCTIONS.map((d) => (
            <div
              key={d.num}
              className="why-card bg-cream-light/10 border border-cream/10 rounded-2xl p-6 lg:p-8 card-hover backdrop-blur-sm"
              style={{ opacity: 0 }}
            >
              <span className="block font-display text-orange/50 text-xl font-light mb-4 tracking-tight">
                {d.num}
              </span>
              <h3 className="font-display font-semibold text-cream text-base mb-3 leading-snug">
                {d.title}
              </h3>
              <p className="text-cream/55 font-body text-sm leading-[1.75]">{d.desc}</p>
            </div>
          ))}
        </div>

        {/* Badge — "Innovadores natos" */}
        <div
          ref={badgeRef}
          style={{ opacity: 0 }}
          className="inline-flex items-center gap-3 bg-green-dark/50 border border-green/30 rounded-full px-6 py-3"
        >
          <span className="w-2 h-2 rounded-full bg-orange flex-shrink-0" />
          <span className="text-cream/80 font-body text-sm tracking-wide">
            Innovadores natos, atentos y aterrizados a la{" "}
            <span className="text-orange font-medium">realidad</span>
          </span>
        </div>
      </div>
    </section>
  );
}
