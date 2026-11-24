import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/config/site";
import { findPublishedProject, publishedProjects } from "@/content/projects";
import { CaseStudyHeader } from "@/components/case-study/header";
import { CaseStudyArticle } from "@/components/case-study/article";
import { Footer } from "@/components/layout/footer";

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = findPublishedProject(slug);
  if (!project) return {};

  const title = `${project.title} | ${site.name}`;
  const url = `/projects/${project.slug}`;

  return {
    title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description: project.summary },
    twitter: { card: "summary_large_image", title, description: project.summary },
  };
}

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <>
      <CaseStudyHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense>
          <CaseStudyArticle params={params} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
