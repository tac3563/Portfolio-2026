import { ProjectsHeading } from "@/components/sections/projects-heading";
import { ProjectsList } from "@/components/sections/projects-list";

export function Projects() {
  return (
    <section
      id="work"
      aria-labelledby="projects-heading"
      className="sections-projects relative z-10 bg-paper-100 text-ink-900"
    >
      <div className="flex container-page flex-col gap-16 pt-24 pb-24 md:gap-24 md:pt-32 md:pb-40">
        <ProjectsHeading />
        <ProjectsList />
      </div>
    </section>
  );
}
