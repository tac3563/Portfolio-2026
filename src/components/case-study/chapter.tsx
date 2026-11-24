import type { ReactNode } from "react";

type CaseStudyChapterProps = {
  id: string;
  heading: string;
  children: ReactNode;
};

export function CaseStudyChapter({ id, heading, children }: CaseStudyChapterProps) {
  return (
    <section
      aria-labelledby={id}
      className="case-study-chapter grid gap-6 border-t border-ink-800 pt-8 md:grid-cols-12 md:gap-12"
    >
      <h2 id={id} className="copy-label text-taupe-300 md:col-span-4">
        {heading}
      </h2>
      <div className="flex flex-col gap-6 md:col-span-8 lg:col-span-7">{children}</div>
    </section>
  );
}
