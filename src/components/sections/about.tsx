import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="container-page py-32">
      <SplitHeading
        id="about-heading"
        className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl"
      >
        A short line about who you are and what you care about.
      </SplitHeading>
      <Reveal className="mt-8 max-w-2xl space-y-4 text-lg text-muted">
        <p>
          Placeholder copy. Describe your background, the kind of work you do, and the tools you
          reach for.
        </p>
      </Reveal>
    </section>
  );
}
