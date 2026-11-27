"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/content/projects";
import { ProjectsVideo } from "@/components/sections/projects-video";
import { TransitionLink } from "@/components/layout/transition-link";
import { useProjectCardReveal } from "@/hooks/use-project-card-reveal";
import { useTextRoll } from "@/hooks/use-text-roll";
import { finePointerQuery, fullMotionQuery } from "@/lib/media";
import type { Project } from "@/types/content";

gsap.registerPlugin(useGSAP);

type ProjectsCardProps = {
  project: Project;
  number: string;
};

export function ProjectsCard({ project, number }: ProjectsCardProps) {
  const root = useRef<HTMLElement>(null);
  const link = useRef<HTMLAnchorElement>(null);
  const zoom = useRef<gsap.core.Tween>(null);
  useTextRoll(link, ".sections-projects-card__label");
  useProjectCardReveal(root);

  useGSAP(
    () => {
      const card = root.current;
      if (!card || project.status !== "published") return;

      const mm = gsap.matchMedia();

      mm.add(`${finePointerQuery} and ${fullMotionQuery}`, () => {
        const zoomTo = (scale: number) => {
          zoom.current?.kill();
          zoom.current = gsap.to(".sections-projects-video__media", {
            scale,
            duration: 0.8,
            ease: "power3.out",
          });
        };

        const handlePointerEnter = () => zoomTo(1.04);
        const handlePointerLeave = () => zoomTo(1);

        card.addEventListener("pointerenter", handlePointerEnter);
        card.addEventListener("pointerleave", handlePointerLeave);

        return () => {
          card.removeEventListener("pointerenter", handlePointerEnter);
          card.removeEventListener("pointerleave", handlePointerLeave);
          zoom.current?.kill();
        };
      });
    },
    { scope: root },
  );

  return (
    <article
      ref={root}
      aria-labelledby={`project-${project.slug}`}
      className="sections-projects-card relative grid gap-6 rounded-3xl border border-paper-300 bg-paper-50 p-3 md:grid-cols-12 md:gap-8 md:p-4"
    >
      <div className="flex flex-col justify-between gap-8 p-3 md:col-span-5 md:p-4">
        <div className="flex flex-col gap-4">
          <p className="sections-projects-card__reveal flex justify-between copy-meta text-taupe-500">
            <span
              aria-hidden="true"
              className="transition-colors duration-300 group-data-active/project:text-ember-600"
            >
              {number}
            </span>
            <span>{project.year}</span>
          </p>
          <h3
            id={`project-${project.slug}`}
            className="sections-projects-card__reveal heading-sm text-balance"
          >
            {project.title}
          </h3>
          <p className="sections-projects-card__reveal copy-md text-pretty text-taupe-500">
            {project.summary}
          </p>
        </div>
        <div className="flex flex-col items-start gap-6">
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="sections-projects-card__tag rounded-full border border-paper-300 px-3.5 py-1.5 copy-meta text-taupe-600"
              >
                {tag}
              </li>
            ))}
          </ul>
          {project.status === "published" ? (
            <TransitionLink
              ref={link}
              href={`/projects/${project.slug}`}
              label={project.title}
              ariaLabel={`${projects.viewCaseStudy}: ${project.title}`}
              className="sections-projects-card__cta inline-flex items-center gap-2.5 rounded-full bg-ink-900 py-3.5 pr-5 pl-6 heading-3xs text-paper-100 uppercase after:absolute after:inset-0 after:z-10 after:rounded-3xl hover:bg-ember-600 focus-visible:bg-ember-600"
            >
              <span className="block overflow-hidden">
                <span className="sections-projects-card__label block text-roll">
                  {projects.viewCaseStudy}
                </span>
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="size-4"
              >
                <path d="M3 8h10M8.5 3.5L13 8l-4.5 4.5" />
              </svg>
            </TransitionLink>
          ) : (
            <p className="sections-projects-card__cta rounded-full bg-ink-900 px-3.5 py-1.5 copy-label text-paper-100">
              {projects.comingSoon}
            </p>
          )}
        </div>
      </div>
      <div className="md:col-span-7">
        <ProjectsVideo video={project.video} title={project.title} label={projects.videoLabel} />
      </div>
    </article>
  );
}
