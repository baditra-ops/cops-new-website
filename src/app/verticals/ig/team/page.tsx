'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, UserCheck } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface Member {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  github: string;
  linkedin: string;
}

const FALLBACK_MEMBERS: Member[] = [
  {
    id: 1,
    name: 'Swarit Agarwal',
    role: 'IG Lead & AI Systems Architect',
    image: '/sdgteam/pics/swarit.jpeg',
    bio: 'Full-stack wizard specializing in scalable AI architectures, Large Language Models, and open-source ecosystems.',
    github: 'https://github.com/swarit',
    linkedin: 'https://linkedin.com/in/swarit',
  },
  {
    id: 2,
    name: 'Yashashwi Singh',
    role: 'AI UI/UX & Frontend Engineer',
    image: '/sdgteam/pics/yashashwi.jpeg',
    bio: 'Crafts pixel-perfect UIs with a passion for motion, micro-interactions, and AI dashboard experiences.',
    github: 'https://github.com/yashashwi',
    linkedin: 'https://linkedin.com/in/yashashwi',
  },
  {
    id: 3,
    name: 'Suryansh Garg',
    role: 'Deep Learning Infrastructure Engineer',
    image: '/sdgteam/pics/suryansh.png',
    bio: 'Systems thinker who turns complex GPU training pipelines and distributed infrastructure into elegant solutions.',
    github: 'https://github.com/suryansh',
    linkedin: 'https://linkedin.com/in/suryansh',
  },
  {
    id: 4,
    name: 'Sagnik Mandal',
    role: 'MLOps & Model Deployment Engineer',
    image: '/sdgteam/pics/sagnik.jpg',
    bio: 'Keeps the model evaluation pipelines green and high-throughput inference deployments blazing fast.',
    github: 'https://github.com/sagnik',
    linkedin: 'https://linkedin.com/in/sagnik',
  },
  {
    id: 5,
    name: 'Pratham Gupta',
    role: 'Core Machine Learning Engineer',
    image: '/sdgteam/pics/pratham.jpeg',
    bio: 'Bridges the gap between deep learning research and production models with a keen eye on data quality.',
    github: 'https://github.com/pratham',
    linkedin: 'https://linkedin.com/in/pratham',
  },
  {
    id: 6,
    name: 'Sakshi Sharma',
    role: 'Generative AI & Creative Tech Designer',
    image: '/sdgteam/pics/sakshi.jpeg',
    bio: 'Designs generative AI workflows with empathy, prototypes with speed, and ships intelligent interfaces.',
    github: 'https://github.com/sakshi',
    linkedin: 'https://linkedin.com/in/sakshi',
  },
  {
    id: 7,
    name: 'Vidit Jain',
    role: 'AI Security & Red-Teaming Researcher',
    image: '/sdgteam/pics/vidit.jpeg',
    bio: 'Explores LLM jailbreaking, adversarial robustness, and model alignment. CTF champion and security contributor.',
    github: 'https://github.com/vidit',
    linkedin: 'https://linkedin.com/in/vidit',
  },
  {
    id: 8,
    name: 'Yug Agarwal',
    role: 'On-Device ML & Mobile AI Engineer',
    image: '/sdgteam/pics/yug.jpeg',
    bio: 'Builds smooth cross-platform mobile apps with quantized on-device neural network models.',
    github: 'https://github.com/yug',
    linkedin: 'https://linkedin.com/in/yug',
  },
  {
    id: 9,
    name: 'Aayush Awasthi',
    role: 'Edge AI & Mobile Developer',
    image: '/sdgteam/pics/aayush.jpeg',
    bio: 'Engineers lightweight mobile AI agents and high-performance cross-platform mobile user interfaces.',
    github: 'https://github.com/aayush',
    linkedin: 'https://linkedin.com/in/ayush',
  },
];

export default function IGTeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/igteam/igteam.json')
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch(() => {
        setMembers(FALLBACK_MEMBERS);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Header Banner */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-xs font-mono text-purple-300">
          <Users className="w-4 h-4 text-cyan-400" />
          <span>IG AI RESEARCHERS & LEADS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold font-orbitron text-white">
          Meet the Intelligence Group Team
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base">
          Our team consists of passionate researchers, machine learning engineers, and student leads pushing the boundaries of AI at IIT BHU.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-24 font-mono text-purple-400">Loading IG Researchers...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group relative overflow-hidden rounded-2xl bg-[#0e0826]/80 border border-purple-500/30 p-6 backdrop-blur-xl hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_35px_rgba(168,85,247,0.25)] flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar / Photo Frame */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative w-20 h-20 rounded-2xl bg-purple-950 border border-purple-500/40 overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.3)] shrink-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      sizes="80px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-cyan-500/10 pointer-events-none" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white font-orbitron group-hover:text-purple-300 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400 font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              {/* Social Links Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono text-purple-300/60 uppercase tracking-widest flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-cyan-400" /> RESEARCH MEMBER
                </span>

                <div className="flex items-center gap-2">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-purple-950/40 border border-purple-500/30 hover:border-cyan-400 hover:bg-cyan-950/60 text-gray-300 hover:text-cyan-300 transition-all duration-300 shadow-[0_0_10px_rgba(139,92,246,0.2)]"
                      aria-label={`${member.name} GitHub`}
                    >
                      <FaGithub className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-purple-950/40 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-900/60 text-gray-300 hover:text-purple-300 transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <FaLinkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
