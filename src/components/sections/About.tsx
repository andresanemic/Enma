"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const PILLARS = [
  {
    id: "01",
    icon: "/iconos/Solar-Energy--Streamline-Flex.png",
    title: "Energía",
    desc: "Autogeneración renovable: microhidro, solar, eólica y geotermia, en diseño y planificación.",
  },
  {
    id: "02",
    icon: "/iconos/Recycle-1--Streamline-Flex.png",
    title: "Manufactura",
    desc: "Upcycling y manufactura avanzada con prototipado en impresión 3D y corte CNC.",
  },
  {
    id: "03",
    icon: "/iconos/Carbon--Streamline-Flex.png",
    title: "Cambio Climático",
    desc: "Cuantificación de huella de carbono y mitigación de impacto ambiental.",
  },
];

const META = [
  { label: "Fundación", value: "2022" },
  { label: "Base", value: "Aysén · Patagonia" },
  { label: "Enfoque", value: "ENergía + MAnufactura" },
];

const CARD_META = [
  { label: "Fundación", value: "2022" },
  { label: "Región", value: "Aysén" },
  { label: "Empresa", value: "EN+MA" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const leftFadesRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const trigger = { trigger: sectionRef.current, start: "top 88%" };

    // Title clip reveal
    gsap.fromTo(
      titleWrapRef.current?.querySelectorAll(".reveal-line") ?? [],
      { y: "108%", filter: "blur(8px)" },
      {
        y: "0%", filter: "blur(0px)",
        duration: 1.0, ease: "power3.out", stagger: 0.15,
        scrollTrigger: trigger,
      }
    );

    // Left column body + meta stagger
    gsap.fromTo(
      leftFadesRef.current?.querySelectorAll(".fade-item") ?? [],
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.75, ease: "power2.out", stagger: 0.12, delay: 0.4,
        scrollTrigger: trigger,
      }
    );

    // Right card slides in from right
    gsap.fromTo(
      visualRef.current,
      { opacity: 0, x: 28 },
      {
        opacity: 1, x: 0,
        duration: 0.9, ease: "power2.out", delay: 0.2,
        scrollTrigger: trigger,
      }
    );

    // Pillars stagger
    gsap.fromTo(
      pillarsRef.current?.querySelectorAll(".pillar-card") ?? [],
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0,
        duration: 0.7, ease: "power2.out", stagger: 0.12, delay: 0.5,
        scrollTrigger: trigger,
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="bg-cream-light relative overflow-hidden"
    >
      <div className="relative z-10 px-6 md:px-14 lg:px-24 py-24 md:py-32">

        {/* ── Split layout: text left + card right ── */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14 lg:gap-20 items-center mb-20">

          {/* LEFT — story */}
          <div>
            <p className="text-teal text-[11px] tracking-[0.25em] uppercase font-body mb-8">
              Quiénes somos
            </p>

            <div ref={titleWrapRef} className="mb-8" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}>
              <div className="overflow-hidden pb-[0.06em]">
                <span
                  className="reveal-line block font-display font-light text-teal leading-[1.08] tracking-[-0.02em]"
                  style={{ transform: "translateY(108%)", filter: "blur(8px)" }}
                >
                  Una empresa de base
                </span>
              </div>
              <div className="overflow-hidden pb-[0.06em]">
                <span
                  className="reveal-line block font-display font-light text-teal leading-[1.08] tracking-[-0.02em]"
                  style={{ transform: "translateY(108%)", filter: "blur(8px)" }}
                >
                  científico-tecnológica
                </span>
              </div>
              <div className="overflow-hidden pb-[0.06em]">
                <span
                  className="reveal-line block font-display font-light leading-[1.08] tracking-[-0.02em]"
                  style={{ transform: "translateY(108%)", filter: "blur(8px)", color: "#3E7C6C" }}
                >
                  nacida en la Patagonia
                </span>
              </div>
            </div>

            <div ref={leftFadesRef}>
              <p
                className="fade-item text-ink/65 font-body font-light leading-[1.8] text-[0.95rem] mb-5 max-w-lg"
                style={{ opacity: 0 }}
              >
                Enma diseña soluciones sustentables con foco en energía y manufactura. Su nombre
                viene de <strong className="font-medium text-teal">EN</strong>ergía y{" "}
                <strong className="font-medium text-teal">MA</strong>nufactura: resolver, con
                ingeniería a la medida, los problemas de quienes viven y producen en Aysén.
              </p>

              <p
                className="fade-item text-ink/50 font-body font-light leading-[1.8] text-[0.88rem] mb-10 max-w-lg"
                style={{ opacity: 0 }}
              >
                Operamos desde la Patagonia porque esa es nuestra ventaja competitiva. Entendemos
                la logística, los costos energéticos y la idiosincrasia regional que hacen fracasar
                los proyectos que no los consideran desde el inicio.
              </p>

              {/* Meta */}
              <div
                className="fade-item flex flex-wrap gap-x-8 gap-y-4 border-t border-teal/10 pt-7"
                style={{ opacity: 0 }}
              >
                {META.map((item) => (
                  <div key={item.label}>
                    <p className="text-teal/40 text-[10px] uppercase tracking-[0.18em] font-body mb-1">
                      {item.label}
                    </p>
                    <p className="text-teal font-display font-light text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — editorial card */}
          <div ref={visualRef} style={{ opacity: 0 }}>
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ background: "linear-gradient(145deg, #304B3D, #205358)" }}
            >
              {/* Organic ring pattern */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 360"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
                fill="none"
              >
                {[60, 110, 165, 220, 275, 330].map((r, i) => (
                  <circle
                    key={i}
                    cx="390"
                    cy="360"
                    r={r}
                    stroke="#3E7C6C"
                    strokeWidth="1"
                    opacity={0.18 - i * 0.02}
                  />
                ))}
              </svg>

              {/* Content */}
              <div className="relative z-10 p-8 lg:p-10">
                <p className="text-cream/25 font-body text-[10px] tracking-[0.22em] uppercase mb-8">
                  Desde la Patagonia
                </p>

                <blockquote className="font-display font-light text-cream leading-[1.25] tracking-[-0.01em] mb-3" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)" }}>
                  "No sabía que esto se hacía acá."
                </blockquote>
                <p className="text-green text-sm font-body mb-10">
                  La reacción que buscamos.
                </p>

                <div className="border-t border-cream/10 pt-6 grid grid-cols-3 gap-3">
                  {CARD_META.map((item) => (
                    <div key={item.label}>
                      <p className="text-cream/25 text-[9px] uppercase tracking-[0.2em] font-body mb-1">
                        {item.label}
                      </p>
                      <p className="text-cream/80 font-display font-light text-[0.8rem]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3 pillars — full width ── */}
        <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {PILLARS.map((p) => (
            <div
              key={p.id}
              className="pillar-card border border-teal/15 rounded-2xl p-6 bg-white/40 backdrop-blur-sm card-hover"
              style={{ opacity: 0 }}
            >
              <Image
                src={p.icon}
                alt={p.title}
                width={32}
                height={32}
                className="mb-4 opacity-70"
              />
              <h3 className="font-display font-semibold text-teal text-sm tracking-wide uppercase mb-2">
                {p.title}
              </h3>
              <p className="text-ink/60 font-body text-sm leading-[1.7]">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p className="text-teal/40 font-body text-sm tracking-wide mt-10 border-t border-teal/10 pt-8">
          Servicios para el desarrollo sustentable, con una base tecnológica sólida orientada a la innovación
        </p>
      </div>
    </section>
  );
}
