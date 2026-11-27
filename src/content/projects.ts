import type { CaseStudyContent, ProjectsContent, PublishedProject } from "@/types/content";

export const projects: ProjectsContent = {
  label: "Selected work",
  heading: "Projects",
  intro:
    "Client sites and my own products. Each one has a short write-up on why and how I built it.",
  viewCaseStudy: "View case study",
  comingSoon: "Coming soon",
  videoLabel: "Screen recording of the site being scrolled",
  projects: [
    {
      slug: "unanima",
      status: "published",
      title: "Unanima",
      summary:
        "A bold, motion-led WordPress site for a charity that champions learning disabled and autistic artists.",
      client: "Unanima",
      role: "Developer",
      year: "2026",
      tags: ["WordPress", "GSAP", "Tailwind CSS"],
      award: "CSSDA Special Kudos",
      video: {
        mp4: "/projects/unanima/scroll.mp4",
        poster: "/projects/unanima/poster.webp",
      },
      links: [
        { label: "Visit site", href: "https://www.unanima.uk/" },
        { label: "View award", href: "https://www.cssdesignawards.com/sites/unanima/50324/" },
      ],
      caseStudy: {
        brief: [
          "Unanima is a registered charity and Arts Council England National Portfolio Organisation based in the East Midlands. Since 2006 it has developed learning disabled and autistic artists, toured devised theatre, run the OneFest fringe festival and campaigned through OneConversation, all under one belief: culture can't thrive until everyone can create it.",
          "Its old site didn't match that energy. The brief was a site as loud and unapologetic as the work, with the tagline “Designed to Disrupt”, that still stays clear and usable for the artists and audiences it exists for. As a non-profit, Unanima needed a site its small team could keep up to date without a developer.",
        ],
        approach: [
          "I built a custom WordPress theme from Framework's designs. Each section is a flexible content block, so the team can put together pages for programmes, events and campaigns from the same pieces the homepage uses.",
          "The motion carries the personality: a full-bleed hero video, a glitching logo lock-up, staggered card reveals and a scroll-driven wall of the charity's values with parallax photos of their artists. Lenis smooths the scroll so those moments land, and everything falls back to a calm, static page when someone asks for reduced motion.",
        ],
        stack: [
          {
            name: "WordPress",
            reason:
              "The charity's team already knew it, and a custom theme with flexible content blocks lets them run the site without paying for developer time.",
          },
          {
            name: "GSAP",
            reason:
              "ScrollTrigger runs the scroll-linked reveals and the values wall, with precise control over timing, easing and cleanup.",
          },
          {
            name: "Lenis",
            reason:
              "Smooth scrolling that stays in sync with ScrollTrigger, so the parallax and pinned moments feel deliberate rather than jumpy.",
          },
          {
            name: "Tailwind CSS",
            reason:
              "Kept a heavily art-directed design consistent across dozens of blocks, and purges down to a small stylesheet.",
          },
          {
            name: "Contact Form 7 & Turnstile",
            reason:
              "Enquiry and booking forms the team can edit themselves, protected from spam by Cloudflare Turnstile instead of a CAPTCHA puzzle.",
          },
        ],
        challenges: [
          {
            title: "Making disruptive design accessible",
            body: "The audience includes learning disabled and autistic people, so the bold visuals couldn't come at the cost of clarity. I kept copy in plain, readable type, made sure the motion never blocks content, and honoured prefers-reduced-motion throughout.",
          },
          {
            title: "Heavy media on a charity budget",
            body: "The site leans on video and large photos of performances. Lazy-loading, responsive images and compressed hero video keep it fast without the client paying for a premium media host.",
          },
          {
            title: "Handing over to a non-technical team",
            body: "Every animated section had to keep working however the team fills it in, whatever the copy length or number of cards, so the animations are built from the content rather than hard-coded to it.",
          },
        ],
        outcome:
          "The site earned a CSS Design Awards Special Kudos in October 2026, with judges scoring it 7.63 across UI, UX and innovation, and it gives Unanima a home online that matches the confidence of its work. What I learned: ambitious motion and accessibility aren't a trade-off when reduced motion and readable content are planned from the start, and a CMS built around the client's team matters as much as the design.",
        metrics: [],
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
      video: {
        mp4: "/projects/project-two/scroll.mp4",
        poster: "/projects/project-two/poster.webp",
      },
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
      video: {
        mp4: "/projects/project-three/scroll.mp4",
        poster: "/projects/project-three/poster.webp",
      },
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
