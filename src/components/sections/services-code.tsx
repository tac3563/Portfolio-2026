"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { fullMotionQuery, reducedMotionQuery } from "@/lib/media";
import type { Service } from "@/types/content";

gsap.registerPlugin(useGSAP);

type ServicesCodeProps = {
  service: Service;
  position: string;
};

function isComment(line: string): boolean {
  return line.trimStart().startsWith("//");
}

export function ServicesCode({ service, position }: ServicesCodeProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ fullMotion: fullMotionQuery, reduceMotion: reducedMotionQuery }, (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };

        if (reduceMotion) {
          gsap.fromTo(
            ".sections-services-code__line",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.2 },
          );
          return;
        }

        gsap.fromTo(
          ".sections-services-code__line",
          { x: -12, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.03, ease: "power3.out" },
        );
        gsap.to(".sections-services-code__caret", {
          autoAlpha: 0,
          duration: 0.5,
          ease: "steps(1)",
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { dependencies: [service.id], scope: root, revertOnUpdate: true },
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="sections-services-code overflow-hidden rounded-2xl border border-ink-800 bg-ink-950"
    >
      <div className="flex items-center gap-4 border-b border-ink-800 px-5 py-4">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-taupe-700" />
          <span className="size-2.5 rounded-full bg-taupe-700" />
          <span className="size-2.5 rounded-full bg-ember-600" />
        </span>
        <span className="truncate copy-meta text-taupe-300">{service.file}</span>
      </div>
      <pre key={service.id} className="overflow-hidden px-5 py-6 copy-meta">
        <code className="grid">
          {service.code.map((line, index) => (
            <span
              key={`${service.id}-${index}`}
              className="sections-services-code__line flex gap-5 whitespace-pre"
            >
              <span className="w-5 shrink-0 text-right text-taupe-400">{index + 1}</span>
              <span className={isComment(line) ? "text-olive-500" : "text-paper-200"}>
                {line}
                {index === service.code.length - 1 && (
                  <span className="sections-services-code__caret text-ember-500">▍</span>
                )}
              </span>
            </span>
          ))}
        </code>
      </pre>
      <div className="flex justify-between border-t border-ink-800 px-5 py-3 copy-meta text-taupe-400">
        <span>{service.language}</span>
        <span>{position}</span>
      </div>
    </div>
  );
}
