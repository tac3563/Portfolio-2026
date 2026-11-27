"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "@/content/projects";
import { ProjectsCard } from "@/components/sections/projects-card";
import { useActiveItem } from "@/hooks/use-active-item";
import { fullMotionQuery, tabletUpQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CARRY_SHADOW = "0 40px 80px -24px rgb(20 17 14 / 0.35)";
const REST_SHADOW = "0 0px 0px 0px rgb(20 17 14 / 0)";

function formatProjectNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

// Where a sticky item settles, read from CSS so the triggers line up with it.
function stickyEnd(item: HTMLElement): string {
  return `top top+=${parseFloat(getComputedStyle(item).top) || 0}`;
}

export function ProjectsList() {
  const root = useRef<HTMLOListElement>(null);
  const activeIndex = useActiveItem(root, ".sections-projects-list__item");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(`${tabletUpQuery} and ${fullMotionQuery}`, () => {
        const items = gsap.utils.toArray<HTMLElement>(".sections-projects-list__item");

        items.forEach((item, index) => {
          const holder = item.querySelector<HTMLElement>(".sections-projects-list__holder");
          const card = item.querySelector<HTMLElement>(".sections-projects-card");
          if (!holder || !card) return;

          // Placing: the card arrives casting a shadow that fades as it lands flush on the pile.
          if (index > 0) {
            gsap.fromTo(
              holder,
              { boxShadow: CARRY_SHADOW },
              {
                boxShadow: REST_SHADOW,
                ease: "power1.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top bottom",
                  end: () => stickyEnd(item),
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              },
            );
          }

          const next = items[index + 1];
          if (!next) return;

          // Resting: once the next card is placed on top, this one's contents dim.
          // The contents fade, not the card, so its opaque background still hides the pile.
          gsap.to(card.children, {
            opacity: 0.15,
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: () => stickyEnd(next),
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <ol ref={root} className="sections-projects-list flex flex-col gap-6 md:gap-0">
      {projects.projects.map((project, index) => (
        <li
          key={project.slug}
          data-active={index === activeIndex || undefined}
          className="sections-projects-list__item group/project md:sticky md:top-24 md:pb-16 md:last:min-h-svh"
        >
          <div className="sections-projects-list__holder rounded-3xl md:sticky md:top-24">
            <ProjectsCard project={project} number={formatProjectNumber(index)} />
          </div>
        </li>
      ))}
    </ol>
  );
}
