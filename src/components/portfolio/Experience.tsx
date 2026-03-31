'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin } from 'lucide-react';
import type { ExperienceItem } from '@/data/portfolio';

interface ExperienceProps {
  items: ExperienceItem[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function Experience({ items }: ExperienceProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="relative md:border-l-2 md:border-brand/20 md:pl-0"
    >
      {items.map((exp, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="relative mb-8 last:mb-0 ml-6 md:ml-0 md:pl-8"
        >
          {/* Timeline dot */}
          <div className="absolute left-[-7px] top-2 w-3 h-3 rounded-full bg-brand border-2 border-background z-10" />

          <Card className="hover:shadow-md transition-shadow duration-300 overflow-hidden">
            <CardContent className="p-4 md:p-6 space-y-3">
              {/* Top row: Logo + Role & Company */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  {exp.logo && (
                    <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden bg-white border border-border shadow-sm flex items-center justify-center p-2">
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="pt-1">
                    <h3 className="font-semibold text-base md:text-lg">
                      <Briefcase className="inline-block w-4 h-4 mr-1.5 text-brand align-text-bottom" />
                      {exp.role}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {exp.company}
                      <MapPin className="inline-block w-3 h-3 ml-2 mr-0.5 align-text-bottom" />
                      {exp.location}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0 text-xs mt-1">
                  {exp.period}
                </Badge>
              </div>

              {/* Bullet points */}
              <ul className="space-y-1.5 pt-1">
                {exp.bullets.map((bullet, bIndex) => (
                  <li key={bIndex} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
