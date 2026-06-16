"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CircuitLines from "@/components/ui/CircuitLines";
import MarqueeStrip from "@/components/ui/MarqueeStrip";

const CAPABILITIES = [
  "Energía Renovable", "Simulaciones CFD", "Manufactura Avanzada",
  "Impresión 3D", "Corte CNC", "ANID", "CIEP", "NetBilling",
  "Huella de Carbono", "Túnel de Viento", "Prototipado",
];
const TERRITORY = [
  "Puerto Cisnes", "Región de Aysén", "Patagonia Chilena",
  "Sector Público", "Comunidades", "B2B", "I+D", "Sustentabilidad",
];

const VALUES = [
  { num: "01", name: "Honestidad", desc: "Decimos lo que pensamos, incluso cuando no es lo que el cliente quiere escuchar." },
  { num: "02", name: "Transparencia", desc: "Cada decisión técnica y económica se comunica con claridad desde el primer día." },
  { num: "03", name: "Templanza", desc: "La complejidad del territorio nos enseñó a mantener la calma y la precisión bajo presión." },
  { num: "04", name: "Disciplina", desc: "Los resultados emergen del método. No de la improvisación." },
];

const FOUNDERS = [
  {
    initials: "BO", name: "Bruno Ortega", role: "Socio Fundador",
    avatarBg: "#205358", avatarText: "#F7DFBA",
    desc: "Aporta la mirada de la energía renovable, eléctrica y térmica. Proyectos eólicos, solares, geotérmicos e hidráulicos. Supervisó el proyecto de calefacción con geotermia que dio origen a Enma.",
    tags: ["Energía eólica", "Geotermia", "Hidráulica", "Solar"],
  },
  {
    initials: "PC", name: "Patricio Campos", role: "Socio Fundador",
    avatarBg: "#F1541C", avatarText: "#F8EDDD",
    desc: "Diseñó e implementó el proyecto de upcycling de residuos salmoneros que originó la empresa. Lidera estudios CFD, formulación de proyectos y cuantificación de huella de carbono.",
    tags: ["CFD", "Huella de carbono", "UpCycling", "Formulación"],
  },
];

export default function NosotrosPage() {
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);

  // Hero animation
  useGSAP(() => {
    const lines = heroRef.current?.querySelectorAll(".h-line") ?? [];
    gsap.fromTo(lines,
      { y: "108%", filter: "blur(10px)" },
      { y: "0%", filter: "blur(0px)", duration: 1.1, ease: "power3.out", stagger: 0.14, delay: 0.5 }
    );
    gsap.fromTo(heroRef.current?.querySelectorAll(".h-fade") ?? [],
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.1, delay: 1.2 }
    );
  }, { scope: heroRef });

  // Story section scroll reveal
  useGSAP(() => {
    const trigger = { trigger: storyRef.current, start: "top 80%" };
    gsap.fromTo(storyRef.current?.querySelectorAll(".s-reveal") ?? [],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.1, scrollTrigger: trigger }
    );
  }, { scope: storyRef });

  // Values scroll reveal
  useGSAP(() => {
    const trigger = { trigger: valuesRef.current, start: "top 80%" };
    gsap.fromTo(valuesRef.current?.querySelectorAll(".v-row") ?? [],
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", stagger: 0.1, scrollTrigger: trigger }
    );
  }, { scope: valuesRef });

  return (
    <>
      <Header />
      <main>

        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative bg-teal min-h-[100svh] flex flex-col justify-end overflow-hidden pb-16 md:pb-24">
          <CircuitLines opacity={0.07} color="white" animate strokeWidth={1.5} />
          <div className="absolute inset-0 bg-gradient-to-b from-teal/60 via-transparent to-teal/40 pointer-events-none" />

          <div className="relative z-10 px-6 md:px-14 lg:px-24 pt-36">
            {/* Eyebrow */}
            <p className="h-fade text-orange text-[11px] tracking-[0.28em] uppercase font-body mb-10" style={{ opacity: 0 }}>
              Quiénes somos · Fundada 2022 · Puerto Cisnes, Aysén
            </p>

            {/* Massive headline */}
            <h1 style={{ fontSize: "clamp(3.8rem, 9.5vw, 9rem)" }} className="font-display font-extralight text-cream leading-[0.98] tracking-[-0.03em] mb-0">
              <span className="block overflow-hidden pb-[0.05em]">
                <span className="h-line block" style={{ transform: "translateY(108%)", filter: "blur(10px)" }}>Una empresa</span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <span className="h-line block" style={{ transform: "translateY(108%)", filter: "blur(10px)" }}>de base</span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <span className="h-line block text-cream/50" style={{ transform: "translateY(108%)", filter: "blur(10px)" }}>científico-</span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <span className="h-line block" style={{ transform: "translateY(108%)", filter: "blur(10px)" }}>
                  tecnológica <em className="not-italic text-orange">en</em>
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <span className="h-line block text-orange" style={{ transform: "translateY(108%)", filter: "blur(10px)" }}>la Patagonia.</span>
              </span>
            </h1>

            {/* Bottom row */}
            <div className="h-fade flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mt-12 border-t border-cream/10 pt-8" style={{ opacity: 0 }}>
              <p className="text-cream/50 font-body text-sm max-w-sm leading-relaxed">
                Enma nace de la urgencia de resolver problemas reales de energía en un territorio complejo, con ingeniería a la medida.
              </p>
              <div className="flex gap-8 text-right">
                <div>
                  <p className="font-display text-3xl font-light text-cream">02</p>
                  <p className="text-cream/40 font-body text-xs tracking-widest uppercase">fundadores</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-light text-orange">2022</p>
                  <p className="text-cream/40 font-body text-xs tracking-widest uppercase">fundación</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-light text-cream">01</p>
                  <p className="text-cream/40 font-body text-xs tracking-widest uppercase">territorio</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── STORY / MANIFESTO ────────────────────────────────── */}
        <section ref={storyRef} className="bg-cream-light relative overflow-hidden">
          <div className="px-6 md:px-14 lg:px-24 py-24 md:py-36">
            <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-start">

              {/* Left — large editorial quote */}
              <div>
                <p className="text-teal/40 text-[11px] tracking-[0.25em] uppercase font-body mb-10 s-reveal" style={{ opacity: 0 }}>
                  La historia
                </p>
                <blockquote
                  className="font-display font-light text-teal leading-[1.15] tracking-[-0.02em] mb-10 s-reveal"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", opacity: 0 }}
                >
                  "Lo que distingue a Enma no es solo su conocimiento técnico, sino el lugar desde el que lo ejerce."
                </blockquote>
                <p className="text-ink/60 font-body leading-[1.8] max-w-xl s-reveal" style={{ opacity: 0, fontSize: "clamp(0.9rem, 1.4vw, 1rem)" }}>
                  Operar en Aysén —una región aislada, de baja densidad, con altos costos logísticos y energéticos— obliga a entender contextos complejos. Esa comprensión del territorio, sumada a la capacidad de modelar y validar soluciones con herramientas computacionales avanzadas, es el corazón de la propuesta de Enma.
                </p>
              </div>

              {/* Right — bento stats + origin */}
              <div className="flex flex-col gap-4">
                {/* Founding card */}
                <div className="s-reveal bg-teal text-cream rounded-2xl p-7" style={{ opacity: 0 }}>
                  <p className="text-cream/40 text-[10px] tracking-widest uppercase font-body mb-3">Origen</p>
                  <p className="font-display font-light text-5xl mb-2">2022</p>
                  <p className="font-body text-sm text-cream/70 leading-relaxed">Fundada en Puerto Cisnes, Región de Aysén, al alero de dos proyectos concretos de energía y upcycling.</p>
                </div>
                {/* Diferenciador card */}
                <div className="s-reveal bg-orange rounded-2xl p-7" style={{ opacity: 0 }}>
                  <p className="text-red-deep/60 text-[10px] tracking-widest uppercase font-body mb-3">Diferenciador clave</p>
                  <p className="font-display font-light text-teal text-2xl leading-tight">Pertenencia al territorio. Las empresas de Santiago no conocen la Patagonia.</p>
                </div>
                {/* Proyect origin */}
                <div className="s-reveal bg-cream border border-teal/10 rounded-2xl p-7" style={{ opacity: 0 }}>
                  <p className="text-teal/40 text-[10px] tracking-widest uppercase font-body mb-3">Primer proyecto</p>
                  <p className="font-body text-sm text-ink/70 leading-relaxed">Calefacción por geotermia (Bruno) + upcycling de residuos salmoneros (Patricio). Ambos en Aysén. Ambos resolviendo problemas reales.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── MARQUEE ──────────────────────────────────────────── */}
        <section className="bg-green-dark py-7 overflow-hidden">
          <MarqueeStrip
            items={CAPABILITIES}
            speed={30}
            className="mb-3"
            itemClassName="font-display font-light text-cream/70 text-sm tracking-widest uppercase"
          />
          <MarqueeStrip
            items={TERRITORY}
            reversed
            speed={24}
            itemClassName="font-body text-green text-sm tracking-[0.2em] uppercase"
          />
        </section>

        {/* ─── EQUIPO ───────────────────────────────────────────── */}
        <section className="bg-cream-light py-24 md:py-32 px-6 md:px-14 lg:px-24">
          <p className="text-teal/50 text-[11px] tracking-[0.25em] uppercase font-body mb-8">El equipo</p>
          <h2
            className="font-display font-light text-teal mb-16 tracking-[-0.02em] leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            <span className="block">Dos ingenieros,</span>
            <span className="text-orange">un territorio.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="rounded-2xl border border-teal/10 bg-white/50 backdrop-blur-sm p-8 card-hover">
                <div className="flex items-start gap-5 mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-semibold text-lg select-none flex-shrink-0"
                    style={{ background: f.avatarBg, color: f.avatarText }}
                  >
                    {f.initials}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-teal text-lg mb-1">{f.name}</h3>
                    <span className="inline-block bg-teal/10 text-teal/70 text-[10px] tracking-wider uppercase px-3 py-1 rounded-full font-body">
                      {f.role}
                    </span>
                  </div>
                </div>
                <p className="text-ink/65 font-body text-sm leading-[1.75] mb-5">{f.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {f.tags.map((tag) => (
                    <span key={tag} className="text-[10px] tracking-wide font-body px-3 py-1 rounded-full border border-teal/20 text-teal/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── VALORES ──────────────────────────────────────────── */}
        <section ref={valuesRef} className="bg-teal py-24 md:py-32 px-6 md:px-14 lg:px-24">
          <p className="text-green text-[11px] tracking-[0.25em] uppercase font-body mb-12">Nuestros valores</p>
          <div className="divide-y divide-cream/10">
            {VALUES.map((v, i) => (
              <div
                key={v.num}
                className="v-row grid md:grid-cols-[auto_1fr_2fr] gap-6 md:gap-12 py-8 md:py-10 items-start group cursor-default"
                style={{ opacity: 0 }}
              >
                <span className="font-display font-light text-cream/20 text-4xl leading-none w-12">{v.num}</span>
                <h3
                  className="font-display font-light text-cream leading-none tracking-[-0.02em] group-hover:text-orange transition-colors duration-300"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                >
                  {v.name}
                </h3>
                <p className="text-cream/45 font-body text-sm leading-[1.75] max-w-md pt-1">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
