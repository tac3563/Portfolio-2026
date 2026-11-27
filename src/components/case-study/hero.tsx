import { caseStudy, projects } from "@/content/projects";
import { ProjectsVideo } from "@/components/sections/projects-video";
import { CaseStudyVisitLink } from "@/components/case-study/visit-link";
import type { PublishedProject } from "@/types/content";

type CaseStudyHeroProps = {
  project: PublishedProject;
};

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  const details = [
    { label: caseStudy.client, value: project.client },
    { label: caseStudy.role, value: project.role },
    { label: caseStudy.year, value: project.year },
  ];

  return (
    <section
      id="top"
      aria-labelledby="case-study-heading"
      className="case-study-hero bg-paper-100 text-ink-900"
    >
      <div className="flex container-page flex-col gap-12 pt-16 pb-16 md:gap-16 md:pt-24 md:pb-24">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="flex flex-col gap-6 md:col-span-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <p className="copy-label text-ember-600">{project.tags.join(" · ")}</p>
              {project.award && (
                <p className="case-study-hero__award inline-flex items-center gap-2 rounded-full border border-ember-600 py-1 pr-3 pl-2.5 copy-meta text-ember-600">
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 fill-current">
                    <path d="M8 1l1.9 4.1 4.5.5-3.4 3 1 4.4L8 10.8 4 13l1-4.4-3.4-3 4.5-.5z" />
                  </svg>
                  {project.award}
                </p>
              )}
            </div>
            <h1 id="case-study-heading" className="optical-trim heading-2xl text-balance uppercase">
              {project.title}
            </h1>
            <p className="max-w-summary copy-lg text-pretty text-taupe-500">{project.summary}</p>
          </div>
          <div className="flex flex-col gap-6 md:col-span-4">
            <dl className="grid grid-cols-3 gap-4 md:grid-cols-1">
              {details.map((detail) => (
                <div
                  key={detail.label}
                  className="flex flex-col gap-1 border-t border-paper-300 pt-3"
                >
                  <dt className="copy-meta text-taupe-500">{detail.label}</dt>
                  <dd className="copy-md">{detail.value}</dd>
                </div>
              ))}
            </dl>
            {project.links.length > 0 && (
              <ul className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <CaseStudyVisitLink link={link} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <ProjectsVideo
          video={project.video}
          title={project.title}
          label={projects.videoLabel}
          award={project.award}
        />
      </div>
    </section>
  );
}
