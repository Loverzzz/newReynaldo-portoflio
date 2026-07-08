'use client';

import { useState, useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';
import {
  ExternalLink,
  Filter as FilterIcon,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import type { ProjectItem } from '@/data/portfolio';
import { projectCategories } from '@/data/portfolio';

interface ProjectsProps {
  items: ProjectItem[];
}

/* ── 3D Cinematic Coverflow Card ──────────────────────────
 * Cinematic depth-of-field: active card sharp & zoomed,
 * neighbors subtly blurred, far cards invisible.
 * Filter is applied on an inner wrapper (NOT the 3D-transformed
 * element) so that `preserve-3d` is not flattened.
 */
function Card3D({
  project,
  index,
  total,
  scrollYProgress,
}: {
  project: ProjectItem;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const segment = 1 / Math.max(total - 1, 1);
  const center = index * segment;

  // Signed offset from active position
  //   negative → ahead (not yet reached, blurred)
  //   zero     → active (sharp, zoomed)
  //   positive → passed (vanishing)
  const offset = useTransform(scrollYProgress, (v) => {
    if (total <= 1) return 0;
    return (v - center) / segment;
  });

  /* ── Tight, precise transform ranges ──
   * Only ~3 cards are meaningfully visible at any time. */
  const rotateY = useTransform(offset, [-1.5, -0.5, 0, 0.5, 1.5], [-30, -13, 0, 13, 30]);
  const scale = useTransform(offset, [-1.5, -0.5, 0, 0.5, 1.5], [0.78, 0.93, 1.1, 0.93, 0.78]);
  const z = useTransform(offset, [-1.5, 0, 1.5], [-160, 50, -160]);

  // Asymmetric opacity — passed vanishes fast, ahead fades in
  const opacity = useTransform(
    offset,
    [-1.8, -1, -0.3, 0, 0.3, 0.8, 1.2],
    [0, 0.25, 0.85, 1, 0.85, 0.2, 0],
  );

  // Subtle depth-of-field blur — max 6px (smooth & performant)
  const blurAmount = useTransform(offset, [-1.2, -0.4, 0, 0.4, 1.1], [6, 1.5, 0, 1.5, 6]);
  const filter = useMotionTemplate`blur(${blurAmount}px)`;

  // Details only visible on active card
  const detailsOpacity = useTransform(offset, [-0.35, -0.1, 0.1, 0.35], [0, 1, 1, 0]);
  const detailsY = useTransform(offset, [-0.35, 0, 0.35], [10, 0, 10]);

  // Glow behind active card
  const glowOpacity = useTransform(offset, [-0.4, 0, 0.4], [0, 0.5, 0]);

  return (
    <motion.div
      className="relative shrink-0"
      style={{
        rotateY,
        scale,
        z,
        opacity,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
    >
      {/* Active glow — stays sharp (outside blur wrapper) */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute -inset-4 rounded-[2rem] blur-2xl pointer-events-none bg-gradient-to-br from-brand/50 to-brand/10"
      />

      {/* Blur wrapper — must be motion.div so MotionValue filter works */}
      <motion.div style={{ filter, willChange: 'filter' }}>
        <div className="relative w-[80vw] sm:w-[60vw] md:w-[440px] rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl bg-card flex flex-col">
          {/* ── Image area (landscape — fits dashboard screenshots) ── */}
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover object-top"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-brand/30 via-card to-background flex items-center justify-center">
                <Sparkles className="size-12 text-brand/30" />
              </div>
            )}

            {/* Blend gradient into content */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent pointer-events-none" />

            {/* Category badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-sm">
                {project.category}
              </span>
            </div>
          </div>

          {/* ── Content area ── */}
          <div className="relative p-5 md:p-6 space-y-2 bg-card">
            <h3 className="font-bold text-base md:text-xl leading-tight line-clamp-2">
              {project.title}
            </h3>

            <motion.div
              style={{ opacity: detailsOpacity, y: detailsY }}
              className="space-y-3"
            >
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-semibold rounded-full border border-brand/40 bg-brand/15 text-brand"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full border border-border text-muted-foreground">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:text-brand/80 transition-colors pt-1"
                >
                  <ExternalLink className="size-3.5" />
                  View Project
                  <ArrowUpRight className="size-3" />
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Projects Component ───────────────────────────── */
export default function Projects({ items }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [stepWidth, setStepWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered =
    activeCategory === 'All'
      ? items
      : items.filter((p) => p.category === activeCategory);

  const total = filtered.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveIndex(Math.round(v * Math.max(total - 1, 0)));
  });

  /* Precisely measure the distance between consecutive card centers.
   * This is deterministic and far more reliable than scrollWidth. */
  useEffect(() => {
    const measure = () => {
      const el = galleryRef.current;
      if (!el || el.children.length < 2) return;
      const c1 = el.children[0] as HTMLElement;
      const c2 = el.children[1] as HTMLElement;
      setStepWidth(c2.offsetLeft - c1.offsetLeft);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (galleryRef.current) ro.observe(galleryRef.current);
    window.addEventListener('resize', measure);
    const t1 = setTimeout(measure, 300);
    const t2 = setTimeout(measure, 1000); // re-measure after images settle

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [total, activeCategory]);

  // Horizontal translation — exactly step-based for pixel-perfect alignment
  const x = useTransform(scrollYProgress, (v) => v * -stepWidth * Math.max(total - 1, 0));

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  // ~50vh of scroll per card — snappy but not rushed
  const sectionHeight = `${Math.max((total - 1) * 50 + 100, 100)}vh`;

  const categories = projectCategories;

  return (
    <section id="projects" className="relative py-20 md:py-24">
      {/* ── Background depth ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 55% at 50% 50%, oklch(0.65 0.17 160 / 0.04) 0%, transparent 68%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(oklch(0.65 0.17 160) 1px, transparent 1px),
                              linear-gradient(90deg, oklch(0.65 0.17 160) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* ── Heading ── */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand/70" />
            <span className="eyebrow-pill">Selected work</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand/70" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl font-black tracking-tight md:text-4xl lg:text-5xl"
          >
            <span className="gradient-text">Projects</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-muted-foreground text-base sm:text-lg"
          >
            Hands-on work spanning data analytics, AI, and creative video production.
          </motion.p>
        </div>

        {/* ── Filter pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2"
        >
          <FilterIcon className="size-4 text-muted-foreground self-center mr-1" />
          {categories.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-brand text-brand-foreground shadow-md shadow-brand/25'
                    : 'border border-border/60 text-muted-foreground hover:border-brand/50 hover:text-brand hover:bg-brand/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* ── 3D Scroll Gallery ── */}
      {total > 0 ? (
        <div ref={containerRef} style={{ height: sectionHeight }}>
          {/* Sticky stage — stays fixed while scrolling through the tall parent */}
          <div className="sticky top-0 h-screen overflow-hidden flex items-center">
            {/* Perspective + horizontal track.
                 Padding centers the first card: (viewport - card) / 2 */}
            <motion.div
              ref={galleryRef}
              style={{ x, perspective: 1400 }}
              className="flex gap-8 md:gap-12 px-[10vw] md:px-[calc(50vw-220px)] items-center will-change-transform"
            >
              {filtered.map((project, i) => (
                <Card3D
                  key={`${project.title}-${i}`}
                  project={project}
                  index={i}
                  total={total}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </motion.div>

            {/* ── Progress bar ── */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 md:w-64 h-1 bg-border/50 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full bg-gradient-to-r from-brand to-brand/60 origin-left rounded-full"
              />
            </div>

            {/* ── Card counter ── */}
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-xs font-bold text-muted-foreground tracking-widest">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(total).padStart(2, '0')}
            </div>

            {/* ── Scroll hint ── */}
            <motion.div
              style={{ opacity: scrollHintOpacity }}
              className="absolute bottom-8 right-8 hidden md:flex items-center gap-2 text-xs font-semibold text-muted-foreground"
            >
              Scroll to explore
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <Sparkles className="size-8 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No projects in this category yet.</p>
        </div>
      )}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}