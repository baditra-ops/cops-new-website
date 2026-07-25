'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import NeuralCanvas from '@/components/ig/NeuralCanvas';
import HeroText from '@/components/ig/HeroText';
import NeuralCore from '@/components/ig/NeuralCore';
import MissionStrip from '@/components/ig/MissionStrip';
import DomainGrid from '@/components/ig/DomainGrid';
import ImpactStats from '@/components/ig/ImpactStats';
import TopProjects from '@/components/ig/TopProjects';

export default function IGLandingPage() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <main className="relative min-h-[200vh]">
      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative h-screen w-full overflow-hidden flex items-center"
      >
        {/* Layer 1: Animated Interactive Neural Background (z-0) */}
        <NeuralCanvas />

        {/* Layer 2: Two-column layout (Text + Neural Core) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 mt-10 lg:mt-0">
          
          {/* Left Column — Hero Text */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <HeroText />
          </div>

          {/* Right Column — Interactive Neural Core */}
          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
            <NeuralCore />
          </div>

        </div>
      </motion.section>

      {/* Below the fold content */}
      <MissionStrip />
      <DomainGrid />
      <ImpactStats />
      <TopProjects />
    </main>
  );
}
