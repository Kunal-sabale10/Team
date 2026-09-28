export interface SkillItem {
  name: string;
  category: '3D & Graphics' | 'Frontend & Motion' | 'AI & Real-Time' | 'Architecture & Tools';
  level: string;
  icon: string; // lucide or identifier
  badgeColor: string;
  description: string;
}

export const SKILLS_DATA: SkillItem[] = [
  // 3D & Graphics
  {
    name: 'Three.js / WebGL',
    category: '3D & Graphics',
    level: 'Advanced',
    icon: 'Boxes',
    badgeColor: 'bg-blue-500/15 text-blue-500 border-blue-500/30',
    description: 'Scene graphs, custom buffer geometry, instanced meshes, and camera choreography.',
  },
  {
    name: 'React Three Fiber',
    category: '3D & Graphics',
    level: 'Advanced',
    icon: 'Cuboid',
    badgeColor: 'bg-cyan-500/15 text-cyan-500 border-cyan-500/30',
    description: 'Declarative canvas architecture, Drei helpers, and postprocessing pipeline.',
  },
  {
    name: 'GLSL Custom Shaders',
    category: '3D & Graphics',
    level: 'Intermediate',
    icon: 'Sparkles',
    badgeColor: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    description: 'Vertex displacement, fresnel edge-glow, raymarching, and noise dithering.',
  },
  {
    name: 'Post-Processing',
    category: '3D & Graphics',
    level: 'Advanced',
    icon: 'Eye',
    badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    description: 'Selective bloom, chromatic aberration, vignette, and adaptive fill-rate degradation.',
  },

  // Frontend & Motion
  {
    name: 'React 18 & TypeScript',
    category: 'Frontend & Motion',
    level: 'Advanced',
    icon: 'Code',
    badgeColor: 'bg-blue-500/15 text-blue-500 border-blue-500/30',
    description: 'Strict type safety, custom hooks, atomic state management, and zero runtime errors.',
  },
  {
    name: 'GSAP & ScrollTrigger',
    category: 'Frontend & Motion',
    level: 'Advanced',
    icon: 'Zap',
    badgeColor: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
    description: 'Scrubbed timeline choreographies, pin triggers, and spring magnetic physics.',
  },
  {
    name: 'Lenis Smooth Scroll',
    category: 'Frontend & Motion',
    level: 'Advanced',
    icon: 'Compass',
    badgeColor: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
    description: 'Normalized trackpad momentum, virtual timeline mapping, and 120 FPS inertial physics.',
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend & Motion',
    level: 'Advanced',
    icon: 'Palette',
    badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    description: 'Adaptive dual-theme styling, glassmorphism, responsive grid systems, and typography.',
  },

  // AI & Real-Time
  {
    name: 'Web Audio API DSP',
    category: 'AI & Real-Time',
    level: 'Advanced',
    icon: 'Volume2',
    badgeColor: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
    description: 'Procedural sub-bass oscillators, velocity-modulated biquad filters, and spatial stereo panning.',
  },
  {
    name: 'AI Streaming & LLMs',
    category: 'AI & Real-Time',
    level: 'Intermediate',
    icon: 'Bot',
    badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    description: 'Streaming token generation, WebSocket protocols, and conversational context pipelines.',
  },
  {
    name: 'WebSockets & QUIC',
    category: 'AI & Real-Time',
    level: 'Intermediate',
    icon: 'Radio',
    badgeColor: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    description: 'Low-latency telemetry streaming, binary packet serialization, and real-time state sync.',
  },

  // Architecture & Tools
  {
    name: 'Vite & Next.js',
    category: 'Architecture & Tools',
    level: 'Advanced',
    icon: 'Cpu',
    badgeColor: 'bg-orange-500/15 text-orange-500 border-orange-500/30',
    description: 'Instant HMR, tree-shaking, production chunk budgeting, and performance auditing.',
  },
  {
    name: 'Git & GitHub Workflows',
    category: 'Architecture & Tools',
    level: 'Advanced',
    icon: 'GitBranch',
    badgeColor: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
    description: 'Collaborative team branch workflows, continuous integration, and clean commit history.',
  },
  {
    name: 'Performance Profiling',
    category: 'Architecture & Tools',
    level: 'Advanced',
    icon: 'Activity',
    badgeColor: 'bg-green-500/15 text-green-400 border-green-500/30',
    description: 'Draw call budgeting (<25 DC), DPR clamping, memory leak prevention, and GPU fill-rate protection.',
  },
];
