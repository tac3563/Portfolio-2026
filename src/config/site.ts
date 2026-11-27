import type { SiteConfig } from "@/types/site";

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site: SiteConfig = {
  name: "Tom Cox",
  title: "Tom Cox | Full-Stack Developer in Nottingham, UK",
  role: "Full-stack developer",
  locality: "Nottingham",
  country: "GB",
  skills: ["Laravel", "PHP", "React", "Next.js", "Vue", "TypeScript", "WordPress", "Statamic"],
  description:
    "Tom Cox is a full-stack developer in Nottingham, UK, building fast, accessible websites and web apps with Laravel, React and Next.js.",
  url: productionHost ? `https://${productionHost}` : "http://localhost:3000",
  nav: [
    { label: "Home", href: "#top" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact-form" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/tac3563" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tom-cox-a2b357215/" },
  ],
  cvHref: "/tom-cox-cv.pdf",
};
