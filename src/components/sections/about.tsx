import { about } from "@/content/about";
import { AboutBoard } from "@/components/sections/about-board";
import { AboutHeading } from "@/components/sections/about-heading";
import { AboutPhoto } from "@/components/sections/about-photo";
import { AboutStats } from "@/components/sections/about-stats";

function formatPrincipleNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="sections-about relative z-10 overflow-x-clip bg-ink-900 text-paper-100"
    >
      <div className="flex container-page flex-col gap-20 pt-24 pb-24 md:gap-28 md:pt-32 md:pb-40">
        <AboutHeading />

        <div className="grid gap-16 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="mx-auto w-full max-w-xs md:col-span-5 md:mx-0 md:max-w-sm lg:col-span-4">
            <AboutPhoto />
          </div>
          <div className="flex flex-col gap-16 md:col-span-7 lg:col-span-7 lg:col-start-6">
            <div className="flex flex-col gap-6">
              {about.bio.map((paragraph) => (
                <p key={paragraph} className="max-w-summary copy-lg text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
            <AboutStats />
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <h3 className="heading-sm">{about.principlesHeading}</h3>
          <ol className="grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
            {about.principles.map((principle, index) => (
              <li
                key={principle.title}
                className="flex flex-col gap-4 border-t border-ink-800 pt-6"
              >
                <p aria-hidden="true" className="copy-meta text-ember-500">
                  {formatPrincipleNumber(index)}
                </p>
                <h4 className="heading-2xs text-balance">{principle.title}</h4>
                <p className="copy-md text-pretty text-taupe-300">{principle.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <AboutBoard />
      </div>
    </section>
  );
}
