"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface SkillsProps {
  items: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function Skills({ items }: SkillsProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="flex flex-wrap justify-center gap-3"
    >
      {items.map((skill) => (
        <motion.div key={skill} variants={chipVariants}>
          <Badge
            variant="secondary"
            className="cursor-default rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105 hover:bg-brand hover:text-brand-foreground hover:shadow-md"
          >
            {skill}
          </Badge>
        </motion.div>
      ))}
    </motion.div>
  );
}
