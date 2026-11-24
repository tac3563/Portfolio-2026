import type { AboutContent } from "@/types/content";

export const about: AboutContent = {
  label: "About",
  heading: "Hi, I'm Tom",
  intro:
    "A developer who loves building things and getting creative. Open to remote roles and freelance projects.",
  photoAlt: "Tom laughing in a back garden at night, swinging a sparkler",
  photoCaption: "Making sparks fly, on screen and off",
  bio: [
    "I'm a full-stack developer with five years of experience, most of it in agencies where good work had to ship on time. I use AI-assisted development day to day, with agentic tools like Claude Code, while still reviewing and owning all the code I deliver.",
    "I really enjoy making fun, playful frontends, the kind with motion and small details people want to poke at. Most of my learning time now goes on the backend, though: Laravel, Inertia and what it takes to build and run a SaaS product.",
  ],
  stats: [
    { value: 5, label: "Years building for the web" },
    { value: 4, label: "Marathons finished" },
    { value: 17, suffix: "+", label: "Books read this year" },
    { value: 1, label: "House, and a growing DIY list" },
  ],
  principlesHeading: "How I work",
  principles: [
    {
      title: "Steady, reliable pace",
      body: "Marathon training taught me that consistency beats sprints, so I hit deadlines without cutting corners.",
    },
    {
      title: "Talk early, talk often",
      body: "I share progress early and flag problems as soon as I spot them, so there are no surprises.",
    },
    {
      title: "Always learning",
      body: "Between books, new tools and side projects, I'm always keeping up with the latest stacks.",
    },
    {
      title: "Leave it better",
      body: "Like a first house, a codebase always needs more care, so I tidy up as I go.",
    },
  ],
  interestsHeading: "Off the clock",
  interestsHintPointer: "Drag them around, or click one to find out more.",
  interestsHintTouch: "Tap one to find out more.",
  interests: [
    {
      id: "guitar",
      label: "Guitar",
      fact: "Placeholder: what you play, or the song you're learning.",
    },
    { id: "marathons", label: "Marathons", fact: "Placeholder: your best time or favourite race." },
    { id: "books", label: "Books", fact: "Placeholder: the best book you've read this year." },
    { id: "movies", label: "Movies", fact: "Placeholder: your all-time favourite film." },
    { id: "hiking", label: "Hiking", fact: "Placeholder: the best trail you've walked." },
    { id: "camping", label: "Camping", fact: "Placeholder: your favourite place to pitch a tent." },
    { id: "travel", label: "Travel", fact: "Placeholder: the last place you travelled to." },
    { id: "lifting", label: "Lifting", fact: "Placeholder: the lift you're working on." },
    { id: "house", label: "First house", fact: "Placeholder: the DIY project you're proudest of." },
  ],
  cvPrompt: "Prefer the full picture?",
  cvLink: "Download my CV",
  cvFileType: "(PDF)",
};
