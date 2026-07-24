'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SdgNavbar() {
  const pathname = usePathname();
  const navLinks = [
    { name: 'HOME', href: '/verticals/sdg' },
    { name: 'TEAM', href: '/verticals/sdg/team' },
    { name: 'RESOURCES', href: '/verticals/sdg/resources' },
    { name: 'PROJECT', href: '/verticals/sdg/project' },
  ];

  const terminalText = "SDG";
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < terminalText.length) {
        setTyped(terminalText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#060a06]/80 backdrop-blur-md border-b border-phosphor-green/20 shadow-[0_0_15px_rgba(51,255,102,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Terminal Typing Text */}
          <div className="hidden lg:block font-vt323 text-xl tracking-wider text-phosphor-green/70 ml-8">
            &gt; {typed}<span className="animate-pulse text-phosphor-green">_</span>
          </div>

          {/* Links */}
          <div className="flex space-x-6 md:space-x-8 overflow-x-auto no-scrollbar">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`font-jetbrains text-xs md:text-sm tracking-widest transition-colors duration-200 uppercase whitespace-nowrap ${
                  pathname === link.href 
                    ? 'text-phosphor-green drop-shadow-[0_0_8px_rgba(51,255,102,0.8)]' 
                    : 'text-crt-white/60 hover:text-phosphor-green'
                }`}
              >
                [{link.name}]
              </Link>
            ))}
          </div>

          
        </div>
      </div>
    </nav>
  );
}
