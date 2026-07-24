'use client';

import TerminalCard from './TerminalCard';
import StatusBadge from './StatusBadge';

export default function GoalGrid() {
  const goals = [
    {
      title: 'Open Source',
      description: 'Contributing to and maintaining open source projects that benefit the global developer community. We believe in code that is free and accessible to all.',
      icon: '🌐'
    },
    {
      title: 'Skill Development',
      description: 'Hosting workshops, hackathons, and peer-to-peer learning sessions to elevate the technical proficiency of our campus.',
      icon: '💻'
    },
    {
      title: 'Innovation Lab',
      description: 'Researching and experimenting with cutting-edge technologies like Web3, AI, and distributed systems to build the future.',
      icon: '🧪'
    },
    {
      title: 'Community Building',
      description: 'Fostering a strong, inclusive network of developers who collaborate, mentor, and grow together.',
      icon: '🤝'
    }
  ];

  return (
    <section className="relative z-20 w-full py-24 bg-bg-void">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="font-space text-3xl md:text-4xl text-phosphor-green font-bold uppercase tracking-widest">
              &gt; Core_Objectives
            </h2>
            <p className="mt-4 font-jetbrains text-crt-white/70 max-w-2xl">
              Our primary directives for advancing the software ecosystem.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <StatusBadge status="active" text="SYS.NOMINAL" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {goals.map((goal, i) => (
            <TerminalCard 
              key={i}
              title={goal.title}
              description={goal.description}
              icon={goal.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
