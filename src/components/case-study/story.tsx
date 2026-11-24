import { caseStudy } from "@/content/projects";
import { CaseStudyChapter } from "@/components/case-study/chapter";
import type { CaseStudy } from "@/types/content";

type CaseStudyStoryProps = {
  story: CaseStudy;
};

export function CaseStudyStory({ story }: CaseStudyStoryProps) {
  return (
    <div className="case-study-story bg-ink-900 text-paper-100">
      <div className="flex container-page flex-col gap-20 pt-24 pb-24 md:gap-28 md:pt-32 md:pb-40">
        <CaseStudyChapter id="case-study-brief" heading={caseStudy.brief}>
          {story.brief.map((paragraph) => (
            <p key={paragraph} className="copy-lg text-pretty">
              {paragraph}
            </p>
          ))}
        </CaseStudyChapter>

        <CaseStudyChapter id="case-study-approach" heading={caseStudy.approach}>
          {story.approach.map((paragraph) => (
            <p key={paragraph} className="copy-lg text-pretty">
              {paragraph}
            </p>
          ))}
        </CaseStudyChapter>

        <CaseStudyChapter id="case-study-stack" heading={caseStudy.stack}>
          <dl className="flex flex-col">
            {story.stack.map((item) => (
              <div
                key={item.name}
                className="grid gap-2 border-b border-ink-800 py-5 first:pt-0 md:grid-cols-7 md:gap-6"
              >
                <dt className="heading-2xs md:col-span-2">{item.name}</dt>
                <dd className="copy-md text-pretty text-taupe-300 md:col-span-5">{item.reason}</dd>
              </div>
            ))}
          </dl>
        </CaseStudyChapter>

        {story.challenges.length > 0 && (
          <CaseStudyChapter id="case-study-challenges" heading={caseStudy.challenges}>
            {story.challenges.map((challenge) => (
              <div key={challenge.title} className="flex flex-col gap-3">
                <h3 className="heading-xs text-balance">{challenge.title}</h3>
                <p className="copy-md text-pretty text-taupe-300">{challenge.body}</p>
              </div>
            ))}
          </CaseStudyChapter>
        )}

        <CaseStudyChapter id="case-study-outcome" heading={caseStudy.outcome}>
          <p className="copy-lg text-pretty">{story.outcome}</p>
          {story.metrics.length > 0 && (
            <dl className="grid grid-cols-2 gap-6 md:grid-cols-3">
              {story.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-col-reverse gap-2 border-t border-ink-800 pt-4"
                >
                  <dt className="copy-meta text-taupe-300">{metric.label}</dt>
                  <dd className="heading-md text-ember-500">{metric.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </CaseStudyChapter>
      </div>
    </div>
  );
}
