'use client';

import { useRef, useCallback } from 'react';
import { useMotionValue, useTransform, useSpring } from 'framer-motion';

/**
 * 3D tilt hook with built-in rAF throttling.
 *
 * PERFORMANCE: The original handlers called `x.set()/y.set()` on every single
 * `mousemove` event — which can fire hundreds of times per second. Each set()
 * propagates through Framer Motion springs and triggers style recalculations.
 *
 * Now we coalesce all movement into a single update per animation frame, so
 * even with many tilt cards on screen at once there is at most one state
 * update per card per frame (≈60/s). The visual effect is identical.
 *
 * Also respects `prefers-reduced-motion`: when enabled, tilt is disabled
 * entirely (returns static 0 values) and handlers become no-ops.
 */
interface TiltConfig {
  strength?: number;
  stiffness?: number;
  damping?: number;
}

export function useTilt(config: TiltConfig = {}) {
  const { strength = 8, stiffness = 250, damping = 28 } = config;
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), {
    stiffness,
    damping,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), {
    stiffness,
    damping,
  });

  // Coalescing state — at most one write to motion values per frame.
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ px: number; py: number } | null>(null);
  const reducedRef = useRef(false);

  // Detect reduced-motion once (kept in a ref so handlers stay stable).
  if (typeof window !== 'undefined') {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedRef.current = mq.matches;
  }

  const flush = useCallback(() => {
    rafRef.current = null;
    const pending = pendingRef.current;
    pendingRef.current = null;
    if (pending) {
      x.set(pending.px);
      y.set(pending.py);
    }
  }, [x, y]);

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedRef.current || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      pendingRef.current = {
        px: (e.clientX - rect.left) / rect.width - 0.5,
        py: (e.clientY - rect.top) / rect.height - 0.5,
      };
      // Schedule one flush per frame
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(flush);
      }
    },
    [flush],
  );

  const handleLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    pendingRef.current = null;
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, rotateX, rotateY, handleMouse, handleLeave };
}