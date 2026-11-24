"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { about } from "@/content/about";
import { fullMotionQuery } from "@/lib/media";
import type { AboutStat } from "@/types/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function formatStat(stat: AboutStat): string {
  return `${stat.value}${stat.suffix ?? ""}`;
}

export function AboutStats() {
  const root = useRef<HTMLDListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(fullMotionQuery, () => {
        const values = gsap.utils.toArray<HTMLElement>(".sections-about-stats__value");

        values.forEach((element, index) => {
          const stat = about.stats[index];
          const counter = { value: 0 };
          element.textContent = formatStat({ ...stat, value: 0 });

          gsap.to(counter, {
            value: stat.value,
            duration: 1.6,
            delay: index * 0.12,
            ease: "expo.out",
            onUpdate: () => {
              element.textContent = formatStat({ ...stat, value: Math.round(counter.value) });
            },
            scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
          });
        });

        return () => {
          values.forEach((element, index) => {
            element.textContent = formatStat(about.stats[index]);
          });
        };
      });
    },
    { scope: root },
  );

  return (
    <dl ref={root} className="sections-about-stats grid grid-cols-2 gap-x-6 gap-y-10">
      {about.stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse gap-2 border-t border-ink-800 pt-4">
          <dt className="copy-meta text-pretty text-taupe-300">{stat.label}</dt>
          <dd className="sections-about-stats__value heading-xl text-ember-500 tabular-nums">
            {formatStat(stat)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
