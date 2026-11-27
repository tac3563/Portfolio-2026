"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { services } from "@/content/services";
import { usePointerWeight } from "@/hooks/use-pointer-weight";
import { fullMotionQuery, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ServicesHeading() {
  const root = useRef<HTMLDivElement>(null);
  const words = services.heading.split(" ");
  usePointerWeight(root, ".sections-services-heading__letter");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ fullMotion: fullMotionQuery, reduceMotion: reducedMotionQuery }, (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };

        gsap.from(".sections-services-heading__letter", {
          yPercent: reduceMotion ? 0 : 110,
          autoAlpha: reduceMotion ? 0 : 1,
          duration: reduceMotion ? 0.4 : 1.2,
          stagger: reduceMotion ? 0 : 0.05,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="sections-services-heading">
      <h2
        id="services-heading"
        className="optical-trim flex flex-wrap gap-x-3 heading-2xl uppercase md:gap-x-5 xl:gap-x-7.5"
      >
        <span className="sr-only">{services.heading}</span>
        {words.map((word) => (
          <span key={word} aria-hidden="true" className="flex overflow-y-clip">
            {Array.from(word).map((letter, index) => (
              <span key={`${word}-${index}`} className="sections-services-heading__letter">
                {letter}
              </span>
            ))}
          </span>
        ))}
      </h2>
    </div>
  );
}
