import { Instances, Instance, Environment } from "@react-three/drei";
import { useMemo } from "react";

const GRAY_COLORS = [
  "#333333",
  "#444444",
  "#555555",
  "#666666",
  "#777777",
  "#888888",
  "#999999",
  "#aaaaaa",
];

/**
 * Generate a random float between min and max (inclusive)
 */
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export default function Spheres({ count = 8 }) {
  const spheres = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        randomRange(-8, 8), // X: [-8, 8]
        randomRange(-4, 4), // Y: [-4, 4]
        randomRange(-4, 8), // Z: [-4, 8]
      ],
      color: GRAY_COLORS[i % GRAY_COLORS.length],
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  return (
    <>
      <Environment preset="city" />
      <Instances limit={count}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
        />
        {spheres.map((sphere) => (
          <Instance
            key={sphere.id}
            position={sphere.position}
            color={sphere.color}
          />
        ))}
      </Instances>
    </>
  );
}
