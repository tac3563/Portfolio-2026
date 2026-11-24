"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ContactForm } from "@/components/sections/contact-form";
import { fullMotionQuery, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ContactLetter() {
  const root = useRef<HTMLDivElement>(null);
  const [round, setRound] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const scrollTrigger = { trigger: root.current, start: "top 85%", once: true };

      mm.add(reducedMotionQuery, () => {
        gsap.from(".sections-contact-letter__sheet", {
          autoAlpha: 0,
          duration: 0.4,
          scrollTrigger,
        });
      });

      mm.add(fullMotionQuery, () => {
        gsap
          .timeline({ scrollTrigger })
          .from(".sections-contact-letter__sheet", {
            y: 80,
            rotation: 2,
            autoAlpha: 0,
            duration: 1.4,
            ease: "expo.out",
          })
          .from(
            ".sections-contact-topics__chip",
            {
              y: -40,
              scale: 0.6,
              autoAlpha: 0,
              duration: 0.8,
              ease: "back.out(1.8)",
              stagger: 0.08,
            },
            0.5,
          );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="sections-contact-letter">
      <div className="sections-contact-letter__sheet rounded-3xl border border-paper-300 bg-paper-50 p-6 shadow-xl sm:p-10 lg:p-14">
        <ContactForm
          key={round}
          focusOnMount={round > 0}
          onSendAnother={() => setRound((current) => current + 1)}
        />
      </div>
    </div>
  );
}
