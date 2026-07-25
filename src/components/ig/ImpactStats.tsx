'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { FileText, Cpu, Users, HardDrive } from 'lucide-react';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
}

function AnimatedCounter({ target, suffix = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1], // Smooth out cubic easing
      onUpdate(value) {
        setCount(Math.floor(value));
      },
    });

    return () => controls.stop();
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function ImpactStats() {
  const stats = [
    {
      label: 'Research Publications',
      numericValue: 15,
      suffix: '+',
      description: 'Accepted at top AI conferences & workshops.',
      icon: FileText,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/30 hover:border-purple-400/80 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]',
    },
    {
      label: 'Open Models & Datasets',
      numericValue: 24,
      suffix: '+',
      description: 'Publicly hosted on Hugging Face & GitHub.',
      icon: Cpu,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/30 hover:border-cyan-400/80 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]',
    },
    {
      label: 'Active Researchers',
      numericValue: 60,
      suffix: '+',
      description: 'Students working on machine learning projects.',
      icon: Users,
      color: 'text-pink-400',
      borderColor: 'border-pink-500/30 hover:border-pink-400/80 hover:shadow-[0_0_25px_rgba(236,72,153,0.3)]',
    },
    {
      label: 'GPU Compute Hours',
      numericValue: 10,
      suffix: 'K+',
      description: 'Accelerated neural network training cycles.',
      icon: HardDrive,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/30 hover:border-emerald-400/80 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className={`relative overflow-hidden rounded-2xl bg-[#090516]/85 border ${stat.borderColor} p-6 backdrop-blur-xl transition-all duration-300 group`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl font-extrabold font-orbitron text-white group-hover:text-purple-300 transition-colors drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                  <AnimatedCounter target={stat.numericValue} suffix={stat.suffix} />
                </span>
                <div className={`p-3.5 rounded-xl bg-white/5 border border-white/10 group-hover:rotate-12 transition-transform ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h4 className="text-base font-semibold text-white mb-1 font-orbitron">{stat.label}</h4>
              <p className="text-xs text-gray-400">{stat.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
