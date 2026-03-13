import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useMousePosition3D } from "../hooks/useMousePosition3D";

const GRAY_COLORS = [
  "#666666",
  "#777777",
  "#888888",
  "#999999",
  "#aaaaaa",
  "#bbbbbb",
  "#cccccc",
  "#dddddd",
];

// Pre-allocated temp vectors (NEVER create new Vector3() in useFrame)
const tempVec = new THREE.Vector3();
const tempPush = new THREE.Vector3();
const tempMousePush = new THREE.Vector3();

// Mouse repulsion configuration
const MOUSE_REPULSION = {
  radius: 3.0, // How close mouse needs to be to affect spheres
  force: 8.0, // Strength of repulsion
};

// Boundary configuration: narrowed ranges for better visibility
const BOUNDS = {
  x: [-5, 5], // Narrower X
  y: [-3, 3], // Adjusted Y
  z: [1, 10], // Keep in front of camera
};

/**
 * Generate a random float between min and max (inclusive)
 */
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export default function Spheres({ count = 8 }) {
  const instancedMeshRef = useRef();
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const mousePos = useMousePosition3D();

  // Sphere data with physics properties
  const spheresData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: new THREE.Vector3(
        randomRange(-4, 4), // X: narrower spread
        randomRange(-1, 1), // Y: centered vertically
        randomRange(2, 8), // Z: all positive (in front of camera at 0,0,0)
      ),
      velocity: new THREE.Vector3(0, 0, 0),
      baseY: randomRange(-1, 1), // Match Y range
      phase: Math.random() * Math.PI * 2, // Phase offset for desynchronized floating
      color: GRAY_COLORS[i % GRAY_COLORS.length],
    }));
  }, [count]);

  // Set initial positions
  useEffect(() => {
    if (!instancedMeshRef.current) return;

    spheresData.forEach((sphere, i) => {
      tempObject.position.copy(sphere.position);
      tempObject.updateMatrix();
      instancedMeshRef.current.setMatrixAt(i, tempObject.matrix);
    });

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

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
        if (dist < 0.7) {
          // 0.35 + 0.35 = 0.7
          tempPush.copy(sphere.position).sub(other.position).normalize();
          const overlap = 0.7 - dist;
          const force = overlap * 2;
          sphere.velocity.add(tempPush.multiplyScalar(force * delta));
        }
      });

      // 4. Mouse Repulsion
      const mouseDistance = sphere.position.distanceTo(mousePos.current);
      if (mouseDistance < MOUSE_REPULSION.radius) {
        tempMousePush.copy(sphere.position).sub(mousePos.current).normalize();
        const overlap = MOUSE_REPULSION.radius - mouseDistance;
        const force = overlap * MOUSE_REPULSION.force;
        sphere.velocity.add(tempMousePush.multiplyScalar(force * delta));
      }

      // 5. Boundary Containment (Soft Forces)
      // X boundaries: [-5, 5]
      if (sphere.position.x < BOUNDS.x[0]) {
        sphere.velocity.x += (BOUNDS.x[0] - sphere.position.x) * delta;
      }
      if (sphere.position.x > BOUNDS.x[1]) {
        sphere.velocity.x += (BOUNDS.x[1] - sphere.position.x) * delta;
      }

      // Y boundaries: [-3, 3]
      if (sphere.position.y < BOUNDS.y[0]) {
        sphere.velocity.y += (BOUNDS.y[0] - sphere.position.y) * delta;
      }
      if (sphere.position.y > BOUNDS.y[1]) {
        sphere.velocity.y += (BOUNDS.y[1] - sphere.position.y) * delta;
      }

      // Z boundaries: [1, 10]
      if (sphere.position.z < BOUNDS.z[0]) {
        sphere.velocity.z += (BOUNDS.z[0] - sphere.position.z) * delta;
      }
      if (sphere.position.z > BOUNDS.z[1]) {
        sphere.velocity.z += (BOUNDS.z[1] - sphere.position.z) * delta;
      }

      // 6. Velocity Damping
      sphere.velocity.multiplyScalar(0.98);
    });

    // Update instance positions
    if (instancedMeshRef.current) {
      spheresData.forEach((sphere, i) => {
        tempObject.position.copy(sphere.position);
        tempObject.updateMatrix();
        instancedMeshRef.current.setMatrixAt(i, tempObject.matrix);
      });
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={instancedMeshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial color="#c0c0c0" metalness={1.0} roughness={0.15} />
    </instancedMesh>
  );
}
