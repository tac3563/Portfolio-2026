export function findFragmentTarget(href: string): HTMLElement | null {
  if (!href.startsWith("#")) return null;

  return document.getElementById(href.slice(1));
}
