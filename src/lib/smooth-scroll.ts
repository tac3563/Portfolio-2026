import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

function advanceSmoothScroll(time: number): void {
  lenis?.raf(time * 1000);
}

export function startSmoothScroll(): () => void {
  lenis = new Lenis({ stopInertiaOnNavigate: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(advanceSmoothScroll);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(advanceSmoothScroll);
    gsap.ticker.lagSmoothing(500, 33);
    lenis?.destroy();
    lenis = null;
  };
}

export function getSmoothScroll(): Lenis | null {
  return lenis;
}

export function pauseSmoothScroll(): void {
  lenis?.stop();
}

export function resumeSmoothScroll(): void {
  lenis?.start();
}

export function jumpToTop(): void {
  if (lenis) {
    // Resets Lenis's target too, so leftover inertia can't drag the page back down
    lenis.scrollTo(0, { immediate: true, force: true });
    return;
  }

  window.scrollTo(0, 0);
}
