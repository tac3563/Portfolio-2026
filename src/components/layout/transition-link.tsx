"use client";

import type { FocusEvent, MouseEvent, PointerEvent, ReactNode, Ref } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { coverPage } from "@/lib/page-transition";

type TransitionLinkProps = {
  href: string;
  label: string;
  className?: string;
  ariaLabel?: string;
  ref?: Ref<HTMLAnchorElement>;
  onPointerEnter?: (event: PointerEvent<HTMLAnchorElement>) => void;
  onPointerLeave?: (event: PointerEvent<HTMLAnchorElement>) => void;
  onFocus?: (event: FocusEvent<HTMLAnchorElement>) => void;
  onBlur?: (event: FocusEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
};

function isPlainClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export function TransitionLink({
  href,
  label,
  className,
  ariaLabel,
  ref,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  children,
}: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isPlainClick(event)) return;

    const destination = new URL(href, window.location.href);
    if (destination.pathname === window.location.pathname) return;

    event.preventDefault();
    await coverPage(label);
    router.push(href);
  };

  return (
    <NextLink
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      className={className}
      onClick={handleClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </NextLink>
  );
}
