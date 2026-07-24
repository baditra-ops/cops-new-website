'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import CrtOverlay from './CrtOverlay';

// Lazy-load the FaultyTerminal client-side only for performance
const FaultyTerminal = dynamic(() => import('./FaultyTerminal'), { ssr: false });

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 h-screen w-full pointer-events-auto">
      <FaultyTerminal
        tint="#33ff66"
        scale={1.4}
        glitchAmount={0.6}
        flickerAmount={0.6}
        scanlineIntensity={0.2}
        mouseReact={true}
        mouseStrength={0.4}
        brightness={0.25}
        pageLoadAnimation={true}
      />
      <CrtOverlay />
    </div>
  );
}

