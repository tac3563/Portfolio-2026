import type { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { finePointerQuery, fullMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP);

export function useMagnetic(target: RefObject<HTMLElement | null>, strength = 0.3): void {
  useGSAP(
    () => {
      const element = target.current;
      if (!element) return;

      const mm = gsap.matchMedia();

      mm.add(`${finePointerQuery} and ${fullMotionQuery}`, () => {
        const xTo = gsap.quickTo(element, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(element, "y", { duration: 0.5, ease: "power3.out" });

        const handlePointerMove = (event: PointerEvent) => {
          const box = element.getBoundingClientRect();
          xTo((event.clientX - (box.left + box.width / 2)) * strength);
          yTo((event.clientY - (box.top + box.height / 2)) * strength);
        };

        const handlePointerLeave = () => {
          xTo(0);
          yTo(0);
        };

        element.addEventListener("pointermove", handlePointerMove);
        element.addEventListener("pointerleave", handlePointerLeave);

        return () => {
          element.removeEventListener("pointermove", handlePointerMove);
          element.removeEventListener("pointerleave", handlePointerLeave);
        };
      });
    },
    { scope: target },
  );
}
