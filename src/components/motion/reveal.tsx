"use client";

import { useRef } from "react";
import { gsap, useGSAP, FULL_MOTION } from "@/lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Animate direct children one after another instead of the wrapper as a whole. */
  stagger?: boolean;
};

/** Fades/slides content in as it scrolls into view. No-op under reduced motion. */
export function Reveal({ children, className, stagger = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        const el = ref.current!;
        gsap.from(stagger ? el.children : el, {
          y: 32,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: stagger ? 0.1 : 0,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
