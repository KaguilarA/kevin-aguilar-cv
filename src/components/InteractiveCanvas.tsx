import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Cpu, Zap, Activity } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  connections: number[];
  label?: string;
}

const ARCH_NODES = [
  'React', 'V8 Engine', 'Signals', 'WebGL', 'Module Federation',
  'TypeScript', 'Micro-Frontends', 'Canvas 2D', 'Node.js', 'RxJS',
  'Web Workers', 'Object Pooling', 'Clean Arch', 'Design Tokens'
];

export const InteractiveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fps, setFps] = useState<number>(60);
  const [particleCount, setParticleCount] = useState<number>(65);
  const [canvasMode, setCanvasMode] = useState<'network' | 'matrix' | 'pulse'>('network');
  const mouseRef = useRef<{ x: number; y: number; active: boolean; radius: number }>({
    x: -9999,
    y: -9999,
    active: false,
    radius: 140,
  });

  const animFrameId = useRef<number | null>(null);

  // Switch mode handler
  const toggleMode = useCallback(() => {
    setCanvasMode((prev) => {
      if (prev === 'network') return 'matrix';
      if (prev === 'matrix') return 'pulse';
      return 'network';
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize particles
    const particles: Particle[] = [];
    const colors = ['#38bdf8', '#818cf8', '#c084fc', '#34d399', '#f43f5e'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.1,
        vy: (Math.random() - 0.5) * 1.1,
        radius: Math.random() * 2 + 2,
        baseRadius: Math.random() * 2 + 2,
        color: colors[i % colors.length],
        connections: [],
        label: i < ARCH_NODES.length ? ARCH_NODES[i] : undefined,
      });
    }

    // Matrix drops for matrix mode
    const matrixChars = '010101010101アイウエオカキクケコサシスセソタチツテトABCDEF';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

    // FPS calculation
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const render = (time: number) => {
      frameCount++;
      if (time - lastFpsUpdate >= 500) {
        setFps(Math.round((frameCount * 1000) / (time - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = time;
      }

      // Draw background
      ctx.fillStyle = canvasMode === 'matrix' ? 'rgba(9, 10, 15, 0.2)' : '#090a0f';
      ctx.fillRect(0, 0, width, height);

      if (canvasMode === 'matrix') {
        ctx.fillStyle = '#059669';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          // Highlight top drop
          ctx.fillStyle = Math.random() > 0.8 ? '#a7f3d0' : '#10b981';
          ctx.fillText(char, x, y);

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      } else {
        // Network or Pulse mode
        const mouse = mouseRef.current;

        // Draw interactive grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Movement
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Mouse interaction (repel & glow)
          if (mouse.active) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.hypot(dx, dy);

            if (dist < mouse.radius) {
              const force = (1 - dist / mouse.radius) * 2.5;
              p.x -= (dx / dist) * force * 3;
              p.y -= (dy / dist) * force * 3;
              p.radius = p.baseRadius * 1.8;
            } else {
              p.radius = p.baseRadius;
            }
          }

          // Draw node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Render label for key architecture nodes
          if (p.label) {
            ctx.fillStyle = 'rgba(226, 232, 240, 0.75)';
            ctx.font = '10px ui-monospace, monospace';
            ctx.fillText(p.label, p.x + 8, p.y + 3);
          }

          // Connect particles within distance
          const maxDist = canvasMode === 'pulse' ? 140 : 100;
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.25;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [particleCount, canvasMode]);

  return (
    <div className="space-y-2.5">
      <div
        className="relative w-full h-[400px] md:h-[480px] rounded-2xl overflow-hidden border border-slate-800 bg-[#090a0f] shadow-2xl group transition-all duration-300"
      >
        <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />

        {/* Real-Time Engine HUD Overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 pointer-events-none select-none">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-emerald-400 shadow-lg">
            <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>FPS: {fps}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-sky-400">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>Nodes: {particleCount}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-purple-400">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>Mode: {canvasMode.toUpperCase()}</span>
          </div>
        </div>

        {/* Interactive Controls Pill */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <button
            onClick={toggleMode}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/60 text-xs font-mono text-slate-200 backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
            title="Switch Canvas Graphics Pipeline"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Pipeline: {canvasMode}
          </button>

          <button
            onClick={() => setParticleCount((c) => (c === 65 ? 120 : c === 120 ? 35 : 65))}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/60 text-xs font-mono text-slate-200 backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
            title="Adjust Node Density"
          >
            Density: {particleCount}
          </button>
        </div>
      </div>

      {/* Separate HTML element below the canvas */}
      <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span>Interactive Canvas 2D Pipeline • Move cursor to manipulate gravity & topology</span>
        </div>
      </div>
    </div>
  );
};
