"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useRef, useEffect, useState, useCallback } from "react";
import { useTilt } from "@/hooks/use-tilt";
import {
  Mail,
  Linkedin,
  Phone,
  MapPin,
  Award,
  ChevronDown,
  Sparkles,
  Code2,
  Database,
  Brain,
  Zap,
} from "lucide-react";
import { profile, achievements } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ── Animation Variants ─────────────────────────────────── */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85, rotateY: -10 },
  show: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const floatingIcons = [
  { Icon: Code2, delay: 0, label: "Code" },
  { Icon: Database, delay: 0.4, label: "Data" },
  { Icon: Brain, delay: 0.8, label: "AI" },
  { Icon: Zap, delay: 1.2, label: "Automate" },
];

/* ── Typewriter Hook ─────────────────────────────────────── */
function useTypewriter(texts: string[], speed = 60, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx((i) => (i + 1) % texts.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return displayed;
}

/* ── Photo Spotlight Hook (paint/color reveal — stays colored) ──
 * PERFORMANCE: Previously used canvas.toDataURL() on every mousemove which
 * serializes the entire canvas to a base64 PNG string each frame — extremely
 * expensive. Now we draw the color image directly onto a visible canvas using
 * destination-in compositing. Same "paint reveal" UX, ~10–50x cheaper.
 *
 * CRITICAL: The canvas MUST be sized to match the container's display
 * dimensions × devicePixelRatio. Without this, the canvas defaults to
 * 300×150px, causing a blurry/distorted image and misaligned brush
 * coordinates (the glitch the user reported). */
function usePhotoSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const colorImgRef = useRef<HTMLImageElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ px: number; py: number } | null>(null);

  // ── Size the visible canvas AND mask buffer to the container × DPR ──
  // This is THE fix for the blurry/glitchy image. Without it, canvas defaults
  // to 300×150 and everything is distorted + misaligned.
  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // cap for performance
    const cssW = Math.max(1, Math.round(rect.width));
    const cssH = Math.max(1, Math.round(rect.height));
    const pxW = Math.round(cssW * dpr);
    const pxH = Math.round(cssH * dpr);

    if (canvas.width !== pxW || canvas.height !== pxH) {
      canvas.width = pxW;
      canvas.height = pxH;
    }

    if (
      !maskCanvasRef.current ||
      maskCanvasRef.current.width !== pxW ||
      maskCanvasRef.current.height !== pxH
    ) {
      const mc = document.createElement("canvas");
      mc.width = pxW;
      mc.height = pxH;
      maskCanvasRef.current = mc;
    }
  }, []);

  // Sync on mount + on resize
  useEffect(() => {
    syncCanvasSize();
    const ro = new ResizeObserver(() => syncCanvasSize());
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [syncCanvasSize]);

  // Composite the color photo masked by accumulated brush strokes.
  const composite = useCallback(() => {
    rafRef.current = null;
    const pending = pendingRef.current;
    pendingRef.current = null;
    if (!pending) return;

    syncCanvasSize(); // guard against mousemove before ResizeObserver fires

    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    const colorImg = colorImgRef.current;
    if (!canvas || !maskCanvas) return;

    const w = canvas.width;
    const h = canvas.height;
    const maskCtx = maskCanvas.getContext("2d");
    const visCtx = canvas.getContext("2d");
    if (!maskCtx || !visCtx) return;

    // Scale brush position from CSS pixels → device pixels
    const containerW = containerRef.current?.getBoundingClientRect().width || w;
    const dpr = w / containerW;
    const bx = pending.px * dpr;
    const by = pending.py * dpr;
    const brushR = Math.min(w, h) * 0.18;

    // 1. Accumulate brush stroke (persistent, never cleared)
    const grad = maskCtx.createRadialGradient(bx, by, 0, bx, by, brushR);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.6, "rgba(255,255,255,0.85)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    maskCtx.fillStyle = grad;
    maskCtx.beginPath();
    maskCtx.arc(bx, by, brushR, 0, Math.PI * 2);
    maskCtx.fill();

    // 2. Composite: color photo clipped by accumulated mask.
    //    CRITICAL: we must replicate CSS `object-fit: cover` + `object-position:
    //    top center` EXACTLY, otherwise the painted color won't align with the
    //    BW <img> underneath (the glitch/double-image the user reported).
    //    A plain drawImage(img, 0, 0, w, h) STRETCHES the image instead of
    //    cropping it, causing the misalignment.
    visCtx.globalCompositeOperation = "source-over";
    visCtx.clearRect(0, 0, w, h);
    if (colorImg && colorImg.complete && colorImg.naturalWidth > 0) {
      const iw = colorImg.naturalWidth;
      const ih = colorImg.naturalHeight;
      const canvasRatio = w / h;
      const imgRatio = iw / ih;
      let sx: number, sy: number, sw: number, sh: number;
      if (imgRatio > canvasRatio) {
        // Image is wider than canvas → crop the sides (cover, centered X)
        sh = ih;
        sw = ih * canvasRatio;
        sy = 0;
        sx = (iw - sw) / 2; // object-position-x: center
      } else {
        // Image is taller than canvas → crop top/bottom (cover, anchored top)
        sw = iw;
        sh = iw / canvasRatio;
        sx = 0;
        sy = 0; // object-position-y: top
      }
      visCtx.drawImage(colorImg, sx, sy, sw, sh, 0, 0, w, h);
    }
    visCtx.globalCompositeOperation = "destination-in";
    visCtx.drawImage(maskCanvas, 0, 0);
    visCtx.globalCompositeOperation = "source-over";
  }, [syncCanvasSize]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !maskRef.current || !canvasRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    pendingRef.current = { px, py };

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(composite);
    }

    const pxPct = (px / rect.width) * 100;
    const pyPct = (py / rect.height) * 100;
    maskRef.current.style.background = `radial-gradient(circle 70px at ${pxPct}% ${pyPct}%, transparent 0%, oklch(0 0 0 / 0.22) 100%)`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    syncCanvasSize();
    if (maskRef.current) {
      maskRef.current.style.background =
        "radial-gradient(circle 70px at 50% 50%, transparent 0%, oklch(0 0 0 / 0.22) 100%)";
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    pendingRef.current = null;
    if (maskRef.current) {
      maskRef.current.style.background = "transparent";
    }
    // Painted color on the canvas stays — the "painting persists" UX is preserved.
  };

  return {
    containerRef,
    maskRef,
    canvasRef,
    colorImgRef,
    isHovered,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}

/* ── Main Hero ───────────────────────────────────────────── */
export default function Hero() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const containerRef = useRef<HTMLElement>(null);
  const tilt = useTilt({ strength: 10, stiffness: 200, damping: 25 });
  const spotlight = usePhotoSpotlight();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scaleOut = useTransform(scrollYProgress, [0, 0.65], [1, 0.92]);

  const typed = useTypewriter(
    [
      "AI Video Editor",
      "B.Eng. Robotics & AI",
      "AI Image and Video Creator",
      "Data Analyst",
      "ex - Content Moderator @GearInc",
    ],
    55,
    1800,
  );

  const whatsappUrl = `https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}`;

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Deep 3D Background ─────────────────────────── */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "radial-gradient(ellipse 90% 70% at 50% -10%, oklch(0.65 0.17 160 / 0.18) 0%, transparent 65%)"
              : "radial-gradient(ellipse 90% 70% at 50% -10%, oklch(0.55 0.17 160 / 0.12) 0%, transparent 65%)",
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(oklch(0.65 0.17 160) 1px, transparent 1px),
                              linear-gradient(90deg, oklch(0.65 0.17 160) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.65 0.17 160) 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px",
            backgroundPosition: "20px 20px",
          }}
        />
      </motion.div>

      {/* ── Floating Orbs ──────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large orb top-right — static, no animation for performance */}
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            right: "-10%",
            top: "-5%",
            background: isDark
              ? "radial-gradient(circle, oklch(0.65 0.17 160 / 0.08) 0%, transparent 70%)"
              : "radial-gradient(circle, oklch(0.55 0.17 160 / 0.10) 0%, transparent 70%)",
          }}
        />
        {/* Medium orb bottom-left — static */}
        <div
          className="absolute rounded-full"
          style={{
            width: 350,
            height: 350,
            left: "-8%",
            bottom: "10%",
            background: isDark
              ? "radial-gradient(circle, oklch(0.60 0.20 200 / 0.07) 0%, transparent 70%)"
              : "radial-gradient(circle, oklch(0.50 0.20 200 / 0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Main Content ───────────────────────────────── */}
      <motion.div
        style={{ scale: scaleOut }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full"
      >
        {/* ── HERO LAYOUT: Stacked with photo centered ── */}
        <div className="flex flex-col items-center gap-12">
          {/* ── TOP: Photo centered, professional ───────── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-6 w-full"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-2">
              <div className="animate-sparkle-rotate" style={{ animationDuration: '3s' }}>
                <Sparkles className="size-4 text-brand" />
              </div>
              <Badge
                variant="outline"
                className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase border-brand/40 text-brand animated-border"
              >
                Portfolio 2026
              </Badge>
            </motion.div>

            {/* ── 3D PHOTO with spotlight reveal ─────── */}
            <motion.div
              variants={scaleIn}
              className="relative"
              style={{ perspective: 1000 }}
            >
              {/* Outer glow — static for performance */}
              <div
                className="absolute -inset-6 rounded-3xl"
                style={{
                  background: isDark
                    ? "radial-gradient(ellipse at 50% 50%, oklch(0.65 0.17 160 / 0.25) 0%, transparent 70%)"
                    : "radial-gradient(ellipse at 50% 50%, oklch(0.55 0.17 160 / 0.18) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Photo container with 3D tilt — full body, no circle */}
              <motion.div
                ref={tilt.ref}
                onMouseMove={(e) => {
                  tilt.handleMouse(e);
                  spotlight.handleMouseMove(e);
                }}
                onMouseLeave={() => {
                  tilt.handleLeave();
                  spotlight.handleMouseLeave();
                }}
                onMouseEnter={spotlight.handleMouseEnter}
                style={{
                  rotateX: tilt.rotateX,
                  rotateY: tilt.rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative will-change-transform cursor-pointer"
              >
                {/* Gradient border frame — tall card for full body */}
                <div
                  className="relative w-56 sm:w-72 lg:w-80 overflow-hidden shadow-2xl"
                  style={{
                    aspectRatio: "3/4",
                    borderRadius: "24px",
                    padding: "3px",
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.17 160), oklch(0.70 0.15 140 / 0.5), oklch(0.60 0.20 200), oklch(0.65 0.17 160))",
                    backgroundSize: "300% 300%",
                    animation: "border-move 4s linear infinite",
                  }}
                >
                  <div
                    ref={spotlight.containerRef}
                    className="relative w-full h-full group scan-line"
                    style={{ borderRadius: "22px", overflow: "hidden" }}
                  >
                    {/* Base BW image — full body, no circle clip */}
                    <img
                      src="/images/profile.avif"
                      alt={profile.name}
                      className="w-full h-full object-cover photo-bw"
                      style={{
                        objectPosition: "top center",
                        borderRadius: "22px",
                      }}
                    />

                    {/* Hidden color source image — drawn onto the canvas during paint */}
                    <img
                      ref={spotlight.colorImgRef}
                      src="/images/profile.avif"
                      alt=""
                      aria-hidden="true"
                      crossOrigin="anonymous"
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      style={{
                        objectPosition: "top center",
                        opacity: 0, // hidden — only used as a draw source by the canvas
                        zIndex: 0,
                      }}
                    />

                    {/* Visible canvas — shows color photo only where the user has painted.
                        Replaces the old toDataURL + CSS-mask approach (10–50x cheaper). */}
                    <canvas
                      ref={spotlight.canvasRef}
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      style={{
                        borderRadius: "22px",
                        zIndex: 1,
                        filter:
                          "contrast(1.06) brightness(1.02) saturate(1.12)",
                      }}
                    />

                    {/* Spotlight brush overlay — follows cursor */}
                    <div
                      ref={spotlight.maskRef}
                      className="photo-reveal-mask"
                      style={{
                        borderRadius: "22px",
                        background:
                          "radial-gradient(circle 0px at 50% 50%, transparent 0%, oklch(0 0 0 / 0.3) 100%)",
                      }}
                    />

                    {/* Subtle green tint on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        borderRadius: "22px",
                        background:
                          "radial-gradient(circle at 50% 20%, oklch(0.65 0.17 160 / 0.10) 0%, transparent 65%)",
                        zIndex: 3,
                      }}
                    />

                    {/* Paint hint tooltip — shows on first hover then fades */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                      style={{ zIndex: 4 }}
                    >
                      <span className="text-[10px] font-semibold text-white/80 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 shadow-md select-none">
                        🎨 Paint to reveal color
                      </span>
                    </div>

                    {/* Hover name tag at bottom */}
                    <div
                      className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{ zIndex: 5 }}
                    >
                      <span className="text-xs font-bold text-white bg-black/55 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-lg">
                        ✦ Reynaldo
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating icon badges — positioned around the card */}
                {/* PERFORMANCE: Uses CSS animation for the gentle drift instead of
                    framer-motion infinite loops (which block the JS thread). */}
                {floatingIcons.map(({ Icon, delay, label }, idx) => {
                  const angles = [-30, 30, 150, 210];
                  const angle = (angles[idx] ?? 0) * (Math.PI / 180);
                  const rx = 175;
                  const ry = 200;
                  const cx = Math.cos(angle) * rx;
                  const cy = Math.sin(angle) * ry;
                  return (
                    <motion.div
                      key={label}
                      className="absolute"
                      style={{
                        left: `calc(50% + ${cx - 22}px)`,
                        top: `calc(50% + ${cy - 22}px)`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 5,
                      }}
                      // Entrance: scale in once. No infinite JS animation.
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        delay,
                      }}
                      whileHover={{ scale: 1.3, zIndex: 10 }}
                    >
                      <div
                        className="p-2.5 rounded-xl bg-card/90 backdrop-blur-md border border-brand/30 shadow-lg shadow-brand/10 cursor-default animate-float-icon"
                        style={{ animationDelay: `${delay}s`, animationDuration: '6s' }}
                      >
                        <Icon className="size-4 text-brand" />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* ── Name + Title ─────────────────────────── */}
            <div className="text-center space-y-3 max-w-3xl">
              {/* Name with animated gradient */}
              <motion.div variants={fadeUp} className="overflow-hidden">
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.3,
                  }}
                >
                  <span className="gradient-text-animated inline-block">
                    {profile.name}
                  </span>
                </motion.h1>
              </motion.div>

              {/* Typewriter headline */}
              <motion.div
                variants={fadeUp}
                className="h-8 sm:h-10 flex items-center justify-center"
              >
                <p className="text-base sm:text-xl font-semibold text-muted-foreground">
                  <span className="text-brand font-bold">{typed}</span>
                  <span className="inline-block w-0.5 h-5 bg-brand ml-0.5 animate-pulse" />
                </p>
              </motion.div>

              {/* Summary */}
              <motion.p
                variants={fadeUp}
                className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance"
              >
                {profile.summary}
              </motion.p>
            </div>
          </motion.div>

          {/* ── BOTTOM: Two column — Buttons+Stats | Info card ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid lg:grid-cols-2 gap-10 w-full max-w-4xl"
          >
            {/* Left: Action buttons + Stats */}
            <div className="flex flex-col items-center lg:items-start gap-6">
              {/* Location */}
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <MapPin className="size-4 text-brand" />
                <span>{profile.location}</span>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-3 justify-center lg:justify-start"
              >
                {[
                  {
                    href: profile.linkedin,
                    icon: Linkedin,
                    label: "LinkedIn",
                    external: true,
                    primary: true,
                  },
                  {
                    href: `mailto:${profile.email}`,
                    icon: Mail,
                    label: "Email",
                    external: false,
                    primary: false,
                  },
                  {
                    href: whatsappUrl,
                    icon: Phone,
                    label: "WhatsApp",
                    external: true,
                    primary: false,
                  },
                ].map((btn, i) => (
                  <motion.div
                    key={btn.label}
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  >
                    <Button
                      variant={btn.primary ? "default" : "outline"}
                      size="sm"
                      className={`gap-2 relative overflow-hidden group ${
                        btn.primary
                          ? "bg-gradient-to-r from-brand to-brand/80 hover:from-brand/90 hover:to-brand text-white shadow-[0_0_15px_rgba(var(--brand),0.3)] hover:shadow-[0_0_25px_rgba(var(--brand),0.5)] border-none"
                          : "border-border/60 hover:border-brand/60 hover:bg-brand/5 shadow-sm hover:shadow-md"
                      } transition-all duration-300`}
                      asChild
                    >
                      <a
                        href={btn.href}
                        target={btn.external ? "_blank" : undefined}
                        rel={btn.external ? "noopener noreferrer" : undefined}
                      >
                        {btn.primary && (
                          <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                          <btn.icon className={`size-4 transition-transform duration-300 ${btn.primary ? 'group-hover:scale-110 group-hover:-rotate-6' : 'group-hover:text-brand'}`} />
                          {btn.label}
                        </span>
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-3 gap-3 w-full max-w-sm"
                style={{ perspective: 600 }}
              >
                {profile.highlights.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{
                      y: -6,
                      rotateX: 5,
                      rotateY: -3,
                      scale: 1.05,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 18,
                      },
                    }}
                    className="rounded-2xl border border-border/60 bg-card/70 p-3 text-center backdrop-blur-sm
                               hover:border-brand/40 hover:shadow-lg hover:shadow-brand/10 hover:bg-brand/5
                               transition-all duration-300 cursor-default holographic group relative overflow-hidden"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Shimmer on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                    <p className="text-xl sm:text-2xl font-black bg-gradient-to-br from-brand to-brand/70 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] sm:text-xs text-foreground/80 leading-tight">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right: Info card */}
            <motion.div
              variants={fadeUp}
              whileHover={{
                y: -4,
                transition: { type: "spring", stiffness: 250, damping: 20 },
              }}
              className="glass rounded-2xl p-6 space-y-5 border border-border/40 shadow-xl shadow-brand/5 holographic relative overflow-hidden group/card"
            >
               {/* Hover scanline effect */}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/5 to-transparent -translate-y-full group-hover/card:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              {/* Contact info */}
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: profile.location },
                  { icon: Mail, text: profile.email },
                  { icon: Phone, text: profile.phone },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.8 + idx * 0.1,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center gap-3 text-sm group cursor-default"
                  >
                    <motion.div
                      className="p-1.5 rounded-lg bg-brand/10 border border-brand/20"
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <item.icon className="size-4 text-brand" />
                    </motion.div>
                    <span className="text-foreground/80 group-hover:text-foreground transition-colors duration-300 truncate">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div className="section-divider" />

              {/* Achievements */}
              <div className="relative z-10">
                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/80 mb-3 flex items-center gap-2">
                  <span className="p-1 rounded-md bg-brand/10 border border-brand/20">
                    <Award className="size-3.5 text-brand" />
                  </span>
                  Achievements
                </h4>
                <ul className="space-y-3">
                  {achievements.map((achievement, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + idx * 0.1, duration: 0.5 }}
                      className="flex items-start gap-2.5 text-xs text-foreground/80 leading-relaxed group"
                    >
                      <motion.div
                        whileHover={{ rotate: 20, scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative mt-0.5"
                      >
                         <div className="absolute inset-0 bg-brand/30 blur-[4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Award className="size-3.5 text-brand shrink-0 relative z-10 drop-shadow-[0_0_2px_rgba(var(--brand),0.5)]" />
                      </motion.div>
                      <span className="transition-colors duration-300 font-medium">
                        {achievement}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        {/* PERFORMANCE: CSS bounce animation replaces framer-motion infinite loop */}
        <div
          className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer group animate-bounce-down"
          onClick={() =>
            document
              .getElementById("skills")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="text-xs font-semibold tracking-widest uppercase opacity-50 group-hover:opacity-100 transition-opacity">
            Explore
          </span>
          <div
            className="p-2 rounded-full border border-border/60 bg-card/60 backdrop-blur-sm
                       group-hover:border-brand/60 group-hover:bg-brand/10 group-hover:shadow-lg group-hover:shadow-brand/20
                       transition-all duration-300 hover:scale-110"
          >
            <ChevronDown className="size-4 group-hover:text-brand transition-colors" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
