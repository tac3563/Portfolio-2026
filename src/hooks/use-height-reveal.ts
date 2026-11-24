import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { matchesMedia, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useHeightReveal(
  panel: RefObject<HTMLElement | null>,
  contentKey: string | null,
): () => void {
  const startHeight = useRef(0);
  const tween = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const element = panel.current;
      if (!element || contentKey === null) return;

      tween.current?.kill();

      if (matchesMedia(reducedMotionQuery)) {
        gsap.set(element, { height: "auto" });
        ScrollTrigger.refresh();
        return;
      }

      tween.current = gsap.fromTo(
        element,
        { height: startHeight.current },
        {
          height: "auto",
          duration: 0.6,
          ease: "expo.out",
          onComplete: () => ScrollTrigger.refresh(),
        },
      );
    },
    { dependencies: [contentKey] },
  );

  // The new content is already rendered when the effect runs, so the old height is read before the update
  return function rememberStartHeight() {
    startHeight.current = panel.current?.offsetHeight ?? 0;
  };
}
