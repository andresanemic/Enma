"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import CircuitLines from "@/components/ui/CircuitLines";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const trigger = { trigger: sectionRef.current, start: "top 85%" };

    gsap.fromTo(
      titleRef.current?.querySelectorAll(".reveal-line") ?? [],
      { y: "108%", filter: "blur(8px)" },
      {
        y: "0%", filter: "blur(0px)",
        duration: 1.0, ease: "power3.out", stagger: 0.14,
        scrollTrigger: trigger,
      }
    );

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.5, scrollTrigger: trigger }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="bg-orange relative overflow-hidden"
    >
      {/* Circuit lines in orange tone */}
      <CircuitLines
        color="#B12C00"
        opacity={0.08}
        animate={false}
        strokeWidth={1.5}
      />

      {/* Dark vignette bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-orange-dark/20 to-transparent pointer-events-none" />

      <div className="relative z-10 px-6 md:px-14 lg:px-24 py-24 md:py-36">
        <div className="max-w-4xl mx-auto text-center">

          {/* Logo */}
          <div className="mb-12 flex justify-center">
            <Image
              src="/logos/logo-blanco.webp"
              alt="Enma"
              width={100}
              height={32}
              className="h-8 w-auto opacity-80"
            />
          </div>

          {/* Eyebrow */}
          <p className="text-red-deep/70 text-[11px] tracking-[0.28em] uppercase font-body mb-8">
            ¿Tienes un proyecto?
          </p>

          {/* Title */}
          <div ref={titleRef} className="mb-10" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            <div className="overflow-hidden pb-[0.06em]">
              <span
                className="reveal-line block font-display font-light text-cream leading-[1.05] tracking-[-0.025em]"
                style={{ transform: "translateY(108%)", filter: "blur(8px)" }}
              >
                Hablemos de
              </span>
            </div>
            <div className="overflow-hidden pb-[0.06em]">
              <span
                className="reveal-line block font-display font-light text-teal leading-[1.05] tracking-[-0.025em]"
                style={{ transform: "translateY(108%)", filter: "blur(8px)" }}
              >
                tu proyecto
              </span>
            </div>
          </div>

          <p className="text-teal/70 font-body font-light text-base md:text-lg leading-relaxed mb-14 max-w-xl mx-auto">
            Trabajamos a la medida: sin tarifas fijas, sin compromiso inicial. El primer paso es una conversación para entender tu desafío.
          </p>

          {/* Contact options */}
          <div ref={contentRef} style={{ opacity: 0 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="mailto:contacto@enmachile.com"
              className="inline-flex items-center gap-3 bg-teal text-cream px-8 py-4 rounded-full font-body font-medium text-sm tracking-wide hover:bg-green-dark transition-all duration-300 group"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              contacto@enmachile.com
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            <a
              href="https://wa.me/56993377835"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border-2 border-teal/40 text-teal px-8 py-4 rounded-full font-body font-medium text-sm tracking-wide hover:border-teal hover:bg-teal/10 transition-all duration-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              +56 9 9337 7835
            </a>
          </div>

          {/* Location note */}
          <p className="text-teal/50 font-body text-xs tracking-widest uppercase">
            Coyhaique · Región de Aysén · Chile
          </p>
        </div>
      </div>
    </section>
  );
}
