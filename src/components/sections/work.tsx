import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

const projects = [
  {
    title: "Project One",
    summary: "One-line summary of the problem and outcome.",
    tags: ["Next.js", "Design"],
  },
  {
    title: "Project Two",
    summary: "One-line summary of the problem and outcome.",
    tags: ["React", "GSAP"],
  },
  {
    title: "Project Three",
    summary: "One-line summary of the problem and outcome.",
    tags: ["TypeScript"],
  },
];

export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="container-page py-32">
      <SplitHeading id="work-heading" className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Selected work
      </SplitHeading>
      <Reveal stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article key={p.title} className="rounded-2xl border border-border p-6">
            <h3 className="text-xl font-medium">{p.title}</h3>
            <p className="mt-2 text-muted">{p.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-2 text-xs text-muted" aria-label="Technologies">
              {p.tags.map((t) => (
                <li key={t} className="rounded-full border border-border px-2.5 py-1">
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
