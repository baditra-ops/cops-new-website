'use client';

import { motion } from 'framer-motion';
import { Sparkles, Brain, Cpu, ShieldCheck } from 'lucide-react';

export default function MissionStrip() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950/80 via-[#0d0722]/90 to-cyan-950/80 border border-purple-500/30 p-8 md:p-12 backdrop-blur-xl shadow-[0_0_50px_rgba(139,92,246,0.15)]">
        {/* Decorative corner light accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Headline & Vision */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-xs font-mono text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>CORE MISSION & VISION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-orbitron text-white leading-tight">
              Pioneering Intelligent Systems & Open AI Research
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              At IG, we foster an environment of continuous experimentation in machine learning. From fundamental neural architecture design to scalable multi-modal models, our mission is to build intelligent software that solves complex real-world problems.
            </p>
          </div>

          {/* Key Value Badges */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2 hover:border-purple-400/60 transition-colors">
              <Brain className="w-6 h-6 text-purple-400" />
              <h4 className="font-semibold text-white text-sm">Deep Research</h4>
              <p className="text-xs text-gray-400">LLMs, Generative AI & Reinforcement Learning.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-cyan-500/20 backdrop-blur-md space-y-2 hover:border-cyan-400/60 transition-colors">
              <Cpu className="w-6 h-6 text-cyan-400" />
              <h4 className="font-semibold text-white text-sm">ML Engineering</h4>
              <p className="text-xs text-gray-400">High-throughput GPU training & edge deployment.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-pink-500/20 backdrop-blur-md space-y-2 hover:border-pink-400/60 transition-colors">
              <Sparkles className="w-6 h-6 text-pink-400" />
              <h4 className="font-semibold text-white text-sm">Open Source</h4>
              <p className="text-xs text-gray-400">Publishing models, datasets & open benchmarks.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-indigo-500/20 backdrop-blur-md space-y-2 hover:border-indigo-400/60 transition-colors">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
              <h4 className="font-semibold text-white text-sm">AI Alignment</h4>
              <p className="text-xs text-gray-400">Ethical safety, robustness & interpretability.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
