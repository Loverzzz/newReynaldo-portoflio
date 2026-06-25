'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useTilt } from '@/hooks/use-tilt';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Calendar, Sparkles } from 'lucide-react';
import type { ExperienceItem } from '@/data/portfolio';

interface ExperienceProps { items: ExperienceItem[] }

function ExperienceCard({ exp, index }: { exp: ExperienceItem; index: number }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const tilt = useTilt({ strength: 5, stiffness: 200, damping: 25 });

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-12 md:pl-16"
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-2 md:left-6 top-6 z-10"
        whileHover={{ scale: 1.3 }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full bg-brand/30"
            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-brand/15"
            animate={{ scale: [1, 2.8, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 + 0.4 }}
          />
          <div className="relative w-4 h-4 rounded-full bg-brand border-2 border-background shadow-lg shadow-brand/40 particle-glow" />
        </div>
      </motion.div>

      {/* 3D Tilt Card */}
      <motion.div
        ref={tilt.ref}
        onMouseMove={tilt.handleMouse}
        onMouseLeave={tilt.handleLeave}
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
        className="will-change-transform"
      >
        <Card
          className={`
            relative overflow-hidden transition-all duration-500 holographic
            ${isDark
              ? 'bg-card/80 border-border/50 hover:border-brand/50'
              : 'bg-card/90 border-border/50 hover:border-brand/50'}
            hover:shadow-2xl hover:shadow-brand/10
          `}
        >
          {/* Animated top accent line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand/0 via-brand to-brand/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Gradient hover overlay */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, oklch(0.65 0.17 160 / 0.04) 0%, transparent 50%)',
            }}
          />

          <CardContent className="relative p-5 md:p-6 space-y-4" style={{ transformStyle: 'preserve-3d' }}>
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex items-start gap-4">
                {/* Logo */}
                {exp.logo && (
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden bg-white border border-border shadow-md flex items-center justify-center p-2"
                    style={{ transform: 'translateZ(8px)' }}
                  >
                    <img src={exp.logo} alt={`${exp.company} logo`} className="w-full h-full object-contain" />
                  </motion.div>
                )}

                <div className="pt-1" style={{ transform: 'translateZ(4px)' }}>
                  <h3 className="font-bold text-lg md:text-xl text-foreground flex items-center gap-2 group-hover:text-brand transition-colors">
                    <motion.div whileHover={{ rotate: 15 }} transition={{ type: 'spring', stiffness: 300 }}>
                      <Briefcase className="w-5 h-5 text-brand shrink-0" />
                    </motion.div>
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium text-foreground/80 mt-1 flex items-center gap-2 flex-wrap">
                    <span>{exp.company}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </p>
                </div>
              </div>

              {/* Period badge */}
              <motion.div
                whileHover={{ scale: 1.06, y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{ transform: 'translateZ(6px)' }}
              >
                <Badge variant="secondary" className="shrink-0 text-xs font-semibold bg-brand/10 text-brand border-brand/20">
                  <Calendar className="w-3 h-3 mr-1" />
                  {exp.period}
                </Badge>
              </motion.div>
            </div>

            {/* Bullet points */}
            <ul className="space-y-2.5 pt-1" style={{ transform: 'translateZ(2px)' }}>
              {exp.bullets.map((bullet, bIdx) => (
                <motion.li
                  key={bIdx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + bIdx * 0.05, duration: 0.4 }}
                  className="flex gap-3 text-sm text-foreground/85 leading-relaxed group/bullet"
                >
                  <motion.span
                    className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-brand to-brand-muted"
                    whileHover={{ scale: 1.5 }}
                  />
                  <span className="group-hover/bullet:text-foreground transition-colors duration-300">{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default function Experience({ items }: ExperienceProps) {
  return (
    <div className="relative" style={{ perspective: '1200px' }}>
      {/* Animated timeline line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="w-full bg-gradient-to-b from-brand via-brand/50 to-transparent"
        />
        {/* Animated glow on the line */}
        <motion.div
          className="absolute top-0 w-full"
          style={{
            height: 40,
            background: 'linear-gradient(to bottom, transparent, oklch(0.65 0.17 160 / 0.6), transparent)',
          }}
          animate={{ y: ['0%', '2400%', '0%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="space-y-8">
        {items.map((exp, index) => (
          <ExperienceCard key={index} exp={exp} index={index} />
        ))}
      </div>
    </div>
  );
}
