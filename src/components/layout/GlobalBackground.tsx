'use client';

import Dither from '@/components/Dither';
import { usePathname } from 'next/navigation';

export default function GlobalBackground() {
  const pathname = usePathname();
  const isSdgVertical = pathname?.startsWith('/verticals/sdg');

  if (isSdgVertical) {
    return null; // The SDG vertical has its own FaultyTerminal background
  }

  return (
    <div className='fixed inset-0 z-[-1]'>
      <Dither
        waveSpeed={0.019}
        waveFrequency={3.8}
        waveAmplitude={0.3}
        waveColor={[0.44, 0.53, 0.53]}
        colorNum={6}
        pixelSize={4}
        disableAnimation={false}
        enableMouseInteraction={false}
        mouseRadius={0.5}
      />
    </div>
  );
}
