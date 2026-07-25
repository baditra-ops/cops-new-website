'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Cpu, ArrowRight, BookOpen, Layers } from 'lucide-react';

export default function HeroText() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl"
    >
      {/* AI Status Badge */}
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono mb-6 shadow-[0_0_25px_rgba(168,85,247,0.3)] backdrop-blur-md hover:border-cyan-400/80 transition-colors"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
        </span>
        <span className="text-cyan-300 font-semibold uppercase tracking-wider">
          INTELLIGENCE GROUP
        </span>
        <span className="text-purple-400">•</span>
        <span className="text-gray-300">AI & Deep Learning Wing</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        variants={itemVariants}
        className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 font-orbitron leading-[1.1]"
      >
        Decoding{' '}
        <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)] animate-pulse">
          Intelligence
        </span>
        ,<br />
        Shaping AI Future
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        variants={itemVariants}
        className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed font-light"
      >
        The official AI research vertical of COPS IIT BHU. We engineer cutting-edge Foundation Models, Computer Vision pipelines, Reinforcement Learning agents, and scalable ML systems.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pointer-events-auto"
      >
        <Link
          href="/verticals/ig/project"
          className="group relative flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-cyan-600 text-white font-semibold text-sm tracking-wide shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)] transition-all duration-300 hover:scale-105"
        >
          <Cpu className="w-4 h-4 text-cyan-200 group-hover:rotate-180 transition-transform duration-700" />
          <span>Explore AI Models</span>
          <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1.5 transition-transform" />
        </Link>

        <Link
          href="/verticals/ig/team"
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-purple-500/30 hover:border-purple-400 text-gray-200 hover:text-white font-semibold text-sm backdrop-blur-md transition-all duration-300 hover:bg-purple-950/60 hover:scale-105"
        >
          <Layers className="w-4 h-4 text-purple-400" />
          <span>Meet Researchers</span>
        </Link>

        <Link
          href="/verticals/ig/resources"
          className="flex items-center gap-2 px-4 py-3.5 rounded-xl text-gray-400 hover:text-cyan-300 font-mono text-xs transition-colors hover:scale-105"
        >
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Papers & Specs</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
