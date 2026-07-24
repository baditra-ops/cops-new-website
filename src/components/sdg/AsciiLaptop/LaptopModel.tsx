import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export default function LaptopModel() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      // Idle slow rotation
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      // Tilt toward mouse parallax
      const tiltX = (state.pointer.y * 8 * Math.PI) / 180;
      const tiltY = (state.pointer.x * 8 * Math.PI) / 180;
      
      group.current.rotation.x += (tiltX - group.current.rotation.x) * 0.1;
      group.current.rotation.z += (-tiltY * 0.5 - group.current.rotation.z) * 0.1;
    }
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Laptop Base */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[4.2, 0.2, 3.2]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      
      {/* Screen Hinge */}
      <group position={[0, 0, -1.6]} rotation={[-Math.PI * 0.15, 0, 0]}>
        {/* Screen Bezel */}
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[4.2, 3.2, 0.1]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        
        {/* Emissive Screen Area */}
        <mesh position={[0, 1.5, 0.055]}>
          <planeGeometry args={[3.8, 2.8]} />
          <meshBasicMaterial color="#050a05" />
        </mesh>
        
        {/* Glowing Terminal Text */}
        <Text
          position={[0, 1.5, 0.06]}
          fontSize={0.5}
          color="#33ff66"
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
        >
          COPS SDG
        </Text>
        
        <pointLight position={[0, 1.5, 1]} color="#33ff66" intensity={1} distance={5} />
      </group>
      
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
    </group>
  );
}
