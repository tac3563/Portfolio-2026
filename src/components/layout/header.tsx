"use client";

import { useRef } from "react";
import { header } from "@/content/header";
import { HeaderToggle } from "@/components/layout/header-toggle";
import { useActiveSection } from "@/hooks/use-active-section";
import { useHeaderFold } from "@/hooks/use-header-fold";
import { useHeaderMenu } from "@/hooks/use-header-menu";
import type { Link } from "@/types/site";

type HeaderProps = {
  role: string;
  nav: Link[];
};

export function Header({ role, nav }: HeaderProps) {
  const root = useRef<HTMLElement>(null);
  const activeIndex = useActiveSection(nav);
  const activeLabel = activeIndex === null ? header.menu : nav[activeIndex].label;
  const fold = useHeaderFold(root);
  const menu = useHeaderMenu(root, fold);

  return (
    <header
      ref={root}
      data-expanded={menu.isExpanded || undefined}
      onKeyDown={menu.handleKeyDown}
      onBlur={menu.handleBlur}
      className="layout-header fixed inset-x-0 top-0 z-40 text-paper-100 mix-blend-difference menu-overlay:mix-blend-normal"
    >
      <nav
        aria-label={header.navLabel}
        className="container-page flex h-16 items-center justify-between gap-4"
      >
        <a href="#top" className="layout-header__role heading-3xs">
          {role}
        </a>
        <div className="relative">
          <ul
            id="layout-header-links"
            className="layout-header__links relative flex gap-4 heading-3xs md:gap-6 menu-overlay:fixed menu-overlay:inset-0 menu-overlay:flex-col menu-overlay:justify-center menu-overlay:gap-2 menu-overlay:bg-ink-900 menu-overlay:px-6 menu-overlay:heading-lg menu-overlay:uppercase"
          >
            {nav.map((item) => (
              <li key={item.href} className="layout-header__item">
                <a href={item.href} onClick={(event) => menu.handleLinkClick(event, item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <HeaderToggle
            activeIndex={activeIndex}
            label={activeLabel}
            isExpanded={menu.isExpanded}
            onToggle={menu.toggleMenu}
          />
        </div>
      </nav>
    </header>
  );
}
