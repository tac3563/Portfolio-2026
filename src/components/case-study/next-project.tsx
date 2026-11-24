import { TransitionLink } from "@/components/layout/transition-link";
import { caseStudy } from "@/content/projects";
import type { PublishedProject } from "@/types/content";

type CaseStudyNextProjectProps = {
  project: PublishedProject;
};

export function CaseStudyNextProject({ project }: CaseStudyNextProjectProps) {
  return (
    <nav aria-label={caseStudy.nextProject} className="case-study-next-project bg-paper-100">
      <TransitionLink
        href={`/projects/${project.slug}`}
        label={project.title}
        className="group flex container-page flex-col gap-4 py-24 text-ink-900 md:py-32"
      >
        <span className="copy-label text-taupe-500">{caseStudy.nextProject}</span>
        <span className="flex items-end justify-between gap-6 heading-2xl uppercase">
          {project.title}
          <svg
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
