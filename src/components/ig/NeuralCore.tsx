'use client';

import { useEffect, useRef, useState } from 'react';
import { Cpu, Activity, Zap, Radio } from 'lucide-react';

export default function NeuralCore() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeMetric, setActiveMetric] = useState<'latency' | 'accuracy' | 'parameters'>('parameters');

  const mouseOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let rotationAngle = 0;

    const width = (canvas.width = 500);
    const height = (canvas.height = 500);
    const cx = width / 2;
    const cy = height / 2;

    const nodeCount = 75;
    const nodes: { x: number; y: number; z: number; baseR: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 135;

      nodes.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        baseR: Math.random() * 2.5 + 1.5,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseOffset.current.x = (x / rect.width) * 0.5;
      mouseOffset.current.y = (y / rect.height) * 0.5;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      rotationAngle += 0.009;
      const cosA = Math.cos(rotationAngle + mouseOffset.current.x);
      const sinA = Math.sin(rotationAngle + mouseOffset.current.x);

      const projectedNodes: { x: number; y: number; scale: number; color: string }[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        let x1 = node.x * cosA - node.z * sinA;
        let z1 = node.z * cosA + node.x * sinA;

        const tilt = 0.35 + mouseOffset.current.y;
        let y1 = node.y * Math.cos(tilt) - z1 * Math.sin(tilt);
        let z2 = z1 * Math.cos(tilt) + node.y * Math.sin(tilt);

        const perspective = 420;
        const scale = perspective / (perspective + z2);
        const px = cx + x1 * scale;
        const py = cy + y1 * scale;

        const isCyan = i % 3 === 0;
        const isPink = i % 7 === 0;
        const color = isPink ? '#ec4899' : isCyan ? '#06b6d4' : '#a855f7';

        projectedNodes.push({ x: px, y: py, scale, color });
      }

      // Draw connecting synaptic axons
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p1 = projectedNodes[i];
          const p2 = projectedNodes[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 68) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 68) * 0.4 * Math.min(p1.scale, p2.scale);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      for (let i = 0; i < projectedNodes.length; i++) {
        const p = projectedNodes[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodes[i].baseR * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 14 * p.scale;
        ctx.shadowColor = p.color;
        ctx.fill();
      }

      // Draw Orbiting energy rings
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotationAngle * 0.6);

      // Ring 1
      ctx.beginPath();
      ctx.ellipse(0, 0, 175, 65, Math.PI / 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([12, 16]);
      ctx.stroke();

      // Ring 2
      ctx.beginPath();
      ctx.ellipse(0, 0, 195, 75, -Math.PI / 3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 22]);
      ctx.stroke();

      ctx.restore();

      // Pulsing central AI Core
      const corePulse = Math.sin(rotationAngle * 3.5) * 7 + 30;
      ctx.beginPath();
      ctx.arc(cx, cy, corePulse, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(cx, cy, 2, cx, cy, corePulse);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.35, '#06b6d4');
      gradient.addColorStop(0.75, '#a855f7');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.shadowBlur = 35;
      ctx.shadowColor = '#06b6d4';
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[500px] h-[500px] flex items-center justify-center group"
    >
      {/* Background glow matrix */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-cyan-900/20 to-transparent rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700" />

      {/* Interactive 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-105"
        title="Interactive AI Neural Core"
      />

      {/* Floating Holographic Telemetry Cards */}
      <div className="absolute top-4 left-2 sm:left-4 bg-[#0d0722]/90 border border-purple-500/40 rounded-xl p-3 backdrop-blur-md shadow-[0_0_25px_rgba(139,92,246,0.3)] flex items-center gap-3 font-mono text-xs group-hover:border-purple-400 transition-colors animate-bounce duration-1000">
        <div className="p-2 rounded-lg bg-purple-950/80 text-purple-400">
          <Cpu className="w-4 h-4" />
        </div>
        <div>
          <p className="text-gray-400 text-[10px]">TENSOR MATRIX</p>
          <p className="text-white font-bold">FP16 // 175B PARAMS</p>
        </div>
      </div>

      <div className="absolute bottom-6 right-2 sm:right-4 bg-[#0d0722]/90 border border-cyan-500/40 rounded-xl p-3 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.3)] flex items-center gap-3 font-mono text-xs group-hover:border-cyan-400 transition-colors">
        <div className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400">
          <Activity className="w-4 h-4 animate-pulse" />
        </div>
        <div>
          <p className="text-gray-400 text-[10px]">INFERENCE SPEED</p>
          <p className="text-cyan-300 font-bold">142 TOKENS / SEC</p>
        </div>
      </div>

      <div className="absolute top-1/2 -left-2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
        <button
          onClick={() => setActiveMetric('parameters')}
          className={`p-2 rounded-xl border backdrop-blur-md transition-all ${
            activeMetric === 'parameters'
              ? 'bg-purple-600/40 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] scale-110'
              : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
          }`}
          title="Parameters Metric"
        >
          <Zap className="w-4 h-4" />
        </button>
        <button
          onClick={() => setActiveMetric('accuracy')}
          className={`p-2 rounded-xl border backdrop-blur-md transition-all ${
            activeMetric === 'accuracy'
              ? 'bg-cyan-600/40 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-110'
              : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
          }`}
          title="Telemetry Pulse"
        >
          <Radio className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
