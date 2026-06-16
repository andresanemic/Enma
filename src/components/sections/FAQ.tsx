"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const FAQS = [
  {
    q: "¿Cómo comienza un proyecto con Enma?",
    a: "El primer paso es una conversación directa. Nos cuentas tu necesidad —energética, ambiental o de manufactura— y evaluamos juntos si tiene solución viable en el contexto patagónico. A partir de ahí definimos el alcance y elaboramos una propuesta a la medida. No hay compromiso inicial.",
  },
  {
    q: "¿Cuánto cuesta una consultoría?",
    a: "No trabajamos con tarifas fijas. Cada proyecto es diferente en complejidad, alcance y plazos, por lo que el presupuesto se construye luego de entender bien la necesidad. El primer contacto es sin costo.",
  },
  {
    q: "¿Trabajan solo en la Región de Aysén?",
    a: "Nuestra base está en Puerto Cisnes y ahí radica nuestra ventaja: conocemos la logística, los costos y la realidad del territorio. Podemos trabajar con clientes de cualquier región del país o del mundo que requieran ingeniería orientada a la Patagonia.",
  },
  {
    q: "¿Pueden ayudar con postulaciones a fondos públicos?",
    a: "Sí. La formulación y acompañamiento de proyectos para instrumentos como CORFO, ANID o los Gobiernos Regionales es uno de nuestros servicios principales. Acompañamos desde la identificación del instrumento más adecuado hasta la entrega de la documentación técnica.",
  },
  {
    q: "¿Trabajan de forma presencial o a distancia?",
    a: "Combinado, según lo que el proyecto requiera. Los cálculos, simulaciones e informes se realizan remotamente. Las visitas en terreno se programan cuando el levantamiento de datos o la ejecución en sitio las hace necesarias.",
  },
  {
    q: "¿Qué diferencia a Enma de una consultora de otra región?",
    a: "La pertenencia territorial. Entendemos la realidad operativa de la Patagonia —distancias, costos energéticos, idiosincrasia local— no como un dato abstracto, sino como parte del diseño de la solución. Eso se traduce en proyectos que realmente funcionan donde se van a ejecutar.",
  },
  {
    q: "¿En cuánto tiempo está listo un estudio de factibilidad?",
    a: "Depende del alcance, pero en general entre 4 y 12 semanas. Los factores que más influyen son la disponibilidad de datos del sitio, la tecnología a evaluar y si se requieren visitas en terreno.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useGSAP(() => {
    const trigger = { trigger: sectionRef.current, start: "top 85%" };

    gsap.fromTo(
      headerRef.current?.querySelectorAll(".fade-item") ?? [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.1, scrollTrigger: trigger }
    );

    gsap.fromTo(
      listRef.current?.querySelectorAll(".faq-item") ?? [],
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.07, delay: 0.25, scrollTrigger: trigger }
    );
  }, { scope: sectionRef });

  const toggle = useCallback(
    (idx: number) => {
      const panel = panelRefs.current[idx];
      const icon = iconRefs.current[idx];
      if (!panel) return;

      if (openIdx === idx) {
        gsap.killTweensOf(panel);
        gsap.to(panel, { height: 0, opacity: 0, duration: 0.28, ease: "power2.inOut" });
        if (icon) gsap.to(icon, { rotation: 0, duration: 0.28 });
        setOpenIdx(null);
      } else {
        // Close previously open
        if (openIdx !== null) {
          const prevPanel = panelRefs.current[openIdx];
          const prevIcon = iconRefs.current[openIdx];
          if (prevPanel) {
            gsap.killTweensOf(prevPanel);
            gsap.to(prevPanel, { height: 0, opacity: 0, duration: 0.25, ease: "power2.inOut" });
          }
          if (prevIcon) gsap.to(prevIcon, { rotation: 0, duration: 0.25 });
        }
        // Open clicked item using scrollHeight for measurement
        gsap.killTweensOf(panel);
        const h = panel.scrollHeight;
        gsap.fromTo(
          panel,
          { height: 0, opacity: 0 },
          { height: h, opacity: 1, duration: 0.38, ease: "power2.out" }
        );
        if (icon) gsap.to(icon, { rotation: 45, duration: 0.3, ease: "power2.out" });
        setOpenIdx(idx);
      }
    },
    [openIdx]
  );

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="bg-teal relative overflow-hidden"
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#F7DFBA 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-6 md:px-14 lg:px-24 py-24 md:py-32">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div ref={headerRef} className="mb-14">
            <p
              className="fade-item text-cream/35 text-[11px] tracking-[0.25em] uppercase font-body mb-6"
              style={{ opacity: 0 }}
            >
              FAQ
            </p>
            <h2
              className="fade-item font-display font-light text-cream leading-[1.1] tracking-[-0.02em] mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", opacity: 0 }}
            >
              Preguntas frecuentes
            </h2>
            <p
              className="fade-item text-cream/45 font-body text-sm leading-[1.75] max-w-xl"
              style={{ opacity: 0 }}
            >
              Si tienes dudas sobre cómo trabajamos, aquí respondemos las más comunes.
            </p>
          </div>

          {/* Accordion */}
          <div ref={listRef} className="border-t border-cream/15" role="list">
            {FAQS.map((faq, i) => (
              <article
                key={i}
                className="faq-item border-b border-cream/15"
                style={{ opacity: 0 }}
                role="listitem"
              >
                <button
                  className="w-full flex items-start justify-between gap-6 py-5 text-left cursor-pointer bg-transparent border-0 group"
                  aria-expanded={openIdx === i}
                  onClick={() => toggle(i)}
                  type="button"
                >
                  <span className="font-body text-cream/75 group-hover:text-cream text-sm md:text-[0.95rem] leading-snug transition-colors duration-200">
                    {faq.q}
                  </span>
                  <span
                    ref={(el) => { iconRefs.current[i] = el; }}
                    className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border border-cream/25 flex items-center justify-center text-cream/50 text-sm leading-none select-none"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  ref={(el) => { panelRefs.current[i] = el; }}
                  style={{ height: 0, opacity: 0, overflow: "hidden" }}
                >
                  <p className="text-cream/50 font-body text-sm leading-[1.85] pb-6 max-w-[90%]">
                    {faq.a}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Fallback contact */}
          <div className="mt-10 pt-6 border-t border-cream/[0.08]">
            <p className="text-cream/30 font-body text-sm">
              ¿Tienes otra pregunta?{" "}
              <a
                href="mailto:contacto@enmachile.com"
                className="text-cream/55 hover:text-cream transition-colors duration-200 border-b border-cream/20 hover:border-cream/40 pb-px"
              >
                Escríbenos directamente
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
