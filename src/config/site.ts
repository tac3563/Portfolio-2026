import type { SiteConfig } from "@/types/site";

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site: SiteConfig = {
  name: "Tom Cox",
  title: "Tom Cox | Full Stack Developer",
  role: "Full Stack Developer",
  description: "Portfolio of Tom Cox, a full-stack developer building fast, accessible interfaces.",
  url: productionHost ? `https://${productionHost}` : "http://localhost:3000",
  nav: [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
};
