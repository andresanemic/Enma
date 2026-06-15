"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CircuitLines from "@/components/ui/CircuitLines";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import { useIsMobile } from "@/lib/use-is-mobile";

const SERVICES = [
  {
    num: "01",
    title: "Consultoría y estudios energéticos",
    desc: "Estudios socio-técnicos de soluciones energéticas para empresas y sector público. El servicio base que abre la puerta a todos los demás y concentra el mayor valor intangible de la empresa.",
    kw: ["Sector público", "Empresas", "Diagnóstico", "Estrategia"],
  },
  {
    num: "02",
    title: "Desarrollo de Prototipos",
    desc: "Diseño y fabricación de prototipos para validación tecnológica. Impresión 3D y corte CNC para pasar rápido y barato del diseño al prototipo físico.",
    kw: ["Impresión 3D", "Corte CNC", "Validación", "Manufactura"],
  },
  {
    num: "03",
    title: "Simulaciones CFD",
    desc: "Optimización de diseño de sistemas que interactúan con fluidos: turbinas eólicas, hidráulicas, mareomotrices, embarcaciones. Traducen la visión analítica en soluciones más rápidas y eficientes.",
    kw: ["Fluidodinámica", "Turbinas", "Aerodinámica", "Optimización"],
  },
  {
    num: "04",
    title: "Formulación de proyectos",
    desc: "Postulación y acompañamiento a fondos concursables con foco energético y ambiental: Corfo, ANID, GORE y otros. Desde la idea hasta la presentación y ejecución.",
    kw: ["ANID", "Corfo", "GORE", "Fondos públicos"],
  },
  {
    num: "05",
    title: "Huella de carbono",
    desc: "Cuantificación de emisiones de gases de efecto invernadero para empresas y municipalidades, orientada a la obtención de sellos de calidad del Ministerio del Medio Ambiente.",
    kw: ["GEI", "Sello MMA", "Municipios", "Empresas"],
  },
  {
    num: "06",
    title: "Charlas y difusión",
    desc: "Eficiencia energética, cambio climático y difusión de estudios para comunidades, instituciones y medios regionales. Presentaciones ante consejos regionales y juntas de vecinos.",
    kw: ["Comunidades", "Instituciones", "Educación", "Radio y TV"],
  },
];

const TECH_TAGS = [
  "Fusion 360", "AutoCAD", "Homer Pro", "CFD", "Inventor",
  "Impresión 3D", "Corte CNC", "Analizador Clase A", "Estaciones Meteorológicas",
];

export default function ServiciosPage() {
  const heroRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const kwRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);
  const isMobile = useIsMobile();

  // Hero animation
  useGSAP(() => {
    gsap.fromTo(heroRef.current?.querySelectorAll(".h-line") ?? [],
      { y: "108%", filter: "blur(10px)" },
      { y: "0%", filter: "blur(0px)", duration: 1.0, ease: "power3.out", stagger: 0.13, delay: 0.4 }
    );
    gsap.fromTo(heroRef.current?.querySelectorAll(".h-fade") ?? [],
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.09, delay: 1.0 }
    );
  }, { scope: heroRef });

  // Pinned scroll timeline — desktop only
  // lore/animation: no useState para el índice activo (re-render durante pin = salto visual)
  // lore/animation: anticipatePin:1 para sección oscura
  // lore/animation: invalidateOnRefresh + end como función para soporte de resize
  // lore/animation: revertOnUpdate en dependencies para cleanup al cambiar viewport
  useGSAP(() => {
    if (isMobile || !pinnedRef.current) return;

    const updateActive = (idx: number) => {
      if (idx === activeIdxRef.current && idx !== 0) return;
      activeIdxRef.current = idx;

      const service = SERVICES[idx];
      if (!service) return;

      // Fade out current content
      gsap.to([titleRef.current, descRef.current, kwRef.current], {
        opacity: 0, y: -10, duration: 0.18, ease: "power2.in",
        onComplete: () => {
          // Swap text content
          if (numberRef.current) numberRef.current.textContent = service.num;
          if (titleRef.current) titleRef.current.textContent = service.title;
          if (descRef.current) descRef.current.textContent = service.desc;

          // Swap keyword chips
          if (kwRef.current) {
            kwRef.current.innerHTML = service.kw
              .map(k => `<span class="kw-chip">${k}</span>`)
              .join("");
          }

          // Fade in new content
          gsap.fromTo(
            [titleRef.current, descRef.current, kwRef.current],
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.32, ease: "power2.out", stagger: 0.06 }
          );
        }
      });

      // Update dots — direct DOM manipulation, no setState
      const dots = dotsRef.current?.querySelectorAll<HTMLElement>(".s-dot");
      dots?.forEach((dot, i) => {
        dot.style.opacity = i === idx ? "1" : "0.2";
        dot.style.transform = `scaleY(${i === idx ? "3.5" : "1"})`;
      });
    };

    // Initialize first service
    updateActive(0);

    ScrollTrigger.create({
      trigger: pinnedRef.current,
      pin: true,
      anticipatePin: 1,                                           // lore: flash blanco en sección oscura
      start: "top top",
      end: () => `+=${SERVICES.length * window.innerHeight}`,   // lore: función para resize
      invalidateOnRefresh: true,                                  // lore: recalcula en resize
      onUpdate: (self) => {
        const newIdx = Math.min(
          Math.floor(self.progress * SERVICES.length),
          SERVICES.length - 1
        );
        if (newIdx !== activeIdxRef.current) updateActive(newIdx);
      },
    });
  }, { scope: pinnedRef, dependencies: [isMobile], revertOnUpdate: true });

  return (
    <>
      <Header />
      <main>

        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative bg-orange min-h-[100svh] flex flex-col justify-end pb-16 md:pb-24 overflow-hidden">
          <CircuitLines color="#B12C00" opacity={0.08} animate={false} strokeWidth={1.5} />

          {/* Decorative "06" behind content */}
          <div
            className="absolute top-0 right-0 font-display font-extralight leading-none select-none pointer-events-none"
            style={{ fontSize: "clamp(14rem, 38vw, 36rem)", color: "#B12C0010", lineHeight: 0.85 }}
            aria-hidden="true"
          >
            06
          </div>

          <div className="relative z-10 px-6 md:px-14 lg:px-24 pt-36">
            <p className="h-fade text-red-deep/60 text-[11px] tracking-[0.28em] uppercase font-body mb-10" style={{ opacity: 0 }}>
              Servicios · Consultoría · Ingeniería · I+D
            </p>
            <h1 style={{ fontSize: "clamp(3.8rem, 9.5vw, 9rem)" }} className="font-display font-extralight text-teal leading-[0.98] tracking-[-0.03em] mb-12">
              <span className="block overflow-hidden pb-[0.05em]">
                <span className="h-line block" style={{ transform: "translateY(108%)", filter: "blur(10px)" }}>Lo que</span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <span className="h-line block" style={{ transform: "translateY(108%)", filter: "blur(10px)" }}>sabemos</span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <span className="h-line block text-cream" style={{ transform: "translateY(108%)", filter: "blur(10px)" }}>hacer</span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <span className="h-line block text-teal/40" style={{ transform: "translateY(108%)", filter: "blur(10px)" }}>bien.</span>
              </span>
            </h1>

            <div className="h-fade flex flex-col sm:flex-row justify-between items-start gap-6 border-t border-teal/20 pt-8" style={{ opacity: 0 }}>
              <p className="text-teal/70 font-body text-sm max-w-sm leading-relaxed">
                Seis líneas de servicio que van desde la consultoría estratégica hasta el prototipado físico y la difusión tecnológica.
              </p>
              <span className="font-display font-light text-teal/30 text-6xl leading-none">06</span>
            </div>
          </div>
        </section>

        {/* ─── PINNED SCROLL EXPERIENCE (desktop) ──────────────── */}
        <div ref={pinnedRef} className="bg-green-dark relative overflow-hidden" style={{ minHeight: "100svh" }}>
          {/* Subtle dot bg */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(#F7DFBA 1px, transparent 1px)", backgroundSize: "28px 28px" }}
            aria-hidden="true"
          />

          <div className="relative z-10 h-[100svh] flex items-center px-6 md:px-14 lg:px-24">
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 md:gap-20 w-full items-center">

              {/* Left — giant number */}
              <div className="flex items-center justify-center md:justify-start">
                <span
                  ref={numberRef}
                  className="font-display font-extralight leading-none select-none text-cream/[0.06]"
                  style={{ fontSize: "clamp(8rem, 22vw, 20rem)" }}
                >
                  01
                </span>
              </div>

              {/* Right — service content */}
              <div>
                <p className="text-green text-[10px] tracking-[0.28em] uppercase font-body mb-6">
                  Servicio activo
                </p>
                <h2
                  ref={titleRef}
                  className="font-display font-light text-cream leading-tight tracking-[-0.02em] mb-6"
                  style={{ fontSize: "clamp(1.8rem, 3.2vw, 3rem)" }}
                >
                  {SERVICES[0].title}
                </h2>
                <p
                  ref={descRef}
                  className="text-cream/55 font-body text-sm leading-[1.85] max-w-md mb-8"
                >
                  {SERVICES[0].desc}
                </p>

                {/* Keywords */}
                <div
                  ref={kwRef}
                  className="flex flex-wrap gap-2 mb-12 [&_.kw-chip]:text-[10px] [&_.kw-chip]:tracking-wide [&_.kw-chip]:font-body [&_.kw-chip]:px-3 [&_.kw-chip]:py-1.5 [&_.kw-chip]:rounded-full [&_.kw-chip]:border [&_.kw-chip]:border-cream/15 [&_.kw-chip]:text-cream/50"
                >
                  {SERVICES[0].kw.map((k) => (
                    <span key={k} className="kw-chip">{k}</span>
                  ))}
                </div>

                {/* Dot progress — vertical pills */}
                <div ref={dotsRef} className="flex gap-2 items-center">
                  {SERVICES.map((_, i) => (
                    <div
                      key={i}
                      className="s-dot w-[3px] h-3 bg-cream rounded-full transition-all duration-400"
                      style={{ opacity: i === 0 ? 1 : 0.2, transform: i === 0 ? "scaleY(3.5)" : "scaleY(1)", transformOrigin: "center" }}
                    />
                  ))}
                  <span className="text-cream/25 font-body text-xs ml-3">
                    {SERVICES.length} servicios
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile fallback — simple list (shown when pinned scroll is disabled) */}
          {isMobile && (
            <div className="px-6 py-20 space-y-0">
              {SERVICES.map((s, i) => (
                <div key={s.num} className="border-b border-cream/10 py-8">
                  <div className="flex items-start gap-5">
                    <span className="font-display font-light text-cream/20 text-3xl w-10 flex-shrink-0">{s.num}</span>
                    <div>
                      <h3 className="font-display font-semibold text-cream text-lg mb-3 leading-snug">{s.title}</h3>
                      <p className="text-cream/55 font-body text-sm leading-[1.75]">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ─── TECH MARQUEE ─────────────────────────────────────── */}
        <section className="bg-teal py-7 overflow-hidden">
          <MarqueeStrip
            items={TECH_TAGS}
            speed={20}
            itemClassName="font-display font-light text-cream/60 text-sm tracking-widest uppercase"
          />
        </section>

        {/* ─── CTA STRIP ────────────────────────────────────────── */}
        <section className="bg-cream-light px-6 md:px-14 lg:px-24 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div>
              <p className="text-teal/50 text-[11px] tracking-[0.25em] uppercase font-body mb-4">¿Cuál necesitas?</p>
              <h2
                className="font-display font-light text-teal leading-[1.08] tracking-[-0.02em]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
              >
                Cada proyecto es<br />
                <span className="text-orange">único.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contacto@enmachile.com"
                className="inline-flex items-center gap-3 bg-teal text-cream px-8 py-4 rounded-full font-body font-medium text-sm tracking-wide hover:bg-green-dark transition-all duration-300 group"
              >
                Conversemos
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <p className="text-ink/40 font-body text-xs text-center">contacto@enmachile.com</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
