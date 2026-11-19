import type { ReactNode } from "react";

type ServicesStageProps = {
  children: ReactNode;
};

export function ServicesStage({ children }: ServicesStageProps) {
  return (
    <div className="sections-services-stage flex container-page flex-col gap-20 bg-ink-900 pt-24 pb-24 text-paper-100 md:gap-28 md:pt-32 md:pb-40">
      {children}
    </div>
  );
}
