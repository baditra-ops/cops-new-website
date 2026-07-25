'use client';

import { motion } from 'framer-motion';
import { Bot, Eye, Gamepad2, Layers, Cpu, Code2 } from 'lucide-react';

interface Domain {
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  color: string;
  borderGlow: string;
  tags: string[];
}

export default function DomainGrid() {
  const domains: Domain[] = [
    {
      title: 'Large Language Models',
      subtitle: 'NLP & FOUNDATION MODELS',
      description:
        'Fine-tuning, LoRA adaptation, retrieval-augmented generation (RAG), and reasoning benchmark evaluation for specialized domain models.',
      icon: Bot,
      color: 'text-purple-400',
      borderGlow: 'hover:border-purple-500/80 hover:shadow-[0_0_35px_rgba(168,85,247,0.3)]',
      tags: ['Transformers', 'PEFT / LoRA', 'RAG', 'Prompt Eng'],
    },
    {
      title: 'Computer Vision & 3D',
      subtitle: 'SPATIAL INTELLIGENCE',
      description:
        'Real-time object detection, semantic segmentation, 3D Neural Radiance Fields (NeRFs), and Gaussian splatting for spatial computing.',
      icon: Eye,
      color: 'text-cyan-400',
      borderGlow: 'hover:border-cyan-500/80 hover:shadow-[0_0_35px_rgba(6,182,212,0.3)]',
      tags: ['Vision Transformers', 'NeRFs', 'OpenCV', 'PyTorch'],
    },
    {
      title: 'Reinforcement Learning',
      subtitle: 'DECISION AGENTS',
      description:
        'Multi-agent systems, continuous control, game-playing AI agents, and Decision Transformer architectures for simulated environments.',
      icon: Gamepad2,
      color: 'text-pink-400',
      borderGlow: 'hover:border-pink-500/80 hover:shadow-[0_0_35px_rgba(236,72,153,0.3)]',
      tags: ['PPO / SAC', 'Gymnasium', 'Ray RLlib', 'Decision Transformers'],
    },
    {
      title: 'Generative AI & Diffusion',
      subtitle: 'CREATIVE SYNTHESIS',
      description:
        'Latent diffusion models, image-to-video synthesis, text-to-3D mesh generation, and multimodal audio synthesis pipelines.',
      icon: Layers,
      color: 'text-indigo-400',
      borderGlow: 'hover:border-indigo-500/80 hover:shadow-[0_0_35px_rgba(99,102,241,0.3)]',
      tags: ['Stable Diffusion', 'ControlNet', 'AudioCraft', 'Diffusers'],
    },
    {
      title: 'Edge AI & Acceleration',
      subtitle: 'ML SYSTEMS',
      description:
        'Model quantization (INT8/FP4), ONNX TensorRT optimization, edge device deployment, and distributed GPU training infrastructure.',
      icon: Cpu,
      color: 'text-emerald-400',
      borderGlow: 'hover:border-emerald-500/80 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)]',
      tags: ['TensorRT', 'ONNX', 'CUDA', 'TVM Compiler'],
    },
    {
      title: 'AI Alignment & Safety',
      subtitle: 'ROBUSTNESS & ETHICS',
      description:
        'Direct Preference Optimization (DPO), adversarial robustness testing, mechanistic interpretability, and AI safety evaluation frameworks.',
      icon: Code2,
      color: 'text-amber-400',
      borderGlow: 'hover:border-amber-500/80 hover:shadow-[0_0_35px_rgba(245,158,11,0.3)]',
      tags: ['DPO / RLHF', 'Interpretability', 'Red-Teaming', 'Safety Benchmarks'],
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20 relative">
      <div className="text-center mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-xs font-mono text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span>EXPLORE OUR FOCUS AREAS</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold font-orbitron text-white"
        >
          AI Research Domains
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto text-base"
        >
          Our members work across key disciplines in modern artificial intelligence, bridging conceptual research with production deployment.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain, idx) => {
          const Icon = domain.icon;
          return (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl bg-[#0e0826]/75 border border-white/10 p-7 backdrop-blur-xl transition-all duration-300 ${domain.borderGlow}`}
            >
              {/* Background gradient blur */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors pointer-events-none" />

              {/* Icon & Subtitle Header */}
              <div className="flex items-center justify-between mb-5">
                <div className={`p-3.5 rounded-xl bg-white/5 border border-white/10 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300 ${domain.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-full border border-white/5 group-hover:border-purple-500/40 transition-colors">
                  {domain.subtitle}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors font-orbitron">
                {domain.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                {domain.description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {domain.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-purple-200/80 bg-purple-950/50 border border-purple-500/20 px-2.5 py-0.5 rounded-md group-hover:border-purple-400/50 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
