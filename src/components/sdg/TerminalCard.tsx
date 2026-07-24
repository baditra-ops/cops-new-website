import React from 'react';

interface TerminalCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  delay?: number;
}

export default function TerminalCard({ title, description, icon, delay = 0 }: TerminalCardProps) {
  return (
    <div 
      className="relative p-6 border border-phosphor-green/40 bg-[#03110a] hover:bg-phosphor-green/10 hover:border-phosphor-green transition-all duration-300 group shadow-[0_0_15px_rgba(51,255,102,0.05)] hover:shadow-[0_0_20px_rgba(51,255,102,0.2)] flex flex-col h-full"
    >
      {/* Box drawing corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-phosphor-green opacity-50 group-hover:opacity-100" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-phosphor-green opacity-50 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-phosphor-green opacity-50 group-hover:opacity-100" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-phosphor-green opacity-50 group-hover:opacity-100" />
      
      <div className="flex items-center gap-3 mb-4 text-phosphor-green">
        {icon && <span className="text-2xl">{icon}</span>}
        <h3 className="font-space text-lg font-bold tracking-wider uppercase">{title}</h3>
      </div>
      
      <p className="font-jetbrains text-crt-white/70 text-sm leading-relaxed flex-grow">
        {description}
      </p>
      
      {/* Decorative prompt at bottom */}
      <div className="mt-6 font-vt323 text-phosphor-green/40 text-lg opacity-0 group-hover:opacity-100 transition-opacity">
        &gt; ready_
      </div>
    </div>
  );
}
