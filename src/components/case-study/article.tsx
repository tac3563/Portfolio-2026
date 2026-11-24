import { notFound } from "next/navigation";
import { findNextProject, findPublishedProject } from "@/content/projects";
import { CaseStudyHero } from "@/components/case-study/hero";
import { CaseStudyStory } from "@/components/case-study/story";
import { CaseStudyNextProject } from "@/components/case-study/next-project";

type CaseStudyArticleProps = {
  params: Promise<{ slug: string }>;
};

export async function CaseStudyArticle({ params }: CaseStudyArticleProps) {
  const { slug } = await params;
  const project = findPublishedProject(slug);
  if (!project) notFound();

  const nextProject = findNextProject(project.slug);

  return (
    <>
      <article aria-labelledby="case-study-heading" className="case-study-article">
        <CaseStudyHero project={project} />
        <CaseStudyStory story={project.caseStudy} />
      </article>
      {nextProject.slug !== project.slug && <CaseStudyNextProject project={nextProject} />}
    </>
  );
}
