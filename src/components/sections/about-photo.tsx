"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { about } from "@/content/about";
import photo from "@/images/about-tom.jpg";
import { fullMotionQuery, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function AboutPhoto() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const scrollTrigger = { trigger: root.current, start: "top 80%", once: true };

      mm.add(reducedMotionQuery, () => {
        gsap.from(".sections-about-photo__card", { autoAlpha: 0, duration: 0.4, scrollTrigger });
      });

      mm.add(fullMotionQuery, () => {
        gsap.from(".sections-about-photo__card", {
          y: 80,
          rotation: 12,
          autoAlpha: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger,
        });

        // Parallax lives on its own wrapper so it never fights the entrance tween
        gsap.fromTo(
          ".sections-about-photo__parallax",
          { yPercent: 8 },
          {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="sections-about-photo rotate-3">
      <div className="sections-about-photo__parallax">
        <figure className="sections-about-photo__card flex flex-col gap-4 rounded-sm bg-paper-100 p-3 pb-5 text-ink-900 shadow-2xl">
          <div className="relative aspect-4/5 overflow-hidden bg-ink-800">
            <Image
              src={photo}
              alt={about.photoAlt}
              fill
              placeholder="blur"
              sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 40vw, 15rem"
              className="object-cover"
            />
          </div>
          <figcaption className="px-1 copy-meta text-taupe-600">{about.photoCaption}</figcaption>
        </figure>
      </div>
    </div>
  );
}
