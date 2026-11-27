import { hero } from "@/content/hero";
import { HeroContact } from "@/components/sections/hero-contact";
import { HeroStage } from "@/components/sections/hero-stage";
import { HeroStatus } from "@/components/sections/hero-status";

export function Hero() {
  const words = hero.name.split(" ");

  return (
    <section id="top" aria-labelledby="hero-heading" className="sections-hero overflow-x-clip">
      <HeroStage>
        <h1
          id="hero-heading"
          className="sections-hero__name optical-trim flex justify-between heading-display uppercase [--optical-trim:0.028em]"
        >
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
        <div className="sections-hero__details grid gap-12 md:grid-cols-12 md:items-end">
          <div className="flex flex-col items-start gap-6 md:col-span-7 lg:col-span-6 xl:col-span-5">
            <p className="sections-hero__intro translate-y-6 copy-lg text-pretty text-muted lg:max-w-intro">
              <strong className="font-space-grotesk font-medium tracking-tight text-foreground">
                {hero.introLead}
              </strong>{" "}
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
