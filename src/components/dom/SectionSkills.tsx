import React, { useState } from 'react';
import { SKILLS_DATA, SkillItem } from '../../data/skills';
import {
  Boxes,
  Cuboid,
  Sparkles,
  Eye,
  Code,
  Zap,
  Compass,
  Palette,
  Volume2,
  Bot,
  Radio,
  Cpu,
  GitBranch,
  Activity,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

export const SectionSkills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', '3D & Graphics', 'Frontend & Motion', 'AI & Real-Time', 'Architecture & Tools'];

  const getSkillIcon = (iconName: string) => {
    const props = { className: 'w-4 h-4' };
    switch (iconName) {
      case 'Boxes': return <Boxes {...props} />;
      case 'Cuboid': return <Cuboid {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Eye': return <Eye {...props} />;
      case 'Code': return <Code {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Volume2': return <Volume2 {...props} />;
      case 'Bot': return <Bot {...props} />;
      case 'Radio': return <Radio {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'GitBranch': return <GitBranch {...props} />;
      case 'Activity': return <Activity {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const filteredSkills = activeCategory === 'ALL'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === activeCategory);

  return (
    <section id="section-skills" className="relative min-h-screen w-full px-6 sm:px-12 md:px-20 py-20 sm:py-28 flex flex-col justify-center">
      {/* Header */}
      <div className="max-w-4xl space-y-4 mb-12">
        <div className="flex items-center space-x-3 text-xs font-mono text-slate-500 dark:text-titanium">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-isotope animate-pulse" />
          <span className="text-slate-900 dark:text-offwhite font-bold tracking-widest">05 // TECHNICAL MATRIX</span>
          <span className="text-emerald-600 dark:text-isotope">| VISUAL SKILL TAGS</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-slate-900 dark:text-offwhite tracking-tight">
          STACK &amp;<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-cherenkov-glow dark:via-white dark:to-cherenkov-blue">
            CAPABILITIES.
          </span>
        </h2>
        <p className="text-base sm:text-lg font-mono text-slate-600 dark:text-titanium max-w-2xl leading-relaxed">
          Visual tech stack nodes utilized across our spatial simulations, GPU shader pipelines, Web Audio DSP engines, and production applications.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              soundEngine.playHoverBlip(1600);
              setActiveCategory(cat);
            }}
            className={`px-3.5 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? 'bg-blue-600 dark:bg-cherenkov-blue text-white border-blue-600 dark:border-cherenkov-blue shadow-md shadow-blue-500/20 font-bold'
                : 'bg-white/80 dark:bg-graphite-900/80 text-slate-600 dark:text-titanium border-slate-200 dark:border-graphite-800 hover:border-slate-300 dark:hover:border-graphite-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Visual Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl font-mono">
        {filteredSkills.map((skill, idx) => (
          <div
            key={idx}
            onMouseEnter={() => soundEngine.playHoverBlip(1400 + (idx % 5) * 80)}
            className="group p-4 sm:p-5 rounded-xl bg-white/85 dark:bg-graphite-900/85 hover:bg-slate-50 dark:hover:bg-graphite-850 border border-slate-200 dark:border-graphite-800 hover:border-blue-500/70 dark:hover:border-cherenkov-blue/70 transition-all duration-300 shadow-md backdrop-blur-md space-y-3"
          >
            <div className="flex items-center justify-between">
              {/* Visual Icon Badge */}
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-graphite-950 border border-slate-200 dark:border-graphite-800 text-blue-600 dark:text-cherenkov-glow group-hover:scale-110 transition-transform">
                {getSkillIcon(skill.icon)}
              </div>

              <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${skill.badgeColor}`}>
                {skill.level}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-offwhite group-hover:text-blue-600 dark:group-hover:text-cherenkov-glow transition-colors">
                {skill.name}
              </h3>
              <div className="text-[10px] text-slate-400 dark:text-titanium uppercase mt-0.5">
                {skill.category}
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-titanium leading-relaxed">
              {skill.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
