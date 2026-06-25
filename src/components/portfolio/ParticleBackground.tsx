'use client';

import { useEffect, useRef, useCallback } from 'react';
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

// Number of discrete alpha buckets for batched line rendering.
// Drawing hundreds of lines as ~6 stroke() calls instead of hundreds is the
// single biggest Canvas2D perf win here.
const ALPHA_BUCKETS = 6;
const MAX_LINE_ALPHA = 0.35; // peak connection alpha — thicker, more visible links

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  // CSS-pixel dimensions (canvas backing store uses device px + DPR transform)
  const dimsRef = useRef({ w: 0, h: 0 });
  const lastTimeRef = useRef(0);
  // Scroll-velocity field — particles drift with scroll momentum (parallax physics)
  const scrollYRef = useRef(0);
  const scrollVelRef = useRef(0);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Reduced-motion: respect OS-level "reduce motion" setting.
  const prefersReducedMotion = useRef(false);

  const initParticles = useCallback((width: number, height: number) => {
    // Much denser field for a rich "network" look. Density based, capped for safety.
    // ~1 particle per 6.5k px² → ~380 on a 1080p desktop, ~180 on mobile.
    const particleCount = Math.min(380, Math.max(150, Math.floor((width * height) / 6500)));
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const z = Math.random(); // 0 = far, 1 = close
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45 * (0.3 + z * 0.7),
        vy: (Math.random() - 0.5) * 0.45 * (0.3 + z * 0.7),
        size: 1.0 + z * 3.0, // larger → fuller, not thin
        opacity: 0.25 + z * 0.55, // brighter → clearer
        z,
      });
    }
    particlesRef.current = particles;
  }, []);

  // Render a single frame. `dt` is frame-rate-independent multiplier (1.0 = one 60fps frame).
  const renderFrame = useCallback((dt: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = dimsRef.current.w;
    const height = dimsRef.current.h;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const count = particles.length;

    ctx.clearRect(0, 0, width, height);

    const baseColor = isDark ? '100, 200, 150' : '20, 180, 120';

    // Read & decay scroll momentum for this frame (frame-rate-independent decay)
    const scrollVel = scrollVelRef.current;
    scrollVelRef.current *= Math.pow(0.85, dt);

    // --- Spatial hashing grid so connections are O(n) instead of O(n²) ---
    const maxDist = 155;
    const maxDistSq = maxDist * maxDist;
    const cellSize = maxDist;
    const cols = Math.ceil(width / cellSize) + 1;
    const grid = new Map<number, number[]>();
    const cellKey = (cx: number, cy: number) => cy * cols + cx;

    // 1) Physics update + bucket each particle into its grid cell
    for (let i = 0; i < count; i++) {
      const p = particles[i];

      // Mouse repulsion (interactive hover — wider, more noticeable push)
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < 16900) {
        // 130px radius
        const dist = Math.sqrt(distSq) || 0.0001;
        const force = (130 - dist) / 130;
        p.vx += (dx / dist) * force * 0.5;
        p.vy += (dy / dist) * force * 0.5;
      }

      // Scroll momentum — particles drift with page scroll (parallax depth).
      // Far particles (low z) react more, near particles less → 3D depth illusion.
      p.vy += scrollVel * 0.018 * dt * (0.4 + (1 - p.z) * 0.9);

      // CRITICAL FIX: particles were decelerating to a halt because of heavy
      // damping. Instead we keep a gentle baseline speed so the field always
      // drifts, and softly re-inject any lost velocity along the original
      // direction. This keeps continuous motion without ever stopping.
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const minSpeed = 0.12; // floor — particles never fully stop
      const maxSpeed = 0.9;  // ceiling — repulsion bursts don't escalate
      if (speed < minSpeed) {
        // restore toward a calm drift
        const scale = minSpeed / (speed || 0.0001);
        p.vx *= scale;
        p.vy *= scale;
      } else if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        p.vx *= scale;
        p.vy *= scale;
      }

      // Frame-rate-independent integration
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      if (p.x < 0) p.x = width;
      else if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      else if (p.y > height) p.y = 0;

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

    // 2) Draw particles individually (cheap: plain arcs, no shadowBlur)
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${baseColor}, ${p.opacity})`;
      ctx.fill();
    }

    // 2b) Interactive mouse "web" — lines from cursor to nearby particles + a
    //     cursor node. This is the classic, satisfying hover interaction.
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
      // Cursor node — a bright dot that follows the pointer
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${baseColor}, 0.85)`;
      ctx.fill();
    }

    // 3) Connections — batched into ALPHA_BUCKETS Path2D objects.
    //    Each bucket is stroked ONCE, turning hundreds of stroke() calls into ~6.
    const paths: Path2D[] = [];
    for (let b = 0; b < ALPHA_BUCKETS; b++) paths.push(new Path2D());

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const cx = Math.floor(p.x / cellSize);
      const cy = Math.floor(p.y / cellSize);

      // Only inspect own cell + 8 neighbours (bounded local region)
      for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          const bucket = grid.get(cellKey(cx + ox, cy + oy));
          if (!bucket) continue;
          for (let m = 0; m < bucket.length; m++) {
            const j = bucket[m];
            if (j <= i) continue; // avoid self + duplicate pairs
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
  }, [isDark]);

  // Animation loop — pauses automatically when tab is hidden (no wasted cycles).
  const draw = useCallback((now: number) => {
    // Frame-rate-independent delta (normalized to 60fps); cap to avoid jumps after pauses.
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
  }, [renderFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Honor reduced-motion preference — render one static frame, no loop.
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mq.matches;
    const handleMotionChange = () => {
      prefersReducedMotion.current = mq.matches;
      if (mq.matches) {
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        lastTimeRef.current = 0;
        renderFrame(1);
      } else if (animationRef.current === null) {
        lastTimeRef.current = 0;
        animationRef.current = requestAnimationFrame(draw);
      }
    };
    mq.addEventListener('change', handleMotionChange);

    const handleResize = () => {
      // Cap DPR at 2 for crisp rendering on retina without excessive fill-rate cost.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimsRef.current = { w: window.innerWidth, h: window.innerHeight };
      initParticles(window.innerWidth, window.innerHeight);
    };

    // Throttle mousemove via rAF flag — at most one write per frame.
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

    // Scroll → accumulate vertical momentum (applied to particles each frame).
    // Creates a parallax "the background is physical" feel while scrolling.
    const handleScroll = () => {
      const cur = window.scrollY;
      const delta = cur - scrollYRef.current;
      scrollYRef.current = cur;
      scrollVelRef.current += delta;
    };
    scrollYRef.current = window.scrollY;

    // Pause rAF when tab is hidden — avoids burning CPU/GPU in background.
    const handleVisibility = () => {
      if (document.hidden) {
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      } else if (!prefersReducedMotion.current && animationRef.current === null) {
        lastTimeRef.current = 0;
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouse, { passive: true });
    window.addEventListener('mouseleave', handleLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    if (prefersReducedMotion.current) {
      renderFrame(1);
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
      mq.removeEventListener('change', handleMotionChange);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [initParticles, draw, renderFrame]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          opacity: isDark ? 0.9 : 0.75,
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
    </div>
  );
}