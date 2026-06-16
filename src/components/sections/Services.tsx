"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const SERVICES = [
  {
    num: "01", title: "Consultoría y estudios energéticos",
    desc: "Estudios de soluciones energéticas para empresas y sector público.",
    extended: "Integramos variables geográficas, demográficas y técnicas propias de la Patagonia para entregar informes de alto valor.",
    bullets: ["Evaluación de recursos renovables", "Estudios de prefactibilidad", "Diagnósticos en terreno"],
    bg: "linear-gradient(150deg,#1a3a2e,#2d5c47)",
  },
  {
    num: "02", title: "Formulación y acompañamiento",
    desc: "Formulamos proyectos con fondos Corfo, ANID y GORE.",
    extended: "Acompañamos al cliente desde la idea hasta la ejecución, maximizando las posibilidades de aprobación.",
    bullets: ["Postulación a fondos concursables", "Acompañamiento desde la idea", "Gestión y ejecución"],
    bg: "linear-gradient(150deg,#1e3d35,#305040)",
  },
  {
    num: "03", title: "Simulaciones CFD",
    desc: "Optimización de sistemas fluidodinámicos: turbinas y embarcaciones.",
    extended: "Modelos computacionales verificados que reducen tiempos de diseño y costos de prototipado significativamente.",
    bullets: ["Turbinas eólicas e hidráulicas", "Diseño más rápido y eficiente", "Reducción de costos de prototipado"],
    bg: "linear-gradient(150deg,#1c3830,#284a3a)",
  },
  {
    num: "04", title: "Ensayos en túnel de viento",
    desc: "Validación física de diseños aerodinámicos en nuestro túnel de viento.",
    extended: "Complementa las simulaciones CFD con resultados reproducibles y base técnica para patentamiento.",
    bullets: ["Prototipado y ensayos reales", "Resultados reproducibles", "Base para patentamiento"],
    bg: "linear-gradient(150deg,#1a3530,#2a4a3c)",
  },
  {
    num: "05", title: "Huella de carbono",
    desc: "Cuantificación de emisiones GEI para empresas y municipios.",
    extended: "Reportes auditables conducentes a los sellos de calidad del Ministerio del Medio Ambiente.",
    bullets: ["Alcances 1, 2 y 3", "Reportes auditables", "Sellos de calidad MMA"],
    bg: "linear-gradient(150deg,#1e3a2e,#304838)",
  },
  {
    num: "06", title: "Charlas y difusión",
    desc: "Eficiencia energética y cambio climático para comunidades e instituciones.",
    extended: "Más de 10 años de experiencia en comunicación técnica accesible para audiencias no especializadas.",
    bullets: ["Talleres en la región", "Presentaciones ante consejos", "Entrevistas radiales y televisivas"],
    bg: "linear-gradient(150deg,#1c3830,#2c4a3a)",
  },
];

export const CARD_COMPRESSED = 300;
export const CARD_EXPANDED   = 600;
export const CARD_GAP        = 12;
const CARD_HEIGHT  = 520;
const TOTAL_SCROLL = 900;

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ── Mobile: stagger entrance ──────────────────────────────────────────────
    mm.add("(max-width: 1023px)", () => {
      const section     = sectionRef.current!;
      const mobileCards = gsap.utils.toArray<HTMLElement>("[data-mobile-card]", section);

      gsap.fromTo(mobileCards,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: "top 78%" },
        }
      );
    });

    // ── Desktop: scroll-driven horizontal cards ───────────────────────────────
    mm.add("(min-width: 1024px)", () => {
      const section = sectionRef.current!;
      const track   = trackRef.current!;
      const cards   = gsap.utils.toArray<HTMLElement>("[data-service-card]", section);
      const imgs    = cards.map(c => c.querySelector<HTMLElement>("[data-card-image]")!);
      const exts    = cards.map(c => c.querySelector<HTMLElement>("[data-card-extended]")!);

      const C = CARD_COMPRESSED, E = CARD_EXPANDED, G = CARD_GAP;

      gsap.set(track, { position: "relative", minHeight: CARD_HEIGHT });
      gsap.set(cards, { position: "absolute", top: 0, height: CARD_HEIGHT });

      const trackW  = track.offsetWidth;
      // Posición izquierda del grupo de 3 cards alineadas a la derecha.
      // Math.max(0, ...) para pantallas estrechas donde las 3 cards no caben.
      const activeX = Math.max(0, trackW - 3 * C - 2 * G);
      // Off-screen a la derecha: misma distancia de viaje (E+G) que las otras cards durante exit.
      const offX    = activeX + 2 * (C + G) + (E + G);

      cards.forEach((card, i) =>
        gsap.set(card, { x: i < 3 ? activeX + i * (C + G) : offX })
      );

      const tl = gsap.timeline({ defaults: { ease: "none" } });

      for (let i = 0; i < 6; i++) {
        // ── Expansión (hacia la derecha) ─────────────────────────────
        tl.fromTo(cards[i],
          { width: C }, { width: E, duration: 1 }
        )
        .fromTo(imgs[i],
          { opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.8 }, "<"
        )
        .fromTo(exts[i],
          { opacity: 0 }, { opacity: 1, duration: 0.5 }, "<0.3"
        );

        // Cards vecinas se desplazan D px a la derecha manteniendo gap G
        if (i + 1 < 6) tl.to(cards[i + 1], { x: activeX + E + G,         duration: 1 }, "<");
        if (i + 2 < 6) tl.to(cards[i + 2], { x: activeX + C + 2 * G + E, duration: 1 }, "<");

        // ── Salida izquierda ──────────────────────────────────────────
        tl.to(cards[i], { x: -(E + G), duration: 0.5, ease: "power2.inOut" });

        // Todas las cards restantes se desplazan E+G a la izquierda (velocidad consistente)
        if (i + 1 < 6) tl.to(cards[i + 1], { x: activeX,             duration: 0.5, ease: "power2.inOut" }, "<");
        if (i + 2 < 6) tl.to(cards[i + 2], { x: activeX + (C + G),   duration: 0.5, ease: "power2.inOut" }, "<");
        if (i + 3 < 6) tl.to(cards[i + 3], { x: activeX + 2 * (C + G), duration: 0.5, ease: "power2.inOut" }, "<");
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${TOTAL_SCROLL}%`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        animation: tl,
        invalidateOnRefresh: true,
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="servicios" className="bg-green-dark overflow-hidden">
      <div className="px-6 md:px-14 lg:px-24 pt-24 pb-6">

        {/* Header — dos columnas */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          <div>
            <p className="text-green text-[11px] tracking-[0.25em] uppercase font-body mb-6">
              Nuestros servicios
            </p>
            <h2 className="font-display font-light text-cream leading-[1.05] tracking-[-0.02em]"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              Qué{" "}<span style={{ color: "#FEA94F" }}>ofrecemos</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-cream/50 font-body text-sm leading-relaxed max-w-sm">
              Desde la consultoría hasta el prototipado físico, acompañamos cada etapa
              del proyecto energético y ambiental en la Patagonia chilena.
            </p>
          </div>
        </div>

        {/* Mobile / tablet — cards verticales con stagger entrance */}
        <div className="lg:hidden flex flex-col gap-4 pb-6">
          {SERVICES.map((s) => (
            <div key={s.num} data-mobile-card className="rounded-2xl overflow-hidden"
                 style={{ opacity: 0, transform: "translateY(24px)" }}>
              <div className="bg-cream-light/[0.07] border border-cream/[0.09] rounded-2xl p-6">
                <span className="font-body text-cream/30 text-[0.65rem] tracking-[0.22em] uppercase block mb-5">
                  {s.num}
                </span>
                <h3 className="font-display font-light text-cream leading-[1.08] tracking-[-0.02em] mb-2"
                    style={{ fontSize: "clamp(1.2rem, 5vw, 1.5rem)" }}>
                  {s.title}
                </h3>
                <p className="text-cream/45 font-body text-sm leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-2">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="text-green text-sm font-body flex items-start gap-2">
                      <span className="mt-[0.4em] w-1 h-1 rounded-full bg-green flex-shrink-0" />{b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop — scroll-driven horizontal track (GSAP) */}
        <div ref={trackRef} className="hidden lg:flex gap-3 overflow-hidden">
          {SERVICES.map((s) => (
            <div key={s.num} data-service-card
                 className="flex-shrink-0 overflow-hidden rounded-2xl"
                 style={{ width: CARD_COMPRESSED, height: CARD_HEIGHT }}>

              {/* Inner: siempre al ancho expandido completo */}
              <div className="flex" style={{ width: CARD_EXPANDED, height: "100%" }}>

                {/* Zona izquierda: texto comprimido + imagen */}
                <div className="relative flex flex-col justify-between p-8 flex-shrink-0
                               bg-cream-light/[0.07] border border-cream/[0.09] rounded-2xl"
                     style={{ width: CARD_COMPRESSED }}>

                  {/* Imagen — GSAP la revela desde abajo con clipPath */}
                  <div data-card-image className="absolute inset-0 rounded-2xl overflow-hidden"
                       style={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}>
                    <div className="absolute inset-0" style={{ background: s.bg }} />
                  </div>

                  {/* Eyebrow */}
                  <span className="relative z-10 font-body text-cream/30 text-[0.65rem] tracking-[0.22em] uppercase">
                    {s.num}
                  </span>

                  {/* Título grande + desc corta */}
                  <div className="relative z-10">
                    <h3 className="font-display font-light text-cream leading-[1.08] tracking-[-0.02em] mb-3"
                        style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)" }}>
                      {s.title}
                    </h3>
                    <p className="text-cream/45 font-body text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>

                {/* Zona derecha: contenido extendido */}
                <div data-card-extended
                     className="flex flex-col justify-center gap-5 p-8 border-t border-r border-b
                                border-cream/[0.08] rounded-r-2xl bg-cream-light/[0.04]"
                     style={{ opacity: 0, flex: 1 }}>
                  <p className="text-cream/60 font-body text-sm leading-relaxed">{s.extended}</p>
                  <ul className="space-y-2.5">
                    {s.bullets.map((b, i) => (
                      <li key={i} className="text-green text-sm font-body flex items-start gap-2.5">
                        <span className="mt-[0.4em] w-1 h-1 rounded-full bg-green flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
