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
    <section id="section-skills" className="relative min-h-screen w-full px-4 sm:px-12 md:px-20 py-16 sm:py-28 flex flex-col justify-center">
      {/* Header */}
      <div className="max-w-4xl space-y-4 mb-8 sm:mb-12 relative p-4 sm:p-6 -m-4 sm:-m-6 rounded-3xl bg-gradient-to-r from-[#F4F1EA]/92 via-[#F4F1EA]/65 to-transparent dark:from-theme-base/80 dark:via-theme-base/40 dark:to-transparent">
        <div className="flex items-center space-x-3 text-xs font-mono text-[#3A4258] dark:text-[#8A91A6]">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-isotope animate-pulse" />
          <span className="text-[#0E1220] dark:text-[#F2F4F8] font-bold tracking-widest">05 // TECHNICAL MATRIX</span>
          <span className="text-[#057A44] dark:text-isotope font-bold">| VISUAL SKILL TAGS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-[#0E1220] dark:text-[#F2F4F8] tracking-tight">
          STACK &amp;<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0E1220] via-[#003299] to-[#0B4DFF] dark:from-sky-300 dark:via-white dark:to-blue-500">
            CAPABILITIES.
          </span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg font-sans text-[#3A4258] dark:text-[#B8BED0] max-w-2xl leading-relaxed">
          Technologies, frameworks, and tools used by our team across full-stack engineering, interactive 3D graphics, and modern UI/UX design.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 mb-6 sm:mb-8 font-mono text-xs overflow-x-auto pb-2 no-scrollbar sm:flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              soundEngine.playHoverBlip(1600);
              setActiveCategory(cat);
            }}
            className={`px-3.5 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap min-h-[36px] ${
              activeCategory === cat
                ? 'bg-[#0B4DFF] dark:bg-cherenkov-blue text-white border-[#0B4DFF] dark:border-cherenkov-blue shadow-md shadow-blue-500/25 font-bold'
                : 'bg-theme-surface text-[#0E1220] dark:text-[#B8BED0] border-theme-border-subtle dark:border-white/10 hover:border-[#0B4DFF] hover:text-[#0B4DFF] dark:hover:text-[#F2F4F8] font-medium'
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
            className="group p-4 sm:p-5 rounded-xl bg-theme-surface hover:bg-theme-surface-elevated border border-theme-border-subtle dark:border-white/10 hover:border-[#0B4DFF] dark:hover:border-cherenkov-glow/50 transition-all duration-300 shadow-ambient space-y-3"
          >
            <div className="flex items-center justify-between">
              {/* Visual Icon Badge */}
              <div className="p-2 rounded-lg bg-theme-surface-subtle border border-theme-border-subtle dark:border-white/10 text-[#007C8C] dark:text-cherenkov-glow group-hover:scale-110 transition-transform">
                {getSkillIcon(skill.icon)}
              </div>

              <span className={`text-[10px] px-2 py-0.5 rounded font-bold border border-theme-border-subtle bg-theme-surface-subtle text-[#007C8C] dark:${skill.badgeColor}`}>
                {skill.level}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#0E1220] dark:text-[#F2F4F8] group-hover:text-[#0B4DFF] dark:group-hover:text-cherenkov-glow transition-colors">
                {skill.name}
              </h3>
              <div className="text-[10px] text-[#5B6478] dark:text-[#8A91A6] uppercase mt-0.5 font-bold">
                {skill.category}
              </div>
            </div>

            <p className="text-xs text-[#3A4258] dark:text-[#B8BED0] leading-relaxed">
              {skill.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
