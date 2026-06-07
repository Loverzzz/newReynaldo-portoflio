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
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const initParticles = useCallback((width: number, height: number) => {
    // Balanced particle count for visual appeal and performance
    const particleCount = Math.min(80, Math.floor((width * height) / 15000));
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.8,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    
    particlesRef.current = particles;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const particles = particlesRef.current;

    ctx.clearRect(0, 0, width, height);

    // Batch particle drawing
    ctx.beginPath();
    particles.forEach((particle) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Draw particle
      ctx.moveTo(particle.x + particle.size, particle.y);
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    });
    
    ctx.fillStyle = isDark
      ? 'rgba(100, 200, 150, 0.5)'
      : 'rgba(20, 184, 166, 0.6)';
    ctx.fill();

    // Draw connections with distance limit
    ctx.beginPath();
    const maxConnections = 5;
    const connectionDistance = 150;
    const connectionDistanceSq = connectionDistance * connectionDistance;
    
    for (let i = 0; i < particles.length; i++) {
      let connections = 0;
      for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq < connectionDistanceSq) {
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          connections++;
        }
      }
    }
    
    ctx.strokeStyle = isDark
      ? 'rgba(100, 200, 150, 0.15)'
      : 'rgba(20, 184, 166, 0.25)';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    animationRef.current = requestAnimationFrame(draw);
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, draw]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ 
          opacity: 0.8,
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60" />
    </div>
  );
}
