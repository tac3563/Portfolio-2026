"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { footer } from "@/content/footer";
import { useMagnetic } from "@/hooks/use-magnetic";
import { matchesMedia, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP);

export function FooterBackToTop() {
  const root = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<SVGSVGElement>(null);
  const arrowTimeline = useRef<gsap.core.Timeline>(null);
  useMagnetic(root);

  useGSAP(() => () => arrowTimeline.current?.kill(), { scope: root });

  const rollArrow = () => {
    if (matchesMedia(reducedMotionQuery)) return;

    arrowTimeline.current?.kill();
    arrowTimeline.current = gsap
      .timeline()
      .to(arrow.current, { yPercent: -160, duration: 0.25, ease: "power2.in" })
      .fromTo(
        arrow.current,
        { yPercent: 160 },
        { yPercent: 0, duration: 0.35, ease: "power3.out" },
      );
  };

  return (
    <a
      ref={root}
      href="#top"
      aria-label={footer.backToTop}
      onPointerEnter={rollArrow}
      onFocus={rollArrow}
      className="layout-footer-back-to-top flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink-900 text-paper-100 hover:bg-ember-600 focus-visible:bg-ember-600"
    >
      <svg
        ref={arrow}
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="size-5"
      >
        <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" />
      </svg>
    </a>
  );
}
