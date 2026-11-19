"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { services } from "@/content/services";
import { ServicesCode } from "@/components/sections/services-code";
import { useActiveItem } from "@/hooks/use-active-item";
import { fullMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function formatServiceNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function ServicesList() {
  const root = useRef<HTMLDivElement>(null);
  const activeIndex = useActiveItem(root, ".sections-services-list__item");
  const activeService = services.services[activeIndex];
  const total = formatServiceNumber(services.services.length - 1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(fullMotionQuery, () => {
        gsap.utils.toArray<HTMLElement>(".sections-services-list__item").forEach((item) => {
          gsap.fromTo(
            item.querySelector(".sections-services-list__progress"),
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top center",
                end: "bottom center",
                scrub: true,
              },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="sections-services-list grid gap-x-12 lg:grid-cols-12">
      <ol className="lg:col-span-6 xl:col-span-7">
        {services.services.map((service, index) => (
          <li
            key={service.id}
            data-active={index === activeIndex || undefined}
            className="sections-services-list__item group relative grid gap-6 border-t border-ink-800 pt-8 pb-16 md:grid-cols-7 md:pb-24 lg:pb-40"
          >
            <span
              aria-hidden="true"
              className="sections-services-list__progress absolute inset-x-0 -top-px h-px origin-left bg-paper-300 motion-reduce:hidden"
            />
            <p
              aria-hidden="true"
              className="copy-meta text-taupe-300 group-data-active:text-ember-500 md:col-span-1"
            >
              {formatServiceNumber(index)}
            </p>
            <div className="flex flex-col gap-6 md:col-span-6">
              <h3 className="heading-lg text-balance">{service.title}</h3>
              <p className="max-w-xl copy-lg text-pretty text-taupe-300">{service.summary}</p>
              <ul className="flex flex-wrap gap-2">
                {service.stack.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-ink-800 px-3.5 py-1.5 copy-meta text-paper-200"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <div className="hidden lg:col-span-6 lg:block xl:col-span-5">
        <div className="sticky top-24">
          <ServicesCode
            service={activeService}
            position={`${formatServiceNumber(activeIndex)} / ${total}`}
          />
        </div>
      </div>
    </div>
  );
}
