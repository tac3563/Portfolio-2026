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
  currentSection: string;
};
