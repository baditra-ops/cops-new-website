"use client";

/**
 * AsciiLaptop
 * -----------
 * A 2D-ASCII laptop rendered with real CSS 3D transforms so it reads as an
 * isometric object, not a flat sprite. Screen + keyboard deck are made of
 * live monospace characters that idle-glitch on their own and react to the
 * cursor: move over it and the glyphs nearest your pointer scramble and
 * flare brighter, and the whole unit tilts toward you like a parallax card.
 */

import React, { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const CHARSET =
  "01#%&+=/\\<>[]{}*~^:;.SDGCOPS01#$&01".split("");

const KB_ROWS = 6;
const KB_COLS = 16;

const SCR_COLS = 20;
const SCR_ROWS = 8;

const SPARK_POINTS: { left: number; top: number }[] = [
  { left: 8, top: 12 },
  { left: 90, top: 10 },
  { left: 6, top: 50 },
  { left: 93, top: 48 },
  { left: 12, top: 86 },
  { left: 88, top: 88 },
  { left: 50, top: 8 },
  { left: 30, top: 92 },
  { left: 70, top: 92 },
  { left: 50, top: 50 },
];

type Cell = { ch: string; dim: number };
type BorderPos = { top?: number | string; left?: number | string; right?: number | string; bottom?: number | string };

const rnd = () => CHARSET[(Math.random() * CHARSET.length) | 0];
const rndDim = () => 0.3 + Math.random() * 0.45;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const placeholderKeyboard = (): Cell[][] =>
  Array.from({ length: KB_ROWS }, () =>
    Array.from({ length: KB_COLS }, () => ({ ch: "\u00b7", dim: 0.2 }))
  );

const buildKeyboard = (): Cell[][] =>
  Array.from({ length: KB_ROWS }, () =>
    Array.from({ length: KB_COLS }, () => ({ ch: rnd(), dim: rndDim() }))
  );

/** Fixed, deterministic perimeter layout for the screen border glyphs. */
const BORDER_POSITIONS: BorderPos[] = (() => {
  const positions: BorderPos[] = [];
  for (let c = 0; c < SCR_COLS; c++) {
    positions.push({ top: 0, left: `${(c / (SCR_COLS - 1)) * 100}%` });
  }
  for (let r = 1; r < SCR_ROWS - 1; r++) {
    positions.push({ right: 0, top: `${(r / (SCR_ROWS - 1)) * 100}%` });
  }
  for (let c = SCR_COLS - 1; c >= 0; c--) {
    positions.push({ bottom: 0, left: `${(c / (SCR_COLS - 1)) * 100}%` });
  }
  for (let r = SCR_ROWS - 2; r >= 1; r--) {
    positions.push({ left: 0, top: `${(r / (SCR_ROWS - 1)) * 100}%` });
  }
  return positions;
})();

const placeholderBorder = (): Cell[] =>
  BORDER_POSITIONS.map(() => ({ ch: "\u00b7", dim: 0.15 }));

const buildBorder = (): Cell[] => BORDER_POSITIONS.map(() => ({ ch: rnd(), dim: rndDim() }));

const placeholderSparks = (): string[] => SPARK_POINTS.map(() => "\u00b7");
const buildSparks = (): string[] => SPARK_POINTS.map(() => rnd());

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AsciiLaptop({
  className = "",
  line1 = "COPS",
  line2 = "SDG",
}: {
  className?: string;
  line1?: string;
  line2?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastMutateRef = useRef(0);

  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 30 });
  const [keyboard, setKeyboard] = useState<Cell[][]>(placeholderKeyboard);
  const [border, setBorder] = useState<Cell[]>(placeholderBorder);
  const [sparks, setSparks] = useState<string[]>(placeholderSparks);

  // Populate randomized state only after mount (avoids SSR hydration mismatch).
  useEffect(() => {
    setKeyboard(buildKeyboard());
    setBorder(buildBorder());
    setSparks(buildSparks());
    setMounted(true);
  }, []);

  // Ambient idle glitch, independent of the cursor.
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => {
      setKeyboard((prev) =>
        prev.map((row) => row.map((cell) => (Math.random() < 0.05 ? { ch: rnd(), dim: rndDim() } : cell)))
      );
      setBorder((prev) => prev.map((cell) => (Math.random() < 0.06 ? { ch: rnd(), dim: rndDim() } : cell)));
      setSparks((prev) => prev.map((ch) => (Math.random() < 0.35 ? rnd() : ch)));
    }, 220);
    return () => clearInterval(id);
  }, [mounted]);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = clamp01((e.clientX - rect.left) / rect.width);
    const py = clamp01((e.clientY - rect.top) / rect.height);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setTilt({ x: (0.5 - py) * 16, y: (px - 0.5) * 26 });
      setSpot({ x: px * 100, y: py * 100 });
    });

    const now = performance.now();
    if (now - lastMutateRef.current < 90) return;
    lastMutateRef.current = now;

    if (py > 0.58) {
      // pointer roughly over the keyboard deck -> scramble nearby keys
      const localY = clamp01((py - 0.6) / 0.38);
      const col = Math.min(KB_COLS - 1, Math.max(0, Math.floor(px * KB_COLS)));
      const row = Math.min(KB_ROWS - 1, Math.max(0, Math.floor(localY * KB_ROWS)));
      setKeyboard((prev) =>
        prev.map((r, ri) =>
          r.map((cell, ci) =>
            Math.abs(ri - row) <= 1 && Math.abs(ci - col) <= 1
              ? { ch: rnd(), dim: Math.min(1, cell.dim + 0.35) }
              : cell
          )
        )
      );
    } else {
      // pointer over the screen -> flicker the bezel glyphs
      setBorder((prev) => prev.map((cell) => (Math.random() < 0.18 ? { ch: rnd(), dim: Math.min(1, cell.dim + 0.3) } : cell)));
    }
  }, []);

  const handleLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative select-none cursor-crosshair scale-75 sm:scale-90 lg:scale-100 ${className}`}
      style={{ perspective: 1700, width: 380, height: 470 }}
    >
      <style>{`
        @keyframes ascii-laptop-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes ascii-laptop-scan {
          0% { background-position-y: 0; }
          100% { background-position-y: 32px; }
        }
      `}</style>

      <div
        className={`w-full h-full transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}
        style={{ animation: "ascii-laptop-float 6s ease-in-out infinite" }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${16 + tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 150ms ease-out",
          }}
        >
          {/* ---------------- SCREEN ---------------- */}
          <div
            className="absolute left-0 top-0 w-full"
            style={{ height: 272, transformOrigin: "bottom center", transform: "rotateX(-6deg)", transformStyle: "preserve-3d" }}
          >
            <div className="relative w-full h-full rounded-[10px] border border-emerald-400/40 bg-black shadow-[0_0_50px_rgba(16,255,120,0.25)] overflow-hidden">
              {/* scanlines */}
              <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                  background: "repeating-linear-gradient(0deg, rgba(74,255,150,0.5) 0px, transparent 1px, transparent 4px)",
                  animation: "ascii-laptop-scan 3s linear infinite",
                }}
              />
              {/* vignette */}
              <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.7)_100%)]" />

              {/* ascii border frame */}
              {border.map((cell, i) => (
                <span
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] leading-none"
                  style={{ ...BORDER_POSITIONS[i], color: `rgba(74,255,150,${cell.dim})`, textShadow: cell.dim > 0.6 ? "0 0 6px rgba(74,255,150,0.8)" : "none" }}
                >
                  {cell.ch}
                </span>
              ))}

              {/* floating sparks */}
              {sparks.map((ch, i) => (
                <span
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] text-emerald-400/40"
                  style={{ left: `${SPARK_POINTS[i].left}%`, top: `${SPARK_POINTS[i].top}%` }}
                >
                  {ch}
                </span>
              ))}

              {/* center wordmark */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <span className="font-mono text-3xl sm:text-4xl font-bold tracking-[0.2em] text-emerald-300 [text-shadow:0_0_10px_rgba(74,255,150,0.9),0_0_30px_rgba(74,255,150,0.5)]">
                  {line1}
                </span>
                <span className="font-mono text-3xl sm:text-4xl font-bold tracking-[0.2em] text-emerald-400 [text-shadow:0_0_10px_rgba(74,255,150,0.9),0_0_30px_rgba(74,255,150,0.5)]">
                  {line2}
                  <span className="animate-pulse">_</span>
                </span>
                <span className={`mt-2 font-mono text-[9px] tracking-[0.35em] text-emerald-400/50 ${isHovered ? "animate-[pulse_0.75s_cubic-bezier(0.4,0,0.6,1)_infinite]" : ""}`}>TERMINAL://ACTIVE</span>
              </div>
            </div>

            {/* screen edge thickness (right) */}
            <div
              className="absolute top-0 right-0 h-full w-[10px] bg-emerald-950/90"
              style={{ transform: "rotateY(90deg) translateX(9px)", transformOrigin: "left" }}
            />
          </div>

          {/* ---------------- HINGE ---------------- */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[72%] h-[6px] rounded-full bg-emerald-400/20 blur-[1px]"
            style={{ top: 272 }}
          />

          {/* ---------------- BASE / KEYBOARD DECK ---------------- */}
          <div
            className="absolute left-0 w-full"
            style={{ top: 274, height: 190, transformOrigin: "top center", transform: "rotateX(85deg)", transformStyle: "preserve-3d" }}
          >
            <div className="relative w-full h-full rounded-b-[10px] border border-emerald-400/25 bg-[#03110a] shadow-[0_25px_70px_rgba(0,0,0,0.65)] px-3 pt-3 pb-9 overflow-hidden">
              {/* power LED */}
              <span className="absolute top-2 right-3 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,255,150,0.9)] animate-pulse" />

              <div
                className="grid h-full w-full gap-[3px]"
                style={{ gridTemplateColumns: `repeat(${KB_COLS}, 1fr)`, gridTemplateRows: `repeat(${KB_ROWS}, 1fr)` }}
              >
                {keyboard.map((row, r) =>
                  row.map((cell, c) => (
                    <span
                      key={`${r}-${c}`}
                      className="flex items-center justify-center rounded-[2px] border border-emerald-400/10 bg-emerald-500/[0.04] font-mono text-[9px] leading-none"
                      style={{ color: `rgba(74,255,150,${cell.dim})`, textShadow: cell.dim > 0.65 ? "0 0 6px rgba(74,255,150,0.8)" : "none" }}
                    >
                      {cell.ch}
                    </span>
                  ))
                )}
              </div>

              {/* trackpad */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[34%] h-[16px] rounded-[4px] border border-emerald-400/20" />
            </div>

            {/* base front edge thickness */}
            <div
              className="absolute bottom-0 left-0 w-full h-[10px] bg-emerald-950"
              style={{ transform: "rotateX(-90deg) translateY(9px)", transformOrigin: "top" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
