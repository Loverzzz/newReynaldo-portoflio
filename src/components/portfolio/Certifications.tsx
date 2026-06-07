"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CertificationItem } from "@/data/portfolio";

interface CertificationsProps {
  items: CertificationItem[];
}

const INITIAL_COUNT = 6;

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
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

export default function Certifications({ items }: CertificationsProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? items : items.slice(0, INITIAL_COUNT);
  const hasMore = items.length > INITIAL_COUNT;

  return (
    <div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {displayed.map((cert, index) => {
            const card = (
              <motion.div
                key={cert.title}
                variants={cardVariants}
                exit="exit"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className={`
                  h-full transition-all duration-500 group cursor-pointer
                  ${isDark 
                    ? 'bg-card/80 border-border/50 hover:border-brand/50' 
                    : 'bg-card/90 border-border/50 hover:border-brand/50'
                  }
                  hover:shadow-xl hover:shadow-brand/10
                `}>
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, oklch(0.65 0.17 160 / 0.08) 0%, transparent 60%)',
                    }}
                  />

                  <CardContent className="relative flex h-full flex-col gap-4 p-5">
                    {/* Icon & Link row */}
                    <div className="flex items-start justify-between">
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-muted text-white shadow-lg shadow-brand/20"
                      >
                        <Award className="h-6 w-6" />
                      </motion.div>
                      {cert.link && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <ExternalLink className="h-5 w-5 text-brand" />
                        </motion.div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-foreground leading-tight group-hover:text-brand transition-colors duration-300">
                      {cert.title}
                    </h3>

                    {/* Provider */}
                    <p className="text-sm font-medium text-foreground/80">
                      {cert.provider}
                    </p>

                    {/* Issued date */}
                    {cert.issued && (
                      <p className="text-xs font-medium text-foreground/60 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {cert.issued}
                      </p>
                    )}

                    {/* Credential ID */}
                    {cert.credentialId && (
                      <Badge
                        variant="outline"
                        className="mt-auto w-fit max-w-full truncate rounded-md px-2.5 py-1 font-mono text-[10px] font-medium bg-brand/5 border-brand/20 text-foreground/70"
                      >
                        {cert.credentialId}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );

            // Wrap in anchor if link exists
            if (cert.link) {
              return (
                <a
                  key={cert.title}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded-xl"
                  aria-label={`View ${cert.title} credential`}
                >
                  {card}
                </a>
              );
            }

            return card;
          })}
        </AnimatePresence>
      </motion.div>

      {/* Show More / Show Less */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll((prev) => !prev)}
            className="gap-2 rounded-full px-6 py-2 font-medium hover:bg-brand hover:text-brand-foreground transition-all duration-300"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Show More ({items.length - INITIAL_COUNT} more)
              </>
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
