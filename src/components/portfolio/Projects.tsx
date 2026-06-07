'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Sparkles, ArrowUpRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ProjectItem } from '@/data/portfolio';
import { projectCategories } from '@/data/portfolio';

interface ProjectsProps {
  items: ProjectItem[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

export default function Projects({ items }: ProjectsProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return items;
    return items.filter((p) => p.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <div className="space-y-8">
      {/* Category filter tabs with enhanced styling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-2"
      >
        {projectCategories.map((category, idx) => {
          const isActive = activeCategory === category;
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Button
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={`
                  relative rounded-full text-sm font-medium transition-all duration-300
                  ${isActive
                    ? 'bg-brand text-brand-foreground shadow-lg shadow-brand/25'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                `}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {isActive && <Sparkles className="size-3.5" />}
                  {category}
                </span>
              </Button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Projects grid */}
      <AnimatePresence mode="popLayout">
        {filteredProjects.length > 0 ? (
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                variants={cardVariants}
                exit="exit"
                onHoverStart={() => setHoveredProject(project.title)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <a
                  href={project.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Card className={`
                    group h-full relative overflow-hidden cursor-pointer
                    transition-all duration-500
                    ${isDark 
                      ? 'bg-card/40 border-border/50 hover:border-brand/50' 
                      : 'bg-card/60 border-border/50 hover:border-brand/50'
                    }
                    ${hoveredProject === project.title ? 'shadow-2xl shadow-brand/10' : 'shadow-lg'}
                  `}>
                    {/* Animated gradient border on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(135deg, oklch(0.65 0.17 160 / 0.2), oklch(0.70 0.15 140 / 0.2))',
                        padding: '2px',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                      }}
                    />

                    {/* Project Image with enhanced effects */}
                    {project.image && (
                      <div className="relative h-48 overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        />
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {/* Hover overlay with icon */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                        >
                          <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            whileHover={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="p-3 rounded-full bg-white/20 backdrop-blur-md"
                          >
                            <ArrowUpRight className="w-6 h-6 text-white" />
                          </motion.div>
                        </motion.div>

                        {/* Category badge */}
                        <div className="absolute top-3 left-3">
                          <Badge
                            variant="secondary"
                            className="bg-black/50 text-white border-0 backdrop-blur-sm"
                          >
                            {project.category}
                          </Badge>
                        </div>
                      </div>
                    )}

                    <CardContent className="p-5 flex flex-col h-full space-y-4 relative">
                      {/* Title with hover effect */}
                      <motion.h3
                        className="font-bold text-lg leading-tight pr-6 text-foreground group-hover:text-brand transition-colors duration-300"
                      >
                        {project.title}
                      </motion.h3>

                      {/* Description */}
                      <p className="text-sm text-foreground/80 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags with enhanced styling */}
                      <div className="flex flex-wrap gap-2 mt-auto pt-2">
                        {project.tags.slice(0, 4).map((tag, tIndex) => (
                          <motion.div
                            key={tIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: tIndex * 0.05 }}
                          >
                            <Badge
                              variant="outline"
                              className="text-xs font-medium bg-brand/10 border-brand/30 text-foreground hover:bg-brand/20 transition-colors"
                            >
                              {tag}
                            </Badge>
                          </motion.div>
                        ))}
                        {project.tags.length > 4 && (
                          <Badge variant="outline" className="text-xs font-medium bg-muted/50">
                            +{project.tags.length - 4}
                          </Badge>
                        )}
                      </div>

                      {/* Link indicator */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <ExternalLink className="w-4 h-4 text-brand" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Sparkles className="w-12 h-12 text-muted-foreground/50" />
            </motion.div>
            <p className="text-lg text-muted-foreground">
              No projects found in this category
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
