'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn('relative py-24 md:py-32 overflow-hidden', className)}
    >
      {/* Static background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 50%, oklch(0.65 0.17 160 / 0.03) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Static grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(oklch(0.65 0.17 160) 1px, transparent 1px),
                              linear-gradient(90deg, oklch(0.65 0.17 160) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10"
      >
        {/* Section Header */}
        <div className="mb-16 text-center">
          {/* Eyebrow with animated line */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-px bg-gradient-to-r from-transparent to-brand"
            />
            <span className="text-sm font-semibold uppercase tracking-widest text-brand">
              {eyebrow}
            </span>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-px bg-gradient-to-l from-transparent to-brand"
            />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            <span className="inline-block gradient-text">
              {title}
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-muted-foreground text-lg"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Section Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
