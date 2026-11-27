import type { Link } from "@/types/site";

export type HeroContent = {
  name: string;
  introLead: string;
  intro: string;
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
  award?: string;
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

export type AboutStat = {
  value: number;
  suffix?: string;
  label: string;
};

export type AboutContent = {
  label: string;
  heading: string;
  intro: string;
  photoAlt: string;
  photoCaption: string;
  bio: string[];
  stats: AboutStat[];
};

export type ContactTopic = {
  id: string;
  label: string;
};

export type ContactErrorMessages = {
  nameRequired: string;
  nameTooLong: string;
  emailRequired: string;
  emailInvalid: string;
  topicRequired: string;
  messageTooShort: string;
  messageTooLong: string;
};

export type ContactContent = {
  label: string;
  heading: string;
  intro: string;
  detailsLabel: string;
  statusLabel: string;
  status: string;
  basedLabel: string;
  based: string;
  elsewhereLabel: string;
  opensInNewTab: string;
  cvLabel: string;
  cvLink: string;
  cvFileType: string;
  formLabel: string;
  greeting: string;
  namePrompt: string;
  nameLabel: string;
  namePlaceholder: string;
  topicPrompt: string;
  topicLegend: string;
  topics: ContactTopic[];
  emailPrompt: string;
  emailLabel: string;
  emailPlaceholder: string;
  messagePrompt: string;
  messageLabel: string;
  messagePlaceholder: string;
  signOff: string;
  honeypotLabel: string;
  submit: string;
  sending: string;
  errorSummaryHeading: string;
  sendFailed: string;
  errors: ContactErrorMessages;
  sentStamp: string;
  sentHeading: string;
  sentBody: string;
  sendAnother: string;
  emailSubject: string;
};
