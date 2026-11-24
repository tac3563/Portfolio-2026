import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { fullMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useInViewPlayback(video: RefObject<HTMLVideoElement | null>): void {
  useGSAP(() => {
    const element = video.current;
    if (!element) return;

    const mm = gsap.matchMedia();

    mm.add(fullMotionQuery, () => {
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          if (!self.isActive) {
            element.pause();
            return;
          }

          element.play().catch(() => undefined);
        },
      });

      return () => {
        trigger.kill();
        element.pause();
      };
    });
  });
}
