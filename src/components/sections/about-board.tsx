"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { about } from "@/content/about";
import { finePointerQuery, fullMotionQuery, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin, ScrollTrigger);

const stickerStyles = [
  "-rotate-6 bg-ember-600 text-paper-100",
  "rotate-3 bg-paper-100 text-ink-900",
  "-rotate-2 bg-olive-500 text-ink-950",
  "rotate-6 bg-taupe-700 text-paper-100",
  "-rotate-3 bg-paper-300 text-ink-900",
  "rotate-2 bg-ember-500 text-ink-950",
  "-rotate-6 bg-paper-100 text-ink-900",
  "rotate-3 bg-olive-600 text-paper-100",
  "-rotate-2 bg-taupe-400 text-ink-950",
];

export function AboutBoard() {
  const root = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = about.interests.find((interest) => interest.id === selectedId);

  useGSAP(
    () => {
      const board = root.current?.querySelector<HTMLElement>(".sections-about-board__stickers");
      if (!board) return;

      const mm = gsap.matchMedia();
      const scrollTrigger = { trigger: board, start: "top 85%", once: true };

      mm.add(reducedMotionQuery, () => {
        gsap.from(".sections-about-board__sticker", { autoAlpha: 0, duration: 0.4, scrollTrigger });
      });

      mm.add(fullMotionQuery, () => {
        gsap.from(".sections-about-board__sticker", {
          y: -120,
          scale: 0.4,
          autoAlpha: 0,
          duration: 0.9,
          ease: "back.out(1.6)",
          stagger: { each: 0.06, from: "random" },
          scrollTrigger,
        });
      });

      mm.add(`${finePointerQuery} and ${fullMotionQuery}`, () => {
        const draggables = Draggable.create(".sections-about-board__sticker", {
          bounds: board,
          inertia: true,
          edgeResistance: 0.75,
          // Stickers are buttons, which Draggable ignores unless told otherwise
          dragClickables: true,
        });

        return () => draggables.forEach((draggable) => draggable.kill());
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="sections-about-board flex flex-col gap-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h3 className="heading-sm">{about.interestsHeading}</h3>
        <p className="copy-meta text-taupe-300">
          <span className="pointer-coarse:hidden">{about.interestsHintPointer}</span>
          <span className="hidden pointer-coarse:inline">{about.interestsHintTouch}</span>
        </p>
      </div>
      <ul className="sections-about-board__stickers flex min-h-80 flex-wrap content-center items-center justify-center gap-x-4 gap-y-6 rounded-3xl border border-dashed border-ink-800 p-8 md:p-12">
        {about.interests.map((interest, index) => (
          <li key={interest.id}>
            <button
              type="button"
              aria-pressed={interest.id === selectedId}
              aria-label={interest.label}
              onClick={() => setSelectedId(interest.id)}
              className={`sections-about-board__sticker cursor-grab rounded-full px-6 py-3 heading-2xs shadow-lg select-none active:cursor-grabbing aria-pressed:outline-2 aria-pressed:outline-offset-4 aria-pressed:outline-ember-500 ${stickerStyles[index % stickerStyles.length]}`}
            >
              {interest.label}
            </button>
          </li>
        ))}
      </ul>
      <p aria-live="polite" className="min-h-14 max-w-summary copy-lg text-pretty text-paper-100">
        {selected && (
          <>
            <span className="text-ember-500">{selected.label}.</span> {selected.fact}
          </>
        )}
      </p>
    </div>
  );
}
