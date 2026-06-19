"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CertificationItem } from "@/data/portfolio";

interface CertificationsProps {
  items: CertificationItem[];
}

const INITIAL_COUNT = 9;

// Provider colour / icon mapping
const providerMeta: Record<
  string,
  { color: string; accent: string; badge: string }
> = {
  "Dicoding Indonesia": {
    color: "from-blue-500 to-indigo-600",
    accent: "border-blue-500/30 bg-blue-500/5",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  "EF Standard English Test (EF SET)": {
    color: "from-emerald-500 to-teal-600",
    accent: "border-emerald-500/30 bg-emerald-500/5",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  "Microsoft Press": {
    color: "from-orange-500 to-yellow-500",
    accent: "border-orange-500/30 bg-orange-500/5",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  },
  LinkedIn: {
    color: "from-sky-500 to-blue-600",
    accent: "border-sky-500/30 bg-sky-500/5",
    badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  },
};

const fallbackMeta = {
  color: "from-brand to-brand-muted",
  accent: "border-brand/30 bg-brand/5",
  badge: "bg-brand/10 text-brand border-brand/20",
};

/* ──────────────────────────────────────────────────────────────
   Single 3-D card
────────────────────────────────────────────────────────────── */
function CertCard({
  cert,
  index,
  total,
  scrollProgress,
}: {
  cert: CertificationItem;
  index: number;
  total: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const meta = providerMeta[cert.provider] ?? fallbackMeta;

  // Each card enters the "viewport tunnel" at a slightly different scroll offset
  const start = index / (total + 4);
  const end = start + 0.35;

  const rawRotateX = useTransform(scrollProgress, [start, end], [55, 0]);
  const rawOpacity = useTransform(scrollProgress, [start, start + 0.12, end], [0, 1, 1]);
  const rawScale = useTransform(scrollProgress, [start, end], [0.7, 1]);
  const rawZ = useTransform(scrollProgress, [start, end], [-300, 0]);

  // Spring-smooth everything
  const rotateX = useSpring(rawRotateX, { stiffness: 60, damping: 18 });
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 20 });
  const scale = useSpring(rawScale, { stiffness: 60, damping: 18 });
  const z = useSpring(rawZ, { stiffness: 60, damping: 18 });

  const card = (
    <motion.div
      style={{ rotateX, opacity, scale, z, transformPerspective: 900 }}
      whileHover={{
        y: -10,
        rotateX: 3,
        scale: 1.04,
        transition: { type: "spring", stiffness: 280, damping: 22 },
      }}
      className="h-full will-change-transform"
    >
      <div
        className={`
          relative h-full rounded-2xl border backdrop-blur-sm
          transition-shadow duration-500 group cursor-pointer overflow-hidden
          ${meta.accent}
          hover:shadow-2xl hover:shadow-brand/10
        `}
      >
        {/* Animated top gradient line */}
        <div
          className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${meta.color}`}
        />

        {/* Hover shimmer overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.17 160 / 0.06) 0%, transparent 60%)",
          }}
        />

        <div className="relative flex h-full flex-col gap-3.5 p-5">
          {/* Icon row */}
          <div className="flex items-start justify-between">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.12 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${meta.color} shadow-lg`}
            >
              <Award className="h-5 w-5 text-white" />
            </motion.div>

            {cert.link && (
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <ExternalLink className="h-4 w-4 text-brand" />
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-brand transition-colors duration-300 line-clamp-2">
            {cert.title}
          </h3>

          {/* Provider */}
          <p className="text-xs font-semibold text-foreground/70">
            {cert.provider}
          </p>

          {/* Issued */}
          {cert.issued && (
            <p className="text-[11px] text-foreground/50 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 shrink-0" />
              {cert.issued}
            </p>
          )}

          {/* Credential badge */}
          {cert.credentialId && (
            <div className="mt-auto">
              <span
                className={`
                  inline-flex items-center gap-1 rounded-md border px-2 py-0.5
                  font-mono text-[9px] font-medium truncate max-w-full
                  ${meta.badge}
                `}
              >
                <BadgeCheck className="w-2.5 h-2.5 shrink-0" />
                {cert.credentialId.length > 22
                  ? cert.credentialId.slice(0, 22) + "…"
                  : cert.credentialId}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (cert.link) {
    return (
      <a
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded-2xl"
        aria-label={`View ${cert.title} credential`}
      >
        {card}
      </a>
    );
  }
  return card;
}

/* ──────────────────────────────────────────────────────────────
   Closing quote section
────────────────────────────────────────────────────────────── */
function ClosingSection({
  scrollProgress,
}: {
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const rawOpacity = useTransform(scrollProgress, [0.72, 0.92], [0, 1]);
  const rawY = useTransform(scrollProgress, [0.72, 0.92], [60, 0]);
  const opacity = useSpring(rawOpacity, { stiffness: 60, damping: 20 });
  const y = useSpring(rawY, { stiffness: 60, damping: 18 });

  return (
    <motion.div
      style={{ opacity, y }}
      className="mt-20 flex flex-col items-center text-center px-4"
    >
      {/* Decorative line */}
      <div className="flex items-center gap-4 mb-8 w-full max-w-md">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-brand/40" />
        <GraduationCap className="h-6 w-6 text-brand shrink-0" />
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-brand/40" />
      </div>

      {/* Quote */}
      <blockquote className="max-w-2xl">
        <p className="text-2xl sm:text-3xl font-bold leading-snug gradient-text mb-4">
          &ldquo;Learning never exhausts the mind — it only ignites it.&rdquo;
        </p>
        <footer className="text-sm text-muted-foreground font-medium">
          — Leonardo da Vinci
        </footer>
      </blockquote>

      {/* Sub-text */}
      <p className="mt-6 max-w-xl text-sm text-muted-foreground leading-relaxed">
        Each certificate above represents a deliberate step forward — from
        machine learning fundamentals and data science pipelines to cloud
        infrastructure and creative technology.{" "}
        <span className="text-foreground font-medium">
          I don&apos;t collect credentials; I collect capabilities.
        </span>{" "}
        Every course translated into a real project, a solved problem, or a
        measurable result.
      </p>

      {/* Stat pills */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {[
          { label: "Certifications", value: "18+" },
          { label: "Learning Platforms", value: "4" },
          { label: "Active Since", value: "2022" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-full border border-brand/20 bg-brand/5 px-5 py-2 text-center"
          >
            <span className="text-base font-bold gradient-text">
              {stat.value}
            </span>
            <span className="ml-2 text-xs text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Main export
────────────────────────────────────────────────────────────── */
export default function Certifications({ items }: CertificationsProps) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? items : items.slice(0, INITIAL_COUNT);
  const hasMore = items.length > INITIAL_COUNT;

  // The scroll container wraps the whole section so the 3-D effect
  // is tied to how far the user has scrolled through this specific area.
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={sectionRef}>
      {/* 3-D perspective container */}
      <div
        style={{ perspective: "1200px", perspectiveOrigin: "50% 30%" }}
        className="relative"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {displayed.map((cert, index) => (
              <motion.div
                key={cert.title}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.35 }}
                className="h-full"
              >
                <CertCard
                  cert={cert}
                  index={index}
                  total={displayed.length}
                  scrollProgress={scrollYProgress}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

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
            className="gap-2 rounded-full px-6 py-2 font-medium hover:bg-brand hover:text-brand-foreground transition-all duration-300 border-brand/30"
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

      {/* ── Closing 3-D text section ── */}
      <ClosingSection scrollProgress={scrollYProgress} />
    </div>
  );
}
