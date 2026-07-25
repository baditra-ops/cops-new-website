'use client';

import {
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa';
import { SiHashnode } from 'react-icons/si';
import { contactInfo, socialLinks } from '@/app/config';
import { HiMail, HiLocationMarker } from 'react-icons/hi';
import { Cpu } from 'lucide-react';
import Link from 'next/link';

export default function IgFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#06030e] text-white px-4 py-12 border-t border-purple-900/30 overflow-hidden">
      {/* Background ambient glow effect */}
      <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Top Header Row for IG Identity */}
        <div className="mb-10 pb-8 border-b border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-orbitron text-xl font-bold text-white tracking-wider">
                INTELLIGENCE GROUP
              </h3>
              <p className="text-xs font-mono text-cyan-400">COPS IIT BHU AI & RESEARCH VERTICAL</p>
            </div>
          </div>

          {/* Quick IG sub-navigation */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
            <Link href="/verticals/ig" className="hover:text-purple-300 transition-colors">
              [Home]
            </Link>
            <Link href="/verticals/ig/team" className="hover:text-purple-300 transition-colors">
              [Team]
            </Link>
            <Link href="/verticals/ig/resources" className="hover:text-purple-300 transition-colors">
              [Resources]
            </Link>
            <Link href="/verticals/ig/project" className="hover:text-purple-300 transition-colors">
              [Projects]
            </Link>
          </div>
        </div>

        {/* Main Grid: Follow Us + Email + Location (Matching Main COPS Footer) */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Follow Us */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-lg font-semibold font-orbitron text-white">Follow Us</h3>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href={socialLinks.hashnode}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hashnode"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-400 transition-all hover:bg-purple-900/60 hover:border-purple-400 hover:scale-110 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
              >
                <SiHashnode className="h-4 w-4" />
              </a>
              <a
                href={socialLinks.insta}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/40 border border-pink-500/30 text-pink-400 transition-all hover:bg-pink-950/60 hover:border-pink-400 hover:scale-110 shadow-[0_0_10px_rgba(236,72,153,0.2)]"
                aria-label="Instagram"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/40 border border-cyan-500/30 text-cyan-400 transition-all hover:bg-cyan-950/60 hover:border-cyan-400 hover:scale-110 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                aria-label="GitHub"
              >
                <FaGithub className="h-4 w-4" />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/40 border border-blue-500/30 text-blue-400 transition-all hover:bg-blue-950/60 hover:border-blue-400 hover:scale-110 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                aria-label="Twitter"
              >
                <FaTwitter className="h-4 w-4" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/40 border border-indigo-500/30 text-indigo-400 transition-all hover:bg-indigo-950/60 hover:border-indigo-400 hover:scale-110 shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/40 border border-red-500/30 text-red-400 transition-all hover:bg-red-950/60 hover:border-red-400 hover:scale-110 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                aria-label="YouTube"
              >
                <FaYoutube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Email & Location Cards */}
          <div className="grid gap-6 md:col-span-1 lg:col-span-2">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
              
              {/* Email Card */}
              <div className="flex items-center rounded-2xl border border-purple-500/30 bg-[#0e0826]/70 p-4 backdrop-blur-md hover:border-purple-400/60 transition-colors shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30">
                  <HiMail className="h-6 w-6 text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-white font-orbitron">Email</h3>
                  <p className="text-xs break-all text-gray-400 md:text-sm font-mono">
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="hover:text-cyan-300 transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-center rounded-2xl border border-cyan-500/30 bg-[#0e0826]/70 p-4 backdrop-blur-md hover:border-cyan-400/60 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30">
                  <HiLocationMarker className="h-6 w-6 text-cyan-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-white font-orbitron">Location</h3>
                  <a
                    href={`https://maps.google.com/?q=${contactInfo.add}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer transition hover:text-cyan-300"
                  >
                    <p className="text-xs text-gray-400 md:text-sm font-mono">
                      {contactInfo.add}
                    </p>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Copyright Line */}
        <div className="mt-10 border-t border-purple-500/20 pt-6 text-center">
          <span className="text-xs font-mono text-gray-400 md:text-sm">
            © COPS {year}. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}
