# Venkatesh M — Premium Portfolio

A world-class, futuristic personal portfolio built with **Vite + React 19 + TypeScript**, featuring a persistent, scroll-driven **Three.js "Floating Tech Orbit"** experience, **glass morphism**, aurora backgrounds, cinematic scrolling, and a fully dynamic **dark / light** theme.

> Design language inspired by Apple Vision Pro · Stripe · Linear · Framer · Tesla UI — glass, depth, neon glow, micro-interactions.

---

## 🛰️ The Global Three.js Experience

A single **fixed, full-viewport, pointer-events-free** WebGL scene lives behind every section (`src/three/GlobalOrbitScene`) and evolves purely from scroll progress (driven by **GSAP ScrollTrigger**). A glowing identity **core** sits at the centre; technology nodes orbit it across **three tilted rings** (inner / middle / outer), each with its own radius, speed and direction.

| Section | State | Behavior |
| --- | --- | --- |
| Hero | Initialization | inner ring only, slow, close camera |
| About | Expansion | middle ring appears, speed rises |
| Skills | Full orbit | outer ring + all nodes, trails, strong glow |
| Experience | Knowledge expansion | star-dust particles appear, camera drifts higher |
| Projects | Showcase | nodes link radially to the core, glow peaks |
| Contact | Convergence | rings slow, collapse inward; core reveals **VENKATESH M — Let's Build Something Amazing** |

Each node is a frosted-glass orb with a billboarded tech icon, soft glow halo, float + pulse, and a glass tooltip surfaced on cursor proximity (the canvas stays non-interactive, so "hover" is resolved by projecting nodes to screen space). Adds bloom, vignette, fine noise, energy pulses travelling the rings, an InstancedMesh star-dust field, subtle mouse tilt + ripple, and a per-section camera rig. Node/particle counts scale by device (12 / 9 / 6 nodes · ≈1100 / 600 / 240 particles) to hold 60 FPS. **Theme-aware** — colors and fog react to dark/light mode.

---

## ✨ Features

- **Persistent Floating Tech Orbit scene** — see above; replaces any hero-only object
- **Glass morphism** everywhere — navbar, cards, buttons, drawers
- **Aurora background** — floating gradient blobs, radial glow, noise overlay
- **Smooth scroll** — Lenis synced with GSAP ScrollTrigger
- **Motion** — Framer Motion reveals, staggers, masked text, magnetic buttons, tilt cards, custom cursor
- **Dynamic theming** — MUI theme system, system detection, persistence (Zustand), animated toggle
- **Sections** — Hero, About (animated counters), Skills (filterable), Experience (timeline), Projects (filter + detail drawer), Services, Testimonials (marquee), Contact (validated form)
- **Performance** — code splitting, lazy 3D scene, memoization, adaptive DPR, reduced-motion support
- **Accessibility** — ARIA labels, keyboard-friendly, focus states, color contrast
- **SEO** — Open Graph, Twitter cards, canonical, robots.txt

---

## 🧱 Tech Stack

Vite · React 19 · TypeScript · MUI v9 · Emotion · Three.js · React Three Fiber · Drei · @react-three/postprocessing · Framer Motion · GSAP + ScrollTrigger · Lenis · React Router · Zustand · React Icons

---

## 📁 Folder Structure

```
src/
├─ components/
│  ├─ common/       # GlassCard, GlassButton, MagneticButton, RevealText,
│  │                # AnimatedHeading, SectionWrapper, TiltCard, FloatingIcon,
│  │                # GradientText, ThemeSwitcher, ScrollProgress, CustomCursor, Counter
│  ├─ layout/       # Navbar, Footer, AuroraBackground, ParticleBackground
│  ├─ sections/     # Hero, About, Skills, Experience, Projects, Services, Testimonials, Contact
│  └─ animations/   # Framer Motion variants
├─ three/
│  └─ GlobalOrbitScene/   # persistent "Floating Tech Orbit" WebGL experience
│     ├─ index.tsx        # Canvas, camera rig, environment, postprocessing, theme
│     ├─ data.ts          # tech nodes, orbital layers, device budgets
│     ├─ components/      # OrbitSystem, OrbitRing, TechNode, CenterCore, OrbitParticles, EnergyPulse
│     ├─ hooks/           # useScrollProgress (GSAP), useOrbitControls (pointer)
│     ├─ animations/      # orbitTimeline, cameraTimeline
│     └─ types/           # orbit.types.ts
├─ hooks/           # useLenis, useActiveSection, useMagnetic, useMousePosition, useScrollReveal, usePrefersReducedMotion
├─ pages/Home/      # Home page composition
├─ routes/          # React Router setup (lazy + Suspense)
├─ store/           # Zustand stores (theme, UI)
├─ theme/           # palette, typography, shadows, theme factory, ColorModeProvider, augmentation
├─ types/           # shared TypeScript types
├─ utils/           # data (content) + helpers
└─ styles/          # global.css (resets + keyframes)
```

---

## 🚀 Getting Started

```bash
# install
npm install

# dev server (http://localhost:5173)
npm run dev

# type-check + production build
npm run build

# preview the production build
npm run preview

# lint
npm run lint
```

Requires Node 18+ (tested on Node 20).

---

## ✏️ Customizing Content

All content lives in [`src/utils/data.ts`](src/utils/data.ts) — edit `PROFILE`, `STATS`, `SKILL_GROUPS`, `EXPERIENCE`, `PROJECTS`, `SERVICES`, `TESTIMONIALS`, and `SOCIALS`. Brand colors live in [`src/theme/palette.ts`](src/theme/palette.ts).

### Wiring up the contact form

`Contact.tsx` simulates submission. Replace the `setTimeout` in `handleSubmit` with your provider of choice (EmailJS, Resend, Formspree, or your own API endpoint).

---

## 🎨 Theme Tokens

Light and dark palettes (primary, secondary, background, glass surfaces) plus custom `theme.custom` tokens (`glass`, `gradient`, `glow`) are defined in [`src/theme`](src/theme/). The active mode is persisted to `localStorage` and follows the OS by default.

---

## ⚡ Performance Notes

- The Three.js scene is **lazy-loaded** (`React.lazy`) and split into its own vendor chunk — three never blocks first paint.
- `AdaptiveDpr` + clamped `dpr` keep the WebGL scene FPS-friendly.
- All scroll/motion effects honor `prefers-reduced-motion`.
- Vendor chunks are split (react / three / motion / mui) for better caching.

---

## 🌍 Deployment

The app builds to static assets in `dist/` — deploy anywhere static.

**Vercel / Netlify**
- Build command: `npm run build`
- Output directory: `dist`
- SPA fallback: route all paths to `/index.html` (Netlify: add `/* /index.html 200` to `public/_redirects`; Vercel auto-handles with a rewrite).

**GitHub Pages** — set `base: '/<repo>/'` in `vite.config.ts`, then deploy `dist/`.

```bash
npm run build && npm run preview   # verify locally before deploying
```

---

Built with React, Three.js & motion. © Venkatesh M.
