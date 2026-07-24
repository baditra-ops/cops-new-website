'use client';

import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function MissionStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  
  const missionText = "To architect the future through code, empowering developers to build scalable open-source solutions.";
  const [typed, setTyped] = useState("");
  
  useEffect(() => {
    if (isInView) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < missionText.length) {
          setTyped(missionText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 35);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="relative z-20 w-full py-24 bg-phosphor-green/5 border-y border-phosphor-green/20 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-space text-2xl md:text-3xl lg:text-4xl text-phosphor-green uppercase leading-tight tracking-wider min-h-[4em] md:min-h-[2em] drop-shadow-[0_0_8px_rgba(51,255,102,0.4)]">
          &gt; {typed}
          <span className="animate-pulse">_</span>
        </h2>
      </div>
    </section>
  );
}
