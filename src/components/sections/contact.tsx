import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="container-page py-32">
      <SplitHeading
        id="contact-heading"
        className="text-4xl font-semibold tracking-tight sm:text-5xl"
      >
        Let&apos;s work together
      </SplitHeading>
      <Reveal className="mt-8">
        <a
          href="mailto:hello@example.com"
          className="inline-flex h-12 items-center rounded-full bg-foreground px-6 font-medium text-background transition-opacity hover:opacity-85"
        >
          hello@example.com
        </a>
      </Reveal>
    </section>
  );
}
