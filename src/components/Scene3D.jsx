import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import Room from "./Room";
import Spheres from "./Spheres";

export default function Scene3D({ isDarkMode = false }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 0], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={[isDarkMode ? 0x111111 : 0xffffff]} />
      <fog attach="fog" args={[isDarkMode ? 0x111111 : 0xffffff, 10, 40]} />

      <PerspectiveCamera makeDefault position={[0, 0, 0]} />

      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />

      <Environment preset="city" />

      <Room isDarkMode={isDarkMode} />
      <Spheres count={8} />
    </Canvas>
  );
}
