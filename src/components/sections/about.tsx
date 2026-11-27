import { about } from "@/content/about";
import { AboutHeading } from "@/components/sections/about-heading";
import { AboutPhoto } from "@/components/sections/about-photo";
import { AboutStats } from "@/components/sections/about-stats";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="sections-about relative z-10 overflow-x-clip bg-ink-900 text-paper-100"
    >
      <div className="flex container-page flex-col gap-16 pt-24 pb-24 md:gap-24 md:pt-32 md:pb-40">
        <AboutHeading />

        <AboutStats />

        {/*
          Mirrors the heading's 12-column grid: copy on the left under the title, photo centred on
          the right under the intro. The photo stays first in the DOM so it sits above the copy on mobile.
        */}
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-x-8">
          <div className="mx-auto w-full max-w-60 md:col-span-5 md:col-start-8 md:row-start-1 md:w-[min(16rem,32svh)] md:max-w-none lg:col-span-6 lg:col-start-7 lg:w-[min(22rem,38svh)]">
            <AboutPhoto />
          </div>
          <div className="flex flex-col gap-5 md:col-span-7 md:col-start-1 md:row-start-1 lg:col-span-6">
            {about.bio.map((paragraph) => (
              <p key={paragraph} className="max-w-[28em] copy-lg text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
