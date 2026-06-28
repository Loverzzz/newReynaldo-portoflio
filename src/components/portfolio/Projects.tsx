'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTilt } from '@/hooks/use-tilt';
import { useTheme } from 'next-themes';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowUpRight, Sparkles, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ProjectItem } from '@/data/portfolio';
import { projectCategories } from '@/data/portfolio';

interface ProjectsProps {
  items: ProjectItem[];
}

/* 3D tilt card */
function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const tilt = useTilt({ strength: 6, stiffness: 250, damping: 28 });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      ref={tilt.ref}
      onMouseMove={tilt.handleMouse}
      onMouseLeave={tilt.handleLeave}
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
      className="relative group will-change-transform"
    >
      {/* Glow behind card */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, oklch(0.65 0.17 160 / 0.4), oklch(0.60 0.20 200 / 0.3))' }}
      />

      <Card
        className={`relative h-full overflow-hidden border transition-all duration-500 holographic
          ${isDark
            ? 'bg-card/80 border-border/50 hover:border-brand/40'
            : 'bg-card/90 border-border/50 hover:border-brand/40'}
          hover:shadow-2xl hover:shadow-brand/10`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Top gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand/40 via-brand to-brand/40 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image / thumbnail */}
        {project.image && (
          <div className="relative overflow-hidden h-44" style={{ transform: 'translateZ(4px)' }}>
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

            {/* Category chip — fixed dark scrim + white text (theme-independent)
                so it stays legible over white/light images like "Music Recommendation". */}
            <div className="absolute top-3 right-3">
              <span
                className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full
                           bg-black/55 text-white backdrop-blur-md border border-white/20 shadow-sm"
              >
                {project.category}
              </span>
            </div>

            {/* Sparkle icon on hover */}
            <motion.div
              className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="size-4 text-brand" />
            </motion.div>
          </div>
        )}

        <CardContent className="p-5 space-y-4" style={{ transformStyle: 'preserve-3d' }}>
          {/* Category badge when no image */}
          {!project.image && (
            <Badge variant="secondary" className="text-[10px] font-bold bg-brand/10 text-brand border-brand/20">
              {project.category}
            </Badge>
          )}

          {/* Title */}
          <h3
            className="font-bold text-base md:text-lg text-foreground group-hover:text-brand transition-colors duration-300 leading-tight"
            style={{ transform: 'translateZ(6px)' }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm text-muted-foreground leading-relaxed line-clamp-3"
            style={{ transform: 'translateZ(4px)' }}
          >
            {project.description}
          </p>

          {/* Tags / tech stack */}
          <div className="flex flex-wrap gap-1.5" style={{ transform: 'translateZ(3px)' }}>
            {project.tags.slice(0, 5).map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.08, y: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="px-2 py-0.5 text-[10px] font-semibold rounded-full border border-brand/20 bg-brand/5 text-brand hover:bg-brand/15 transition-colors duration-300 cursor-default"
              >
                {tag}
              </motion.span>
            ))}
            {project.tags.length > 5 && (
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full border border-border/50 bg-muted text-muted-foreground cursor-default">
                +{project.tags.length - 5}
              </span>
            )}
          </div>

          {/* Link */}
          {project.link && (
            <div style={{ transform: 'translateZ(8px)' }}>
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand/80 transition-colors duration-300 group/link"
                whileHover={{ x: 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <ExternalLink className="size-3.5 group-hover/link:scale-110 transition-transform" />
                View Project
                <ArrowUpRight className="size-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
              </motion.a>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Projects({ items }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered = activeCategory === 'All'
    ? items
    : items.filter((p) => p.category === activeCategory);

  const categories = projectCategories;

  return (
    <div className="space-y-10">
      {/* ── Filter pills ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-2"
      >
        <Filter className="size-4 text-muted-foreground self-center mr-1" />
        {categories.map((cat, idx) => {
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

      {/* ── Project grid ── */}
      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        style={{ perspective: '1200px' }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 text-muted-foreground"
        >
          <Sparkles className="size-8 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No projects in this category yet.</p>
        </motion.div>
      )}
    </div>
  );
}
