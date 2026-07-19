# Deva Mithran — Portfolio

A comic/manga-inspired, game-menu-styled portfolio built with Next.js 15, React 19,
TypeScript, Tailwind, and Framer Motion.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000. Requires internet access on first `npm run build` /
`npm run dev` so Next.js can fetch the Google Fonts (Anton, Bebas Neue, Space
Grotesk, Oswald) — this sandbox blocked that domain, so the build here was
verified with fonts stubbed out; it will fetch normally on your machine or on
Vercel.

## Folder structure

```
app/
  layout.tsx        Root layout: fonts, smooth-scroll provider, cursor, grain overlay
  page.tsx           Assembles all sections in order
  globals.css        Design tokens, comic-panel utilities, accessibility rules
components/
  GameMenu.tsx        Fixed nav + fullscreen RPG-style command menu
  Hero.tsx            Landing hero: kinetic typography, parallax, floating shapes
  MarqueeStrip.tsx     Scrolling divider strip between sections
  About.tsx            Comic panels sliding in from random directions
  Skills.tsx           SVG radar chart + animated skill tags
  ProjectCard.tsx       Single tilting "collectible card" project
  Projects.tsx          Project grid + fullscreen project detail transition
  Timeline.tsx          Vertical manga-chapter-style story timeline
  Contact.tsx           "Mission complete" contact form
  CustomCursor.tsx      Custom cursor that morphs shape (view/link states)
  SmoothScrollProvider.tsx   Lenis smooth-scroll wrapper
hooks/
  useMagneticCursor.ts  Cursor position tracking + state, skipped on touch
lib/
  content.ts            All copy/data in one place — edit this to update content
```

## Design tokens

Defined in `tailwind.config.ts`:
- Colors: `ink` (#000), `paper` (#fff), `blood` (#E30613), `cyan`, `pink`, `yellow`, `panel`, `smoke`
- Fonts: `font-display` (Anton), `font-bebas` (Bebas Neue), `font-body` (Space Grotesk), `font-caption` (Oswald)
- Custom utilities in `globals.css`: `.panel-frame` (comic panel border+shadow), `.ink-outline` (stroked text), `.halftone-overlay`, `.torn-bottom`, `.speed-lines`, `.grain`

## What's implemented vs. simplified from the original brief

Fully implemented: kinetic hero typography, mouse parallax, floating comic
shapes, RPG fullscreen command menu, custom morphing cursor, Lenis smooth
scroll, comic-panel About section, SVG radar skills chart with hover
"explosions", tilting collectible project cards with fullscreen detail
transitions, manga-style vertical timeline, mission-complete contact form,
scroll-triggered reveals throughout, reduced-motion support, visible focus
states, and a fully responsive layout down to mobile.

Simplified/omitted (both flagged as optional in the brief, and cut to protect
performance and load time rather than chase every micro-interaction):
- **React Three Fiber hero effects** — omitted. A WebGL layer here would add
  meaningfully to bundle size and GPU cost for a background flourish; the
  CSS/SVG/Framer Motion hero already carries the "alive" feeling.
- **Sound design** (hover clicks, swooshes, impacts) — omitted. Autoplaying
  audio has real UX/accessibility downsides and needs licensed SFX assets;
  wire in Howler.js or the Web Audio API here if you want it later.
- **GSAP** — not used. Framer Motion covered every animation need here more
  simply; GSAP is still a fine addition if you later want scroll-pinned
  sections (GSAP ScrollTrigger) beyond what's here.

## Wiring the contact form

`components/Contact.tsx` currently simulates a submit. Point it at your
existing Formspree endpoint (the one already wired to your live portfolio) by
replacing the `handleSubmit` body with a `fetch()` POST to your Formspree URL.

## Deployment

**Vercel (recommended, zero-config for Next.js):**
```bash
npm i -g vercel
vercel
```

**Any Node host:**
```bash
npm run build
npm run start
```

**GitHub Pages:** requires `next export` style static output, which will
disable the `next/font` optimization and any server features — Vercel is a
much better fit for this stack given the animation-heavy client components.
