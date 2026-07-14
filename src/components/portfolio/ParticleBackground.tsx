'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

/**
 * Elegant soft-glow orb field.
 *
 * Replaces the previous busy "web of connecting lines" particle system with a
 * calm, modern, performant background:
 *  - Soft glowing orbs (no interconnection lines) that drift slowly.
 *  - Gentle mouse + scroll parallax driven by per-particle depth (z).
 *  - Theme-aware color & opacity (brand green; softer/lighter in light mode).
 *  - Optimized: pre-rendered radial-gradient sprite (drawImage), DPR-aware,
 *    pauses when the tab is hidden, rAF-throttled mouse, respects
 *    prefers-reduced-motion (renders a single static frame).
 *  - The animation loop runs ONCE on mount; theme changes only swap the glow
 *    sprite via a ref (no teardown/restart).
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number; // base radius in CSS px
  alpha: number; // base opacity
  z: number; // depth 0..1 (0 = far/small/slow, 1 = near/big/fast)
  phase: number; // for subtle floating sine motion
}

const SPRITE_SIZE = 128; // pre-rendered glow texture size
const GLOW_SCALE = 6; // how many radii the glow extends from particle center

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Build a soft radial-gradient sprite baked with a given rgb color.
function makeGlowSprite(rgb: string): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = SPRITE_SIZE;
  c.height = SPRITE_SIZE;
  const g = c.getContext('2d');
  if (!g) return c;
  const cx = SPRITE_SIZE / 2;
  const r = SPRITE_SIZE / 2;
  const grad = g.createRadialGradient(cx, cx, 0, cx, cx, r);
  grad.addColorStop(0, `rgba(${rgb}, 1)`);
  grad.addColorStop(0.25, `rgba(${rgb}, 0.55)`);
  grad.addColorStop(0.55, `rgba(${rgb}, 0.16)`);
  grad.addColorStop(1, `rgba(${rgb}, 0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
  return c;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const spriteRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const dimsRef = useRef({ w: 0, h: 0 });
  const lastTimeRef = useRef(0);
  const scrollYRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const startedRef = useRef(false);

  // Theme ref — updated without tearing down the animation loop.
  const isDarkRef = useRef(true);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    isDarkRef.current = resolvedTheme === 'dark';
    // Rebuild the glow sprite for the new theme color/opacity.
    const rgb = isDarkRef.current ? '120, 210, 160' : '40, 170, 120';
    spriteRef.current = makeGlowSprite(rgb);
  }, [resolvedTheme]);

  useEffect(() => {
    reducedMotionRef.current = prefersReducedMotion();
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initial sprite (default dark).
    if (!spriteRef.current) {
      spriteRef.current = makeGlowSprite('120, 210, 160');
    }

    const initParticles = (width: number, height: number) => {
      // Fewer, larger orbs — calm instead of busy.
      const count = Math.min(70, Math.max(22, Math.floor((width * height) / 22000)));
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const z = Math.random();
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25 * (0.4 + z * 0.7),
          vy: (Math.random() - 0.5) * 0.25 * (0.4 + z * 0.7),
          size: 3 + z * 8, // 3..11 px radius
          alpha: 0.12 + z * 0.4,
          z,
          phase: Math.random() * Math.PI * 2,
        });
      }
      particlesRef.current = particles;
    };

    const renderFrame = (dt: number, t: number) => {
      const width = dimsRef.current.w;
      const height = dimsRef.current.h;
      if (width === 0 || height === 0) return;

      const particles = particlesRef.current;
      const count = particles.length;
      if (count === 0) return;
      const sprite = spriteRef.current;
      if (!sprite) return;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter'; // additive glow blending

      const isDark = isDarkRef.current;
      // Global opacity multiplier — subtle since particles now overlay
      // content (including images) at z-30. Soft enough not to wash out
      // bright images while still visible over dark areas.
      const globalAlphaMul = isDark ? 0.45 : 0.22;

      // Parallax offsets from mouse + scroll.
      const mouse = mouseRef.current;
      const mx = mouse.active ? (mouse.x - width / 2) / width : 0; // -0.5..0.5
      const my = mouse.active ? (mouse.y - height / 2) / height : 0;
      const scrollParallax = scrollYRef.current * 0.04;

      for (let i = 0; i < count; i++) {
        const p = particles[i];

        // Slow drift + subtle vertical floating via sine.
        p.x += p.vx * dt;
        p.y += p.vy * dt + Math.sin(t * 0.0006 + p.phase) * 0.06 * dt;

        // Wrap edges.
        if (p.x < -40) p.x = width + 40;
        else if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        else if (p.y > height + 40) p.y = -40;

        // Parallax: nearer orbs (high z) move more with mouse/scroll.
        const px = p.x - mx * 60 * p.z;
        const py = p.y - my * 60 * p.z - scrollParallax * p.z;

        const drawSize = p.size * GLOW_SCALE * 2; // diameter of sprite draw
        const half = drawSize / 2;

        // Flicker very subtly for life.
        const flicker = 0.85 + 0.15 * Math.sin(t * 0.0012 + p.phase * 2.3);
        ctx.globalAlpha = p.alpha * globalAlphaMul * flicker;

        ctx.drawImage(sprite, px - half, py - half, drawSize, drawSize);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    // ── Animation loop (runs ONCE) ──
    const draw = (now: number) => {
      let dt: number;
      if (lastTimeRef.current === 0) {
        dt = 1;
      } else {
        dt = (now - lastTimeRef.current) / (1000 / 60);
        if (dt > 2.5) dt = 2.5;
      }
      lastTimeRef.current = now;
      renderFrame(dt, now);
      animationRef.current = requestAnimationFrame(draw);
    };

    const renderStatic = () => {
      // One calm frame for reduced-motion users.
      renderFrame(0, performance.now());
    };

    // ── Resize ──
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimsRef.current = { w, h };
      initParticles(w, h);
      if (reducedMotionRef.current) renderStatic();
    };

    // ── Mouse (rAF-throttled, parallax only) ──
    let mouseScheduled = false;
    const handleMouse = (e: MouseEvent) => {
      if (mouseScheduled) return;
      mouseScheduled = true;
      requestAnimationFrame(() => {
        mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
        mouseScheduled = false;
      });
    };
    const handleLeave = () => {
      mouseRef.current = { x: 0, y: 0, active: false };
    };

    // ── Scroll ──
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    // ── Visibility (pause when hidden) ──
    const handleVisibility = () => {
      if (reducedMotionRef.current) return;
      if (document.hidden) {
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      } else if (animationRef.current === null && startedRef.current) {
        lastTimeRef.current = 0;
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    // ── Start ──
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouse, { passive: true });
    window.addEventListener('mouseleave', handleLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    scrollYRef.current = window.scrollY;
    startedRef.current = true;

    if (reducedMotionRef.current) {
      // Respect reduced motion: a single static, calm frame.
      renderStatic();
    } else {
      lastTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Background vignette — behind all content (z-0). */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      </div>
      {/* Particle overlay — above content (z-30), below navbar/modals.
          Particles now sit on top of images too, eliminating the cluttered
          look at image boundaries while staying subtle via reduced alpha. */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        />
      </div>
    </>
  );
}