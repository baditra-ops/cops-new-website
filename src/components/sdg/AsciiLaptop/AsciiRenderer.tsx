'use client';

import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

const ASCII_CHARS = ' .:-=+*#%@';

interface AsciiRendererProps {
  /** Characters per row */
  columns?: number;
  /** Color of the ASCII text */
  color?: string;
  /** Glow color */
  glowColor?: string;
  /** Font size in px */
  fontSize?: number;
  /** Whether boot-in animation is enabled */
  bootAnimation?: boolean;
}

export default function AsciiRenderer({
  columns = 100,
  color = '#33ff66',
  glowColor = 'rgba(51, 255, 102, 0.6)',
  fontSize = 10,
  bootAnimation = true,
}: AsciiRendererProps) {
  const { gl, scene, camera, size } = useThree();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const startTimeRef = useRef(0);
  const cellDelaysRef = useRef<Float32Array | null>(null);
  const [ready, setReady] = useState(false);

  // Create the overlay canvas once
  useEffect(() => {
    startTimeRef.current = performance.now();

    const overlay = document.createElement('canvas');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '1';

    const parent = gl.domElement.parentElement;
    if (parent) {
      parent.style.position = 'relative';
      parent.appendChild(overlay);
    }

    canvasRef.current = overlay;
    ctxRef.current = overlay.getContext('2d');
    setReady(true);

    return () => {
      if (parent && overlay.parentElement === parent) {
        parent.removeChild(overlay);
      }
    };
  }, [gl]);

  useFrame(() => {
    if (!canvasRef.current || !ctxRef.current || !ready) return;

    const overlay = canvasRef.current;
    const ctx = ctxRef.current;

    // Resize overlay to match the WebGL canvas
    const w = gl.domElement.width;
    const h = gl.domElement.height;
    if (overlay.width !== w || overlay.height !== h) {
      overlay.width = w;
      overlay.height = h;
    }

    // Render the 3D scene normally
    gl.render(scene, camera);

    // Read pixels from WebGL
    const cols = columns;
    const cellW = Math.floor(w / cols);
    const cellH = Math.floor(cellW * 1.8); // ASCII chars are taller than wide
    const rows = Math.floor(h / cellH);

    // Generate cell delays for boot animation (once)
    const totalCells = cols * rows;
    if (!cellDelaysRef.current || cellDelaysRef.current.length !== totalCells) {
      cellDelaysRef.current = new Float32Array(totalCells);
      for (let i = 0; i < totalCells; i++) {
        cellDelaysRef.current[i] = Math.random() * 0.8; // 0-0.8s delay
      }
    }

    // Read directly from canvas
    const glCtx = gl.getContext();
    const pixelBuffer = new Uint8Array(w * h * 4);
    glCtx.readPixels(0, 0, w, h, glCtx.RGBA, glCtx.UNSIGNED_BYTE, pixelBuffer);

    // Clear overlay
    ctx.clearRect(0, 0, w, h);

    // Hide the original WebGL canvas
    gl.domElement.style.opacity = '0';

    const elapsed = (performance.now() - startTimeRef.current) / 1000;

    // Dynamically calculate font size based on the physical cell height so it looks correct on high-DPI (Retina) screens
    const dynamicFontSize = Math.floor(cellH * 0.9);
    ctx.font = `${dynamicFontSize}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * cellW + cellW / 2;
        const y = row * cellH + cellH / 2;

        // Sample center of cell from pixel buffer
        // WebGL pixel buffer is bottom-up, so flip Y
        const sampleX = Math.min(col * cellW + Math.floor(cellW / 2), w - 1);
        const sampleY = h - 1 - Math.min(row * cellH + Math.floor(cellH / 2), h - 1);
        const idx = (sampleY * w + sampleX) * 4;

        const r = pixelBuffer[idx] / 255;
        const g = pixelBuffer[idx + 1] / 255;
        const b = pixelBuffer[idx + 2] / 255;
        const a = pixelBuffer[idx + 3] / 255;

        // Skip fully transparent pixels (background)
        if (a < 0.05) continue;

        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

        // Boot-in animation
        let bootAlpha = 1;
        if (bootAnimation) {
          const cellIdx = row * cols + col;
          const delay = cellDelaysRef.current![cellIdx];
          bootAlpha = Math.min(Math.max((elapsed - delay) / 0.5, 0), 1);
        }

        if (bootAlpha <= 0) continue;

        const charIdx = Math.min(
          Math.floor(luminance * (ASCII_CHARS.length - 1)),
          ASCII_CHARS.length - 1
        );
        const char = ASCII_CHARS[charIdx];
        if (char === ' ') continue;

        const alpha = a * bootAlpha;

        // Glow effect
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = luminance * 8;

        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fillText(char, x, y);
      }
    }

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }, 2); // Run after default render

  return null;
}
