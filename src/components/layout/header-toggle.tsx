"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { header } from "@/content/header";
import { matchesMedia, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP);

type HeaderToggleProps = {
  activeIndex: number | null;
  label: string;
  isExpanded: boolean;
  onToggle: () => void;
};

function formatSectionNumber(index: number): string {
  return `(${String(index + 1).padStart(2, "0")})`;
}

export function HeaderToggle({ activeIndex, label, isExpanded, onToggle }: HeaderToggleProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (matchesMedia(reducedMotionQuery)) return;

      gsap.fromTo(
        ".layout-header-toggle__label",
        { yPercent: 100 },
        { yPercent: 0, duration: 0.5, ease: "power3.out" },
      );
    },
    { dependencies: [label], scope: root },
  );

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
    <div ref={root} className="absolute inset-y-0 right-0 z-10 flex items-center">
      <button
        type="button"
        aria-label={isExpanded ? header.closeMenu : header.openMenu}
        aria-expanded={isExpanded}
        aria-controls="layout-header-links"
        onClick={onToggle}
        className="layout-header-toggle invisible flex items-center gap-3 rounded-full bg-paper-100 py-2 pr-4 pl-5 whitespace-nowrap text-ink-900"
      >
        <span className="overflow-hidden">
          <span key={label} className="layout-header-toggle__label flex items-baseline gap-2">
            {activeIndex !== null && (
              <span className="copy-meta">{formatSectionNumber(activeIndex)}</span>
            )}
            <span className="heading-3xs">{label}</span>
          </span>
        </span>
        <span aria-hidden="true" className="flex w-4 flex-col gap-1">
          <span className="layout-header-toggle__line--top h-px w-full bg-current" />
          <span className="layout-header-toggle__line--bottom h-px w-full bg-current" />
        </span>
      </button>
      <p aria-live="polite" className="sr-only">
        {activeIndex !== null && `${header.currentSection} ${label}`}
      </p>
    </div>
  );
}
