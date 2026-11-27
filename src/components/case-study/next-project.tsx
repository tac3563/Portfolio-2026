"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TransitionLink } from "@/components/layout/transition-link";
import { caseStudy } from "@/content/projects";
import { matchesMedia, reducedMotionQuery } from "@/lib/media";
import type { PublishedProject } from "@/types/content";

gsap.registerPlugin(useGSAP);

type CaseStudyNextProjectProps = {
  project: PublishedProject;
};

export function CaseStudyNextProject({ project }: CaseStudyNextProjectProps) {
  const root = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<SVGSVGElement>(null);
  const arrowTween = useRef<gsap.core.Tween>(null);

  useGSAP(() => () => arrowTween.current?.kill(), { scope: root });

  // xPercent keeps the nudge proportional to the 1em arrow (25% ≈ the back link's 4px on 16px).
  const nudgeArrow = (xPercent: number) => {
    arrowTween.current?.kill();
    arrowTween.current = gsap.to(arrow.current, {
      xPercent,
      duration: matchesMedia(reducedMotionQuery) ? 0 : 0.4,
      ease: "power3.out",
    });
  };

  return (
    <nav aria-label={caseStudy.nextProject} className="case-study-next-project bg-paper-100">
      <TransitionLink
        ref={root}
        href={`/projects/${project.slug}`}
        label={project.title}
        onPointerEnter={() => nudgeArrow(25)}
        onPointerLeave={() => nudgeArrow(0)}
        onFocus={() => nudgeArrow(25)}
        onBlur={() => nudgeArrow(0)}
        className="group flex container-page flex-col gap-4 py-24 text-ink-900 md:py-32"
      >
        <span className="copy-label text-ember-600">{caseStudy.nextProject}</span>
        <span className="optical-trim flex items-end justify-between gap-6 heading-2xl uppercase">
          {project.title}
          <svg
            ref={arrow}
            aria-hidden="true"
            viewBox="0 0 16 16"
            width="1em"
            height="1em"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="shrink-0 text-ember-600"
          >
            <path d="M3 8h10M8.5 3.5L13 8l-4.5 4.5" />
          </svg>
        </span>
      </TransitionLink>
    </nav>
  );
}
