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
  const isSdgVertical = pathname?.startsWith('/verticals/sdg');

  if (isSdgVertical) {
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
