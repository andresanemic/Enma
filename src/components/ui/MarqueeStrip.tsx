"use client";

// MarqueeStrip — scroll infinito horizontal, CSS-driven
// lore/animation: CSS más confiable que GSAP para marquees
// lore/animation: 4 copias → keyframe a -25% para loop sin salto visual

interface MarqueeStripProps {
  items: string[];
  reversed?: boolean;
  speed?: number;         // segundos para una vuelta completa
  className?: string;
  itemClassName?: string;
  separator?: string;
}

export default function MarqueeStrip({
  items,
  reversed = false,
  speed = 28,
  className = "",
  itemClassName = "",
  separator = "·",
}: MarqueeStripProps) {
  // 4 copias del array → keyframe a -25% garantiza loop sin salto
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex whitespace-nowrap w-max"
        style={{
          animation: `${reversed ? "marquee-right" : "marquee-left"} ${speed}s linear infinite`,
          willChange: "transform",
        }}
        // Pausar en hover sin GSAP
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLDivElement).style.animationPlayState = "paused")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLDivElement).style.animationPlayState = "running")
        }
      >
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-5">
            <span className={itemClassName}>{item}</span>
            <span className="opacity-30 text-xs">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
