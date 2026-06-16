"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import CircuitLines from "@/components/ui/CircuitLines";

// Anillos orgánicos — concepto "huella sustentable" (diseñadora: contornos naturales, huellas)
const ORGANIC_RINGS = [
  { rx: 28,  ry: 26,  rot: 0   },
  { rx: 52,  ry: 47,  rot: 9   },
  { rx: 76,  ry: 68,  rot: -6  },
  { rx: 100, ry: 89,  rot: 14  },
  { rx: 124, ry: 110, rot: -9  },
  { rx: 147, ry: 130, rot: 7   },
  { rx: 169, ry: 150, rot: -4  },
  { rx: 190, ry: 168, rot: 11  },
  { rx: 210, ry: 185, rot: -7  },
];

export default function Hero() {
  const heroRef    = useRef<HTMLElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const line3Ref   = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const trustRef   = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const visualRef  = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Caption eyebrow
    tl.fromTo(
      captionRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.55
    );

    // Headline — lore/animation: overflow:hidden + translateY(108%) + blur por línea
    [line1Ref, line2Ref, line3Ref].forEach((ref, i) => {
      tl.fromTo(
        ref.current,
        { y: "108%", filter: "blur(10px)" },
        { y: "0%", filter: "blur(0px)", duration: 1.0 },
        0.75 + i * 0.18
      );
    });

    // Divider
    tl.fromTo(
      dividerRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, transformOrigin: "left" },
      1.2
    );

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7 },
      1.35
    );

    // CTAs
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.6 },
      1.55
    );

    // Trust signals
    tl.fromTo(
      trustRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      1.75
    );

    // Visual (columna derecha) — hero.md §5.1: from right
    tl.fromTo(
      visualRef.current,
      { opacity: 0, x: 40, scale: 0.96 },
      { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: "power3.out" },
      0.85
    );

    // Scroll indicator
    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      2.1
    );
  }, { scope: heroRef });

  return (
    // lore/scroll: 100svh → 100svh para iOS Safari
    <section
      ref={heroRef}
      id="inicio"
      className="relative min-h-[100svh] bg-teal flex flex-col justify-center overflow-hidden"
    >
      {/* Circuit lines — firma visual de fondo */}
      <CircuitLines opacity={0.07} color="white" animate strokeWidth={1.5} />

      {/* Gradiente — mantiene texto legible sin aplastar el visual de la derecha */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal via-teal/75 to-teal/20 pointer-events-none" />

      {/* Content — 2-column grid (desktop) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-14 lg:px-24 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-center">

          {/* ── Columna texto ── */}
          <div>
            {/* Eyebrow */}
            <p
              ref={captionRef}
              style={{ opacity: 0 }}
              className="text-orange text-[11px] tracking-[0.28em] uppercase font-body mb-10"
            >
              desde la Patagonia · Región de Aysén · Chile
            </p>

            {/* Headline — lore/animation: overflow:hidden por línea + span con estado inicial inline */}
            <h1
              className="font-display font-light text-cream leading-[1.05] tracking-[-0.025em] mb-0"
              style={{ fontSize: "clamp(3rem, 6.5vw, 6rem)" }}
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <span
                  ref={line1Ref}
                  style={{ display: "block", transform: "translateY(108%)", filter: "blur(10px)" }}
                >
                  Energía y
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span
                  ref={line2Ref}
                  style={{ display: "block", transform: "translateY(108%)", filter: "blur(10px)" }}
                >
                  Manufactura
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span
                  ref={line3Ref}
                  style={{ display: "block", transform: "translateY(108%)", filter: "blur(10px)" }}
                >
                  <span className="text-orange">Sustentable</span>
                </span>
              </span>
            </h1>

            {/* Divider */}
            <div
              ref={dividerRef}
              style={{ opacity: 0, transformOrigin: "left" }}
              className="w-16 h-px bg-orange/60 my-8"
            />

            {/* Subtitle — hero.md §4.2: "Ayudamos a [cliente] a [resultado] mediante [enfoque]." */}
            <p
              ref={subtitleRef}
              style={{ opacity: 0, fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)" }}
              className="text-cream/65 font-body font-light max-w-md leading-[1.7] mb-10"
            >
              Ayudamos a empresas e instituciones a diseñar y ejecutar proyectos de energía limpia con impacto real, desde la Patagonia chilena.
            </p>

            {/* CTAs — hero.md §4.3: primary → contacto, secondary → explorar */}
            <div ref={ctaRef} style={{ opacity: 0 }} className="flex flex-col sm:flex-row gap-4 items-start mb-8">
              <a
                href="mailto:contacto@enmachile.com"
                className="inline-flex items-center gap-3 bg-cream text-teal px-7 py-3.5 rounded-full text-sm tracking-wide font-body font-medium hover:bg-cream-light transition-all duration-300 group"
              >
                Hablemos de tu proyecto
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <Link
                href="#proyectos"
                className="inline-flex items-center gap-2 border border-cream/30 text-cream/70 px-7 py-3.5 rounded-full text-sm tracking-wide font-body hover:border-cream/60 hover:text-cream transition-all duration-300"
              >
                Ver proyectos
              </Link>
            </div>

            {/* Trust signals — hero.md §1.2 — solo datos verificados en \docs\que-es-enma.txt */}
            <div
              ref={trustRef}
              style={{ opacity: 0 }}
              className="flex flex-wrap gap-x-4 gap-y-1 text-cream/35 text-[11px] tracking-[0.18em] uppercase font-body"
            >
              <span>Respaldados por ANID</span>
              <span aria-hidden="true">·</span>
              <span>CIEP · GORE · Municipios</span>
              <span aria-hidden="true">·</span>
              <span>Puerto Cisnes, Aysén</span>
            </div>
          </div>

          {/* ── Columna visual (desktop) — concepto "huella sustentable" ── */}
          <div
            ref={visualRef}
            style={{ opacity: 0 }}
            className="hidden lg:flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="relative w-[400px] h-[400px]">
              {/* Anillos orgánicos: contornos naturales / huellas / topografía patagónica */}
              <svg
                viewBox="0 0 400 400"
                width="400"
                height="400"
                className="absolute inset-0"
              >
                {ORGANIC_RINGS.map((ring, i) => (
                  <ellipse
                    key={i}
                    cx="200"
                    cy="200"
                    rx={ring.rx}
                    ry={ring.ry}
                    stroke="white"
                    strokeWidth={i < 2 ? 1.5 : 1}
                    fill="none"
                    transform={`rotate(${ring.rot} 200 200)`}
                    opacity={0.06 + (ORGANIC_RINGS.length - i) * 0.018}
                  />
                ))}
              </svg>
              {/* Isotipo centrado */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/isotipos/isotipo-blanco.webp"
                  alt=""
                  width={88}
                  height={88}
                  className="w-20 h-20 object-contain opacity-55"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{ opacity: 0 }}
        className="absolute bottom-8 left-6 md:left-14 lg:left-24 flex items-center gap-3 text-cream/35"
      >
        <div className="w-px h-10 bg-cream/25 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cream/60"
            style={{ animation: "scroll-line 1.8s ease-in-out infinite" }}
          />
        </div>
        <span className="text-[10px] tracking-[0.2em] uppercase font-body">scroll</span>
      </div>

      {/* Bottom meta strip */}
      <div className="absolute bottom-8 right-6 md:right-14 lg:right-24 text-cream/25 text-[10px] tracking-widest uppercase font-body hidden sm:block">
        enmachile.com
      </div>
    </section>
  );
}
