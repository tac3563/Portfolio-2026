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
      const hero = stage?.closest(".sections-hero");
      if (!stage || !hero) return;

      const mm = gsap.matchMedia();

      mm.add(fullMotionQuery, () => {
        // Sticky rather than a ScrollTrigger pin: iOS Safari won't paint position: fixed content behind its toolbars
        const stickAtBottom = () =>
          gsap.set(hero, {
            position: "sticky",
            top: `min(0px, calc(100svh - ${hero.getBoundingClientRect().height}px))`,
          });

        stickAtBottom();

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: stage,
              start: "bottom bottom",
              end: "bottom top",
              scrub: true,
              onRefresh: stickAtBottom,
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
