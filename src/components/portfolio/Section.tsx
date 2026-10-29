"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  aside,
}: {
  index: string;
  label: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="flex items-center gap-3 border-t border-foreground/80 pt-3">
        <span className="eyebrow text-foreground">{index}</span>
        <span className="eyebrow">{label}</span>
      </div>
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
          {title}
        </h2>
        {aside && (
          <div className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {aside}
          </div>
        )}
      </div>
    </Reveal>
  );
}
