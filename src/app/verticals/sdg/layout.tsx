import { JetBrains_Mono, Space_Mono, VT323 } from 'next/font/google';
import type { Metadata } from 'next';
import SdgNavbar from '@/components/sdg/SdgNavbar';
import SdgFooter from '@/components/sdg/SdgFooter';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
});

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'COPS SDG Vertical',
  description: 'Software Development Group',
};

export default function SDGLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${jetbrainsMono.variable} ${spaceMono.variable} ${vt323.variable} min-h-screen bg-bg-void text-crt-white font-jetbrains relative z-10`}
    >
      <div className="absolute inset-0 bg-bg-void z-[-2]"></div>
      <SdgNavbar />
      {children}
      <SdgFooter />
    </div>
  );
}
