import { useFBO, ScreenQuad } from '@react-three/drei';
import { useFrame, createPortal, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMemo, useRef, useState, useEffect } from 'react';
import { asciiShader } from './asciiShader';

function createAtlas() {
  const chars = " .:-=+*#%@";
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 1024, 128);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 90px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for(let i=0; i<chars.length; i++) {
    ctx.fillText(chars[i], i * (1024/10) + (1024/20), 64);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

export default function AsciiEffect({ children }: { children: React.ReactNode }) {
  const { size, pointer, camera } = useThree();
  const fbo = useFBO(size.width, size.height);
  const [virtualScene] = useState(() => new THREE.Scene());
  
  useFrame((state) => {
    // 1. Render virtual scene (Laptop) to FBO
    state.gl.setRenderTarget(fbo);
    state.gl.render(virtualScene, camera);
    
    // 2. Render default scene (ScreenQuad) to Screen
    state.gl.setRenderTarget(null);
    state.gl.render(state.scene, state.camera);
  }, 1); // High priority to hijack render loop

  const uniforms = useMemo(() => ({
     tDiffuse: { value: null },
     tAtlas: { value: createAtlas() },
     uResolution: { value: new THREE.Vector2(size.width, size.height) },
     uTime: { value: 0 },
     uMouse: { value: new THREE.Vector2(2.0, 2.0) }, // Default off-screen
  }), []);

  const smoothMouse = useRef(new THREE.Vector2(2.0, 2.0));
  const startTime = useRef(0);
  const hasInteracted = useRef(false);

  useEffect(() => {
    startTime.current = performance.now();
    const handleMove = () => { hasInteracted.current = true; };
    window.addEventListener('mousemove', handleMove, { once: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useFrame(() => {
     uniforms.tDiffuse.value = fbo.texture;
     uniforms.uResolution.value.set(size.width, size.height);
     uniforms.uTime.value = (performance.now() - startTime.current) / 1000;
     
     if (hasInteracted.current) {
       const mx = (pointer.x + 1) / 2;
       const my = (pointer.y + 1) / 2;
       smoothMouse.current.x += (mx - smoothMouse.current.x) * 0.1;
       smoothMouse.current.y += (my - smoothMouse.current.y) * 0.1;
     } else {
       smoothMouse.current.set(2.0, 2.0);
     }
     uniforms.uMouse.value.copy(smoothMouse.current);
  });

  return (
    <>
      {createPortal(children, virtualScene)}
      <ScreenQuad>
        <shaderMaterial
          args={[asciiShader]}
          uniforms={uniforms}
          transparent={true}
          blending={THREE.NormalBlending}
        />
      </ScreenQuad>
    </>
  );
}
