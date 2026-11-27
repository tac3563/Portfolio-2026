import type { AboutContent } from "@/types/content";

export const about: AboutContent = {
  label: "About",
  heading: "Hi, I'm Tom",
  intro:
    "Sport science grad who loves to code and look after body and mind. Healthy mind, healthy body, better code.",
  photoAlt: "Tom laughing in a back garden at night, swinging a sparkler",
  photoCaption: "Sparklers in the back garden",
  bio: [
    "I take real pride in my work. I put everything into the projects I take on, sweat the small details and don't call anything finished until it's right.",
    "Working that hard only works if I recharge properly. Running and lifting keep me healthy, and marathon training keeps me consistent. To switch off, I'll pick up a book, my guitar or a good film.",
    "Whenever I can, I get outdoors, whether that's a long hike, a few nights camping or travelling somewhere new. At home there's a first house and a DIY list that keeps growing. It all keeps me at my best when I'm back at my desk.",
  ],
  stats: [
    { value: 4, label: "Marathons finished" },
    { value: 17, suffix: "+", label: "Books read this year" },
    { value: 8, label: "Nights in a tent" },
    { value: 1, label: "House, and a growing DIY list" },
  ],
};
