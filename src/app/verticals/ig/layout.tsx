import { Space_Grotesk, Orbitron, JetBrains_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import IgNavbar from '@/components/ig/IgNavbar';
import IgFooter from '@/components/ig/IgFooter';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'COPS IG Vertical | Intelligence Group AI Research',
  description:
    'Intelligence Group (IG) — AI, Deep Learning, Large Language Models, and Machine Learning research vertical of COPS IIT BHU.',
};

export default function IGLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${spaceGrotesk.variable} ${orbitron.variable} ${jetbrainsMono.variable} min-h-screen bg-[#090514] text-gray-100 font-sans relative z-10 selection:bg-purple-500 selection:text-white overflow-x-hidden flex flex-col justify-between`}
    >
      <div className="fixed inset-0 bg-[#090514] -z-20" />
      
      {/* Background ambient radial gradients */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <IgNavbar />
      <main className="flex-1 pt-20">{children}</main>
      <IgFooter />
    </div>
  );
}
