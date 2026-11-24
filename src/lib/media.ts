export const mobileQuery = "(width < 48rem)";
export const tabletUpQuery = "(width >= 48rem)";
export const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
export const fullMotionQuery = "(prefers-reduced-motion: no-preference)";
export const finePointerQuery = "(hover: hover) and (pointer: fine)";

export function matchesMedia(query: string): boolean {
  return window.matchMedia(query).matches;
}
