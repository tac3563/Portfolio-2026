# portfolio-2026

Next.js 16 (App Router, Cache Components), React 19, Tailwind v4, GSAP + ScrollTrigger, TypeScript. Builds on the global `CLAUDE.md`. `AGENTS.md` is rewritten by `next dev`, so put project instructions here.

## Structure

| Folder                     | Holds                                                           |
| -------------------------- | --------------------------------------------------------------- |
| `src/app/`                 | Routes, root layout, `globals.css` (theme tokens and utilities) |
| `src/components/layout/`   | Site-wide chrome: header, footer                                |
| `src/components/sections/` | Page sections, e.g. hero                                        |
| `src/actions/`             | Server Functions (`'use server'`), e.g. the contact form        |
| `src/hooks/`               | Custom hooks, one per file, named after what they achieve       |
| `src/lib/`                 | Framework-agnostic helpers, e.g. media queries, fonts           |
| `src/content/`             | User-facing copy, typed by `src/types/content.ts`               |
| `src/config/`              | Site config (name, nav, socials), typed by `src/types/site.ts`  |
| `src/types/`               | Shared types                                                    |
| `src/styles/`              | Typography utilities imported by `globals.css`                  |

## Conventions

- There's no i18n setup yet. Put user-facing strings in `src/content/*.ts`, not hardcoded in components, so they can be translated later.
- The root CSS class follows the folder path, e.g. `components/layout/header.tsx` → `layout-header`, `components/sections/hero.tsx` → `sections-hero`. This replaces the global `site-` / `shared-` prefixes.
- Use the `container-page` utility for page width.
- Breakpoint queries used in JS live in `src/lib/media.ts` and must match Tailwind's breakpoints.

## Workflow

- Branch from `main` as `feature/<name>`, and merge back by pull request.
- Checks: `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npx next build` after CSS or config changes.
