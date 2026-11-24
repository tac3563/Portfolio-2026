"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { registerTransitionOverlay, revealPage } from "@/lib/page-transition";

export function PageTransition() {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    registerTransitionOverlay(root.current);
    return () => registerTransitionOverlay(null);
  }, []);

  useEffect(() => {
    revealPage();
  }, [pathname]);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="layout-page-transition invisible fixed inset-0 z-50 flex container-page items-end bg-ink-900 pb-10 text-paper-100"
    >
      <p className="overflow-hidden">
        <span className="layout-page-transition__label block heading-xl uppercase" />
      </p>
    </div>
  );
}
