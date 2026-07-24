'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroText() {
  const headline = "SOFTWARE DEVELOPMENT GROUP";
  const subtext = "We at Club of Programmers Software Development Group are a bunch of designers and developers who aim to encourage the development of technology and innovation in IIT BHU campus (and beyond) by learning, sharing knowledge and solving problems.";

  const [typedHeadline, setTypedHeadline] = useState("");
  const [typedSubtext, setTypedSubtext] = useState("");
  
  const [headlineComplete, setHeadlineComplete] = useState(false);
  const [subtextComplete, setSubtextComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < headline.length) {
        setTypedHeadline(headline.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setHeadlineComplete(true);
      }
    }, 70); // Headline typing speed
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!headlineComplete) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < subtext.length) {
        setTypedSubtext(subtext.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setSubtextComplete(true);
      }
    }, 15); // Subtext typing speed (faster because it's longer)
    return () => clearInterval(interval);
  }, [headlineComplete]);

  return (
    <div className="flex flex-col items-start text-left w-full pointer-events-none z-10">
      <style>{`
        @keyframes scanline-sweep {
          0% { transform: translateY(-20px); }
          100% { transform: translateY(60px); }
        }
      `}</style>

      {/* Headline */}
      <h1 className="font-space text-4xl md:text-5xl xl:text-7xl font-bold text-phosphor-green drop-shadow-[0_0_15px_rgba(51,255,102,0.8)] uppercase leading-tight tracking-tight min-h-[3em] lg:min-h-[2em]">
        {typedHeadline}
        <span className="animate-pulse text-phosphor-green">_</span>
      </h1>
      
      {/* Subtext */}
      <p className="mt-6 text-crt-white font-jetbrains text-sm md:text-base lg:text-lg max-w-lg min-h-[8em] md:min-h-[6em] opacity-80 leading-relaxed">
        {typedSubtext}
        {!subtextComplete && headlineComplete && <span className="animate-pulse text-phosphor-green">_</span>}
      </p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: subtextComplete ? 1 : 0, y: subtextComplete ? 0 : 10 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 pointer-events-auto"
      >
        <Link href="/verticals/sdg/resources" className="inline-block">
          <button className="relative overflow-hidden group border border-phosphor-green text-phosphor-green font-jetbrains px-6 py-3 bg-[#03110a] hover:bg-phosphor-green/10 transition-colors duration-300 shadow-[0_0_10px_rgba(51,255,102,0.2)] hover:shadow-[0_0_20px_rgba(51,255,102,0.6)] cursor-pointer">
            <span className="relative z-10 tracking-wider">&gt; explore_sdg</span>
            <div 
              className="absolute left-0 w-full h-[3px] bg-phosphor-green/50 opacity-0 group-hover:opacity-100 mix-blend-screen blur-[1px]" 
              style={{ top: 0, animation: 'scanline-sweep 1.5s linear infinite' }}
            />
          </button>
        </Link>
      </motion.div>

      {/* Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: subtextComplete ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-10 left-4 lg:left-20 animate-pulse text-phosphor-green/70 font-vt323 text-2xl tracking-widest pointer-events-none"
      >
        &gt; scroll_
      </motion.div>
    </div>
  );
}
