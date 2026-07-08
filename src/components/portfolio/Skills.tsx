  'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useTilt } from '@/hooks/use-tilt';
import {
  Code2, Database, Brain, BarChart3, Cpu,
  Sparkles, Shield, LineChart, Monitor,
  Palette, Video, Bot, Image,
} from 'lucide-react';

interface SkillsProps { items: string[] }

const skillCategories: Record<string, { icon: typeof Code2; color: string; glow: string }> = {
  'Content Moderation & Policy':         { icon: Shield,    color: 'from-blue-500 to-cyan-500',       glow: '59,130,246' },
  'Data Analysis (Python, Pandas)':      { icon: BarChart3, color: 'from-yellow-500 to-orange-500',   glow: '234,179,8' },
  'Machine Learning (scikit-learn)':     { icon: Brain,     color: 'from-orange-500 to-red-500',      glow: '249,115,22' },
  'Deep Learning (TensorFlow / PyTorch)':{ icon: Brain,     color: 'from-purple-500 to-pink-500',     glow: '168,85,247' },
  'AI Automation':                       { icon: Bot,       color: 'from-violet-500 to-purple-500',   glow: '139,92,246' },
  'AI Image and Video Creation':         { icon: Image,     color: 'from-pink-500 to-rose-500',       glow: '236,72,153' },
  'SQL':                                 { icon: Database,  color: 'from-blue-500 to-indigo-500',     glow: '99,102,241' },
  'Power BI':                            { icon: BarChart3, color: 'from-yellow-600 to-amber-600',    glow: '217,119,6' },
  'Metabase':                            { icon: LineChart, color: 'from-green-500 to-teal-500',      glow: '20,184,166' },
  'Streamlit':                           { icon: Monitor,   color: 'from-red-500 to-pink-500',        glow: '239,68,68' },
  'React + TypeScript':                  { icon: Code2,     color: 'from-cyan-400 to-blue-500',       glow: '34,211,238' },
  'IoT / Embedded (Arduino, C/C++)':     { icon: Cpu,       color: 'from-teal-500 to-cyan-500',       glow: '20,184,166' },
  'Video Editing (Premiere, After Effects)':{ icon: Video,  color: 'from-purple-600 to-indigo-600',   glow: '124,58,237' },
  'Design (Photoshop, Illustrator)':     { icon: Palette,   color: 'from-blue-600 to-violet-600',    glow: '37,99,235' },
};

/* 3D tilt card component */
function SkillCard({ skill, index }: { skill: string; index: number }) {
  const tilt = useTilt({ strength: 9, stiffness: 280, damping: 28 });

  const category = skillCategories[skill] ?? { icon: Sparkles, color: 'from-brand to-brand-muted', glow: '100,200,150' };
  const Icon = category.icon;

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.handleMouse}
      onMouseLeave={tilt.handleLeave}
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 22, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-36px' }}
      transition={{ duration: 0.38, delay: index * 0.018, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="relative group will-change-transform cursor-default"
    >
      {/* Glow halo behind card */}
      <div
        className="absolute -inset-1.5 rounded-2xl opacity-0 group-hover:opacity-70 blur-lg transition-all duration-400 pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${category.glow},0.35) 0%, transparent 70%)` }}
      />

      <motion.div
        className="relative px-4 py-3 rounded-xl border border-border/70 bg-card/90 backdrop-blur-sm
                   hover:border-brand/50 hover:bg-card transition-all duration-300
                   shadow-sm hover:shadow-md dark:border-border/40 dark:bg-card/75"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Inset top highlight — depth layer */}
        <div className="absolute inset-x-0 top-0 h-px rounded-t-xl bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        <div className="flex items-center gap-3">
          {/* Icon badge */}
          <motion.div
            className={`p-1.5 rounded-lg bg-gradient-to-br ${category.color} shadow-sm shrink-0`}
            style={{ transform: 'translateZ(7px)' }}
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.12 }}
            transition={{ duration: 0.38, type: 'tween' }}
          >
            <Icon className="size-3.5 text-white" />
          </motion.div>

          {/* Skill name */}
          <span
            className="text-sm font-semibold text-foreground group-hover:text-brand transition-colors duration-250 leading-tight tracking-tight"
            style={{ transform: 'translateZ(4px)' }}
          >
            {skill}
          </span>
        </div>

        {/* Bottom shimmer reveal */}
        <div className="absolute bottom-0 left-3 right-3 h-px rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <div className="shimmer h-full" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills({ items }: SkillsProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="relative" style={{ perspective: '1000px' }}>
      {/* Background glow orb */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-[0.07]"
          style={{
            background: isDark
              ? 'radial-gradient(circle, oklch(0.65 0.17 160) 0%, transparent 70%)'
              : 'radial-gradient(circle, oklch(0.55 0.17 160) 0%, transparent 70%)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Skills grid */}
      <div className="relative z-10 flex flex-wrap justify-center gap-3">
        {items.map((skill, i) => (
          <SkillCard key={skill} skill={skill} index={i} />
        ))}
      </div>
    </div>
  );
}
