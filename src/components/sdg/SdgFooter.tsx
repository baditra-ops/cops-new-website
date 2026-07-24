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

export default function SdgFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-bg-void border-t border-phosphor-green/20 px-4 py-12 text-crt-white/80 font-jetbrains text-sm relative z-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Socials */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-6 text-lg font-space font-bold text-phosphor-green tracking-widest uppercase">
              &gt; Follow Us
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
              {[
                { Icon: SiHashnode, link: socialLinks.hashnode, label: 'Hashnode' },
                { Icon: FaInstagram, link: socialLinks.insta, label: 'Instagram' },
                { Icon: FaLinkedin, link: socialLinks.linkedin, label: 'LinkedIn' },
                { Icon: FaYoutube, link: socialLinks.youtube, label: 'YouTube' },
                { Icon: FaTwitter, link: socialLinks.twitter, label: 'Twitter' },
                { Icon: FaGithub, link: socialLinks.github, label: 'GitHub' },
              ].map(({ Icon, link, label }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center border border-phosphor-green/30 text-phosphor-green hover:bg-phosphor-green/10 hover:border-phosphor-green transition-all shadow-[0_0_10px_rgba(51,255,102,0)] hover:shadow-[0_0_15px_rgba(51,255,102,0.4)]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-6 text-lg font-space font-bold text-phosphor-green tracking-widest uppercase">
              &gt; Contact
            </h3>
            <div className="flex flex-col space-y-3 text-center md:text-left">
              <p>Email: <br className="md:hidden"/><a href={`mailto:${contactInfo.email}`} className="text-phosphor-green hover:text-crt-white transition-colors ml-1">{contactInfo.email}</a></p>
              <p className="flex flex-col md:flex-row"><span className="mr-1">Address:</span> <span className="opacity-80">{contactInfo.address}</span></p>
            </div>
          </div>
          
          {/* System Status */}
          <div className="flex flex-col items-center md:items-start lg:items-end">
            <h3 className="mb-6 text-lg font-space font-bold text-phosphor-green tracking-widest uppercase">
              &gt; System
            </h3>
            <div className="space-y-2 text-center lg:text-right">
              <p className="opacity-80 flex items-center justify-center lg:justify-end gap-2">STATUS: <span className="text-phosphor-green">ONLINE</span><span className="w-2 h-2 rounded-full bg-phosphor-green animate-pulse" /></p>
              <p className="opacity-80">UPTIME: 99.9%</p>
              <p className="opacity-80">VERSION: 1.0.0</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Strip */}
        <div className="mt-12 border-t border-phosphor-green/20 pt-8 text-center text-xs opacity-60 flex flex-col sm:flex-row justify-between items-center">
          <p>© {year} Club of Programmers, IIT (BHU) Varanasi.</p>
          <p className="mt-4 sm:mt-0 font-vt323 tracking-widest text-xl text-phosphor-green/80">EOF</p>
        </div>
      </div>
    </footer>
  );
}
