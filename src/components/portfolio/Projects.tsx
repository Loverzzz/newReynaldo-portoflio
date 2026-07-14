'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, Filter, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ProjectItem } from '@/data/portfolio';
import { projectCategories } from '@/data/portfolio';

interface ProjectsProps {
  items: ProjectItem[];
}

/* ── 3D tunnel constants ── */
const F = 850; // focal length (also z-spacing baseline)
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/* ───────────────────────────────────────────────────
   GalleryCard — each card lives at a depth in z-space.
   As the camera (driven by scroll) moves forward, the card
   approaches the screen plane (relZ → F), zooms to scale 1,
   then swings to its side and fades as it passes by — like
   walking through a 3D labyrinth corridor.
─────────────────────────────────────────────────── */
function GalleryCard({
  project,
  index,
  total,
  progress,
  cameraMax,
  mult,
}: {
  project: ProjectItem;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  cameraMax: number;
  mult: number;
}) {
  const baseZ = (index + 1) * F;
  const side = index % 2 === 0 ? -1 : 1; // alternate left / right
  const sideY = (index % 2 === 0 ? -1 : 1) * 0.3;

  const cameraZ = useTransform(progress, [0, 1], [0, cameraMax]);
  const relZ = useTransform(cameraZ, (cz) => baseZ - cz);

  const scale = useTransform(relZ, (z) => clamp(F / Math.max(z, 60), 0.18, 2.4));
  const x = useTransform(relZ, (z) => side * (z - F) * mult);
  const y = useTransform(relZ, (z) => sideY * (z - F) * 0.16);
  const rotateY = useTransform(relZ, (z) => side * 22 * ((z - F) / F));
  const opacity = useTransform(
    relZ,
    [0, F * 0.22, F * 0.55, F * 2.0, F * 2.8],
    [0, 0, 1, 1, 0],
  );
  const blur = useTransform(relZ, [F * 1.6, F * 2.8], [0, 3]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const zIndex = useTransform(relZ, (z) => Math.round(3000 - z));

  const Wrapper: React.ElementType = project.link ? 'a' : 'div';
  const wrapperProps = project.link
    ? {
        href: project.link,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `View project: ${project.title}`,
      }
    : {};

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        style={{
          x,
          y,
          scale,
          rotateY,
          opacity,
          zIndex,
          filter,
          transformPerspective: 1000,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        }}
        className="pointer-events-auto relative"
      >
        <Wrapper
          {...wrapperProps}
          className="group block w-[80vw] max-w-[440px] sm:w-[440px] rounded-3xl overflow-hidden
                     border border-border/60 bg-card/90 backdrop-blur-md
                     shadow-2xl shadow-black/30 hover:border-brand/50
                     transition-colors duration-500 focus:outline-none
                     focus-visible:ring-2 focus-visible:ring-brand"
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            {project.image ? (
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand/15 to-brand/5">
                <Sparkles className="size-10 text-brand/50" />
              </div>
            )}

            {/* Gradient + vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/15 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

            {/* Category chip (theme-independent scrim) */}
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/55 text-white backdrop-blur-md border border-white/20 shadow-sm">
                {project.category}
              </span>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 inset-x-0 p-4">
              <h3 className="font-display font-bold text-base sm:text-lg text-foreground leading-tight line-clamp-2 group-hover:text-brand transition-colors duration-300">
                {project.title}
              </h3>
            </div>

            {/* Hover link affordance */}
            {project.link && (
              <div className="absolute top-3 left-3 p-1.5 rounded-lg bg-black/45 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400 backdrop-blur-sm">
                <ExternalLink className="size-3.5" />
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="p-3.5 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-semibold rounded-full border border-brand/20 bg-brand/5 text-brand"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full border border-border/50 bg-muted text-muted-foreground">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        </Wrapper>
      </motion.div>
    </div>
  );
}

/* ───────────────────────────────────────────────────
   Projects — 3D labyrinth scroll gallery
─────────────────────────────────────────────────── */
export default function Projects({ items }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'All'
    ? items
    : items.filter((p) => p.category === activeCategory);

  const total = filtered.length;
  const cameraMax = total > 1 ? (total - 1) * F : 0;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track active card from scroll progress.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = total > 1 ? Math.round(v * (total - 1)) : 0;
    setActive(clamp(idx, 0, Math.max(0, total - 1)));
  });

  // Responsive multiplier for side swing.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const mult = isMobile ? 0.34 : 0.5;

  const goTo = useCallback(
    (idx: number) => {
      const el = containerRef.current;
      if (!el) return;
      const p = total > 1 ? idx / (total - 1) : 0;
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const distance = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + p * distance, behavior: 'smooth' });
    },
    [total],
  );

  const goNext = () => goTo(Math.min(active + 1, total - 1));
  const goPrev = () => goTo(Math.max(active - 1, 0));

  // Keyboard nav when the gallery viewport is on screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.4;
      if (!inView) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, total, goNext, goPrev]);

  const activeProject = filtered[active];

  return (
    <div className="space-y-8">
      {/* ── Filter pills ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-2"
      >
        <Filter className="size-4 text-muted-foreground self-center mr-1" />
        {projectCategories.map((cat, idx) => {
          const isActive = cat === activeCategory;
          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04, duration: 0.3 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-brand text-brand-foreground shadow-md shadow-brand/25 glow-hover'
                    : 'border-border/60 hover:border-brand/50 hover:text-brand hover:bg-brand/5'
                }`}
              >
                {cat}
                {isActive && (
                  <motion.span
                    layoutId="filter-active-dot"
                    className="ml-1.5 w-1.5 h-1.5 rounded-full bg-brand-foreground/70 inline-block"
                  />
                )}
              </Button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Empty state */}
      {total === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Sparkles className="size-8 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No projects in this category yet.</p>
        </div>
      )}

      {/* ── 3D labyrinth scroll gallery ── */}
      {total > 0 && (
        <div
          ref={containerRef}
          className="relative"
          style={{ height: `${Math.max(total, 3) * 100}vh` }}
        >
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Perspective stage */}
            <div
              className="absolute inset-0"
              style={{ perspective: '1200px', perspectiveOrigin: 'center 45%' }}
            >
              {/* Ambient floor glow following active side */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 100% at 50% 120%, oklch(0.65 0.17 160 / 0.10), transparent 70%)',
                }}
              />

              {filtered.map((project, index) => (
                <GalleryCard
                  key={`${project.title}-${activeCategory}`}
                  project={project}
                  index={index}
                  total={total}
                  progress={scrollYProgress}
                  cameraMax={cameraMax}
                  mult={mult}
                />
              ))}
            </div>

            {/* ── Active project info panel ── */}
            <AnimatePresence mode="wait">
              {activeProject && (
                <motion.div
                  key={`${activeProject.title}-${active}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92vw] max-w-2xl
                             rounded-2xl border border-border/50 bg-card/85 backdrop-blur-xl
                             p-4 sm:p-5 shadow-xl shadow-black/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="label-xs text-brand mb-1.5">{activeProject.category}</p>
                      <h3 className="font-display font-bold text-base sm:text-lg text-foreground leading-tight line-clamp-2">
                        {activeProject.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 mt-1.5">
                        {activeProject.description}
                      </p>
                    </div>
                    {activeProject.link && (
                      <a
                        href={activeProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-brand/80 transition-colors"
                      >
                        View
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Navigation controls ── */}
            <div className="absolute top-1/2 left-3 sm:left-6 -translate-y-1/2 z-50">
              <button
                onClick={goPrev}
                disabled={active <= 0}
                aria-label="Previous project"
                className="grid place-items-center size-10 rounded-full border border-border/60 bg-card/70 backdrop-blur-md text-foreground hover:border-brand/50 hover:text-brand disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronLeft className="size-5" />
              </button>
            </div>
            <div className="absolute top-1/2 right-3 sm:right-6 -translate-y-1/2 z-50">
              <button
                onClick={goNext}
                disabled={active >= total - 1}
                aria-label="Next project"
                className="grid place-items-center size-10 rounded-full border border-border/60 bg-card/70 backdrop-blur-md text-foreground hover:border-brand/50 hover:text-brand disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>

            {/* ── Progress dots + counter + hint ── */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">
              <div className="flex items-center gap-1.5">
                {filtered.map((p, i) => (
                  <button
                    key={`${p.title}-dot`}
                    onClick={() => goTo(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active
                        ? 'w-6 bg-brand'
                        : 'w-1.5 bg-border hover:bg-brand/50'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
                <Compass className="size-3.5 text-brand/70" />
                <span>
                  {active + 1} / {total}
                </span>
                <span className="text-border/70">·</span>
                <span className="hidden sm:inline">Scroll or use arrows to explore the labyrinth</span>
                <span className="sm:hidden">Swipe / scroll</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}