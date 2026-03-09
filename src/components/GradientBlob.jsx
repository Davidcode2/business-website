import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Blob({ color, position, scale = 1, speed = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  // Create organic blob geometry using noise-like displacement
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 4);
    const positions = geo.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      
      // Add some noise-like variation
      const noise = Math.sin(x * 2) * Math.cos(y * 2) * Math.sin(z * 2) * 0.1;
      positions[i] = x + noise;
      positions[i + 1] = y + noise;
      positions[i + 2] = z + noise;
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime() * speed;
    
    // Gentle rotation
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    meshRef.current.rotation.y = Math.cos(time * 0.15) * 0.1;
    meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;
    
    // Gentle position drift
    meshRef.current.position.x = position[0] + Math.sin(time * 0.3) * 0.2;
    meshRef.current.position.y = position[1] + Math.cos(time * 0.25) * 0.15;
    
    // Scale pulsing
    const pulse = 1 + Math.sin(time * 0.5) * 0.05;
    meshRef.current.scale.setScalar(scale * pulse);
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry} position={position}>
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        roughness={0.4}
        metalness={0.1}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      
      <Blob 
        color="#3b82f6" 
        position={[-2, 0, 0]} 
        scale={2} 
        speed={0.3}
      />
      <Blob 
        color="#8b5cf6" 
        position={[2, 1, -1]} 
        scale={1.5} 
        speed={0.4}
      />
      <Blob 
        color="#06b6d4" 
        position={[0, -1.5, 0.5]} 
        scale={1.8} 
        speed={0.25}
      />
    </>
  );
}

export default function GradientBlob() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
