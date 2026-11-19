import type { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { finePointerQuery, fullMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP);

const lightestWeight = 300;
const heaviestWeight = 700;
const restingWeight = 500;
const reachOfStageWidth = 0.3;

export function usePointerWeight(root: RefObject<HTMLElement | null>, selector: string): void {
  useGSAP(
    () => {
      const stage = root.current;
      if (!stage) return;

      const mm = gsap.matchMedia();

      mm.add(`${finePointerQuery} and ${fullMotionQuery}`, () => {
        const letters = gsap.utils.toArray<HTMLElement>(selector);
        const weightTo = letters.map((letter) =>
          gsap.quickTo(letter, "fontWeight", { duration: 0.6, ease: "power3.out" }),
        );

        const handlePointerMove = (event: PointerEvent) => {
          const reach = stage.offsetWidth * reachOfStageWidth;

          letters.forEach((letter, index) => {
            const box = letter.getBoundingClientRect();
            const distance = Math.hypot(
              event.clientX - (box.left + box.width / 2),
              event.clientY - (box.top + box.height / 2),
            );
            const closeness = gsap.utils.clamp(0, 1, 1 - distance / reach);

            weightTo[index](gsap.utils.interpolate(lightestWeight, heaviestWeight, closeness));
          });
        };

        const handlePointerLeave = () => weightTo.forEach((setWeight) => setWeight(restingWeight));

        stage.addEventListener("pointermove", handlePointerMove);
        stage.addEventListener("pointerleave", handlePointerLeave);

        return () => {
          stage.removeEventListener("pointermove", handlePointerMove);
          stage.removeEventListener("pointerleave", handlePointerLeave);
        };
      });
    },
    { scope: root },
  );
}
