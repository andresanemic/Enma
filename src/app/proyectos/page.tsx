"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CircuitLines from "@/components/ui/CircuitLines";
import MarqueeStrip from "@/components/ui/MarqueeStrip";

const TAGS = [
  "UpCycling", "Turbina Eólica", "Túnel de Viento", "ANID",
  "Simulaciones CFD", "NetBilling", "Manufactura", "Prototipado",
  "Puerto Cisnes", "Impresión 3D", "Aysén", "Corte CNC",
];

const PROJECTS = [
  {
    num: "01",
    tag: "Reciclaje · Puerto Cisnes",
    title: "Taller de UpCycling",
    subtitle: "para Puerto Cisnes",
    year: "2022",
    bg: "bg-cream-light",
    accent: "#304B3D",
    textDark: true,
    desc: "Apoyo en emprendimiento local para el diseño, construcción y montaje de taller de reciclaje de residuos plásticos provenientes de la industria salmonera, para su revalorización en nuevos productos comerciables.",
    details: ["Diseño de taller", "Construcción y montaje", "Residuos salmoneros", "Productos comerciables"],
    placeholderGrad: "linear-gradient(135deg, #304B3D20, #3E7C6C18)",
    dotColor: "#304B3D",
  },
  {
    num: "02",
    tag: "Financiado por ANID · Turbina Eólica",
    title: "Prototipo de Turbina",
    subtitle: "Eólica de Baja Escala",
    year: "2023",
    bg: "bg-orange",
    accent: "#205358",
    textDark: false,
    featured: true,
    desc: "Diseño y ensayos de nueva propuesta de turbina eólica para condiciones no convencionales: vientos excesivos, ráfagas súbitas y alta turbulencia. Pensada para instalarse en granjas de muchas unidades con foco en NetBilling.",
    details: ["Diseño innovador", "Vientos extremos", "Baja escala", "NetBilling on-grid"],
    placeholderGrad: "linear-gradient(135deg, #20535830, #304B3D25)",
    dotColor: "#205358",
  },
  {
    num: "03",
    tag: "I+D · Infraestructura",
    title: "Diseño y Montaje de",
    subtitle: "Túnel de Viento",
    year: "2024",
    bg: "bg-teal",
    accent: "#F7DFBA",
    textDark: false,
    desc: "Diseño y validación de túnel de viento para ensayos de prototipos, respaldado con simulaciones CFD para diseño específico de rectificadores de flujo. Complementa el servicio de simulaciones con validación física.",
    details: ["Diseño estructural", "Simulaciones CFD", "Validación física", "Rectificadores de flujo"],
    placeholderGrad: "linear-gradient(135deg, #F7DFBA12, #FEA94F10)",
    dotColor: "#F7DFBA",
  },
];

export default function ProyectosPage() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const lines = heroRef.current?.querySelectorAll(".h-line") ?? [];
    gsap.fromTo(lines,
      { y: "108%", filter: "blur(10px)" },
      { y: "0%", filter: "blur(0px)", duration: 1.1, ease: "power3.out", stagger: 0.12, delay: 0.4 }
    );
    gsap.fromTo(heroRef.current?.querySelectorAll(".h-fade") ?? [],
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.08, delay: 1.1 }
    );
  }, { scope: heroRef });

  return (
    <>
      <Header />
      <main>

        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative bg-green-dark min-h-[100svh] flex flex-col justify-end pb-16 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(#F7DFBA 1px, transparent 1px)", backgroundSize: "30px 30px" }}
            aria-hidden="true"
          />

          {/* Giant project count — decorative */}
          <div className="absolute top-24 right-6 md:right-14 lg:right-24 font-display font-extralight leading-none select-none pointer-events-none"
            style={{ fontSize: "clamp(8rem, 20vw, 18rem)", color: "#F7DFBA08" }}
            aria-hidden="true"
          >
            03
          </div>

          <div className="relative z-10 px-6 md:px-14 lg:px-24 pt-36">
            <p className="h-fade text-green text-[11px] tracking-[0.28em] uppercase font-body mb-10" style={{ opacity: 0 }}>
              Proyectos destacados · Ingeniería aplicada · Aysén
            </p>

            <h1 style={{ fontSize: "clamp(3.8rem, 9vw, 8.5rem)" }} className="font-display font-extralight text-cream leading-[0.98] tracking-[-0.03em] mb-12">
              <span className="block overflow-hidden pb-[0.05em]">
                <span className="h-line block" style={{ transform: "translateY(108%)", filter: "blur(10px)" }}>Casos de</span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <span className="h-line block" style={{ transform: "translateY(108%)", filter: "blur(10px)" }}>ingeniería</span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <span className="h-line block text-orange" style={{ transform: "translateY(108%)", filter: "blur(10px)" }}>desde el</span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <span className="h-line block text-orange/60" style={{ transform: "translateY(108%)", filter: "blur(10px)" }}>territorio.</span>
              </span>
            </h1>

            <div className="h-fade border-t border-cream/10 pt-8 flex flex-col sm:flex-row justify-between gap-4" style={{ opacity: 0 }}>
              <p className="text-cream/45 font-body text-sm max-w-sm leading-relaxed">
                Tres proyectos que integran las capacidades de Enma: simulaciones CFD, prototipado físico y formulación de instrumentos públicos.
              </p>
              <div className="flex gap-6">
                {["UpCycling", "ANID · Turbina", "Túnel de Viento"].map((t, i) => (
                  <div key={t} className="text-right">
                    <p className="font-display text-2xl font-light text-cream/30">0{i + 1}</p>
                    <p className="text-cream/35 font-body text-[10px] tracking-wide">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── MARQUEE ──────────────────────────────────────────── */}
        <section className="bg-ink py-6 overflow-hidden">
          <MarqueeStrip
            items={TAGS}
            speed={22}
            itemClassName="font-display font-light text-cream/60 text-sm tracking-widest uppercase"
          />
        </section>

        {/* ─── PROJECTS ─────────────────────────────────────────── */}
        {PROJECTS.map((p, idx) => (
          <ProjectSection key={p.num} project={p} index={idx} />
        ))}

        {/* ─── CAPABILITIES STRIP ───────────────────────────────── */}
        <section className="bg-cream-light py-20 md:py-28 px-6 md:px-14 lg:px-24">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "Proyectos", value: "03" },
              { label: "Líneas tecnológicas", value: "06" },
              { label: "Fondos públicos levantados", value: "ANID" },
              { label: "Ubicación", value: "Aysén" },
            ].map((stat) => (
              <div key={stat.label} className="border-t-2 border-teal/20 pt-5">
                <p className="font-display font-light text-teal text-4xl mb-2 tracking-tight">{stat.value}</p>
                <p className="font-body text-ink/50 text-xs tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

// ─── Project section component ───────────────────────────────────────────────
function ProjectSection({ project: p, index }: { project: typeof PROJECTS[number]; index: number }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const trigger = { trigger: ref.current, start: "top 80%" };
    gsap.fromTo(ref.current?.querySelectorAll(".p-reveal") ?? [],
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.1, scrollTrigger: trigger }
    );
  }, { scope: ref });

  const isReversed = index % 2 === 1;
  const textColor = p.textDark ? "text-ink" : "text-cream";
  const subtextColor = p.textDark ? "text-ink/55" : "text-cream/55";
  const tagColor = p.textDark ? "text-ink/40" : "text-cream/40";

  return (
    <section ref={ref} className={`${p.bg} relative overflow-hidden`}>
      {/* Featured treatment for ANID project */}
      {p.featured && (
        <div className="absolute top-8 left-8 md:left-14 lg:left-24 z-20">
          <span className="inline-flex items-center gap-2 bg-teal text-cream text-[10px] tracking-widest uppercase px-4 py-2 rounded-full font-body">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" />
            Financiado por ANID
          </span>
        </div>
      )}

      <div className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"}`}>

        {/* Visual placeholder */}
        <div className="md:w-[45%] min-h-[280px] md:min-h-[520px] relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0" style={{ background: p.placeholderGrad }} />
          {/* Dot pattern */}
          <div className="absolute inset-0"
            style={{ backgroundImage: `radial-gradient(${p.dotColor}25 1.5px, transparent 1.5px)`, backgroundSize: "20px 20px" }}
            aria-hidden="true"
          />
          {/* Giant project number */}
          <div className="absolute inset-0 flex items-end p-8">
            <span
              className="font-display font-extralight leading-none select-none"
              style={{ fontSize: "clamp(6rem, 16vw, 14rem)", color: p.dotColor, opacity: 0.12 }}
              aria-hidden="true"
            >
              {p.num}
            </span>
          </div>
        </div>

        {/* Text content */}
        <div className="md:w-[55%] p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center">
          <p className={`p-reveal ${tagColor} text-[10px] tracking-[0.25em] uppercase font-body mb-6`} style={{ opacity: 0 }}>
            {p.tag} · {p.year}
          </p>
          <h2
            className={`p-reveal font-display font-light ${textColor} leading-[1.08] tracking-[-0.02em] mb-6`}
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", opacity: 0 }}
          >
            {p.title}<br />
            <span style={{ color: p.featured ? p.dotColor : p.accent }}>{p.subtitle}</span>
          </h2>
          <p className={`p-reveal ${subtextColor} font-body text-sm leading-[1.8] mb-8 max-w-lg`} style={{ opacity: 0 }}>
            {p.desc}
          </p>
          {/* Detail pills */}
          <div className="p-reveal flex flex-wrap gap-2" style={{ opacity: 0 }}>
            {p.details.map((d) => (
              <span
                key={d}
                className="font-body text-[10px] tracking-wide px-4 py-1.5 rounded-full border"
                style={{
                  borderColor: p.textDark ? "#20535830" : "#F7DFBA30",
                  color: p.textDark ? "#205358" : "#F7DFBA90"
                }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
