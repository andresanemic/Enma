"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Image from "next/image";

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

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const stripsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // lore/animation: triggers entre top 88–95% para móvil y desktop
    const trigger = { trigger: sectionRef.current, start: "top 88%" };

    gsap.fromTo(
      stripsRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 1.0, ease: "power2.out", scrollTrigger: trigger }
    );

    gsap.fromTo(
      titleWrapRef.current?.querySelectorAll(".reveal-line") ?? [],
      { y: "108%", filter: "blur(8px)" },
      {
        y: "0%",
        filter: "blur(0px)",
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: trigger,
      }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.4, scrollTrigger: trigger }
    );

    gsap.fromTo(
      pillarsRef.current?.querySelectorAll(".pillar-card") ?? [],
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
        delay: 0.5,
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
      {/* Decorative vertical strips — inspired by brochure p.1 */}
      <div
        ref={stripsRef}
        style={{ opacity: 0 }}
        className="absolute top-0 right-0 h-full w-[38%] hidden lg:flex pointer-events-none"
        aria-hidden="true"
      >
        <div className="flex h-full w-full">
          <div className="flex-1 bg-green/20" style={{ backgroundImage: "linear-gradient(180deg, #3E7C6C33 0%, #20535840 100%)" }} />
          <div className="flex-1 bg-teal/15" />
          <div className="flex-1 bg-orange/15" />
          <div className="flex-1 bg-green-dark/20" />
        </div>
        {/* Soft edge fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream-light to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-14 lg:px-24 py-24 md:py-32">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <p className="text-teal text-[11px] tracking-[0.25em] uppercase font-body mb-8">
            Quiénes somos
          </p>

          {/* Title — clip reveal */}
          <div ref={titleWrapRef} className="mb-8" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}>
            <div className="overflow-hidden pb-[0.06em]">
              <span
                className="reveal-line block font-display font-light text-teal leading-[1.08] tracking-[-0.02em]"
                style={{ transform: "translateY(108%)", filter: "blur(8px)" }}
              >
                Una empresa de Base
              </span>
            </div>
            <div className="overflow-hidden pb-[0.06em]">
              <span
                className="reveal-line block font-display font-light text-teal leading-[1.08] tracking-[-0.02em]"
                style={{ transform: "translateY(108%)", filter: "blur(8px)" }}
              >
                Científico-Tecnológica
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

          <p
            ref={textRef}
            style={{ opacity: 0, fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)" }}
            className="text-ink/70 font-body font-light leading-[1.8] max-w-xl mb-16"
          >
            Enma diseña soluciones sustentables con foco en energía y manufactura. Su nombre
            viene de <strong className="font-medium text-teal">EN</strong>ergía y{" "}
            <strong className="font-medium text-teal">MA</strong>nufactura: resolver, con
            ingeniería a la medida, los problemas de quienes viven y producen en la región de Aysén.
          </p>

          {/* Pillars */}
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

          {/* Bottom tagline */}
          <p className="text-teal/50 font-body text-sm tracking-wide mt-10 border-t border-teal/10 pt-8">
            Servicios para el desarrollo sustentable, con una base tecnológica sólida orientada a la innovación
          </p>
        </div>
      </div>
    </section>
  );
}
