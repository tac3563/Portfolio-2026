"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { caseStudy } from "@/content/projects";
import { TransitionLink } from "@/components/layout/transition-link";
import { useTextRoll } from "@/hooks/use-text-roll";
import { matchesMedia, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP);

export function CaseStudyBackLink() {
  const root = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<SVGSVGElement>(null);
  const arrowTween = useRef<gsap.core.Tween>(null);
  useTextRoll(root, ".case-study-back-link__label");

  useGSAP(() => () => arrowTween.current?.kill(), { scope: root });

  const nudgeArrow = (x: number) => {
    arrowTween.current?.kill();
    arrowTween.current = gsap.to(arrow.current, {
      x,
      duration: matchesMedia(reducedMotionQuery) ? 0 : 0.4,
      ease: "power3.out",
    });
  };

  return (
    <TransitionLink
      ref={root}
      href="/#work"
      label={caseStudy.work}
      onPointerEnter={() => nudgeArrow(-4)}
      onPointerLeave={() => nudgeArrow(0)}
      onFocus={() => nudgeArrow(-4)}
      onBlur={() => nudgeArrow(0)}
      className="case-study-back-link flex items-center gap-2"
    >
      <svg
        ref={arrow}
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="size-4 shrink-0 text-ember-600"
      >
        <path d="M13 8H3M7.5 3.5L3 8l4.5 4.5" />
      </svg>
      <span className="block overflow-hidden">
        <span className="case-study-back-link__label block text-roll">{caseStudy.backToWork}</span>
      </span>
    </TransitionLink>
  );
}
