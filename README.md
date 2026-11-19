# Portfolio 2026

Single-page developer/design portfolio. Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, GSAP (ScrollTrigger + SplitText) and Lenis. Deployed on Vercel.

## Scripts

| Command             | Purpose                           |
| ------------------- | --------------------------------- |
| `npm run dev`       | Dev server on :3000               |
| `npm run build`     | Production build                  |
| `npm run start`     | Serve the production build        |
| `npm run lint`      | ESLint                            |
| `npm run typecheck` | `tsc --noEmit`                    |
| `npm run format`    | Prettier (sorts Tailwind classes) |

## Structure

```
src/
  app/                 layout (metadata, fonts, skip link), page, robots, sitemap, globals.css (tokens)
  lib/site.ts          name, copy, nav, socials, site URL — edit first
  lib/gsap.ts          registers GSAP plugins; import gsap from here
  components/
    providers/         SmoothScroll (Lenis synced to GSAP ticker)
    motion/            Reveal, SplitHeading — scroll animations
    layout/            Header, Footer
    sections/          Hero, About, Work, Contact
```

## Animation rules

- Sections are server components; only the `motion/` wrappers are client components.
- Wrap GSAP work in `gsap.matchMedia()` with `FULL_MOTION` so it's skipped under `prefers-reduced-motion`. Lenis is disabled there too.
- The hero is the LCP element, so its entrance is CSS (`animate-enter`), not GSAP. Don't hide above-the-fold content until JS runs.
- Animate `transform` and `opacity` only.

## Deploy

Import the repo in Vercel; no config is needed. `site.url` picks up `VERCEL_PROJECT_PRODUCTION_URL` automatically, and that includes your custom domain once one is added.
