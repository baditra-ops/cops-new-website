'use client';

import { useEffect, useRef, useState } from 'react';
import './CrtOverlay.css';

export default function CrtOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Randomized subtle flicker
    const flickerLoop = () => {
      if (overlayRef.current) {
        // dip opacity by 2-4%
        const dip = (Math.random() * 0.02 + 0.02).toFixed(3);
        overlayRef.current.style.opacity = (1 - parseFloat(dip)).toString();
        
        setTimeout(() => {
          if (overlayRef.current) {
            overlayRef.current.style.opacity = '1';
          }
        }, 50 + Math.random() * 100);
      }
      
      const nextDelay = 4000 + Math.random() * 5000; // 4s to 9s
      setTimeout(flickerLoop, nextDelay);
    };

    const flickerTimeout = setTimeout(flickerLoop, 4000);

    // Occasional chromatic aberration glitch
    const aberrationLoop = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
      
      const nextDelay = 20000 + Math.random() * 20000; // 20s to 40s
      setTimeout(aberrationLoop, nextDelay);
    };

    const aberrationTimeout = setTimeout(aberrationLoop, 20000);

    return () => {
      clearTimeout(flickerTimeout);
      clearTimeout(aberrationTimeout);
    };
  }, []);

  return (
    <>
      <div 
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-75"
      >
        {/* Scanlines & Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]"></div>
        <div className="crt-scanlines absolute inset-0 mix-blend-overlay"></div>
      </div>
      
      {/* Chromatic aberration flash overlay */}
      {glitchActive && (
        <div className="pointer-events-none fixed inset-0 z-50 mix-blend-screen opacity-30 flex">
           <div className="absolute inset-0 bg-red-500 translate-x-[2px]"></div>
           <div className="absolute inset-0 bg-cyan-500 -translate-x-[2px]"></div>
        </div>
      )}
    </>
  );
}
