import { hero } from "@/content/hero";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="sections-hero container-page flex min-h-svh flex-col justify-center pt-16"
    >
      <p className="copy-label text-muted">{hero.eyebrow}</p>
      <h1 id="hero-heading" className="mt-4 max-w-4xl heading-2xl text-balance">
        {hero.heading}
      </h1>
      <p className="mt-6 max-w-xl copy-lg text-pretty text-muted">{hero.intro}</p>
    </section>
  );
}
