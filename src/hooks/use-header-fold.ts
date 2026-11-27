import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { fullMotionQuery, reducedMotionQuery, tabletUpQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Far enough down that scrolling back up unfolds the links before smooth scroll finishes coasting to the top
const foldStart = 80;
const foldDuration = 0.7;
// Unfolding is quicker, so the links are ready by the time someone reaches the top to click them
const unfoldDuration = 0.35;
const reducedFoldDuration = 0.2;

export type HeaderFold = {
  holdFold: () => void;
  releaseFold: (duration: number) => void;
};

export function useHeaderFold(root: RefObject<HTMLElement | null>): HeaderFold {
  const fold = useRef<gsap.core.Timeline>(null);
  const foldTrigger = useRef<ScrollTrigger>(null);
  const isHeld = useRef(false);

  const syncFold = (duration: number) => {
    if (!fold.current || !foldTrigger.current || isHeld.current) return;

    const progress = foldTrigger.current.progress > 0 ? 1 : 0;

    gsap.to(fold.current, { progress, duration, ease: "power2.inOut", overwrite: true });
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          tabletUp: tabletUpQuery,
          fullMotion: fullMotionQuery,
          reduceMotion: reducedMotionQuery,
        },
        (context) => {
          const { tabletUp, reduceMotion } = context.conditions as {
            tabletUp: boolean;
            reduceMotion: boolean;
          };

          fold.current = gsap.timeline({ paused: true, defaults: { ease: "none" } });

          // Mobile always shows the menu button, so the links only fold away from tablet up
          if (tabletUp) {
            fold.current
              .fromTo(
                ".layout-header__item",
                { x: 0, autoAlpha: 1 },
                {
                  x: (_, item: HTMLElement) => {
                    if (reduceMotion) return 0;
                    const list = item.offsetParent as HTMLElement;
                    return list.offsetWidth - item.offsetLeft - item.offsetWidth;
                  },
                  autoAlpha: 0,
                  stagger: { each: 0.08, from: "end" },
                },
                0,
              )
              .fromTo(
                ".layout-header-toggle",
                { autoAlpha: 0, scale: reduceMotion ? 1 : 0.6 },
                { autoAlpha: 1, scale: 1 },
                0.3,
              );
          }

          foldTrigger.current = ScrollTrigger.create({
            start: foldStart,
            end: "max",
            onToggle: ({ progress }) => {
              const duration = progress > 0 ? foldDuration : unfoldDuration;
              syncFold(reduceMotion ? reducedFoldDuration : duration);
            },
            onRefresh: () => {
              fold.current?.invalidate();
              syncFold(0);
            },
          });

          syncFold(0);

          return () => {
            fold.current = null;
            foldTrigger.current = null;
          };
        },
      );
    },
    { scope: root },
  );

  const holdFold = () => {
    isHeld.current = true;
    gsap.killTweensOf(fold.current);
  };

  const releaseFold = (duration: number) => {
    isHeld.current = false;
    if (!fold.current) return;

    const progress = fold.current.progress();
    fold.current.progress(0).progress(progress);
    syncFold(duration);
  };

  return { holdFold, releaseFold };
}
