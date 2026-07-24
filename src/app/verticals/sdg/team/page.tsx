'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import teamData from '../../../../../public/sdgteam/sdgteam.json';

interface Member {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  github: string;
  linkedin: string;
}

// Function to dynamically generate layout for ANY number of photos
// This replaces the hardcoded array, so you can add 100 photos and it just works.
function getLayoutForIndex(i: number) {
  const isLeft = i % 2 === 0;
  const row = Math.floor(i / 2);
  
  // Base spacing per row is ~54vh.
  // The left side is shifted down slightly (+5vh) to create the staggered look.
  const topVh = row * 54 + 5 + (isLeft ? 5 : 0);

  // Push photos more towards the center (14% to 18% from the edge)
  const offsetPct = 14 + (i % 4) * 1.5; 

  // Slightly vary sizes between 270 and 310
  const size = 280 + (i % 3) * 15;
  
  return {
    topVh,
    align: isLeft ? 'left' as const : 'right' as const,
    offsetPct,
    size
  };
}

// Each photo tracks its own scroll progress for scale/opacity
function PhotoCard({ member, index }: { member: Member; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Scale up as photo crosses viewport centre, scale down as it exits
  const scale   = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.70, 1.16, 1.16, 0.70]);
  const opacity = useTransform(scrollYProgress, [0, 0.10, 0.90, 1], [0,    1,    1,    0   ]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.5, 1],         [-3,   0,    3        ]);

  const pos = getLayoutForIndex(index);

  return (
    // Wrapper div is position:absolute — it does NOT get a transform so it stays
    // in the same stacking/compositing layer as the sticky heading, letting
    // mix-blend-mode:difference work correctly across both elements.
    <div
      ref={ref}
      className="absolute group"
      style={{
        top: `${pos.topVh}vh`,
        left: pos.align === 'left' ? `${pos.offsetPct}%` : undefined,
        right: pos.align === 'right' ? `${pos.offsetPct}%` : undefined,
        width: pos.size,
        zIndex: 10
      }}
    >
      {/* Inner motion.div carries the scroll-driven transforms */}
      <motion.div style={{ scale, opacity, rotateZ }}>
        {/* ── Photo frame ── */}
        <div
          className="relative overflow-hidden border border-phosphor-green/25 group-hover:border-phosphor-green/60 transition-colors duration-300"
          style={{ width: pos.size, height: pos.size }}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            loading="lazy"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            style={{ filter: 'grayscale(1) contrast(1.1) brightness(0.85)' }}
            sizes="350px"
          />

          {/* Phosphor-green duotone tint */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: 'rgba(51,255,102,0.20)', mixBlendMode: 'screen' }}
          />

          {/* CRT scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: 'repeating-linear-gradient(0deg, rgba(51,255,102,0.07) 0px, transparent 1px, transparent 5px)',
            }}
          />

          {/* Hover green intensify */}
          <div
            className="absolute inset-0 bg-phosphor-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
          />

          {/* Social links (hover reveal) */}
          <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <Link
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} GitHub`}
              className="w-8 h-8 flex items-center justify-center bg-bg-void/90 border border-phosphor-green text-phosphor-green hover:bg-phosphor-green hover:text-bg-void transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-phosphor-green"
            >
              <FaGithub className="w-4 h-4" />
            </Link>
            <Link
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} LinkedIn`}
              className="w-8 h-8 flex items-center justify-center bg-bg-void/90 border border-phosphor-green text-phosphor-green hover:bg-phosphor-green hover:text-bg-void transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-phosphor-green"
            >
              <FaLinkedin className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Caption: name left | (role) right */}
        <div
          className="mt-2 flex items-baseline justify-between gap-2"
          style={{ width: pos.size }}
        >
          <span className="font-jetbrains text-[10px] text-phosphor-green uppercase tracking-[0.25em] whitespace-nowrap truncate">
            {member.name}
          </span>
          <span className="font-jetbrains text-[10px] text-phosphor-green/50 uppercase tracking-widest whitespace-nowrap">
            ({member.role})
          </span>
        </div>
        <span className="font-vt323 text-xs text-phosphor-green/30 tracking-widest">
          &gt; {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>
    </div>
  );
}

export default function SDGTeamPage() {
  // Dynamically calculate the total height needed for the container
  // based on how many photos there are. 
  // Each row takes ~54vh, plus padding at the bottom so the last photo clears.
  const containerVh = Math.ceil(teamData.length / 2) * 54 + 50;

  return (
    <main className="relative bg-bg-void min-h-screen overflow-x-hidden">
      {/* Global CRT texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(51,255,102,1) 0px, transparent 1px, transparent 5px)',
        }}
      />

      {/* ── Tall scroll container ── */}
      <div className="relative w-full" style={{ height: `${containerVh}vh`, zIndex: 1 }}>
        {/* ── Photos: absolutely positioned ── */}
        {(teamData as Member[]).map((member, i) => (
          <PhotoCard key={member.id} member={member} index={i} />
        ))}
      </div>

      {/*
        ── FIXED TEXT LAYER ──
        position: fixed ensures it stays on screen and doesn't jump with scroll.
        mix-blend-mode: difference is applied to the WHOLE fixed wrapper.
        Because it sits above the photos and spans the viewport, it blends with
        every scrolling pixel underneath it.
      */}
      <div
        className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ mixBlendMode: 'difference', zIndex: 30, color: '#ffffff' }}
      >
        <p className="font-vt323 text-lg md:text-xl tracking-[0.5em] text-phosphor-green/70 mb-1 select-none">
          COPS × SDG — 2025
        </p>
        <h1
          className="font-space font-bold uppercase select-none leading-none text-center"
          style={{
            fontSize: 'clamp(4rem, 16vw, 12rem)',
            letterSpacing: '-0.02em',
          }}
        >
          SDG TEAM
        </h1>
        <p className="mt-4 font-jetbrains text-xs tracking-[0.4em] text-phosphor-green/70 uppercase select-none">
          {teamData.length} OPERATIVES / ACTIVE
        </p>
      </div>

      {/* Footer strip */}
      <div className="relative z-40 border-t border-phosphor-green/20 py-10 flex justify-center bg-bg-void">
        <span className="font-vt323 text-xl text-phosphor-green/40 tracking-[0.5em] uppercase">
          END_OF_ROSTER █
        </span>
      </div>
    </main>
  );
}
