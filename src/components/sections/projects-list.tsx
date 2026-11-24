"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "@/content/projects";
import { ProjectsCard } from "@/components/sections/projects-card";
import { fullMotionQuery, tabletUpQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function formatProjectNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function ProjectsList() {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(`${tabletUpQuery} and ${fullMotionQuery}`, () => {
        const items = gsap.utils.toArray<HTMLElement>(".sections-projects-list__item");

        items.slice(0, -1).forEach((item, index) => {
          gsap.to(item.querySelector(".sections-projects-card"), {
            scale: 0.94,
            autoAlpha: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: items[index + 1],
              start: "top bottom",
              end: "top top+=96",
              scrub: true,
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
          className="sections-projects-list__item md:sticky md:top-24 md:pb-16 md:last:min-h-svh"
        >
          <div className="md:sticky md:top-24">
            <ProjectsCard project={project} number={formatProjectNumber(index)} />
          </div>
        </li>
      ))}
    </ol>
  );
}
