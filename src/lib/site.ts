// Central place for site-wide content and metadata. Edit these first.

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  name: "Your Name",
  title: "Your Name — Developer & Designer",
  description:
    "Portfolio of Your Name, a developer and designer building fast, accessible interfaces.",
  url: productionHost ? `https://${productionHost}` : "http://localhost:3000",
  nav: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
} as const;
