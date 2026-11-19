"use client";

import { useRef, type MouseEvent } from "react";
import { useTextRoll } from "@/hooks/use-text-roll";
import type { Link } from "@/types/site";

type HeaderLinkProps = {
  link: Link;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function HeaderLink({ link, onClick }: HeaderLinkProps) {
  const root = useRef<HTMLAnchorElement>(null);
  useTextRoll(root, ".layout-header-link__label");

  return (
    <a ref={root} href={link.href} onClick={onClick} className="layout-header-link block">
      <span className="block overflow-hidden">
        <span className="layout-header-link__label block text-roll">{link.label}</span>
      </span>
    </a>
  );
}
