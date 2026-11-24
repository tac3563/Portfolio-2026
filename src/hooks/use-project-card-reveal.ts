import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { fullMotionQuery, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const hiddenFrame = "inset(100% 0% 0% 0% round 1rem)";
const shownFrame = "inset(0% 0% 0% 0% round 1rem)";

export function useProjectCardReveal(root: RefObject<HTMLElement | null>): void {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ fullMotion: fullMotionQuery, reduceMotion: reducedMotionQuery }, (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        const scrollTrigger = { trigger: root.current, start: "top 80%", once: true };

        if (reduceMotion) {
          gsap.from(
            [
              ".sections-projects-video",
              ".sections-projects-card__reveal",
              ".sections-projects-card__tag",
              ".sections-projects-card__cta",
            ],
            { autoAlpha: 0, duration: 0.4, scrollTrigger },
          );
          return;
        }

        gsap
          .timeline({ scrollTrigger, defaults: { ease: "expo.out" } })
          .fromTo(
            ".sections-projects-video",
            { clipPath: hiddenFrame },
            { clipPath: shownFrame, duration: 1.4, clearProps: "clipPath" },
          )
          .from(
            ".sections-projects-card__reveal",
            { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 },
            0.2,
          )
          .from(
            ".sections-projects-card__tag",
            { scale: 0.6, autoAlpha: 0, duration: 0.6, stagger: 0.05, ease: "back.out(2)" },
            0.5,
          )
          .from(".sections-projects-card__cta", { autoAlpha: 0, duration: 0.8 }, 0.8);
      });
    },
    { scope: root },
  );
}
