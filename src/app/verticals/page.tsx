'use client';

import { GiBrain } from 'react-icons/gi';
import { TiCodeOutline } from 'react-icons/ti';
import { PiGraphFill } from 'react-icons/pi';
import { SiCyberdefenders } from 'react-icons/si';
import { IconType } from 'react-icons';
import TargetCursor from '@/components/TargetCursor';

interface Vertical {
  short: string;
  name: string;
  description: string;
  href: string;
  Icon: IconType;
  accent: string;
  glowColor: string;
  gradientFrom: string;
  gradientTo: string;
  tag: string;
}

export default function ResourcesPage() {
  const verticals: Vertical[] = [
    {
      short: 'SDG',
      name: 'Software Development Group',
      description:
        'Building full-stack applications, scalable systems, open-source projects, modern web technologies, and software engineering solutions.',
      href: '/verticals/sdg',
      Icon: TiCodeOutline,
      accent: 'text-blue-400',
      glowColor: 'rgba(59,130,246,0.25)',
      gradientFrom: '#1e3a5f',
      gradientTo: '#0f172a',
      tag: 'Engineering',
    },
    {
      short: 'IG',
      name: 'Intelligence Group',
      description:
        'Exploring Artificial Intelligence, Machine Learning, Deep Learning, LLMs, Computer Vision, and cutting-edge research.',
      href: '/verticals/ig',
      Icon: GiBrain,
      accent: 'text-violet-400',
      glowColor: 'rgba(139,92,246,0.25)',
      gradientFrom: '#2e1b5f',
      gradientTo: '#0f172a',
      tag: 'AI & Research',
    },
    {
      short: 'CPG',
      name: 'Competitive Programming Group',
      description:
        'Mastering algorithms, data structures, competitive programming, ICPC preparation, and advanced problem-solving.',
      href: '/verticals/cpg',
      Icon: PiGraphFill,
      accent: 'text-amber-400',
      glowColor: 'rgba(245,158,11,0.25)',
      gradientFrom: '#3d2b00',
      gradientTo: '#0f172a',
      tag: 'Algorithms',
    },
    {
      short: 'INFOSEC',
      name: 'IIT(BHU)CyberSec',
      description:
        'Diving into cybersecurity, ethical hacking, reverse engineering, digital forensics, vulnerability research, and security engineering.',
      href: '/verticals/infosec',
      Icon: SiCyberdefenders,
      accent: 'text-rose-400',
      glowColor: 'rgba(244,63,94,0.25)',
      gradientFrom: '#3d0f1f',
      gradientTo: '#0f172a',
      tag: 'Security',
    },
  ];

  return (
    <div className='relative min-h-screen overflow-x-hidden'>
      <TargetCursor
        targetSelector='.cursor-target'
        spinDuration={2}
        hideDefaultCursor={false}
        parallaxOn={true}
        cursorColor='#67e8f9'
        cursorColorOnTarget='#ffffff'
      />

      <div className='relative z-20 flex flex-col items-center pt-32 pb-20'>
        <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>

          {/* Header */}
          <div className='mb-20 text-center'>
            <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-300'>
              <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400'></span>
              Four Core Verticals
            </div>
            <h1 className='mb-6'>
              <span className='font-agency-fb bg-linear-to-r from-cyan-200 via-white to-cyan-200 bg-clip-text text-6xl font-bold text-transparent md:text-7xl'>
                Our Verticals
              </span>
            </h1>
            <p className='mx-auto max-w-3xl text-lg text-gray-400 md:text-xl'>
              Explore the four technical verticals of COPS and discover communities focused on development,
              intelligence, competitive programming, and cybersecurity.
            </p>
          </div>

          {/* Cards Grid */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {verticals.map((vertical, idx) => {
              const Icon = vertical.Icon;
              return (
                <div
                  key={vertical.short}
                  className='cursor-target group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20'
                  style={{
                    animationDelay: `${idx * 100}ms`,
                  }}
                >
                  {/* Color tint on hover */}
                  <div
                    className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100'
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${vertical.glowColor}, transparent 70%)`,
                    }}
                  />

                  {/* Top gradient bar */}
                  <div
                    className='absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100'
                    style={{
                      background: `linear-gradient(90deg, transparent, ${vertical.glowColor.replace('0.25', '0.8')}, transparent)`,
                    }}
                  />

                  <div className='relative z-10 flex h-full flex-col p-8'>
                    {/* Top row: icon + tag */}
                    <div className='mb-6 flex items-start justify-between'>
                      <div
                        className='flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-white/20'
                        style={{ boxShadow: `0 0 20px ${vertical.glowColor}` }}
                      >
                        <Icon className={`h-7 w-7 ${vertical.accent}`} />
                      </div>
                      <span className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-400 backdrop-blur-sm'>
                        {vertical.tag}
                      </span>
                    </div>

                    {/* Short name */}
                    <h2 className='font-agency-fb mb-1 text-5xl font-bold text-white transition-colors duration-300'>
                      {vertical.short}
                    </h2>

                    {/* Full name */}
                    <h3 className={`mb-4 text-base font-semibold ${vertical.accent} opacity-90`}>
                      {vertical.name}
                    </h3>

                    {/* Divider */}
                    <div className='mb-5 h-px w-full bg-white/5' />

                    {/* Description */}
                    <p className='mb-8 grow text-sm leading-relaxed text-gray-400'>
                      {vertical.description}
                    </p>

                    {/* CTA */}
                    <a
                      href={vertical.href}
                      rel='noopener noreferrer'
                      className={`group/btn inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10`}
                    >
                      <span>Explore {vertical.short}</span>
                      <svg
                        className='h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                      </svg>
                    </a>
                  </div>

                  {/* Corner accent */}
                  <div
                    className='pointer-events-none absolute bottom-0 right-0 h-32 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100'
                    style={{
                      background: `radial-gradient(circle at 100% 100%, ${vertical.glowColor}, transparent 70%)`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
