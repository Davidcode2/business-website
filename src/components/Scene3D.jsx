import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import Room from "./Room";
import Spheres from "./Spheres";

export default function Scene3D() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Read initial theme
    const theme = document.documentElement.getAttribute("data-theme");
    setIsDarkMode(theme === "dark");

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          const newTheme = document.documentElement.getAttribute("data-theme");
          setIsDarkMode(newTheme === "dark");
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 2, 12], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={[isDarkMode ? 0x111111 : 0xffffff]} />
      <fog attach="fog" args={[isDarkMode ? 0x111111 : 0xffffff, 10, 40]} />

      <PerspectiveCamera makeDefault position={[0, 2, 12]} />

      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />

      <Environment preset="city" />

      <Room isDarkMode={isDarkMode} />
      <Spheres count={8} />
    </Canvas>
  );
}
