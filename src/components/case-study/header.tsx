import { header } from "@/content/header";
import { CaseStudyBackLink } from "@/components/case-study/back-link";

export function CaseStudyHeader() {
  return (
    <header className="case-study-header">
      <nav
        aria-label={header.navLabel}
        className="flex h-16 container-page items-center justify-start gap-4 heading-3xs"
      >
        <CaseStudyBackLink />
      </nav>
    </header>
  );
}
