"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { header } from "@/content/header";
import { matchesMedia, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP);

type HeaderToggleProps = {
  isExpanded: boolean;
  onToggle: () => void;
};

export function HeaderToggle({ isExpanded, onToggle }: HeaderToggleProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const duration = matchesMedia(reducedMotionQuery) ? 0 : 0.4;

      gsap.to(".layout-header-toggle__line--top", {
        y: isExpanded ? 2.5 : 0,
        rotate: isExpanded ? 45 : 0,
        duration,
        overwrite: true,
      });
      gsap.to(".layout-header-toggle__line--bottom", {
        y: isExpanded ? -2.5 : 0,
        rotate: isExpanded ? -45 : 0,
        duration,
        overwrite: true,
      });
    },
    { dependencies: [isExpanded], scope: root },
  );

  return (
    <div
      ref={root}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 flex h-16 container-page items-center justify-end"
    >
      <button
        type="button"
        aria-label={isExpanded ? header.closeMenu : header.openMenu}
        aria-expanded={isExpanded}
        aria-controls="layout-header-links"
        onClick={onToggle}
        className="layout-header-toggle pointer-events-auto invisible flex items-center gap-3 rounded-full border border-paper-100/20 bg-ink-900 py-2 pr-4 pl-5 whitespace-nowrap text-paper-100 aria-expanded:border-transparent"
      >
        <span className="heading-3xs">{header.menu}</span>
        <span aria-hidden="true" className="flex w-4 flex-col gap-1">
          <span className="layout-header-toggle__line--top h-px w-full bg-current" />
          <span className="layout-header-toggle__line--bottom h-px w-full bg-current" />
        </span>
      </button>
    </div>
  );
}
