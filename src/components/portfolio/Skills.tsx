'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import {
  Code2,
  Database,
  Brain,
  Cloud,
  Terminal,
  GitBranch,
  BarChart3,
  Cpu,
  Layers,
  Workflow,
  Sparkles,
  Zap,
  Shield,
  LineChart,
  Monitor,
  Wrench,
  Palette,
  Video,
  Bot,
  Image,
} from 'lucide-react';

interface SkillsProps {
  items: string[];
}

// Skill categories with icons - mapped to actual skills in portfolio
const skillCategories: Record<string, { icon: typeof Code2; color: string }> = {
  'Content Moderation & Policy': { icon: Shield, color: 'from-blue-500 to-cyan-500' },
  'Data Analysis (Python, Pandas)': { icon: BarChart3, color: 'from-yellow-500 to-orange-500' },
  'Machine Learning (scikit-learn)': { icon: Brain, color: 'from-orange-500 to-red-500' },
  'Deep Learning (TensorFlow / PyTorch)': { icon: Brain, color: 'from-purple-500 to-pink-500' },
  'AI Automation': { icon: Bot, color: 'from-violet-500 to-purple-500' },
  'AI Image and Video Creation': { icon: Image, color: 'from-pink-500 to-rose-500' },
  'SQL': { icon: Database, color: 'from-blue-500 to-indigo-500' },
  'Power BI': { icon: BarChart3, color: 'from-yellow-600 to-amber-600' },
  'Metabase': { icon: LineChart, color: 'from-green-500 to-teal-500' },
  'Streamlit': { icon: Monitor, color: 'from-red-500 to-pink-500' },
  'React + TypeScript': { icon: Code2, color: 'from-cyan-400 to-blue-500' },
  'IoT / Embedded (Arduino, C/C++)': { icon: Cpu, color: 'from-teal-500 to-cyan-500' },
  'Video Editing (Premiere, After Effects)': { icon: Video, color: 'from-purple-600 to-indigo-600' },
  'Design (Photoshop, Illustrator)': { icon: Palette, color: 'from-blue-600 to-violet-600' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Skills({ items }: SkillsProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="relative"
    >
      {/* Simplified background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-10"
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
      <div className="flex flex-wrap justify-center gap-2.5 relative z-10">
        {items.map((skill) => {
          const category = skillCategories[skill] || { icon: Sparkles, color: 'from-brand to-brand-muted' };
          const Icon = category.icon;
          const isHovered = hoveredSkill === skill;

          return (
            <motion.div
              key={skill}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              onHoverStart={() => setHoveredSkill(skill)}
              onHoverEnd={() => setHoveredSkill(null)}
              className="relative group will-change-transform"
            >
              {/* Card */}
              <motion.div
                className={`
                  relative px-3 py-2 rounded-lg border cursor-default
                  backdrop-blur-sm transition-colors duration-200
                  ${isDark 
                    ? 'bg-card/70 border-border/40 hover:border-brand/40' 
                    : 'bg-card/70 border-border/40 hover:border-brand/40'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  {/* Icon */}
                  <div
                    className={`
                      p-1 rounded-md bg-gradient-to-br ${category.color}
                      transition-transform duration-200
                      ${isHovered ? 'scale-110' : 'scale-100'}
                    `}
                  >
                    <Icon className="size-3 text-white" />
                  </div>

                  {/* Skill name */}
                  <span className="text-sm font-medium text-foreground">
                    {skill}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

    </motion.div>
  );
}
