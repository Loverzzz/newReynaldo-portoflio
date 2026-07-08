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
  const tilt = useTilt({ strength: 5, stiffness: 220, damping: 26 });

  return (
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.52, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-12 md:pl-16 group"
    >
      {/* Timeline dot with pulse rings */}
      <motion.div
        className="absolute left-2 md:left-6 top-6 z-10"
        whileHover={{ scale: 1.25 }}
        transition={{ type: 'spring', stiffness: 350, damping: 18 }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full bg-brand/25"
            animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.45 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-brand/12"
            animate={{ scale: [1, 3.2, 1], opacity: [0.25, 0, 0.25] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.45 + 0.5 }}
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
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="will-change-transform"
      >
        <Card
          className={`
            relative overflow-hidden transition-all duration-400 holographic
            ${isDark
              ? 'bg-card/80 border-border/45 hover:border-brand/50'
              : 'bg-card/92 border-border/55 hover:border-brand/50'}
            hover:shadow-xl hover:shadow-brand/8
          `}
        >
          {/* Top accent bar — reveals on hover */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand/0 via-brand/80 to-brand/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Inset top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" />

          {/* Brand tint overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, oklch(0.65 0.17 160 / 0.035) 0%, transparent 55%)',
            }}
          />

          <CardContent className="relative p-5 md:p-6 space-y-4" style={{ transformStyle: 'preserve-3d' }}>
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex items-start gap-4">
                {/* Logo */}
                {exp.logo && (
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 4 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                    className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden bg-white border border-border/70 shadow-md flex items-center justify-center p-2"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    <img src={exp.logo} alt={`${exp.company} logo`} className="w-full h-full object-contain" />
                  </motion.div>
                )}

                <div className="pt-1" style={{ transform: 'translateZ(5px)' }}>
                  <h3 className="font-bold text-lg md:text-xl text-foreground flex items-center gap-2 group-hover:text-brand transition-colors duration-300 font-display tracking-tight">
                    <motion.div
                      whileHover={{ rotate: 18 }}
                      transition={{ type: 'spring', stiffness: 320 }}
                    >
                      <Briefcase className="w-4.5 h-4.5 text-brand shrink-0" />
                    </motion.div>
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium text-foreground/75 mt-1.5 flex items-center gap-2 flex-wrap font-body">
                    <span className="font-semibold">{exp.company}</span>
                    <span className="text-muted-foreground/50">·</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-brand/60" />
                      {exp.location}
                    </span>
                  </p>
                </div>
              </div>

              {/* Period badge */}
              <motion.div
                whileHover={{ scale: 1.07, y: -2 }}
                transition={{ type: 'spring', stiffness: 320 }}
                style={{ transform: 'translateZ(7px)' }}
              >
                <Badge
                  variant="secondary"
                  className="shrink-0 text-xs font-bold bg-brand/10 text-brand border border-brand/25 hover:bg-brand/15 transition-colors duration-200"
                >
                  <Calendar className="w-3 h-3 mr-1.5" />
                  {exp.period}
                </Badge>
              </motion.div>
            </div>

            {/* Micro divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

            {/* Bullet points */}
            <ul className="space-y-2.5 pt-0.5" style={{ transform: 'translateZ(2px)' }}>
              {exp.bullets.map((bullet, bIdx) => (
                <motion.li
                  key={bIdx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + bIdx * 0.045, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-3 text-sm text-foreground/80 leading-relaxed group/bullet"
                >
                  <motion.span
                    className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand to-brand/60"
                    whileHover={{ scale: 1.6 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  />
                  <span className="group-hover/bullet:text-foreground transition-colors duration-250 font-body">{bullet}</span>
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
          transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-gradient-to-b from-brand via-brand/45 to-transparent"
        />
        {/* Scanner glow bead */}
        <motion.div
          className="absolute top-0 left-0 right-0"
          style={{
            height: 48,
            background: 'linear-gradient(to bottom, transparent, oklch(0.65 0.17 160 / 0.55), transparent)',
          }}
          animate={{ y: ['0%', '1800%', '0%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
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
