"use client";

import { useRef, type ReactNode } from "react";
import { useHeroIntro } from "@/hooks/use-hero-intro";
import { usePointerWeight } from "@/hooks/use-pointer-weight";

type HeroStageProps = {
  children: ReactNode;
};

export function HeroStage({ children }: HeroStageProps) {
  const root = useRef<HTMLDivElement>(null);
  useHeroIntro(root);
  usePointerWeight(root, ".sections-hero__letter");

  return (
    <div
      ref={root}
      className="sections-hero-stage flex min-h-svh container-page flex-col justify-end gap-10 pt-28 pb-8 md:gap-14 md:pb-10"
    >
      {children}
    </div>
  );
}
