"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTilt } from "@/hooks/use-tilt";
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
  { color: string; bg: string; glow: string; icon: typeof Award }
> = {
  Dicoding: {
    color: "#4f46e5",
    bg: "from-indigo-500 to-purple-600",
    glow: "79,70,229",
    icon: GraduationCap,
  },
  Coursera: {
    color: "#0056d2",
    bg: "from-blue-600 to-blue-500",
    glow: "0,86,210",
    icon: GraduationCap,
  },
  Google: {
    color: "#4285f4",
    bg: "from-blue-500 to-cyan-500",
    glow: "66,133,244",
    icon: BadgeCheck,
  },
  IBM: {
    color: "#1f70c1",
    bg: "from-blue-700 to-blue-500",
    glow: "31,112,193",
    icon: BadgeCheck,
  },
  "DeepLearning.AI": {
    color: "#e84040",
    bg: "from-red-500 to-rose-600",
    glow: "232,64,64",
    icon: Award,
  },
  Meta: {
    color: "#0082fb",
    bg: "from-blue-500 to-indigo-600",
    glow: "0,130,251",
    icon: BadgeCheck,
  },
  Microsoft: {
    color: "#00a4ef",
    bg: "from-sky-400 to-blue-500",
    glow: "0,164,239",
    icon: BadgeCheck,
  },
  AWS: {
    color: "#ff9900",
    bg: "from-orange-400 to-amber-500",
    glow: "255,153,0",
    icon: Award,
  },
  default: {
    color: "#10b981",
    bg: "from-emerald-500 to-teal-500",
    glow: "16,185,129",
    icon: Award,
  },
};

function getProviderMeta(provider: string) {
  for (const key of Object.keys(providerMeta)) {
    if (
      key !== "default" &&
      provider.toLowerCase().includes(key.toLowerCase())
    ) {
      return providerMeta[key];
    }
  }
  return providerMeta["default"];
}

/* 3D tilt certification card */
function CertCard({ cert, index }: { cert: CertificationItem; index: number }) {
  const tilt = useTilt({ strength: 6, stiffness: 280, damping: 28 });
  const meta = getProviderMeta(cert.provider);
  const Icon = meta.icon;

  const Wrapper: React.ElementType = cert.link ? "a" : "div";
  const wrapperProps = cert.link
    ? {
        href: cert.link,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `View credential: ${cert.title}`,
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-2xl"
    >
      <motion.div
        ref={tilt.ref}
        onMouseMove={tilt.handleMouse}
        onMouseLeave={tilt.handleLeave}
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.35,
          delay: (index % 9) * 0.03,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative group will-change-transform h-full"
      >
        {/* Glow aura */}
        <div
          className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(${meta.glow},0.35) 0%, transparent 70%)`,
          }}
        />

        <div
          className="relative h-full rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-5
                   hover:border-brand/40 hover:bg-card/95 hover:shadow-xl hover:shadow-brand/8
                   transition-all duration-400 overflow-hidden holographic cursor-default group/card"
          style={{ transformStyle: "preserve-3d" }}
        >
           {/* Scanline hover effect */}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-y-full group-hover/card:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />
           
          {/* Top accent gradient bar */}
          <div
            className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${meta.bg} opacity-40 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_8px_rgba(var(--brand),0.3)]`}
          />

          {/* Shimmer sweep on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-700 ease-in-out" />
          </div>

          <div className="space-y-3" style={{ transformStyle: "preserve-3d" }}>
            {/* Icon + Provider */}
            <div
              className="flex items-center justify-between"
              style={{ transform: "translateZ(6px)" }}
            >
              <div className="flex items-center gap-2.5 relative">
                <motion.div
                  className={`p-2 rounded-xl bg-gradient-to-br ${meta.bg} shadow-md relative group-hover/card:shadow-lg transition-shadow overflow-hidden`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                   <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 shimmer" />
                  <Icon className="size-3.5 text-white relative z-10 drop-shadow-sm" />
                </motion.div>
                <span className="text-xs font-bold text-foreground/80 tracking-wide uppercase group-hover/card:text-foreground transition-colors duration-300">
                  {cert.provider}
                </span>
              </div>

              {/* Visual indicator — whole card is clickable now */}
              {cert.link && (
                <div className="p-1.5 rounded-lg text-muted-foreground group-hover:text-brand group-hover:bg-brand/10 transition-all duration-300">
                  <ExternalLink className="size-3.5" />
                </div>
              )}
            </div>

            {/* Title */}
            <h3
              className="font-semibold text-sm text-foreground group-hover/card:text-brand transition-colors duration-300 leading-snug drop-shadow-sm"
              style={{ transform: "translateZ(4px)" }}
            >
              {cert.title}
            </h3>

            {/* Meta info */}
            <div
              className="flex flex-wrap items-center gap-2 pt-1"
              style={{ transform: "translateZ(3px)" }}
            >
              {cert.issued && (
                <span className="text-[10px] font-medium text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full border border-border/40">
                  {cert.issued}
                </span>
              )}
              {cert.credentialId && (
                <span className="text-[10px] font-mono text-muted-foreground/70 truncate max-w-[120px]">
                  #{cert.credentialId.slice(0, 12)}…
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Wrapper>
  );
}

export default function Certifications({ items }: CertificationsProps) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? items : items.slice(0, INITIAL_COUNT);
  const hiddenCount = items.length - INITIAL_COUNT;

  return (
    <div className="space-y-8">
      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-6 py-4"
      >
        {[
          { value: items.length, label: "Certifications", icon: Award },
          {
            value: new Set(items.map((c) => c.provider)).size,
            label: "Providers",
            icon: Sparkles,
          },
        ].map(({ value, label, icon: Icon }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.06, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex items-center gap-3 px-5 py-3 rounded-2xl border border-border bg-card backdrop-blur-sm
                       hover:border-brand/40 hover:shadow-lg hover:shadow-brand/10 hover:bg-brand/5 transition-all duration-300 dark:border-border/50 dark:bg-card/70 relative overflow-hidden cursor-default"
          >
             {/* Shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
            
            <div className="p-2 rounded-xl bg-brand/10 border border-brand/20 group-hover:bg-brand/20 transition-colors relative overflow-hidden">
               <div className="absolute inset-0 bg-brand/30 blur-[4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <Icon className="size-4 text-brand relative z-10 drop-shadow-[0_0_2px_rgba(var(--brand),0.5)] group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <div className="text-xl font-black bg-gradient-to-br from-brand to-brand/70 bg-clip-text text-transparent">{value}+</div>
                <div className="text-xs text-foreground/80 font-medium">
                  {label}
                </div>
              </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Grid */}
      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        style={{ perspective: "1200px" }}
      >
        <AnimatePresence mode="popLayout">
          {shown.map((cert, index) => (
            <CertCard
              key={`${cert.title}-${cert.provider}`}
              cert={cert}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Show more / less */}
      {hiddenCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex justify-center pt-4"
        >
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="gap-2 border-brand/30 text-brand hover:bg-brand/8 hover:border-brand/55 font-bold text-sm transition-all duration-300 rounded-xl px-5"
            >
              {expanded ? (
                <>
                  <ChevronUp className="size-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="size-4" />
                  Show {hiddenCount} More
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
