import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { findFragmentTarget } from "@/lib/find-fragment-target";
import type { Link } from "@/types/site";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useActiveSection(nav: Link[]): number | null {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      nav.forEach((item, index) => {
        const section = findFragmentTarget(item.href);
        if (!section) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) =>
            setActiveIndex((current) => {
              if (self.isActive) return index;
              return current === index ? null : current;
            }),
        });
      });
    },
    { dependencies: [nav] },
  );

  return activeIndex;
}
