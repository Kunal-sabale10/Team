# HADRON TRIAD // 3D Creative Engineering Collective

An award-tier, engine-first 3D creative web portfolio engineered with **React 18**, **Three.js / React Three Fiber**, **Tailwind CSS**, **Lenis inertial smooth scroll**, **GSAP ScrollTrigger**, and a zero-dependency **Web Audio API procedural sound engine**.

Engineered for the hackathon brief showcasing the collective power of **Kunal Sabale**, **Animesh Dabhade**, and **Rajani Mourya**, directly featuring real open-source GitHub repositories from [github.com/Kunal-sabale10](https://github.com/Kunal-sabale10).

---

## 👥 The Triad Collective
- **Kunal Sabale** — *Chief Systems Architect & Builder* ("The Build")
  - WebGL 2.0 / GLSL shader programming, Three.js spatial pipeline, high-throughput full-stack architectures, and frame-budget optimization.
  - [GitHub](https://github.com/Kunal-sabale10)
- **Animesh Dabhade** — *Creative Strategist & Ideation Lead* ("The Idea")
  - Spatial scriptwriting, narrative direction, systems ideation, product discovery, and accelerator concept engineering.
  - [LinkedIn](https://linkedin.com)
- **Rajani Mourya** — *Presentation Director & UI Developer* ("Presentation & Dev")
  - Micro-interaction design, motion typography, responsive touch ergonomics, cross-device QA, and presentation storytelling.
  - [GitHub](https://github.com)

---

## 🧭 The 6 Mandatory Sections

The site features six distinct, sequentially ordered sections, each instantly accessible via the top HUD navigation bar or via keyboard shortcuts:

1. **HERO (`#section-hero`)**:
   - Particle accelerator core visual, dynamic status badge, telemetry HUD, member role badges, and dual call-to-actions ("EXPLORE CASE STUDIES" & "MEET THE TRIAD").
2. **ABOUT (`#section-about`)**:
   - The team's philosophy, mission, and operational vibe. Highlights the synthesis of Ideation, Architecture, and Presentation with interactive manifesto cards.
3. **TEAM (`#section-team`)**:
   - Detailed dossier for Kunal Sabale, Animesh Dabhade, and Rajani Mourya featuring tactical roles, detailed bios, specialized disciplines, telemetry metrics, and direct profile links.
4. **PROJECTS (`#section-projects`)**:
   - Real open-source GitHub projects curated from Kunal's GitHub profile:
     - `Kunal-sabale10/Team` (Collaborative 3D Portfolio Platform)
     - `Kunal-sabale10/AI-Interview-Mocker` (Full-Stack Next.js 14 AI Assessment Engine)
     - `Kunal-sabale10/Full-Stack-GenAI-Saas` (Enterprise Multi-Model AI Application)
     - `Kunal-sabale10/E-Commerce-Website-` (Modern React Storefront)
     - `Kunal-sabale10/Food-Delivery-Web-App` (Dynamic Food Ordering System)
     - `Kunal-sabale10/Python-Automation-Scripts` (Automated DevOps Tooling)
   - Features direct GitHub links, live demo links, tag filters, and an interactive Specimen Inspection modal.
5. **SKILLS (`#section-skills`)**:
   - Visual tech matrix with category filters (3D / Shaders, Core Frontend, Backend & Systems, Tooling & DevOps), visual icons, mastery levels, and detailed tags.
6. **CONTACT (`#section-contact`)**:
   - Direct encrypted communication terminal, one-click email copy (`kunalsabale10@gmail.com`), social hub (GitHub, LinkedIn, Discord), a simulated transmission form, and an interactive CLI terminal.

---

## ⚡ Key Hackathon Features & Polish

### 1. Dual Light & Dark Mode
- Full theme switching with persistent `localStorage` (`hadron_theme_preference`).
- Synchronized across HTML DOM and Three.js 3D WebGL Canvas (dynamic background color, fog density, light intensity, and particle coloration).
- Instant toggle with the `[T]` key or navbar icon.

### 2. Presentation Demo Keyboard Shortcuts
Engineered specifically for judges and live presentations:
- **`[1]` to `[6]`**: Jump directly to Sections 1 through 6 with smooth inertial scroll.
- **`[T]`**: Toggle Light / Dark mode.
- **`[M]`**: Toggle Web Audio procedural synthesis soundscape.
- *Smart Input Isolation*: Shortcuts automatically deactivate while typing inside the contact form or CLI terminal.

### 3. High-Performance 3D Engine & Mobile Optimizations
- **DPR Capping**: Capped at `1.5` on desktop and `1.0` on mobile devices to preserve constant 60–120 FPS.
- **WebGL Graceful Fallback**: Automatically detects hardware WebGL support; renders an animated 2D procedural grid fallback if unavailable.
- **`prefers-reduced-motion` Support**: Automatically detects accessibility preferences and bypasses postprocessing bloom/chromatic aberration.
- **Zero Heavy Frameworks**: 100% custom non-Bootstrap layout with Tailwind CSS and bespoke responsive breakpoints.

### 4. Zero-Asset Procedural Audio System
- Synthesized entirely in code via the Web Audio API (no external MP3/WAV files required).
- Features a 48 Hz dual-detuned sub-bass drone, scroll Doppler frequency modulation, resonant collision bursts, and UI click audio feedback.

---

## 🛠️ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Kunal-sabale10/Team.git

# 2. Navigate to project root
cd Team

# 3. Install dependencies
npm install

# 4. Start local development server (runs on port 4005)
npm run dev

# 5. Build for production (TypeScript check + Vite bundle)
npm run build

# 6. Preview production build
npm run preview
```

---

## 📜 License
MIT License. Crafted with precision by the **Hadron Triad Collective** (Kunal Sabale, Animesh Dabhade, Rajani Mourya).
