"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

// All values derived from docs/que-es-enma.txt — no inflated figures.
const ANIMATED_STATS = [
  {
    value: 3,
    prefix: "",
    suffix: "+",
    label: "Años de experiencia",
    hint: "Operando en la Región de Aysén desde 2022.",
  },
  {
    value: 5,
    prefix: "+",
    suffix: "",
    label: "Proyectos ejecutados",
    hint: "Energía renovable, manufactura y mitigación ambiental.",
  },
  {
    value: 6,
    prefix: "",
    suffix: "",
    label: "Líneas de servicio",
    hint: "Consultoría, CFD, túnel de viento, huella de carbono y más.",
  },
  {
    value: 3,
    prefix: "",
    suffix: "",
    label: "Áreas de impacto",
    hint: "Energía, manufactura avanzada y cambio climático.",
  },
];

// Mountain / peak SVG mask — thematically aligned with Patagonia.
// Path reused from motionsites reference, viewBox 0 0 100 100.
const MOUNTAIN_SVG_URI = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="m53.54,45.42c2.19-3.79,7.67-3.79,9.86,0l4.54,7.87c1.17,2.02,1.17,4.51,0,6.54l-8.15,13.81c-1.68,2.91.42,6.55,3.78,6.55h17.81c3.45,0,5.61-3.74,3.89-6.73l-28.76-49.81c-2.95-5.12-10.34-5.12-13.29,0l-28.46,49.3c-1.86,3.22.46,7.24,4.18,7.24h10.23c2.55,0,4.91-1.36,6.19-3.57l18.18-31.19Z"/></svg>`
);

const MASK_STYLES: React.CSSProperties = {
  WebkitMaskImage: `url("data:image/svg+xml,${MOUNTAIN_SVG_URI}")`,
  WebkitMaskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskImage: `url("data:image/svg+xml,${MOUNTAIN_SVG_URI}")`,
  maskSize: "contain",
  maskRepeat: "no-repeat",
  maskPosition: "center",
};

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // FOUC guard: all animated elements carry inline opacity:0.
  // fromTo (never from) confirms that state — lore/animation.md
  useGSAP(() => {
    const trigger = { trigger: sectionRef.current, start: "top 90%" };

    // Header items cascade
    gsap.fromTo(
      headerRef.current?.querySelectorAll(".st-hdr") ?? [],
      { opacity: 0, y: 22 },
      {
        opacity: 1, y: 0,
        duration: 0.75, ease: "power2.out", stagger: 0.1,
        scrollTrigger: trigger,
      }
    );

    // Stat cards stagger — slight delay so header leads
    gsap.fromTo(
      statsRef.current?.querySelectorAll(".stat-item") ?? [],
      { opacity: 0, y: 22 },
      {
        opacity: 1, y: 0,
        duration: 0.65, ease: "power2.out", stagger: 0.09, delay: 0.22,
        scrollTrigger: trigger,
      }
    );

    // Right visual: scale + opacity reveal — GPU-composited, no layout jank
    if (rightRef.current) {
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1, scale: 1,
          duration: 0.9, ease: "power2.out", delay: 0.2,
          scrollTrigger: trigger,
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="numeros"
      className="bg-green-dark relative overflow-hidden"
    >
      {/* Subtle dot texture — same pattern used elsewhere in the site */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgb(247 223 186 / 0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-6 md:px-14 lg:px-24 py-20 md:py-28">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 flex flex-col justify-start min-w-0">

            {/* Header group */}
            <div ref={headerRef}>
              <p
                className="st-hdr text-green text-[11px] tracking-[0.25em] uppercase font-body mb-7"
                style={{ opacity: 0 }}
              >
                En números
              </p>

              <h2
                className="st-hdr font-display font-light text-cream tracking-[-0.02em] leading-[1.08] mb-5"
                style={{
                  opacity: 0,
                  fontSize: "clamp(1.75rem, 3.5vw, 3.25rem)",
                  maxWidth: "560px",
                }}
              >
                Impacto medible en energía y manufactura sustentable.
              </h2>

              <p
                className="st-hdr font-body font-light text-cream/45 leading-[1.75] mb-12"
                style={{ opacity: 0, fontSize: "clamp(0.875rem, 1.2vw, 1rem)", maxWidth: "480px" }}
              >
                Desde 2022 diseñamos soluciones reales de energía y manufactura en la Región de Aysén,
                con herramientas computacionales de alto nivel y presencia en el territorio.
              </p>
            </div>

            {/* ── Stats grid (2 × 2) ── */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-x-10 gap-y-9 sm:gap-x-16 lg:gap-x-20"
            >
              {ANIMATED_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="stat-item flex flex-col"
                  style={{ opacity: 0 }}
                >
                  <div className="border-t border-cream/15 mb-4" />

                  {/* Number — large, display weight */}
                  <p
                    className="font-display text-cream leading-none mb-2"
                    style={{ fontSize: "clamp(2.5rem, 4.5vw, 3.5rem)", fontWeight: 300 }}
                  >
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </p>

                  {/* Label */}
                  <p className="text-green text-[10px] tracking-[0.22em] uppercase font-body mb-1.5">
                    {stat.label}
                  </p>

                  {/* Hint */}
                  <p className="text-cream/30 font-body text-[0.75rem] leading-[1.65]">
                    {stat.hint}
                  </p>
                </div>
              ))}

              {/* ── ANID achievement — spans full width ── */}
              <div
                className="stat-item col-span-2 border-t border-cream/15 pt-5 flex flex-wrap items-start gap-x-6 gap-y-2"
                style={{ opacity: 0 }}
              >
                <span
                  className="inline-block font-display text-orange font-semibold tracking-tight leading-none"
                  style={{ fontSize: "clamp(2.5rem, 4.5vw, 3.5rem)", fontWeight: 300 }}
                >
                  ANID
                </span>
                <div className="flex flex-col justify-center pt-1">
                  <p className="text-green text-[10px] tracking-[0.22em] uppercase font-body mb-1">
                    Fondo I+D adjudicado
                  </p>
                  <p className="text-cream/30 font-body text-[0.75rem] leading-[1.65] max-w-xs">
                    Turbina eólica de baja escala financiada por la Agencia Nacional de I+D.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN — mountain-masked visual ── */}
          <div
            ref={rightRef}
            className="lg:w-[44%] shrink-0 w-full max-w-[420px] lg:max-w-none mx-auto lg:mx-0"
            style={{ opacity: 0, transform: "scale(0.92)" }}
            aria-hidden="true"
          >
            <div className="relative" style={{ aspectRatio: "1" }}>
              {/* Mask container */}
              <div className="absolute inset-0" style={MASK_STYLES}>

                {/* Gradient fill — palette-derived */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(148deg, #205358 0%, #304B3D 45%, #3E7C6C 100%)",
                  }}
                />

                {/* Concentric ring overlay — decorative, same as About card */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 400"
                  preserveAspectRatio="xMidYMid slice"
                  fill="none"
                >
                  {[40, 90, 145, 200, 255, 310, 365].map((r, i) => (
                    <circle
                      key={r}
                      cx="200"
                      cy="440"
                      r={r}
                      stroke="#F7DFBA"
                      strokeWidth="1"
                      opacity={Math.max(0.03, 0.12 - i * 0.015)}
                    />
                  ))}
                </svg>

                {/* Orange accent glow at peak — subtle */}
                <div
                  className="absolute"
                  style={{
                    top: "18%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "30%",
                    aspectRatio: "1",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgb(254 169 79 / 0.22) 0%, transparent 70%)",
                    filter: "blur(12px)",
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
