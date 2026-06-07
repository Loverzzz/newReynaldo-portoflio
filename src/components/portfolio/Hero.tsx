'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useRef } from 'react';
import {
  Mail,
  Linkedin,
  Phone,
  MapPin,
  Award,
  ChevronDown,
  Sparkles,
  Code2,
  Database,
  Brain,
} from 'lucide-react';
import { profile, achievements } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const floatingIcons = [
  { Icon: Code2, delay: 0, x: -15, y: -20 },
  { Icon: Database, delay: 0.3, x: 15, y: -15 },
  { Icon: Brain, delay: 0.6, x: -10, y: 15 },
];

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Simplified transforms for better performance
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const whatsappUrl = `https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`;

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated gradient background - simplified */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.65 0.17 160 / 0.12) 0%, transparent 60%)'
              : 'radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.55 0.17 160 / 0.1) 0%, transparent 60%)',
          }}
        />
      </motion.div>

      {/* Single floating shape instead of 3 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full will-change-transform"
          style={{
            width: 400,
            height: 400,
            left: '70%',
            top: '20%',
            background: isDark
              ? 'radial-gradient(circle, oklch(0.65 0.17 160 / 0.05) 0%, transparent 70%)'
              : 'radial-gradient(circle, oklch(0.55 0.17 160 / 0.08) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ─── LEFT COLUMN ────────────────────────────── */}
          <motion.div variants={container} initial="hidden" animate="show">
            {/* Portfolio badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
              <Sparkles className="size-4 text-brand" />
              <Badge
                variant="outline"
                className="px-3 py-1 text-xs font-semibold tracking-wider uppercase border-brand/30 text-brand"
              >
                Portfolio 2025
              </Badge>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            >
              <span className="gradient-text inline-block">
                {profile.name}
              </span>
            </motion.h1>

            {/* Headline */}
            <motion.p
              variants={fadeUp}
              className="mt-4 text-lg sm:text-xl text-muted-foreground font-medium"
            >
              {profile.headline}
            </motion.p>

            {/* Summary */}
            <motion.p
              variants={fadeUp}
              className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl"
            >
              {profile.summary}
            </motion.p>

            {/* Action buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-3"
            >
              {[
                { href: profile.linkedin, icon: Linkedin, label: 'LinkedIn', external: true },
                { href: `mailto:${profile.email}`, icon: Mail, label: 'Email', external: false },
                { href: whatsappUrl, icon: Phone, label: 'WhatsApp', external: true },
              ].map((btn) => (
                <Button
                  key={btn.label}
                  variant="outline"
                  size="sm"
                  className="gap-2 group relative overflow-hidden transition-all hover:scale-105"
                  asChild
                >
                  <a
                    href={btn.href}
                    target={btn.external ? '_blank' : undefined}
                    rel={btn.external ? 'noopener noreferrer' : undefined}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <btn.icon className="size-4 transition-transform group-hover:scale-110" />
                      {btn.label}
                    </span>
                  </a>
                </Button>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className="mt-10 grid grid-cols-3 gap-4 max-w-md"
            >
              {profile.highlights.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card/60 p-3 sm:p-4 text-center backdrop-blur-sm transition-transform hover:scale-105"
                >
                  <p className="text-xl sm:text-2xl font-bold gradient-text">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT COLUMN ───────────────────────────── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center lg:items-end gap-8"
          >
            {/* Profile image with simplified animation */}
            <motion.div
              variants={scaleIn}
              className="relative"
            >
              {/* Static glow instead of rotating */}
              <div
                className="absolute -inset-4 rounded-2xl blur-xl"
                style={{
                  background: isDark
                    ? 'radial-gradient(circle, oklch(0.65 0.17 160 / 0.3) 0%, transparent 70%)'
                    : 'radial-gradient(circle, oklch(0.55 0.17 160 / 0.25) 0%, transparent 70%)',
                }}
              />

              {/* Profile image with subtle float */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="will-change-transform"
              >
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-2xl">
                  <div
                    className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
                    style={{
                      background: isDark
                        ? 'linear-gradient(135deg, oklch(0.65 0.17 160 / 0.2), transparent 50%)'
                        : 'linear-gradient(135deg, oklch(0.55 0.17 160 / 0.15), transparent 50%)',
                    }}
                  />
                  <img
                    src="/images/profile.jpg"
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Simplified floating icons */}
              {floatingIcons.map(({ Icon, delay, x, y }, idx) => (
                <motion.div
                  key={idx}
                  className="absolute will-change-transform"
                  style={{
                    left: idx % 2 === 0 ? '-15px' : 'calc(100% + 5px)',
                    top: `${25 + idx * 20}%`,
                  }}
                  animate={{
                    y: [0, y, 0],
                    x: [0, x, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay,
                  }}
                >
                  <div className="p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border shadow-lg">
                    <Icon className="size-5 text-brand" />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Info card */}
            <motion.div
              variants={fadeUp}
              className="glass rounded-2xl p-6 w-full max-w-sm space-y-4 backdrop-blur-xl border border-border/50 transition-transform hover:scale-[1.02]"
            >
              {/* Contact info */}
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: profile.location },
                  { icon: Mail, text: profile.email },
                  { icon: Phone, text: profile.phone },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm group cursor-default"
                  >
                    <div className="p-1.5 rounded-md bg-brand/10 transition-transform group-hover:scale-110">
                      <item.icon className="size-4 text-brand" />
                    </div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

              {/* Achievements */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <Award className="size-3 text-brand" />
                  Achievements
                </h4>
                <ul className="space-y-2.5">
                  {achievements.map((achievement, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed"
                    >
                      <Award className="size-3.5 text-brand shrink-0 mt-0.5" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer hover:scale-110 transition-transform"
          onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs font-medium tracking-wide uppercase opacity-60">
            Explore
          </span>
          <div className="p-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm">
            <ChevronDown className="size-4" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
