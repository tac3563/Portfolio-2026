"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { contact } from "@/content/contact";
import { fillTemplate } from "@/lib/fill-template";
import { fullMotionQuery, reducedMotionQuery } from "@/lib/media";
import type { ContactValues } from "@/types/contact";

gsap.registerPlugin(useGSAP);

type ContactSentProps = {
  values: ContactValues;
  onSendAnother: () => void;
};

export function ContactSent({ values, onSendAnother }: ContactSentProps) {
  const root = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    heading.current?.focus();
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(reducedMotionQuery, () => {
        gsap.from(".sections-contact-sent__reveal, .sections-contact-sent__stamp", {
          autoAlpha: 0,
          duration: 0.4,
        });
      });

      mm.add(fullMotionQuery, () => {
        gsap
          .timeline()
          .from(".sections-contact-sent__stamp", {
            scale: 2.6,
            rotation: -40,
            autoAlpha: 0,
            duration: 0.7,
            ease: "back.out(2.2)",
          })
          .from(
            ".sections-contact-sent__reveal",
            { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08, ease: "expo.out" },
            0.2,
          );
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="sections-contact-sent flex min-h-96 flex-col items-start justify-center gap-8"
    >
      <p
        aria-hidden="true"
        className="sections-contact-sent__stamp flex size-28 -rotate-12 items-center justify-center rounded-full border-4 border-double border-ember-600 copy-label text-ember-600"
      >
        {contact.sentStamp}
      </p>
      <div className="flex flex-col gap-4">
        <h3
          ref={heading}
          tabIndex={-1}
          className="sections-contact-sent__reveal heading-sm text-balance"
        >
          {fillTemplate(contact.sentHeading, { name: values.name })}
        </h3>
        <p className="sections-contact-sent__reveal copy-lg text-pretty text-taupe-600">
          {fillTemplate(contact.sentBody, { email: values.email })}
        </p>
      </div>
      <button
        type="button"
        onClick={onSendAnother}
        className="sections-contact-sent__reveal rounded-full border-2 border-ink-900 px-6 py-3 heading-3xs uppercase hover:bg-ink-900 hover:text-paper-100 focus-visible:bg-ink-900 focus-visible:text-paper-100"
      >
        {contact.sendAnother}
      </button>
    </div>
  );
}
