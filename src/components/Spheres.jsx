import { Instances, Instance, Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

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

// Pre-allocated temp vectors (NEVER create new Vector3() in useFrame)
const tempVec = new THREE.Vector3();
const tempPush = new THREE.Vector3();
const tempMatrix = new THREE.Matrix4();

// Boundary configuration: X: [-8, 8], Y: [-4, 4], Z: [-4, 8]
const BOUNDS = {
  x: [-8, 8],
  y: [-4, 4],
  z: [-4, 8],
};

/**
 * Generate a random float between min and max (inclusive)
 */
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export default function Spheres({ count = 8 }) {
  const instancesRef = useRef();

  // Sphere data with physics properties
  const spheresData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: new THREE.Vector3(
        randomRange(-6, 6), // X: spread within bounds
        randomRange(-2, 2), // Y: base position (will float around this)
        randomRange(-2, 6), // Z: spread within bounds
      ),
      velocity: new THREE.Vector3(0, 0, 0),
      baseY: randomRange(-2, 2), // Base Y position for floating
      phase: Math.random() * Math.PI * 2, // Phase offset for desynchronized floating
      color: GRAY_COLORS[i % GRAY_COLORS.length],
    }));
  }, [count]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Physics simulation for each sphere
    spheresData.forEach((sphere) => {
      // 1. Floating Animation: sine wave around baseY
      sphere.position.y =
        sphere.baseY + Math.sin(time * 0.5 + sphere.phase) * 0.3;

      // 2. Apply velocity to position
      tempVec.copy(sphere.velocity).multiplyScalar(delta);
      sphere.position.add(tempVec);

      // 3. Sphere-Sphere Collision (Soft Repulsion)
      spheresData.forEach((other) => {
        if (sphere === other) return;

        const dist = sphere.position.distanceTo(other.position);
        if (dist < 2.0) {
          // Sum of radii = 1 + 1 = 2
          tempPush.copy(sphere.position).sub(other.position).normalize();
          const overlap = 2.0 - dist;
          const force = overlap * 2;
          sphere.velocity.add(tempPush.multiplyScalar(force * delta));
        }
      });

      // 4. Boundary Containment (Soft Forces)
      // X boundaries: [-8, 8]
      if (sphere.position.x < BOUNDS.x[0]) {
        sphere.velocity.x += (BOUNDS.x[0] - sphere.position.x) * delta;
      }
      if (sphere.position.x > BOUNDS.x[1]) {
        sphere.velocity.x += (BOUNDS.x[1] - sphere.position.x) * delta;
      }

      // Y boundaries: [-4, 4]
      if (sphere.position.y < BOUNDS.y[0]) {
        sphere.velocity.y += (BOUNDS.y[0] - sphere.position.y) * delta;
      }
      if (sphere.position.y > BOUNDS.y[1]) {
        sphere.velocity.y += (BOUNDS.y[1] - sphere.position.y) * delta;
      }

      // Z boundaries: [-4, 8]
      if (sphere.position.z < BOUNDS.z[0]) {
        sphere.velocity.z += (BOUNDS.z[0] - sphere.position.z) * delta;
      }
      if (sphere.position.z > BOUNDS.z[1]) {
        sphere.velocity.z += (BOUNDS.z[1] - sphere.position.z) * delta;
      }

      // 5. Velocity Damping
      sphere.velocity.multiplyScalar(0.98);
    });

    // Update instance positions
    if (instancesRef.current) {
      spheresData.forEach((sphere, i) => {
        tempMatrix.makeTranslation(sphere.position);
        instancesRef.current.setMatrixAt(i, tempMatrix);
      });
      instancesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <Environment preset="city" />
      <Instances ref={instancesRef} limit={count}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
        />
        {spheresData.map((sphere) => (
          <Instance key={sphere.id} color={sphere.color} />
        ))}
      </Instances>
    </>
  );
}
