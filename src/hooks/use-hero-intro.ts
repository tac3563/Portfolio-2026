import type { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { fullMotionQuery, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP);

export function useHeroIntro(root: RefObject<HTMLElement | null>): void {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ fullMotion: fullMotionQuery, reduceMotion: reducedMotionQuery }, (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };

        if (reduceMotion) {
          gsap.to([".sections-hero__letter", ".sections-hero__reveal"], {
            autoAlpha: 1,
            duration: 0.4,
          });
          return;
        }

        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(
            ".sections-hero__letter",
            { yPercent: 110, autoAlpha: 1 },
            { yPercent: 0, duration: 1.4, stagger: 0.07 },
            0.1,
          )
          .fromTo(
            ".sections-hero__reveal",
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.08 },
            0.6,
          );
      });
    },
    { scope: root },
  );
}
