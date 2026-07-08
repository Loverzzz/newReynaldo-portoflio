'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  z: number; // depth for 3D effect
}

const ALPHA_BUCKETS = 4; // Reduced from 6 for performance
const MAX_LINE_ALPHA = 0.25; // Reduced from 0.35 for performance
const MAX_PARTICLES = 200; // Reduced from 380
const MIN_PARTICLES = 80; // Reduced from 150
const CONNECTION_DISTANCE = 120; // Reduced from 155
const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dimsRef = useRef({ w: 0, h: 0 });
  const lastTimeRef = useRef(0);
  const scrollYRef = useRef(0);
  const scrollVelRef = useRef(0);
  const frameCountRef = useRef(0); // For frame skipping

  // Refs for values that change WITHOUT re-creating the animation loop.
  // This is the KEY fix: theme changes update a ref, not state, so the
  // requestAnimationFrame loop is never torn down & restarted.
  const isDarkRef = useRef(false);
  const { resolvedTheme } = useTheme();

  // Keep the theme ref current — does NOT trigger re-render or effect re-run.
  useEffect(() => {
    isDarkRef.current = resolvedTheme === 'dark';
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // alpha: false for performance
    if (!ctx) return;

    const initParticles = (width: number, height: number) => {
      // Reduced particle count for better performance
      const particleCount = Math.min(MAX_PARTICLES, Math.max(MIN_PARTICLES, Math.floor((width * height) / 10000)));
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        const z = Math.random();
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7 * (0.4 + z * 0.6), // Reduced velocity
          vy: (Math.random() - 0.5) * 0.7 * (0.4 + z * 0.6),
          size: 0.8 + z * 2.5, // Smaller particles
          opacity: 0.2 + z * 0.4,
          z,
        });
      }
      particlesRef.current = particles;
    };

    const renderFrame = (dt: number) => {
      const width = dimsRef.current.w;
      const height = dimsRef.current.h;
      if (width === 0 || height === 0) return;

      const particles = particlesRef.current;
      const count = particles.length;
      if (count === 0) return;
      const mouse = mouseRef.current;
      const isDark = isDarkRef.current;

      ctx.clearRect(0, 0, width, height);
      const baseColor = isDark ? '100, 200, 150' : '20, 180, 120';

      // Scroll momentum decay
      const scrollVel = scrollVelRef.current;
      scrollVelRef.current *= Math.pow(0.85, dt);

      // --- Spatial hashing grid ---
      const maxDist = 155;
      const maxDistSq = maxDist * maxDist;
      const cellSize = maxDist;
      const cols = Math.ceil(width / cellSize) + 1;
      const grid = new Map<number, number[]>();
      const cellKey = (cx: number, cy: number) => cy * cols + cx;

      // 1) Physics
      for (let i = 0; i < count; i++) {
        const p = particles[i];

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 16900) {
          const dist = Math.sqrt(distSq) || 0.0001;
          const force = (130 - dist) / 130;
          p.vx += (dx / dist) * force * 0.5;
          p.vy += (dy / dist) * force * 0.5;
        }

        // Scroll momentum — parallax depth
        p.vy += scrollVel * 0.018 * dt * (0.4 + (1 - p.z) * 0.9);

        // Speed floor/ceiling — particles always drift, never stop, never explode
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const minSpeed = 0.4;
        const maxSpeed = 1.8;
        if (speed < minSpeed) {
          const scale = minSpeed / (speed || 0.0001);
          p.vx *= scale;
          p.vy *= scale;
        } else if (speed > maxSpeed) {
          const scale = maxSpeed / speed;
          p.vx *= scale;
          p.vy *= scale;
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Bucket into grid
        const cx = Math.floor(p.x / cellSize);
        const cy = Math.floor(p.y / cellSize);
        const k = cellKey(cx, cy);
        let bucket = grid.get(k);
        if (!bucket) {
          bucket = [];
          grid.set(k, bucket);
        }
        bucket.push(i);
      }

      // 2) Draw particles
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${p.opacity})`;
        ctx.fill();
      }

      // 2b) Interactive mouse web
      if (mouse.x > -1000) {
        const mDist = 170;
        const mDistSq = mDist * mDist;
        const mpath = new Path2D();
        let hasLine = false;
        for (let i = 0; i < count; i++) {
          const p = particles[i];
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const dSq = mdx * mdx + mdy * mdy;
          if (dSq < mDistSq) {
            mpath.moveTo(p.x, p.y);
            mpath.lineTo(mouse.x, mouse.y);
            hasLine = true;
          }
        }
        if (hasLine) {
          ctx.strokeStyle = `rgba(${baseColor}, 0.45)`;
          ctx.lineWidth = 1.0;
          ctx.stroke(mpath);
        }
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, 0.85)`;
        ctx.fill();
      }

      // 3) Connections — batched
      const paths: Path2D[] = [];
      for (let b = 0; b < ALPHA_BUCKETS; b++) paths.push(new Path2D());

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        const cx = Math.floor(p.x / cellSize);
        const cy = Math.floor(p.y / cellSize);

        for (let oy = -1; oy <= 1; oy++) {
          for (let ox = -1; ox <= 1; ox++) {
            const bucket = grid.get(cellKey(cx + ox, cy + oy));
            if (!bucket) continue;
            for (let m = 0; m < bucket.length; m++) {
              const j = bucket[m];
              if (j <= i) continue;
              const q = particles[j];
              const dx = p.x - q.x;
              const dy = p.y - q.y;
              const dSq = dx * dx + dy * dy;
              if (dSq < maxDistSq) {
                const alpha = (1 - Math.sqrt(dSq) / maxDist) * MAX_LINE_ALPHA * ((p.z + q.z) / 2);
                let b = Math.floor((alpha / MAX_LINE_ALPHA) * ALPHA_BUCKETS);
                if (b < 0) b = 0;
                else if (b >= ALPHA_BUCKETS) b = ALPHA_BUCKETS - 1;
                paths[b].moveTo(p.x, p.y);
                paths[b].lineTo(q.x, q.y);
              }
            }
          }
        }
      }

      ctx.lineWidth = 1.0;
      for (let b = 0; b < ALPHA_BUCKETS; b++) {
        const a = ((b + 1) / ALPHA_BUCKETS) * MAX_LINE_ALPHA;
        ctx.strokeStyle = `rgba(${baseColor}, ${a})`;
        ctx.stroke(paths[b]);
      }
    };

    // ── Animation loop (runs ONCE, never torn down by theme changes) ──
    const draw = (now: number) => {
      let dt: number;
      if (lastTimeRef.current === 0) {
        dt = 1;
      } else {
        dt = (now - lastTimeRef.current) / (1000 / 60);
        if (dt > 2.5) dt = 2.5;
      }
      lastTimeRef.current = now;
      renderFrame(dt);
      animationRef.current = requestAnimationFrame(draw);
    };

    // ── Resize handler ──
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
    };

    // ── Mouse handler (rAF-throttled) ──
    let mouseScheduled = false;
    const handleMouse = (e: MouseEvent) => {
      if (mouseScheduled) return;
      mouseScheduled = true;
      requestAnimationFrame(() => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
        mouseScheduled = false;
      });
    };

    const handleLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    // ── Scroll handler ──
    const handleScroll = () => {
      const cur = window.scrollY;
      const delta = cur - scrollYRef.current;
      scrollYRef.current = cur;
      scrollVelRef.current += delta;
    };
    scrollYRef.current = window.scrollY;

    // ── Visibility handler (pause when tab hidden) ──
    const handleVisibility = () => {
      if (document.hidden) {
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      } else if (animationRef.current === null) {
        lastTimeRef.current = 0;
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    // ── Start everything ──
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouse, { passive: true });
    window.addEventListener('mouseleave', handleLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    // ALWAYS animate — the user explicitly wants a moving background.
    // (Previously, prefers-reduced-motion would freeze the canvas to a single
    //  static frame, which is why particles "didn't move at all".)
    lastTimeRef.current = 0;
    animationRef.current = requestAnimationFrame(draw);

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
    // EMPTY dependency array — this effect runs exactly ONCE on mount.
    // Theme changes are handled via isDarkRef, so no teardown needed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          opacity: isDarkRef.current ? 0.9 : 0.75,
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
    </div>
  );
}