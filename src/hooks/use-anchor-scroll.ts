import { useEffect } from "react";
import { scrollToFragment } from "@/lib/scroll-to-fragment";

function isPlainClick(event: MouseEvent): boolean {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export function useAnchorScroll(): void {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || !isPlainClick(event)) return;

      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const href = link?.getAttribute("href");
      if (!href || href === "#") return;

      if (scrollToFragment(href)) event.preventDefault();
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}
