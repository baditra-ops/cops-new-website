'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cpu, Menu, X, Terminal, ArrowLeft } from 'lucide-react';

export default function IgNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/verticals/ig' },
    { name: 'Team', href: '/verticals/ig/team' },
    { name: 'Resources', href: '/verticals/ig/resources' },
    { name: 'Projects', href: '/verticals/ig/project' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090514]/80 backdrop-blur-md border-b border-purple-500/20 shadow-[0_4px_30px_rgba(139,92,246,0.15)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Back to Verticals */}
          <div className="flex items-center gap-4">
            <Link
              href="/verticals"
              className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-purple-400 transition-colors bg-white/5 border border-white/10 rounded-full px-3 py-1 backdrop-blur-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Verticals</span>
            </Link>

            <Link href="/verticals/ig" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/30 group-hover:border-purple-400/80 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <Cpu className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <div className="flex flex-col">
                <span className="font-orbitron font-bold text-lg text-white tracking-wider group-hover:text-purple-300 transition-colors">
                  IG <span className="text-xs text-purple-400 font-mono font-normal">{'// AI'}</span>
                </span>
                <span className="text-[10px] font-mono text-purple-300/60 tracking-widest hidden sm:inline">
                  INTELLIGENCE GROUP
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-purple-500/20 rounded-full px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.1)]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-sm font-medium transition-all rounded-full ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-gray-400 hover:text-purple-200'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600/60 to-cyan-600/60 rounded-full border border-purple-400/40 -z-10 shadow-[0_0_12px_rgba(168,85,247,0.4)]" />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/cops-ig"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-purple-300 bg-purple-950/40 border border-purple-500/40 hover:border-cyan-400 hover:text-cyan-300 px-4 py-2 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>GitHub Org</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-gray-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090514]/95 border-b border-purple-500/30 backdrop-blur-xl px-4 py-6 mt-3 space-y-3 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-900/60 to-cyan-900/40 border border-purple-500/40 text-white'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2">
            <a
              href="https://github.com/cops-ig"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm font-mono text-purple-300 bg-purple-950/60 border border-purple-500/40 px-4 py-2.5 rounded-xl"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>GitHub Org</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
