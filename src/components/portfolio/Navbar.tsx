'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navItems } from '@/data/portfolio';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
} from '@/components/ui/sheet';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const handleScrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { rootMargin: '-20% 0px -70% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ── Scroll progress bar ─────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 z-[60] origin-left"
        style={{
          width: progressWidth,
          background: 'linear-gradient(90deg, oklch(0.65 0.17 160), oklch(0.70 0.15 140), oklch(0.60 0.20 200))',
        }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Brand */}
          <motion.button
            onClick={() => handleScrollTo('about')}
            className="flex items-center gap-2.5 text-lg font-black text-foreground hover:opacity-85 transition-opacity group cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <motion.span className="relative">
              <span className="gradient-text-animated font-display tracking-tight">Reynaldo</span>
            </motion.span>
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-brand particle-glow"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-0.5">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 + 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => handleScrollTo(item.id)}
                    className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-250 cursor-pointer ${
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-brand/5'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-bg"
                        className="absolute inset-0 rounded-lg bg-brand/8"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active"
                        className="absolute bottom-1 left-3.5 right-3.5 h-[1.5px] bg-gradient-to-r from-brand/60 via-brand to-brand/60 rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                </motion.li>
              );
            })}
          </ul>

          {/* Right: Theme toggle + Mobile menu */}
          <div className="flex items-center gap-1.5">
            {mounted && (
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                  className="rounded-full w-9 h-9 hover:bg-brand/10 hover:text-brand transition-colors duration-200 cursor-pointer"
                >
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
                  </motion.div>
                </Button>
              </motion.div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-full w-9 h-9 hover:bg-brand/10 cursor-pointer"
                  aria-label="Open menu"
                >
                  <Menu className="size-4.5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 pt-10 bg-background/96 backdrop-blur-2xl border-l border-border/40">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                {/* Brand in mobile sheet */}
                <div className="flex items-center gap-2.5 mb-8 px-4">
                  <span className="text-xl font-black gradient-text font-display tracking-tight">Reynaldo</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-brand particle-glow" />
                </div>
                <div className="section-divider mb-5 mx-4" />
                <nav className="flex flex-col gap-1 px-2">
                  {navItems.map((item, idx) => {
                    const isActive = activeSection === item.id;
                    return (
                      <SheetClose asChild key={item.id}>
                        <motion.button
                          initial={{ opacity: 0, x: 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.045, ease: [0.22, 1, 0.36, 1] }}
                          onClick={() => handleScrollTo(item.id)}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                            isActive
                              ? 'bg-brand/10 text-foreground border border-brand/20'
                              : 'text-muted-foreground hover:text-foreground hover:bg-brand/5'
                          }`}
                        >
                          <motion.span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 ${isActive ? 'bg-brand particle-glow' : 'bg-muted-foreground/30'}`}
                            animate={isActive ? { scale: [1, 1.3, 1] } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="font-body">{item.label}</span>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="ml-auto"
                            >
                              <Sparkles className="size-3 text-brand" />
                            </motion.div>
                          )}
                        </motion.button>
                      </SheetClose>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
