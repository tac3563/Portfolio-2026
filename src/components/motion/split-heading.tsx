"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, FULL_MOTION } from "@/lib/gsap";

type SplitHeadingProps = {
  children: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
};

/**
 * Line-by-line masked text reveal on scroll. SplitText keeps the original text
 * available to screen readers (aria: "auto") and re-splits on resize/font load.
 * Use for below-the-fold headings; the hero uses CSS so it doesn't wait on JS (LCP).
 */
export function SplitHeading({ children, as: Tag = "h2", id, className }: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        const split = SplitText.create(ref.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          aria: "auto",
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.08,
              scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
            }),
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
