"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  ExternalLink,
  ChevronDown,
  ChevronUp,
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
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export default function Certifications({ items }: CertificationsProps) {
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
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {displayed.map((cert) => {
            const card = (
              <motion.div
                key={cert.title}
                variants={cardVariants}
                layout
                exit="exit"
              >
                <Card className="h-full transition-shadow duration-300 hover:shadow-lg group">
                  <CardContent className="flex h-full flex-col gap-3 p-5">
                    {/* Icon & Link row */}
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      {cert.link && (
                        <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-semibold leading-tight">
                      {cert.title}
                    </h3>

                    {/* Provider */}
                    <p className="text-xs text-muted-foreground">
                      {cert.provider}
                    </p>

                    {/* Issued date */}
                    {cert.issued && (
                      <p className="text-xs text-muted-foreground/70">
                        {cert.issued}
                      </p>
                    )}

                    {/* Credential ID */}
                    {cert.credentialId && (
                      <Badge
                        variant="outline"
                        className="mt-auto w-fit max-w-full truncate rounded-md px-2 py-0.5 font-mono text-[10px] leading-tight"
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
                  className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded-lg"
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
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll((prev) => !prev)}
            className="gap-2 rounded-full"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Show More
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
