import type { Link } from "@/types/site";

export type HeroContent = {
  name: string;
  intro: string;
  location: string;
  availability: string;
  localTime: string;
  timeZone: string;
  timeZoneLabel: string;
  contact: Link;
};

export type HeaderContent = {
  navLabel: string;
  menu: string;
  openMenu: string;
  closeMenu: string;
};

export type FooterContent = {
  backToTop: string;
};

export type Service = {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  file: string;
  language: string;
  code: string[];
};

export type ServicesContent = {
  label: string;
  heading: string;
  intro: string;
  services: Service[];
};

export type ProjectVideo = {
  mp4: string;
  webm?: string;
  poster: string;
};

export type ProjectStackItem = {
  name: string;
  reason: string;
};

export type ProjectChallenge = {
  title: string;
  body: string;
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  brief: string[];
  approach: string[];
  stack: ProjectStackItem[];
  challenges: ProjectChallenge[];
  outcome: string;
  metrics: ProjectMetric[];
};

type ProjectBase = {
  slug: string;
  title: string;
  summary: string;
  client: string;
  role: string;
  year: string;
  tags: string[];
  video?: ProjectVideo;
};

export type PublishedProject = ProjectBase & {
  status: "published";
  links: Link[];
  caseStudy: CaseStudy;
};

export type UpcomingProject = ProjectBase & {
  status: "upcoming";
};

export type Project = PublishedProject | UpcomingProject;

export type ProjectsContent = {
  label: string;
  heading: string;
  intro: string;
  viewCaseStudy: string;
  comingSoon: string;
  videoLabel: string;
  projects: Project[];
};

export type CaseStudyContent = {
  backToWork: string;
  work: string;
  client: string;
  role: string;
  year: string;
  brief: string;
  approach: string;
  stack: string;
  challenges: string;
  outcome: string;
  nextProject: string;
  opensInNewTab: string;
};
