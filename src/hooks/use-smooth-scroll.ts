import { useEffect } from "react";
import gsap from "gsap";
import { fullMotionQuery } from "@/lib/media";
import { startSmoothScroll } from "@/lib/smooth-scroll";

export function useSmoothScroll(): void {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(fullMotionQuery, () => startSmoothScroll());

    return () => mm.revert();
  }, []);
}
