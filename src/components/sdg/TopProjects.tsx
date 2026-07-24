'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import projectsData from '../../../public/sdgprojectsdata/sdgprojectsdata.json';

const STATUS_STYLES: Record<string, { label: string; color: string; glow: string }> = {
  OK:          { label: 'OK',          color: 'text-phosphor-green border-phosphor-green', glow: 'shadow-[0_0_8px_rgba(51,255,102,0.4)]' },
  IN_PROGRESS: { label: 'IN_PROGRESS', color: 'text-amber-400 border-amber-400',          glow: 'shadow-[0_0_8px_rgba(251,191,36,0.4)]' },
  PLANNED:     { label: 'PLANNED',     color: 'text-crt-white/40 border-crt-white/30',    glow: '' },
};

export default function TopProjects() {
  const featured = (projectsData as any[])
    .filter((p) => p.featured)
    .slice(0, 4);

  return (
    <section className="relative z-20 w-full py-24 bg-bg-void border-b border-phosphor-green/20">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="font-jetbrains text-phosphor-green/50 text-xs uppercase tracking-[0.3em] mb-2">
              &gt; ls -la /projects --filter=featured
            </p>
            <h2 className="font-space text-4xl md:text-5xl font-bold text-phosphor-green uppercase tracking-tighter drop-shadow-[0_0_8px_rgba(51,255,102,0.3)]">
              [TOP_PROJECTS]
            </h2>
          </div>
          <Link
            href="/verticals/sdg/project"
            className="inline-flex items-center gap-2 font-jetbrains text-sm text-phosphor-green border border-phosphor-green/40 px-5 py-2 bg-transparent hover:bg-phosphor-green/10 hover:border-phosphor-green transition-all shadow-none hover:shadow-[0_0_15px_rgba(51,255,102,0.3)] whitespace-nowrap"
          >
            &gt; more_projects
            <span className="text-phosphor-green/50">→</span>
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((project, i) => {
            const s = STATUS_STYLES[project.status] ?? STATUS_STYLES.PLANNED;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative border border-phosphor-green/20 hover:border-phosphor-green/60 bg-[#03110a] overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(51,255,102,0.1)]"
              >
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-phosphor-green opacity-30 group-hover:opacity-100 transition-opacity z-10" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-phosphor-green opacity-30 group-hover:opacity-100 transition-opacity z-10" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-phosphor-green opacity-30 group-hover:opacity-100 transition-opacity z-10" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-phosphor-green opacity-30 group-hover:opacity-100 transition-opacity z-10" />

                {/* 16:9 Image */}
                <div className="relative w-full aspect-video overflow-hidden bg-black/40">
                  <Image
                    src={project.image}
                    alt={project.projectname}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-90 transition-opacity scale-100 group-hover:scale-105 duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  {/* Scanline overlay */}
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)] pointer-events-none" />
                </div>

                {/* Card Body */}
                <div className="p-4">
                  {/* Status badge */}
                  <span className={`font-jetbrains text-[10px] uppercase tracking-widest border px-2 py-0.5 ${s.color} ${s.glow}`}>
                    {s.label}
                  </span>

                  <h3 className="mt-3 font-space font-bold text-phosphor-green uppercase tracking-tight text-sm leading-snug line-clamp-1">
                    {project.projectname}
                  </h3>
                  <p className="mt-1 font-jetbrains text-xs text-crt-white/50 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Dev + stack */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-jetbrains text-[10px] text-phosphor-green/40 uppercase truncate max-w-[70%]">
                      {project.developer}
                    </span>
                    <div className="flex gap-1">
                      {project.stack.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="font-jetbrains text-[9px] text-phosphor-green/30 border border-phosphor-green/10 px-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/verticals/sdg/project"
            className="inline-flex items-center gap-3 font-jetbrains text-sm text-phosphor-green/70 hover:text-phosphor-green transition-colors group"
          >
            <span className="font-vt323 text-xl text-phosphor-green/40 group-hover:text-phosphor-green transition-colors">{'>'}</span>
            &gt; run ps aux | grep ALL_PROJECTS
            <span className="opacity-40 group-hover:opacity-100 transition-opacity">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
