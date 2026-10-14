# Josh Ziemenn Tan · Portfolio

My personal portfolio: a bento-style site (dark and light themes, following the visitor's system setting) featuring a 3D particle gourd (a nod to GourdVision, our thesis), my experience laid out LinkedIn-style, my projects, my published research, and a hidden **Dev Mode** with my journey as a `git log`.

> Press <kbd>~</kbd> anywhere on the site (or flip the Dev mode switch) and the page "decompiles" into a working terminal. Try `help`, `ls projects`, `ai` or `sudo hire josh`.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript) with Turbopack
- [Tailwind CSS 4](https://tailwindcss.com)
- [Motion](https://motion.dev) for animation, [Lenis](https://lenis.darkroom.engineering) for smooth scrolling
- [Three.js](https://threejs.org) + [React Three Fiber](https://r3f.docs.pmnd.rs) for the particle gourd
- [Lucide](https://lucide.dev) icons

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build (what Vercel runs)
npm run start   # serve the production build
npm run lint    # ESLint
```

## Editing content

Everything personal (intro, experience, journey, projects, AI section, research, education, links, freelance status) lives in one file:

```
src/content/profile.ts
```

Both the normal page and the Dev Mode terminal read from it, so edit text there and both update. To stop showing "Open for freelance projects", set `freelance.isOpen` to `false`.

Project screenshots live in `public/projects/`, and the portrait in `public/images/`.

## Project structure

```
src/
  app/              layout, page, global styles and design tokens
  components/
    layout/         nav, footer, background, providers
    sections/       hero, about (experience + education), AI, work, research, contact
    scene/          the 3D particle gourd
    ui/             shared pieces (cards, buttons, email menu…)
  content/          profile.ts, the single source of truth for site content
  features/
    dev-mode/       the terminal easter egg (commands, glitch, terminal UI)
    theme/          light/dark toggle and the no-flash theme script
  hooks/, lib/      small shared helpers
```

## Deploying

The site is fully static and deploys to [Vercel](https://vercel.com) with zero configuration: import the GitHub repo, keep the detected Next.js settings, and deploy. Every push to `main` redeploys automatically. No environment variables are needed.
