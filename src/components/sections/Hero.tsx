"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import CircuitLines from "@/components/ui/CircuitLines";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Caption eyebrow
    gsap.fromTo(
      captionRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.55 }
    );

    // Headline — clip-translate reveal, lore/animation: translateY(108%) + blur
    [line1Ref, line2Ref, line3Ref].forEach((ref, i) => {
      gsap.fromTo(
        ref.current,
        { y: "108%", filter: "blur(10px)" },
        {
          y: "0%",
          filter: "blur(0px)",
          duration: 1.0,
          ease: "power3.out",
          delay: 0.75 + i * 0.18,
        }
      );
    });

    // Divider line
    gsap.fromTo(
      dividerRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out", delay: 1.2, transformOrigin: "left" }
    );

    // Subtitle
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 1.35 }
    );

    // CTA
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 1.55 }
    );

    // Scroll indicator
    gsap.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, delay: 2.1 }
    );
  }, { scope: heroRef });

  return (
    // min-h-[100svh] — lore/scroll: usar svh en lugar de vh en iOS Safari
    <section
      ref={heroRef}
      id="inicio"
      className="relative min-h-[100svh] bg-teal flex flex-col justify-center overflow-hidden"
    >
      {/* Circuit lines — background visual signature */}
      <CircuitLines opacity={0.09} color="white" animate strokeWidth={1.5} />

      {/* Gradient vignette left — keeps text readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal via-teal/80 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-14 lg:px-24 pt-32 pb-24 max-w-5xl">

        {/* Eyebrow caption */}
        <p
          ref={captionRef}
          style={{ opacity: 0 }}
          className="text-orange text-[11px] tracking-[0.28em] uppercase font-body mb-10"
        >
          desde la Patagonia · Región de Aysén · Chile
        </p>

        {/* Headline — lore/layout: line-height ≥ 1.05 en fuentes display */}
        <h1
          className="font-display font-light text-cream leading-[1.05] tracking-[-0.025em] mb-0"
          style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
        >
          {/* lore/animation: overflow:hidden por línea + span con estado inicial inline */}
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

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{ opacity: 0, fontSize: "clamp(0.95rem, 1.7vw, 1.15rem)" }}
          className="text-cream/65 font-body font-light max-w-md leading-[1.7] mb-10"
        >
          Soluciones socio-técnicas a la medida para problemas reales de energía, reciclaje y calefacción, hechas desde la Patagonia.
        </p>

        {/* CTA buttons */}
        <div ref={ctaRef} style={{ opacity: 0 }} className="flex flex-col sm:flex-row gap-4 items-start">
          <Link
            href="#servicios"
            className="inline-flex items-center gap-3 border border-cream/50 text-cream px-7 py-3.5 rounded-full text-sm tracking-wide font-body hover:bg-cream hover:text-teal transition-all duration-300 group"
          >
            Conoce nuestros servicios
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="#proyectos"
            className="inline-flex items-center gap-2 text-cream/50 px-2 py-3.5 text-sm tracking-wide font-body hover:text-cream transition-colors duration-200"
          >
            Ver proyectos
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{ opacity: 0 }}
        className="absolute bottom-8 left-8 md:left-14 lg:left-24 flex items-center gap-3 text-cream/35"
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
