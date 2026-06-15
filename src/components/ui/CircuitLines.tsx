"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// Inspired by Enma brochure pages 10–11: parallel circuit traces with 90° rounded corners

function buildRightEntryPaths(): string[] {
  // Lines enter from the right edge, curve down, then exit left
  const paths: string[] = [];
  const r = 40;
  for (let i = 0; i < 10; i++) {
    const y = 60 + i * 34;
    const c1x = 1060 - i * 20;
    const c2y = 520 + i * 16;
    paths.push(
      `M 1440 ${y} H ${c1x + r} Q ${c1x} ${y} ${c1x} ${y + r} V ${c2y - r} Q ${c1x} ${c2y} ${c1x - r} ${c2y} H 580`
    );
  }
  return paths;
}

function buildTopEntryPaths(): string[] {
  // Lines enter from the top, curve right, exit at the right edge
  const paths: string[] = [];
  const r = 40;
  for (let i = 0; i < 7; i++) {
    const x = 700 + i * 34;
    const c1y = 190 + i * 24;
    paths.push(
      `M ${x} 0 V ${c1y - r} Q ${x} ${c1y} ${x + r} ${c1y} H 1440`
    );
  }
  return paths;
}

interface CircuitLinesProps {
  className?: string;
  color?: string;
  opacity?: number;
  animate?: boolean;
  strokeWidth?: number;
}

export default function CircuitLines({
  className = "",
  color = "white",
  opacity = 0.1,
  animate = true,
  strokeWidth = 1.5,
}: CircuitLinesProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const rightPaths = buildRightEntryPaths();
  const topPaths = buildTopEntryPaths();
  const allPaths = [...rightPaths, ...topPaths];

  useEffect(() => {
    if (!animate || !svgRef.current) return;

    const pathEls = Array.from(svgRef.current.querySelectorAll<SVGPathElement>("path"));

    // lore/animation: estado inicial inline para prevenir FOUC
    pathEls.forEach((path) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
    });

    // lore/animation: gsap.fromTo (nunca gsap.from)
    gsap.fromTo(
      pathEls,
      { strokeDashoffset: (i) => pathEls[i].getTotalLength() },
      {
        strokeDashoffset: 0,
        duration: 2.8,
        ease: "power2.out",
        stagger: 0.055,
        delay: 0.2,
      }
    );
  }, [animate]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {allPaths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          opacity={opacity}
        />
      ))}
    </svg>
  );
}
