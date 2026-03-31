'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Mail,
  Linkedin,
  Phone,
  MapPin,
  Award,
  ChevronDown,
} from 'lucide-react';
import { profile, achievements } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const whatsappUrl = `https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`;

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background subtle radial gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 60% 50% at 70% 40%, oklch(0.65 0.17 160 / 0.06) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 60% 50% at 70% 40%, oklch(0.55 0.17 160 / 0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ─── LEFT COLUMN ────────────────────────────── */}
          <motion.div variants={container} initial="hidden" animate="show">
            {/* Portfolio badge */}
            <motion.div variants={fadeUp}>
              <Badge
                variant="outline"
                className="mb-6 px-3 py-1 text-xs font-semibold tracking-wider uppercase border-brand/30 text-brand"
              >
                Portfolio
              </Badge>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            >
              <span className="gradient-text">{profile.name}</span>
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
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                asChild
              >
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="size-4" />
                  LinkedIn
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                asChild
              >
                <a href={`mailto:${profile.email}`}>
                  <Mail className="size-4" />
                  Email
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                asChild
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="size-4" />
                  WhatsApp
                </a>
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className="mt-10 grid grid-cols-3 gap-4 max-w-md"
            >
              {profile.highlights.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card/60 p-3 sm:p-4 text-center"
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
            {/* Gradient blob / abstract avatar */}
            <motion.div
              variants={fadeIn}
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              {/* Outer glow */}
              <div
                className="absolute -inset-6 rounded-3xl opacity-30 blur-2xl"
                style={{
                  background: isDark
                    ? 'conic-gradient(from 180deg, oklch(0.65 0.17 160), oklch(0.70 0.15 140), oklch(0.60 0.18 30), oklch(0.65 0.17 160))'
                    : 'conic-gradient(from 180deg, oklch(0.55 0.17 160), oklch(0.60 0.15 140), oklch(0.55 0.18 30), oklch(0.55 0.17 160))',
                }}
              />
              {/* Profile image */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-2xl">
                {/* Gradient border overlay */}
                <div className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
                  style={{
                    background: isDark
                      ? 'linear-gradient(135deg, oklch(0.65 0.17 160 / 0.3), transparent 50%, oklch(0.60 0.18 30 / 0.2))'
                      : 'linear-gradient(135deg, oklch(0.55 0.17 160 / 0.2), transparent 50%, oklch(0.55 0.18 30 / 0.15))',
                  }}
                />
                <img
                  src="/images/profile.jpg"
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Glass-morphism info card */}
            <motion.div
              variants={fadeIn}
              className="glass rounded-2xl p-5 w-full max-w-sm space-y-4"
            >
              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="size-4 text-brand shrink-0" />
                  <span className="text-muted-foreground">
                    {profile.location}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="size-4 text-brand shrink-0" />
                  <span className="text-muted-foreground">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="size-4 text-brand shrink-0" />
                  <span className="text-muted-foreground">{profile.phone}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Achievements */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="text-xs font-medium tracking-wide uppercase opacity-60">
            Scroll
          </span>
          <ChevronDown className="size-4 opacity-60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
