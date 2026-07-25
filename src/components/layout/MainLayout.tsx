'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from './Footer';
import { usePathname } from 'next/navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCustomVertical = pathname?.startsWith('/verticals/sdg') || pathname?.startsWith('/verticals/ig');

  if (isCustomVertical) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
