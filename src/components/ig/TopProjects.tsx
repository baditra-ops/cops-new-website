'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Cpu, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

interface Project {
  id: number;
  projectname: string;
  description: string;
  developer: string;
  githublink: string;
  deployedlink: string;
  status: string;
  featured: boolean;
  image: string;
  stack: string[];
}

export default function TopProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/igprojectsdata/igprojectsdata.json')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.filter((p: Project) => p.featured));
        setLoading(false);
      })
      .catch(() => {
        setProjects([
          {
            id: 1,
            projectname: 'COPS Neural Engine',
            description: 'Lightweight framework for distributed fine-tuning and retrieval-augmented generation (RAG) optimized for GPU clusters.',
            developer: 'Aarav Sharma & Vikram Sethi',
            githublink: 'https://github.com/cops-ig/neural-engine',
            deployedlink: 'https://ig.copsiitbhu.co.in',
            status: 'OK',
            featured: true,
            image: '/igprojectsdata/pics/neural-engine.png',
            stack: ['PyTorch', 'Transformers', 'CUDA', 'FastAPI'],
          },
          {
            id: 2,
            projectname: 'Vision-X Transformer',
            description: 'Real-time semantic segmentation and depth estimation model for autonomous robotics telemetry.',
            developer: 'Ananya Verma',
            githublink: 'https://github.com/cops-ig/vision-x',
            deployedlink: '',
            status: 'IN_PROGRESS',
            featured: true,
            image: '/igprojectsdata/pics/vision-x.png',
            stack: ['PyTorch', 'OpenCV', 'TensorRT'],
          },
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-xs font-mono text-purple-300 mb-3 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>FEATURED AI INITIATIVES</span>
          </div>
          <h2 className="text-4xl font-bold font-orbitron text-white">Top AI Projects</h2>
        </div>
        <Link
          href="/verticals/ig/project"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-cyan-300 transition-colors"
        >
          <span>View All Projects</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-purple-400 font-mono">
          Loading AI Projects...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative overflow-hidden rounded-2xl bg-[#0e0826]/85 border border-purple-500/30 p-6 md:p-8 backdrop-blur-xl hover:border-cyan-400/80 transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300">
                    {project.status === 'OK' ? 'PRODUCTION READY' : 'RESEARCH IN PROGRESS'}
                  </span>
                  <div className="flex items-center gap-3">
                    {project.githublink && (
                      <a
                        href={project.githublink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white/5 hover:bg-purple-950/60 hover:text-cyan-300 text-gray-300 transition-colors hover:scale-110"
                        aria-label="GitHub Repository"
                      >
                        <FaGithub className="w-5 h-5" />
                      </a>
                    )}
                    {project.deployedlink && (
                      <a
                        href={project.deployedlink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white/5 hover:bg-cyan-950/60 hover:text-cyan-300 text-gray-300 transition-colors hover:scale-110"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-orbitron text-white group-hover:text-purple-300 transition-colors mb-3">
                  {project.projectname}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                <p className="text-xs font-mono text-gray-400 mb-3">
                  Lead: <span className="text-cyan-300 font-semibold">{project.developer}</span>
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-lg group-hover:border-purple-400/60 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
