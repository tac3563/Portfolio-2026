import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { fullMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useHeroExit(root: RefObject<HTMLElement | null>): void {
  useGSAP(
    () => {
      const stage = root.current;
      if (!stage) return;

      const mm = gsap.matchMedia();

      mm.add(fullMotionQuery, () => {
        // Pin once the hero's bottom is reached, so tall heroes are read in full before the next section covers them
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: stage,
              start: "bottom bottom",
              end: "bottom top",
              pin: true,
              pinSpacing: false,
              scrub: true,
            },
          })
          .to(".sections-hero__details", { y: -64, autoAlpha: 0, duration: 0.5 }, 0)
          .to(
            ".sections-hero__name",
            { yPercent: -40, scale: 0.88, autoAlpha: 0.15, transformOrigin: "50% 100%" },
            0,
          );
      });
    },
    { scope: root },
  );
}
