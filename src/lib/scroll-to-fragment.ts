import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { findFragmentTarget } from "@/lib/find-fragment-target";
import { matchesMedia, reducedMotionQuery } from "@/lib/media";
import { getSmoothScroll } from "@/lib/smooth-scroll";

gsap.registerPlugin(ScrollToPlugin);

const shortestDuration = 0.9;
const longestDuration = 1.8;
const pixelsPerSecond = 2400;

const ease = gsap.parseEase("expo.inOut");

function moveFocusTo(target: HTMLElement): void {
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}

function findScrollPosition(href: string, target: HTMLElement): number {
  if (href === "#top") return 0;

  return target.getBoundingClientRect().top + window.scrollY;
}

export function jumpToFragment(href: string): void {
  const target = findFragmentTarget(href);
  if (!target) return;

  const lenis = getSmoothScroll();
  lenis?.resize();
  const position = findScrollPosition(href, target);

  if (lenis) {
    lenis.scrollTo(position, { immediate: true, force: true });
    return;
  }

  window.scrollTo(0, position);
}

export function scrollToFragment(href: string): boolean {
  const target = findFragmentTarget(href);
  if (!target) return false;

  const position = findScrollPosition(href, target);
  const distance = Math.abs(position - window.scrollY);
  const duration = matchesMedia(reducedMotionQuery)
    ? 0
    : gsap.utils.clamp(shortestDuration, longestDuration, distance / pixelsPerSecond);

  const lenis = getSmoothScroll();
  history.pushState(null, "", href);

  if (lenis) {
    // Its scroll limit can be stale right after a body scroll lock is released, which would clamp the target to the top
    lenis.resize();
    lenis.scrollTo(position, {
      // Locked so trailing trackpad momentum can't cancel the scroll before it gets going
      lock: true,
      duration,
      easing: ease,
      onComplete: () => moveFocusTo(target),
    });
    return true;
  }

  gsap.killTweensOf(window);
  gsap.to(window, {
    scrollTo: { y: position, autoKill: true },
    duration,
    ease: "expo.inOut",
    onComplete: () => moveFocusTo(target),
  });

  return true;
}
