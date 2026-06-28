'use client';

import { motion } from 'framer-motion';
import { Heart, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/40 mt-auto overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 100% at 50% 100%, oklch(0.65 0.17 160 / 0.06) 0%, transparent 70%)',
        }}
      />
      {/* Top inset highlight line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-6">
          {/* Brand wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5"
          >
            <span className="text-xl font-black gradient-text-animated tracking-tight">Reynaldo</span>
            <motion.div
              className="w-2 h-2 rounded-full bg-brand shadow-sm shadow-brand/50"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.45, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            {[
              { href: profile.linkedin, icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-full border border-border/55 bg-card/55 text-muted-foreground
                           hover:text-brand hover:border-brand/45 hover:bg-brand/6
                           transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.18, y: -4 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 420, damping: 20 }}
              >
                <Icon className="size-4" />
              </motion.a>
            ))}
          </motion.div>

          {/* Micro divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[200px] h-px bg-gradient-to-r from-transparent via-border/70 to-transparent"
          />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center gap-2 text-sm text-muted-foreground/80 text-center font-body tracking-tight"
          >
            <span>&copy; {year} Reynaldo Arya Budi Trisna</span>
            <span className="hidden sm:inline text-border/60">·</span>
            <span className="flex items-center gap-1.5">
              Built with{' '}
              <motion.span
                animate={{ scale: [1, 1.35, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart className="size-3.5 text-red-500 fill-red-500" />
              </motion.span>{' '}
              love
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
