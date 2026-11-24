import type { CaseStudyContent, ProjectsContent, PublishedProject } from "@/types/content";

export const projects: ProjectsContent = {
  label: "Selected work",
  heading: "Projects",
  intro:
    "Recent client sites and my own products, each with a short case study on why and how it was built.",
  viewCaseStudy: "View case study",
  comingSoon: "Coming soon",
  videoLabel: "Screen recording of the site being scrolled",
  projects: [
    {
      slug: "project-one",
      status: "published",
      title: "Project one",
      summary: "Placeholder: a one-line pitch for what this project is and who it's for.",
      client: "Placeholder client",
      role: "Full-stack developer",
      year: "2026",
      tags: ["Laravel", "Vue", "Tailwind CSS"],
      video: {
        mp4: "/projects/project-one/scroll.mp4",
        poster: "/projects/project-one/poster.jpg",
      },
      links: [{ label: "Visit site", href: "https://example.com" }],
      caseStudy: {
        brief: [
          "Placeholder: what problem did the client or users have, and why did this need building?",
          "Placeholder: any constraints, such as budget, deadline, existing systems or team size.",
        ],
        approach: [
          "Placeholder: the key decisions you made and the trade-offs behind them.",
          "Placeholder: how you structured the build, from data model to components.",
        ],
        stack: [
          { name: "Laravel", reason: "Placeholder: why this tool was the right choice." },
          { name: "Vue", reason: "Placeholder: why this tool was the right choice." },
          { name: "Tailwind CSS", reason: "Placeholder: why this tool was the right choice." },
        ],
        challenges: [
          {
            title: "Placeholder challenge",
            body: "Placeholder: a technical problem you hit and how you solved it.",
          },
        ],
        outcome: "Placeholder: what changed once it launched.",
        metrics: [
          { value: "100", label: "Lighthouse performance" },
          { value: "0.8s", label: "Largest Contentful Paint" },
        ],
      },
    },
    {
      slug: "project-two",
      status: "published",
      title: "Project two",
      summary: "Placeholder: a one-line pitch for what this project is and who it's for.",
      client: "Personal project",
      role: "Design & development",
      year: "2026",
      tags: ["Next.js", "TypeScript", "GSAP"],
      links: [{ label: "Visit site", href: "https://example.com" }],
      caseStudy: {
        brief: ["Placeholder: why you built this."],
        approach: ["Placeholder: how you approached it."],
        stack: [
          { name: "Next.js", reason: "Placeholder: why this tool was the right choice." },
          { name: "GSAP", reason: "Placeholder: why this tool was the right choice." },
        ],
        challenges: [
          {
            title: "Placeholder challenge",
            body: "Placeholder: a technical problem you hit and how you solved it.",
          },
        ],
        outcome: "Placeholder: what you learned or what it achieved.",
        metrics: [],
      },
    },
    {
      slug: "project-three",
      status: "upcoming",
      title: "Project three",
      summary: "Placeholder: an agency build launching soon. Case study to follow.",
      client: "Placeholder client",
      role: "Front-end developer",
      year: "2026",
      tags: ["WordPress", "ACF", "GSAP"],
    },
  ],
};

export const caseStudy: CaseStudyContent = {
  backToWork: "Back to work",
  work: "Work",
  client: "Client",
  role: "Role",
  year: "Year",
  brief: "The brief",
  approach: "Approach",
  stack: "Stack",
  challenges: "Challenges",
  outcome: "Outcome",
  nextProject: "Next project",
  opensInNewTab: "(opens in a new tab)",
};

export const publishedProjects: PublishedProject[] = projects.projects.filter(
  (project): project is PublishedProject => project.status === "published",
);

export function findPublishedProject(slug: string): PublishedProject | undefined {
  return publishedProjects.find((project) => project.slug === slug);
}

export function findNextProject(slug: string): PublishedProject {
  const index = publishedProjects.findIndex((project) => project.slug === slug);

  return publishedProjects[(index + 1) % publishedProjects.length];
}
