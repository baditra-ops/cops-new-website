'use client';

import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

const Stat = ({ label, target, suffix = "" }: { label: string, target: number, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const springValue = useSpring(0, { duration: 2500, bounce: 0 });
  const displayValue = useTransform(springValue, (current) => Math.floor(current));

  useEffect(() => {
    if (isInView) {
      springValue.set(target);
    }
  }, [isInView, target, springValue]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="font-vt323 text-5xl md:text-7xl text-phosphor-green mb-2 drop-shadow-[0_0_12px_rgba(51,255,102,0.6)] flex">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </div>
      <div className="font-jetbrains text-crt-white/70 uppercase tracking-widest text-sm text-center">
        {label}
      </div>
    </div>
  );
};

export default function ImpactStats() {
  return (
    <section className="relative z-20 w-full py-20 bg-bg-void border-b border-phosphor-green/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 divide-y md:divide-y-0 md:divide-x divide-phosphor-green/20">
          <Stat label="Lines of Code" target={500} suffix="K+" />
          <Stat label="Active Projects" target={12} />
          <Stat label="Contributors" target={50} suffix="+" />
          <Stat label="Coffee Cups" target={1337} />
        </div>
      </div>
    </section>
  );
}
