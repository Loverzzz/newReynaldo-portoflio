'use client';

import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import type { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
}

/* Smooth title reveal animation */
function AnimatedTitle({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.h2
      ref={ref}
      className="text-3xl font-black tracking-tight md:text-4xl lg:text-5xl"
      aria-label={text}
    >
      <span className="inline-block overflow-hidden">
        <motion.span
          className="inline-block gradient-text will-change-transform"
          initial={{ y: '105%', opacity: 0 }}
          animate={inView ? { y: '0%', opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          {text}
        </motion.span>
      </span>
    </motion.h2>
  );
}

export default function SectionWrapper({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: '-15px' });

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn('relative py-24 md:py-32 overflow-hidden', className)}
    >
      {/* ── 3D depth background ─────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial brand glow — layer 1 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 55% at 50% 55%, oklch(0.65 0.17 160 / 0.045) 0%, transparent 68%)',
          }}
        />
        {/* Grid lines — visual depth layer 2 */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(oklch(0.65 0.17 160) 1px, transparent 1px),
                              linear-gradient(90deg, oklch(0.65 0.17 160) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
        {/* Dot field — visual depth layer 3 */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: 'radial-gradient(oklch(0.65 0.17 160) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            backgroundPosition: '16px 16px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* ── Section Header ────────────────────────── */}
        <div className="mb-16 md:mb-20 text-center">

          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={headerInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 1 }}
              className="h-px w-12 bg-gradient-to-r from-transparent to-brand/70"
            />
            <span className="eyebrow-pill">
              {eyebrow}
            </span>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={headerInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="h-px w-12 bg-gradient-to-l from-transparent to-brand/70"
            />
          </motion.div>

          {/* Title — Archivo display typeface */}
          <AnimatedTitle text={title} />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.33, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-5 max-w-2xl text-muted-foreground text-base sm:text-lg leading-relaxed font-body"
          >
            {subtitle}
          </motion.p>

          {/* Section divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={headerInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.43, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 section-divider"
          />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.38, delay: 0.08 }}
        >
          {children}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
