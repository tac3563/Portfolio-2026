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
