# 404 REBELS // Web Engineering & Interactive 3D Portfolio

An engine-first, high-performance 3D interactive portfolio engineered with **React 18**, **Three.js / React Three Fiber**, **Tailwind CSS**, **Lenis inertial smooth scroll**, **GSAP ScrollTrigger**, and a zero-dependency **Web Audio API procedural sound engine**.

Engineered by the **404 Rebels** collective — showcasing the collaborative expertise of **Kunal Sabale**, **Animesh Dabhade**, and **Rajani Mourya**.

---

## 👥 The 404 Rebels Collective

- **Kunal Sabale** — *Full-Stack Engineer & Systems Builder*
  - React, Next.js, Node.js, TypeScript, PostgreSQL, REST/GraphQL APIs, Three.js spatial pipelines, and performance optimization.
  - [GitHub](https://github.com/Kunal-sabale10) • [LinkedIn](https://linkedin.com)
- **Animesh Dabhade** — *Creative Strategist & UI/UX Designer*
  - Design systems, visual storytelling, interaction prototyping, user research, wireframing, and Figma design tokens.
  - [LinkedIn](https://linkedin.com) • [Instagram](https://instagram.com)
- **Rajani Mourya** — *Frontend & UI Developer*
  - Component architecture, responsive layouts, accessible UI patterns, modern CSS animation, cross-device QA, and presentation design.
  - [GitHub](https://github.com/Rajani-mourya) • [LinkedIn](https://linkedin.com)

---

## 🧭 The 6 Sections

1. **HERO (`#section-hero`)**:
   - 3D particle accelerator core, dynamic team status badge, member quick-jump badges, and primary call-to-actions.
2. **ABOUT (`#section-about`)**:
   - Core philosophy and operational focus: Full-Stack Architecture, Responsive UI/UX Design, and Cross-Disciplinary Synergy.
3. **TEAM (`#section-team`)**:
   - Comprehensive dossiers for Kunal Sabale, Animesh Dabhade, and Rajani Mourya detailing technical roles, bios, key disciplines, telemetry metrics, and profile links.
4. **PROJECTS (`#section-projects`)**:
   - Production web applications categorized by creator with filter tabs and inspection modal:
     - **GenChat AI** (*Kunal Sabale*) — Full-Stack AI conversational platform with streaming responses and auth.
     - **Urban Bite** (*Kunal Sabale*) — Fast modern food discovery and online ordering storefront.
     - **Consultancy Website** (*Rajani Mourya*) — Professional corporate advisory platform with booking workflows.
     - **Maison RK** (*Animesh Dabhade*) — Luxury architectural and interior design showcase with immersive typography.
5. **SKILLS (`#section-skills`)**:
   - Interactive technology matrix with 4 filter categories (3D / Shaders, Core Frontend, Backend & Systems, Tooling & DevOps).
6. **CONTACT (`#section-contact`)**:
   - Direct communication conduits: one-click email copy (`kunalsabale10@gmail.com`), social hub (GitHub, LinkedIn, Discord), transmission form, and an interactive CLI terminal.

---

## ⚡ Performance Architecture & Engine Optimizations

The application features an ultra-optimized rendering pipeline engineered for steady 60–120 FPS:

1. **Mutable Store Architecture (`ScrollStore`)**:
   - High-frequency data (`scrollProgress`, `velocity`, `mousePos`, `fps`, `drawCalls`) lives in a mutable store reference.
   - Mouse movement and Lenis scroll updates do **not** trigger React tree re-renders.
   - Only low-frequency states (`currentSection`, `isUnlocked`, `isAudioMuted`, `activeSpecimenId`) remain in React state.
   - HUD components subscribe via a throttled (~12Hz / 80ms) listener, cutting re-renders by 90%.

2. **Zero-Allocation Three.js Render Loop**:
   - `CameraRig` uses pre-allocated `THREE.Vector3` instances for CatmullRom spline point sampling (`curve.getPoint(t, splinePosRef.current)`), eliminating 180–360 GC allocations per second.
   - `AcceleratorCore` reuses color, quaternion, and matrix objects, eliminating ~1,800 allocations per second.

3. **Stable Particle Buffers & Deflection**:
   - `ParticleStream` buffer generation is decoupled from telemetry FPS, preventing WebGL VBO rebuilds every 500ms.
   - Cursor deflection operates as a smooth positional offset on the mesh rather than mutating thousands of per-vertex coordinates.

4. **Hysteresis Adaptive Post-Processing**:
   - Adaptive degradation triggers below 35 FPS and only restores after 3 continuous seconds above 50 FPS, completely eliminating `<EffectComposer>` remount oscillation.
   - Chromatic aberration `THREE.Vector2` offsets are memoized and updated in place.

5. **Layout-Thrash-Free Section Tracking**:
   - Replaced per-scroll `getBoundingClientRect()` loops with an asynchronous `IntersectionObserver` observing central reading thresholds.

6. **Accessible Typography & Responsive Viewport**:
   - Clean, readable typography with Space Grotesk (`font-sans`) for explanatory paragraphs and JetBrains Mono (`font-mono`) for technical telemetry badges.
   - Standard accessible viewport supporting pinch-zoom.

---

## ⌨️ Demo Keyboard Shortcuts

- **`[1]` to `[6]`**: Jump directly to Sections 1 through 6 with smooth inertial scroll.
- **`[T]`**: Toggle Light / Dark mode.
- **`[M]`**: Toggle Web Audio procedural synthesis soundscape.
- **`[D]`**: Toggle live FPS / Draw Calls telemetry HUD.
- *Input Isolation*: Shortcuts automatically deactivate while typing inside inputs or the CLI terminal.

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
MIT License. Crafted with precision by **404 Rebels** (Kunal Sabale, Animesh Dabhade, Rajani Mourya).
