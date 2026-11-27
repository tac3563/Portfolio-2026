"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { contact } from "@/content/contact";
import { usePointerWeight } from "@/hooks/use-pointer-weight";
import { fullMotionQuery, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ContactHeading() {
  const root = useRef<HTMLDivElement>(null);
  const words = contact.heading.split(" ");
  usePointerWeight(root, ".sections-contact-heading__letter");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ fullMotion: fullMotionQuery, reduceMotion: reducedMotionQuery }, (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        const scrollTrigger = { trigger: root.current, start: "top 85%", once: true };

        if (reduceMotion) {
          gsap.from([".sections-contact-heading__letter", ".sections-contact-heading__reveal"], {
            autoAlpha: 0,
            duration: 0.4,
            scrollTrigger,
          });
          return;
        }

        gsap
          .timeline({ scrollTrigger, defaults: { ease: "expo.out" } })
          .from(".sections-contact-heading__letter", {
            yPercent: 110,
            duration: 1.2,
            stagger: 0.05,
          })
          .from(
            ".sections-contact-heading__reveal",
            { y: 24, autoAlpha: 0, duration: 1.2, stagger: 0.1 },
            0.3,
          );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="sections-contact-heading grid gap-8 md:grid-cols-12 md:items-end">
      <div className="flex flex-col gap-6 md:col-span-6 lg:col-span-7">
        <p className="sections-contact-heading__reveal copy-label text-ember-600">
          {contact.label}
        </p>
        <h2
          id="contact-heading"
          className="optical-trim flex flex-wrap gap-x-3 heading-2xl uppercase md:gap-x-5 xl:gap-x-7.5"
        >
          <span className="sr-only">{contact.heading}</span>
          {words.map((word) => (
            <span key={word} aria-hidden="true" className="flex overflow-y-clip">
              {Array.from(word).map((letter, index) => (
                <span key={`${word}-${index}`} className="sections-contact-heading__letter">
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>
      <p className="sections-contact-heading__reveal max-w-intro copy-md text-pretty text-taupe-500 md:col-span-6 lg:col-span-5 lg:col-start-8">
        {contact.intro}
      </p>
    </div>
  );
}
