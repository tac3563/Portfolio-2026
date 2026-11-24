"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { about } from "@/content/about";
import { usePointerWeight } from "@/hooks/use-pointer-weight";
import { fullMotionQuery, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function AboutHeading() {
  const root = useRef<HTMLDivElement>(null);
  const words = about.heading.split(" ");
  usePointerWeight(root, ".sections-about-heading__letter");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ fullMotion: fullMotionQuery, reduceMotion: reducedMotionQuery }, (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        const scrollTrigger = { trigger: root.current, start: "top 85%", once: true };

        if (reduceMotion) {
          gsap.from([".sections-about-heading__letter", ".sections-about-heading__reveal"], {
            autoAlpha: 0,
            duration: 0.4,
            scrollTrigger,
          });
          return;
        }

        gsap
          .timeline({ scrollTrigger, defaults: { ease: "expo.out" } })
          .from(".sections-about-heading__letter", {
            yPercent: 110,
            duration: 1.2,
            stagger: 0.05,
          })
          .from(
            ".sections-about-heading__reveal",
            { y: 24, autoAlpha: 0, duration: 1.2, stagger: 0.1 },
            0.3,
          );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="sections-about-heading grid gap-8 md:grid-cols-12 md:items-end">
      <div className="flex flex-col gap-6 md:col-span-6 lg:col-span-7">
        <p className="sections-about-heading__reveal copy-label text-taupe-300">{about.label}</p>
        <h2 id="about-heading" className="flex flex-wrap gap-x-3 heading-2xl uppercase md:gap-x-5">
          <span className="sr-only">{about.heading}</span>
          {words.map((word) => (
            <span key={word} aria-hidden="true" className="flex overflow-y-clip">
              {Array.from(word).map((letter, index) => (
                <span key={`${word}-${index}`} className="sections-about-heading__letter">
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>
      <p className="sections-about-heading__reveal max-w-intro copy-md text-pretty text-taupe-300 md:col-span-6 lg:col-span-5 lg:col-start-8">
        {about.intro}
      </p>
    </div>
  );
}
