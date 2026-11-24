"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { about } from "@/content/about";
import photo from "@/images/about-tom.jpg";
import { finePointerQuery, fullMotionQuery, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function AboutPhoto() {
  const root = useRef<HTMLDivElement>(null);
  const straighten = useRef<gsap.core.Tween>(null);

  useGSAP(
    () => {
      const card = root.current?.querySelector<HTMLElement>(".sections-about-photo__card");
      if (!card) return;

      const mm = gsap.matchMedia();
      const scrollTrigger = { trigger: root.current, start: "top 80%", once: true };

      mm.add(reducedMotionQuery, () => {
        gsap.from(card, { autoAlpha: 0, duration: 0.4, scrollTrigger });
      });

      mm.add(fullMotionQuery, () => {
        gsap.from(card, {
          y: 80,
          rotation: -12,
          autoAlpha: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger,
        });
      });

      mm.add(`${finePointerQuery} and ${fullMotionQuery}`, () => {
        // The frame sits at -3deg, so +3deg on the card straightens it
        const tiltTo = (rotation: number, scale: number) => {
          straighten.current?.kill();
          straighten.current = gsap.to(card, {
            rotation,
            scale,
            duration: 0.6,
            ease: "power3.out",
          });
        };

        const handlePointerEnter = () => tiltTo(3, 1.03);
        const handlePointerLeave = () => tiltTo(0, 1);

        card.addEventListener("pointerenter", handlePointerEnter);
        card.addEventListener("pointerleave", handlePointerLeave);

        return () => {
          card.removeEventListener("pointerenter", handlePointerEnter);
          card.removeEventListener("pointerleave", handlePointerLeave);
          straighten.current?.kill();
        };
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="sections-about-photo -rotate-3">
      <figure className="sections-about-photo__card flex flex-col gap-4 rounded-sm bg-paper-100 p-3 pb-5 text-ink-900 shadow-2xl">
        <div className="relative aspect-4/5 overflow-hidden bg-ink-800">
          <Image
            src={photo}
            alt={about.photoAlt}
            fill
            placeholder="blur"
            sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 40vw, 20rem"
            className="object-cover"
          />
        </div>
        <figcaption className="px-1 copy-meta text-taupe-600">{about.photoCaption}</figcaption>
      </figure>
    </div>
  );
}
