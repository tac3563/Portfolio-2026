"use client";

import { useRef, type MouseEvent } from "react";
import { useFormStatus } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { contact } from "@/content/contact";
import { useMagnetic } from "@/hooks/use-magnetic";
import { matchesMedia, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP);

export function ContactSubmit() {
  const { pending } = useFormStatus();
  const root = useRef<HTMLButtonElement>(null);
  const arrow = useRef<SVGSVGElement>(null);
  const arrowTween = useRef<gsap.core.Tween>(null);
  useMagnetic(root);

  useGSAP(() => () => arrowTween.current?.kill(), { scope: root });

  const turnArrow = (rotate: number) => {
    arrowTween.current?.kill();
    arrowTween.current = gsap.to(arrow.current, {
      rotate,
      duration: matchesMedia(reducedMotionQuery) ? 0 : 0.4,
      ease: "power3.out",
    });
  };

  // aria-disabled rather than disabled, so keyboard focus stays on the button while sending
  const preventResubmit = (event: MouseEvent<HTMLButtonElement>) => {
    if (pending) event.preventDefault();
  };

  return (
    <button
      ref={root}
      type="submit"
      aria-disabled={pending}
      onClick={preventResubmit}
      onPointerEnter={() => turnArrow(45)}
      onPointerLeave={() => turnArrow(0)}
      onFocus={() => turnArrow(45)}
      onBlur={() => turnArrow(0)}
      className="sections-contact-submit inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-ink-900 py-3.5 pr-5 pl-6 heading-3xs text-paper-100 uppercase hover:bg-ember-600 focus-visible:bg-ember-600 aria-disabled:cursor-progress aria-disabled:bg-taupe-600"
    >
      {pending ? contact.sending : contact.submit}
      <svg
        ref={arrow}
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="size-4"
      >
        <path d="M4 12L12 4M6 4h6v6" />
      </svg>
    </button>
  );
}
