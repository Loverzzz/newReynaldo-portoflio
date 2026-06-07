'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Calendar, Sparkles } from 'lucide-react';
import type { ExperienceItem } from '@/data/portfolio';

interface ExperienceProps {
  items: ExperienceItem[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Experience({ items }: ExperienceProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="relative"
    >
      {/* Animated timeline line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-full bg-gradient-to-b from-brand via-brand/50 to-transparent"
        />
      </div>

      <div className="space-y-8">
        {items.map((exp, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative pl-12 md:pl-16"
          >
            {/* Timeline dot with pulse effect */}
            <motion.div
              className="absolute left-2 md:left-6 top-6 z-10"
              whileHover={{ scale: 1.2 }}
            >
              <div className="relative">
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-brand/30"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                />
                {/* Main dot */}
                <div className="relative w-4 h-4 rounded-full bg-brand border-2 border-background shadow-lg shadow-brand/30" />
              </div>
            </motion.div>

            {/* Card */}
            <Card className={`
              relative overflow-hidden transition-all duration-500
              ${isDark 
                ? 'bg-card/80 border-border/50 hover:border-brand/50' 
                : 'bg-card/90 border-border/50 hover:border-brand/50'
              }
              hover:shadow-xl hover:shadow-brand/10 hover:-translate-y-1
            `}>
              {/* Gradient overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.65 0.17 160 / 0.05) 0%, transparent 50%)',
                }}
              />

              <CardContent className="relative p-5 md:p-6 space-y-4">
                  {/* Top row: Logo + Role & Company */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Company Logo with glow */}
                      {exp.logo && (
                        <motion.div
                          whileHover={{ scale: 1.05, rotate: 2 }}
                          className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden bg-white border border-border shadow-md flex items-center justify-center p-2"
                        >
                          <img
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            className="w-full h-full object-contain"
                          />
                        </motion.div>
                      )}
                      <div className="pt-1">
                        {/* Role with icon */}
                        <h3 className="font-bold text-lg md:text-xl text-foreground flex items-center gap-2">
                          <motion.div
                            whileHover={{ rotate: 15 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <Briefcase className="w-5 h-5 text-brand" />
                          </motion.div>
                          {exp.role}
                        </h3>
                        
                        {/* Company and location */}
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
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Badge
                        variant="secondary"
                        className="shrink-0 text-xs font-medium bg-brand/10 text-brand border-brand/20"
                      >
                        <Calendar className="w-3 h-3 mr-1" />
                        {exp.period}
                      </Badge>
                    </motion.div>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2.5 pt-2">
                    {exp.bullets.map((bullet, bIndex) => (
                      <li
                        key={bIndex}
                        className="flex gap-3 text-sm text-foreground/90 leading-relaxed"
                      >
                        <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-brand to-brand-muted" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
