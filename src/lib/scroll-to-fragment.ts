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

function readScrollPadding(): number {
  return Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
}

export function jumpToFragment(href: string): void {
  const target = findFragmentTarget(href);
  if (!target) return;

  const lenis = getSmoothScroll();
  if (lenis) {
    lenis.resize();
    lenis.scrollTo(target, { offset: readScrollPadding(), immediate: true, force: true });
    return;
  }

  window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY);
}

export function scrollToFragment(href: string): boolean {
  const target = findFragmentTarget(href);
  if (!target) return false;

  const distance = Math.abs(target.getBoundingClientRect().top);
  const duration = matchesMedia(reducedMotionQuery)
    ? 0
    : gsap.utils.clamp(shortestDuration, longestDuration, distance / pixelsPerSecond);

  const lenis = getSmoothScroll();
  history.pushState(null, "", href);

  if (lenis) {
    lenis.scrollTo(target, {
      offset: readScrollPadding(),
      duration,
      easing: ease,
      onComplete: () => moveFocusTo(target),
    });
    return true;
  }

  gsap.killTweensOf(window);
  gsap.to(window, {
    scrollTo: { y: target, autoKill: true },
    duration,
    ease: "expo.inOut",
    onComplete: () => moveFocusTo(target),
  });

  return true;
}
