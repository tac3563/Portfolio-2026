"use client";

import { useRef } from "react";
import { header } from "@/content/header";
import { RollLink } from "@/components/layout/roll-link";
import { HeaderToggle } from "@/components/layout/header-toggle";
import { useHeaderFold } from "@/hooks/use-header-fold";
import { useHeaderMenu } from "@/hooks/use-header-menu";
import type { Link } from "@/types/site";

type HeaderProps = {
  role: string;
  nav: Link[];
};

export function Header({ role, nav }: HeaderProps) {
  const root = useRef<HTMLElement>(null);
  const fold = useHeaderFold(root);
  const menu = useHeaderMenu(root, fold);

  return (
    <header
      ref={root}
      data-expanded={menu.isExpanded || undefined}
      onKeyDown={menu.handleKeyDown}
      onBlur={menu.handleBlur}
      className="layout-header group/header"
    >
      <nav aria-label={header.navLabel}>
        <div className="fixed inset-x-0 top-0 z-40 flex container-page items-start justify-between gap-4 pt-3.75 text-paper-100 mix-blend-difference group-data-expanded/header:mix-blend-normal">
          <p className="layout-header__role border-y border-transparent py-3 heading-3xs md:py-2">
            {role}
          </p>
          <div className="relative">
            <span
              aria-hidden="true"
              className="layout-header__backdrop invisible absolute top-1/2 right-0 -translate-y-1/2 rounded-full border border-paper-100/20 bg-ink-900 max-md:hidden"
            />
            <ul
              id="layout-header-links"
              className="layout-header__links relative flex gap-4 border-y border-transparent py-2 heading-3xs max-md:invisible max-md:fixed max-md:inset-0 max-md:flex-col max-md:justify-center max-md:gap-2 max-md:bg-ink-900 max-md:px-6 max-md:heading-lg max-md:uppercase md:gap-6"
            >
              {nav.map((item) => (
                <li key={item.href} className="layout-header__item">
                  <RollLink
                    href={item.href}
                    label={item.label}
                    onClick={(event) => menu.handleLinkClick(event, item.href)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <HeaderToggle isExpanded={menu.isExpanded} onToggle={menu.toggleMenu} />
      </nav>
    </header>
  );
}
