import gsap from "gsap";
import { matchesMedia, reducedMotionQuery } from "@/lib/media";
import { jumpToFragment } from "@/lib/scroll-to-fragment";
import { jumpToTop } from "@/lib/smooth-scroll";

let overlay: HTMLElement | null = null;
let isCovering = false;
let transition: gsap.core.Timeline | null = null;

export function registerTransitionOverlay(element: HTMLElement | null): void {
  overlay = element;
}

function findLabel(element: HTMLElement): HTMLElement | null {
  return element.querySelector<HTMLElement>(".layout-page-transition__label");
}

export function coverPage(label: string): Promise<void> {
  const element = overlay;
  if (!element) return Promise.resolve();

  const labelElement = findLabel(element);
  if (labelElement) labelElement.textContent = label;

  isCovering = true;
  transition?.kill();

  return new Promise((resolve) => {
    if (matchesMedia(reducedMotionQuery)) {
      transition = gsap
        .timeline({ onComplete: resolve })
        .set(element, { yPercent: 0, autoAlpha: 0 })
        .set(labelElement, { yPercent: 0 })
        .to(element, { autoAlpha: 1, duration: 0.25 });
      return;
    }

    transition = gsap
      .timeline({ defaults: { ease: "expo.inOut" }, onComplete: resolve })
      .set(element, { yPercent: 100, autoAlpha: 1 })
      .set(labelElement, { yPercent: 110 })
      .to(element, { yPercent: 0, duration: 0.8 })
      .to(labelElement, { yPercent: 0, duration: 0.7, ease: "expo.out" }, 0.45);
  });
}

export function revealPage(): void {
  const element = overlay;
  if (!element || !isCovering) return;

  isCovering = false;
  transition?.kill();
  // Next.js lands fragments short by scroll-padding-top, so match the in-page anchor links instead
  if (window.location.hash) jumpToFragment(window.location.hash);
  // Next.js's own scroll to top can be undone by Lenis momentum, or skipped when it thinks the page is in view
  else jumpToTop();

  const labelElement = findLabel(element);

  if (matchesMedia(reducedMotionQuery)) {
    transition = gsap.timeline().to(element, { autoAlpha: 0, duration: 0.25 });
    return;
  }

  transition = gsap
    .timeline({ defaults: { ease: "expo.inOut" } })
    .to(labelElement, { yPercent: -110, duration: 0.5, ease: "expo.in" })
    .to(element, { yPercent: -100, duration: 0.9 }, 0.2)
    .set(element, { autoAlpha: 0 });
}
