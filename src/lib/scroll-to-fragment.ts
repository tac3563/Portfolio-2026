import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { findFragmentTarget } from "@/lib/find-fragment-target";
import { matchesMedia, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(ScrollToPlugin);

const shortestDuration = 0.9;
const longestDuration = 1.8;
const pixelsPerSecond = 2400;

function moveFocusTo(target: HTMLElement): void {
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}

export function scrollToFragment(href: string): boolean {
  const target = findFragmentTarget(href);
  if (!target) return false;

  const distance = Math.abs(target.getBoundingClientRect().top);
  const duration = matchesMedia(reducedMotionQuery)
    ? 0
    : gsap.utils.clamp(shortestDuration, longestDuration, distance / pixelsPerSecond);

  gsap.killTweensOf(window);
  gsap.to(window, {
    // autoKill hands control back as soon as the user scrolls themselves
    scrollTo: { y: target, autoKill: true },
    duration,
    ease: "expo.inOut",
    onComplete: () => moveFocusTo(target),
  });
  history.pushState(null, "", href);

  return true;
}
