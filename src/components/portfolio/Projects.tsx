'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
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
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

export default function Projects({ items }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return items;
    return items.filter((p) => p.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <div className="space-y-6">
      {/* Category filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {projectCategories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <Button
              key={category}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-brand text-brand-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </Button>
          );
        })}
      </div>

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
                layout
                exit="exit"
              >
                <a
                  href={project.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Card className="group h-full relative overflow-hidden hover:shadow-lg hover:border-brand/30 transition-all duration-300 cursor-pointer">
                    {/* Project Image */}
                    {project.image && (
                      <div className="relative h-48 overflow-hidden bg-muted">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {project.link && (
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    )}

                    <CardContent className="p-4 md:p-6 flex flex-col h-full space-y-3">
                      {/* Link icon fallback (when no image) */}
                      {project.link && !project.image && (
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ExternalLink className="w-4 h-4 text-brand" />
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="font-semibold text-lg leading-tight pr-6">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-auto pt-2">
                        {project.tags.map((tag, tIndex) => (
                          <Badge
                            key={tIndex}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16 text-muted-foreground"
          >
            <p className="text-lg">No projects found in this category</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
