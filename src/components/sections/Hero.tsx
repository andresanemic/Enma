"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import BoomerangVideoBg from "@/components/hero/BoomerangVideoBg";

// TODO: reemplazar con video propio de Enma (Patagonia / proceso / naturaleza).
// El video debe estar en /public/video/ o en un CDN con CORS habilitado.
const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4";

export default function Hero() {
  const heroRef    = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const line3Ref   = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      eyebrowRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
      0.25
    );

    // H1 — lore/animation: overflow:hidden por línea + gsap.fromTo (estado inicial inline)
    [line1Ref, line2Ref, line3Ref].forEach((ref, i) => {
      tl.fromTo(
        ref.current,
        { y: "108%", filter: "blur(10px)" },
        { y: "0%",   filter: "blur(0px)", duration: 1.0 },
        0.45 + i * 0.18
      );
    });

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7 },
      0.9
    );

    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      1.1
    );

    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      1.6
    );
  }, { scope: heroRef });

  return (
    // lore/scroll: 100svh → 100svh para iOS Safari (no 100vh)
    <section
      ref={heroRef}
      id="inicio"
      className="relative w-full min-h-[100svh] overflow-hidden"
    >
      {/* Video boomerang de fondo — placeholder; reemplazar con video de Enma */}
      <BoomerangVideoBg src={HERO_VIDEO} className="absolute inset-0 w-full h-full" />

      {/* Overlay para legibilidad — gradiente vertical, más oscuro arriba y abajo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/65 pointer-events-none" />

      {/* ── Hero copy — centrado, posición superior ── */}
      <div className="relative z-10 flex flex-col items-center text-center pt-28 sm:pt-32 md:pt-36 px-4 sm:px-6">

        {/* Eyebrow — lore/animation: estado inicial inline */}
        <p
          ref={eyebrowRef}
          style={{ opacity: 0 }}
          className="text-cream/50 text-[10px] tracking-[0.28em] uppercase font-body mb-8"
        >
          desde la Patagonia · Región de Aysén · Chile
        </p>

        {/* H1 — lore/animation: overflow:hidden por línea + span con estado inicial inline */}
        <h1
          className="font-display font-light text-cream leading-[0.95] tracking-[-0.035em] max-w-5xl"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.25rem)" }}
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

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{ opacity: 0 }}
          className="mt-6 sm:mt-8 text-cream/70 font-body font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-md px-2"
        >
          Ingeniería aplicada a la energía limpia y la manufactura, desde la Patagonia chilena.
        </p>
      </div>

      {/* ── CTA block — bottom-left (motionsites.md §layout) ── */}
      <div
        ref={ctaRef}
        style={{ opacity: 0 }}
        className="absolute left-4 right-4 sm:right-auto sm:left-6 md:left-10 bottom-8 sm:bottom-10 md:bottom-12 z-10 max-w-xs"
      >
        <p className="text-cream/40 text-[10px] tracking-[0.22em] uppercase font-body mb-3">
          Energía · Manufactura · Patagonia
        </p>
        <p className="text-cream/65 text-xs sm:text-sm leading-relaxed mb-5 font-body font-light">
          Ayudamos a empresas e instituciones a diseñar proyectos de energía limpia con impacto real.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <a
            href="mailto:contacto@enmachile.com"
            className="inline-flex items-center gap-2 bg-cream hover:bg-cream-light text-teal text-sm font-medium font-body px-6 py-2.5 rounded-full transition-colors duration-300 shadow-sm group"
          >
            Hablemos de tu proyecto
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <Link
            href="#proyectos"
            className="text-cream/70 hover:text-cream text-sm font-body font-medium transition-colors duration-200"
          >
            Ver proyectos →
          </Link>
        </div>
      </div>

      {/* ── Scroll indicator — bottom-right ── */}
      <div
        ref={scrollRef}
        style={{ opacity: 0 }}
        className="absolute right-6 md:right-10 bottom-10 md:bottom-12 z-10 hidden sm:flex items-center gap-2 text-cream/35"
      >
        <div className="w-px h-8 bg-cream/25 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cream/60"
            style={{ animation: "scroll-line 1.8s ease-in-out infinite" }}
          />
        </div>
        <span className="text-[10px] tracking-[0.2em] uppercase font-body">scroll</span>
      </div>
    </section>
  );
}
