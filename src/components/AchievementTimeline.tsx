'use client';

import { useEffect, useRef, useState } from 'react';
import { GiAchievement } from 'react-icons/gi';
import { achievements, Achievement } from '@/app/config/achievements';

type YearData = {
  year: string;
  achievements: Achievement[];
};

const colorMap: { [key: number]: string } = {
  1: 'text-yellow-400', // Gold
  2: 'text-gray-300', // Silver
  3: 'text-orange-400', // Bronze
};

function yearwiseAchievements(achievements: Achievement[]): YearData[] {
  const years = [...new Set(achievements.map((a) => a.year))].sort(
    (a, b) => b - a
  );
  return years.map((year) => ({
    year: year.toString(),
    achievements: achievements.filter((a) => a.year === year),
  }));
}

export default function AchievementsTimeline() {
  const groupedAchievements = yearwiseAchievements(achievements);
  const containerRef = useRef<HTMLDivElement>(null);
  const yearRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileNavButtonRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeYear, setActiveYear] = useState<string>(
    groupedAchievements[0]?.year
  );

  const scrollToYear = (index: number) => {
    yearRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    if (!mobileNavRef || !activeYear) return;
    const index = groupedAchievements.findIndex((y) => y.year === activeYear);
    const button = mobileNavButtonRef.current[index];

    if (button && mobileNavRef.current) {
      const container = mobileNavRef.current;
      const containerWidth = container.offsetWidth;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;

      const scrollLeft = buttonLeft - (containerWidth - buttonWidth) / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [activeYear, groupedAchievements]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const year = entry.target.getAttribute('data-year');
            if (year) {
              setActiveYear(year);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );

    const currentRefs = yearRefs.current;
    currentRefs.forEach((ref, index) => {
      if (ref) {
        ref.setAttribute('data-year', groupedAchievements[index].year);
        observer.observe(ref);
      }
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [groupedAchievements]);

  return (
    <div className='relative w-full'>
      <div className='flex flex-col md:flex-row'>
        {/* Mobile Year Nav */}
        <nav className='sticky top-28 z-20 my-12 self-center shadow-2xl md:hidden'>
          <div
            ref={mobileNavRef}
            className='flex w-[325px] gap-4 overflow-x-auto rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl sm:w-[500px]'
          >
            {groupedAchievements.map((yearData, index) => (
              <button
                key={yearData.year}
                ref={(element) => {
                  mobileNavButtonRef.current[index] = element;
                }}
                onClick={() => scrollToYear(index)}
                className={`flex items-center rounded-md px-3 py-2 transition-all duration-300 hover:bg-white/10 ${activeYear === yearData.year ? 'bg-white/20 text-xl font-bold text-yellow-400' : 'text-md text-white'} `}
              >
                <span className='transition-all duration-300'>
                  {yearData.year}
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* Year Nav*/}
        <nav className='sticky top-32 z-20 my-12 ml-4 hidden h-fit self-start shadow-2xl md:ml-10 md:block'>
          <div className='flex flex-col gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl'>
            {groupedAchievements.map((yearData, index) => (
              <button
                key={yearData.year}
                onClick={() => scrollToYear(index)}
                className={`group flex items-center rounded-md px-3 py-2 transition-all duration-300 hover:bg-white/10 ${activeYear === yearData.year ? 'bg-white/20 text-xl font-bold text-yellow-400' : 'text-md text-white'} `}
              >
                <span className='transition-all duration-300'>
                  {yearData.year}
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* Achievements Content */}
        <div ref={containerRef} className='mx-0 flex-1 px-4 md:mx-8'>
          {groupedAchievements.map((yearData, index) => (
            <div
              key={yearData.year}
              ref={(el) => {
                yearRefs.current[index] = el;
              }}
              className='flex min-h-[50vh] scroll-mt-16 flex-col justify-center py-10'
            >
              <div className='mb-8'>
                <h3 className='mb-4 bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl'>
                  {yearData.year} Achievements 🏆
                </h3>
              </div>

              <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {yearData.achievements.map((achievement, achievementIndex) => (
                  <div
                    key={`${achievement.title}-${achievementIndex}`}
                    className='rounded-lg border border-white/20 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/15 hover:shadow-lg'
                  >
                    <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20'>
                      <GiAchievement
                        className={`h-10 w-10 ${
                          achievement.position && colorMap[achievement.position]
                            ? colorMap[achievement.position]
                            : 'text-yellow-400'
                        } transition-all duration-300 hover:brightness-125`}
                      />
                    </div>
                    <h4 className='mb-2 text-xl font-semibold text-white'>
                      {achievement.title}
                    </h4>
                    <p className='mb-2 text-sm font-medium text-yellow-400'>
                      {achievement.level}
                    </p>
                    <p className='text-sm text-gray-300'>
                      {achievement.description}
                    </p>
                    {achievement.category && (
                      <span className='mt-3 inline-block rounded-full bg-blue-600/20 px-3 py-1 text-xs font-medium text-blue-300'>
                        {achievement.category}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
