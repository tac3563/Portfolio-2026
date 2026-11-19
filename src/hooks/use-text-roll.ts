import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { fullMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP);

export function useTextRoll(target: RefObject<HTMLElement | null>, selector: string): void {
  const roll = useRef<gsap.core.Tween>(null);

  useGSAP(
    () => {
      const element = target.current;
      const label = element?.querySelector<HTMLElement>(selector);
      if (!element || !label) return;

      const mm = gsap.matchMedia();

      mm.add(fullMotionQuery, () => {
        // The text-roll shadow is an identical copy one line down, so rolling up reveals it
        const rollTo = (yPercent: number) => {
          roll.current?.kill();
          roll.current = gsap.to(label, { yPercent, duration: 0.5, ease: "power3.out" });
        };

        const handlePointerEnter = (event: PointerEvent) => {
          if (event.pointerType === "mouse") rollTo(-100);
        };

        const handlePointerLeave = (event: PointerEvent) => {
          if (event.pointerType === "mouse" && !element.matches(":focus-visible")) rollTo(0);
        };

        const handleFocus = () => {
          if (element.matches(":focus-visible")) rollTo(-100);
        };

        const handleBlur = () => {
          if (!element.matches(":hover")) rollTo(0);
        };

        element.addEventListener("pointerenter", handlePointerEnter);
        element.addEventListener("pointerleave", handlePointerLeave);
        element.addEventListener("focus", handleFocus);
        element.addEventListener("blur", handleBlur);

        return () => {
          element.removeEventListener("pointerenter", handlePointerEnter);
          element.removeEventListener("pointerleave", handlePointerLeave);
          element.removeEventListener("focus", handleFocus);
          element.removeEventListener("blur", handleBlur);
          roll.current?.kill();
          gsap.set(label, { clearProps: "transform" });
        };
      });
    },
    { scope: target },
  );
}
