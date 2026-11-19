import { hero } from "@/content/hero";
import { HeroContact } from "@/components/sections/hero-contact";
import { HeroStage } from "@/components/sections/hero-stage";
import { HeroStatus } from "@/components/sections/hero-status";

export function Hero() {
  const words = hero.name.split(" ");

  return (
    <section id="top" aria-labelledby="hero-heading" className="sections-hero overflow-x-clip">
      <HeroStage>
        <h1 id="hero-heading" className="flex justify-between heading-display uppercase">
          <span className="sr-only">{hero.name}</span>
          {words.map((word) => (
            <span key={word} aria-hidden="true" className="flex overflow-y-clip">
              {Array.from(word).map((letter, index) => (
                <span key={`${word}-${index}`} className="sections-hero__letter invisible">
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="flex flex-col items-start gap-6 md:col-span-7 lg:col-span-5">
            <p className="sections-hero__reveal invisible flex items-center gap-3 copy-label text-muted">
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.25}
                className="size-4"
              >
                <path d="M3 3l10 10M13 5v8H5" />
              </svg>
              {hero.location}
            </p>
            <p className="sections-hero__reveal invisible max-w-md copy-lg text-pretty text-muted">
              {hero.intro}
            </p>
            <div className="sections-hero__reveal invisible">
              <HeroContact />
            </div>
          </div>
          <div className="sections-hero__reveal invisible md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
            <HeroStatus />
          </div>
        </div>
      </HeroStage>
    </section>
  );
}
