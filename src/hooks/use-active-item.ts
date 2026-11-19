import { useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useActiveItem(root: RefObject<HTMLElement | null>, selector: string): number {
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(index);
          },
        });
      });
    },
    { scope: root },
  );

  return activeIndex;
}
