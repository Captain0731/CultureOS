# Culture OS

Marketing site for Culture OS — a modern workspace for high-performance teams. Built with Next.js 16, React 19, GSAP, Framer Motion, and Sass.

## Project structure

```
cultureos/
├── public/
│   └── images/          # Static images
├── src/
│   ├── app/             # Next.js App Router (routes only)
│   ├── components/
│   │   ├── layout/      # Navbar, SmoothScroll
│   │   └── ui/          # Reusable UI blocks
│   ├── sections/        # Page sections (home, faq, team, …)
│   └── styles/          # Design tokens & global styles
├── AGENTS.md
└── …config files
```

Imports use the `@/` alias (maps to `src/`).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run start`| Run production server    |
| `npm run lint` | Run ESLint               |
