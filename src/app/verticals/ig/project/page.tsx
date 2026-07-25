'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Search, ExternalLink, Filter, Code2 } from 'lucide-react';
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

export default function IGProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/igprojectsdata/igprojectsdata.json')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setProjects([
          {
            id: 1,
            projectname: 'COPS Neural Engine',
            description: 'Framework for distributed fine-tuning and retrieval-augmented generation (RAG) optimized for local GPU clusters.',
            developer: 'Aarav Sharma & Vikram Sethi',
            githublink: 'https://github.com/cops-ig/neural-engine',
            deployedlink: 'https://ig.copsiitbhu.co.in/neural-engine',
            status: 'OK',
            featured: true,
            image: '/igprojectsdata/pics/neural-engine.png',
            stack: ['PyTorch', 'Transformers', 'CUDA', 'FastAPI'],
          },
          {
            id: 2,
            projectname: 'Vision-X Transformer',
            description: 'Real-time semantic segmentation and depth estimation model for autonomous edge robotics.',
            developer: 'Ananya Verma',
            githublink: 'https://github.com/cops-ig/vision-x',
            deployedlink: '',
            status: 'IN_PROGRESS',
            featured: true,
            image: '/igprojectsdata/pics/vision-x.png',
            stack: ['PyTorch', 'OpenCV', 'TensorRT'],
          },
          {
            id: 3,
            projectname: 'SimuRL Arena',
            description: 'Multi-agent reinforcement learning environment benchmark for autonomous strategy decision making.',
            developer: 'Rohan Kulkarni',
            githublink: 'https://github.com/cops-ig/simu-rl',
            deployedlink: '',
            status: 'OK',
            featured: true,
            image: '/igprojectsdata/pics/simu-rl.png',
            stack: ['Python', 'Ray RLlib', 'Gymnasium'],
          },
          {
            id: 4,
            projectname: 'LatentCraft GenAI',
            description: 'Latent diffusion pipeline for generating domain-specific architectural CAD assets and 3D meshes.',
            developer: 'Diya Nair',
            githublink: 'https://github.com/cops-ig/latent-craft',
            deployedlink: 'https://ig.copsiitbhu.co.in/latent-craft',
            status: 'IN_PROGRESS',
            featured: true,
            image: '/igprojectsdata/pics/latent-craft.png',
            stack: ['Diffusers', 'Three.js', 'Python'],
          },
        ]);
        setLoading(false);
      });
  }, []);

  const allTechStacks = Array.from(
    new Set(projects.flatMap((p) => p.stack))
  );

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.projectname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.developer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = selectedTech === 'ALL' || p.stack.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Header Banner */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-xs font-mono text-purple-300">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>IG AI RESEARCH REPOSITORY</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold font-orbitron text-white">
          AI Models & Open Source Projects
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base">
          Explore machine learning models, frameworks, tools, and research repositories engineered by members of the Intelligence Group.
        </p>
      </div>

      {/* Controls Bar (Search + Filter) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-[#0e0826]/80 border border-purple-500/30 p-4 rounded-2xl backdrop-blur-xl">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AI projects, models, researchers..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 font-mono"
          />
        </div>

        {/* Stack Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-purple-400 shrink-0" />
          <button
            onClick={() => setSelectedTech('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
              selectedTech === 'ALL'
                ? 'bg-purple-600 text-white font-bold shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            ALL
          </button>
          {allTechStacks.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
                selectedTech === tech
                  ? 'bg-purple-600 text-white font-bold shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="text-center py-24 font-mono text-purple-400">Loading AI Projects...</div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-24 bg-white/5 rounded-2xl border border-white/10">
          <Code2 className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-300 font-mono">No projects found matching your search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group relative overflow-hidden rounded-2xl bg-[#0e0826]/80 border border-purple-500/30 p-6 md:p-8 backdrop-blur-xl hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_35px_rgba(139,92,246,0.2)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300">
                    {project.status === 'OK' ? 'PRODUCTION READY' : 'RESEARCH IN PROGRESS'}
                  </span>
                  <div className="flex items-center gap-3">
                    {project.githublink && (
                      <a
                        href={project.githublink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                        title="GitHub Repo"
                      >
                        <FaGithub className="w-4 h-4" />
                      </a>
                    )}
                    {project.deployedlink && (
                      <a
                        href={project.deployedlink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-cyan-300 transition-colors"
                        title="Live Deployment / Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
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
                  Contributors: <span className="text-cyan-300">{project.developer}</span>
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-purple-300 bg-purple-950/50 border border-purple-500/30 px-3 py-1 rounded-lg"
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
    </div>
  );
}
