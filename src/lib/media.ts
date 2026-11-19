export const mobileQuery = "(width < 48rem)";
export const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
export const fullMotionQuery = "(prefers-reduced-motion: no-preference)";

export function matchesMedia(query: string): boolean {
  return window.matchMedia(query).matches;
}
