'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import HeroBackground from '@/components/sdg/HeroBackground';
import AsciiLaptop from '@/components/sdg/AsciiLaptop/AsciiLaptop';
import HeroText from '@/components/sdg/HeroText';
import MissionStrip from '@/components/sdg/MissionStrip';
import GoalGrid from '@/components/sdg/GoalGrid';
import ImpactStats from '@/components/sdg/ImpactStats';
// import CtaBand from '@/components/sdg/CtaBand'; // Join_The_Mission — replaced by TopProjects
import TopProjects from '@/components/sdg/TopProjects';
// SdgFooter is rendered by the layout for all SDG pages

export default function SDGLandingPage() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  return (
    <main className="relative min-h-[200vh]">
      {/* Hero Section — two column split */}
      <motion.section 
        style={{ opacity: heroOpacity }}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Layer 1: Background (z-0) */}
        <HeroBackground />

        {/* Layer 2 + 3: Two-column layout */}
        <div className="absolute inset-0 z-10 flex flex-col lg:flex-row items-center px-4 lg:px-20 mt-20 lg:mt-0 pointer-events-none">
          
          {/* Left column — Hero text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 pointer-events-none z-20">
            <HeroText />
          </div>

          {/* Right column — ASCII Laptop */}
          <div className="flex items-center justify-center lg:justify-end w-full lg:w-1/2 h-1/2 lg:h-full pointer-events-auto mt-8 lg:mt-0">
            <div className="w-full h-full lg:h-[580px] max-w-[700px] flex items-center justify-center">
              <AsciiLaptop />
            </div>
          </div>

        </div>
      </motion.section>

      {/* Below the fold content */}
      <MissionStrip />
      <GoalGrid />
      <ImpactStats />
      {/* <CtaBand /> — Join_The_Mission commented out, replaced with TopProjects */}
      <TopProjects />
    </main>
  );
}
