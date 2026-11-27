"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { caseStudy } from "@/content/projects";
import { useMagnetic } from "@/hooks/use-magnetic";
import { matchesMedia, reducedMotionQuery } from "@/lib/media";
import type { Link } from "@/types/site";

gsap.registerPlugin(useGSAP);

type CaseStudyVisitLinkProps = {
  link: Link;
};

export function CaseStudyVisitLink({ link }: CaseStudyVisitLinkProps) {
  const root = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<SVGSVGElement>(null);
  const arrowTween = useRef<gsap.core.Tween>(null);
  useMagnetic(root);

  useGSAP(() => () => arrowTween.current?.kill(), { scope: root });

  const turnArrow = (rotate: number) => {
    arrowTween.current?.kill();
    arrowTween.current = gsap.to(arrow.current, {
      rotate,
      duration: matchesMedia(reducedMotionQuery) ? 0 : 0.4,
      ease: "power3.out",
    });
  };

  return (
    <a
      ref={root}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerEnter={() => turnArrow(45)}
      onPointerLeave={() => turnArrow(0)}
      onFocus={() => turnArrow(45)}
      onBlur={() => turnArrow(0)}
      className="case-study-visit-link inline-flex items-center gap-2.5 rounded-full bg-ink-900 py-3.5 pr-5 pl-6 heading-3xs text-paper-100 uppercase hover:bg-ember-600 focus-visible:bg-ember-600"
    >
      {link.label}
      <svg
        ref={arrow}
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="size-4"
      >
        <path d="M4 12L12 4M6 4h6v6" />
      </svg>
      <span className="sr-only"> {caseStudy.opensInNewTab}</span>
    </a>
  );
}
