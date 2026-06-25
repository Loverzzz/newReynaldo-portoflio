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
        {/* Subtle radial glow center */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 60%, oklch(0.65 0.17 160 / 0.04) 0%, transparent 70%)',
          }}
        />
        {/* Grid lines — very subtle so the particle field is the visual focus */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `linear-gradient(oklch(0.65 0.17 160) 1px, transparent 1px),
                              linear-gradient(90deg, oklch(0.65 0.17 160) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* ── Section Header ────────────────────────── */}
        <div className="mb-16 text-center">
          {/* Eyebrow with animated lines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={headerInView ? { width: 48, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="h-px bg-gradient-to-r from-transparent to-brand"
            />
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.05em' }}
              animate={headerInView ? { opacity: 1, letterSpacing: '0.15em' } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-bold uppercase tracking-widest text-brand"
            >
              {eyebrow}
            </motion.span>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={headerInView ? { width: 48, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="h-px bg-gradient-to-l from-transparent to-brand"
            />
          </motion.div>

          {/* Title with letter animation */}
          <AnimatedTitle text={title} />

          {/* Subtitle with fade */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-4 max-w-2xl text-muted-foreground text-base sm:text-lg leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* Decorative dot separator */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={headerInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 section-divider"
          />
        </div>

        {/* ── Section Content ─────────────────────────
            NOTE: Children (Skills/Certs/Projects/etc.) already animate
            themselves via whileInView. Wrapping them in another y/opacity
            transform causes a janky "double animation" — so we just fade. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {children}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
