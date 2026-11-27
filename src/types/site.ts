export type Link = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  title: string;
  role: string;
  locality: string;
  country: string;
  skills: string[];
  description: string;
  url: string;
  nav: Link[];
  socials: Link[];
  cvHref: string;
};
