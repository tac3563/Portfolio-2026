"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { hero } from "@/content/hero";
import { useLocalTime } from "@/hooks/use-local-time";
import { fullMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP);

const emptyDigits = "--";

export function HeroStatus() {
  const root = useRef<HTMLDivElement>(null);
  const time = useLocalTime(hero.timeZone);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(fullMotionQuery, () => {
        gsap.to(".sections-hero-status__pulse", {
          scale: 3,
          autoAlpha: 0,
          duration: 1.6,
          ease: "power2.out",
          repeat: -1,
        });
        gsap.to(".sections-hero-status__colon", {
          autoAlpha: 0.15,
          duration: 0.5,
          ease: "steps(1)",
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="sections-hero-status flex flex-col gap-4 md:items-end md:text-right">
      <p className="flex items-center gap-3 copy-label text-muted">
        <span aria-hidden="true" className="relative flex size-2">
          <span className="sections-hero-status__pulse absolute inset-0 rounded-full bg-green-500" />
          <span className="relative size-2 rounded-full bg-green-600" />
        </span>
        {hero.availability}
      </p>
      <p className="optical-trim flex items-start heading-xl [--optical-trim:0.05em]">
        {time?.hours ?? emptyDigits}
        <span className="sections-hero-status__colon">:</span>
        {time?.minutes ?? emptyDigits}
        <span className="ml-2 copy-meta text-muted">{time?.seconds ?? emptyDigits}</span>
      </p>
      <p className="copy-meta text-muted">
        {hero.localTime} — {hero.timeZoneLabel}
      </p>
    </div>
  );
}
