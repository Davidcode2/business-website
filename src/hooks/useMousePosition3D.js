import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Hook to track mouse position in 3D world space
 * Returns a ref with the current mouse position in world coordinates
 * The position is projected onto the Z=5 plane (middle of sphere range)
 */
export function useMousePosition3D() {
  const { camera, gl } = useThree();
  const mouseRef = useRef(new THREE.Vector3(1000, 1000, 1000));

  // Use refs for Three.js objects to avoid re-attaching listeners
  const cameraRef = useRef(camera);
  const glRef = useRef(gl);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseNDCRef = useRef(new THREE.Vector2());
  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), -5));
  const isActiveRef = useRef(true);

  // Keep refs updated without triggering re-renders
  cameraRef.current = camera;
  glRef.current = gl;

  useEffect(() => {
    // Reset mouse position when effect re-runs
    mouseRef.current.set(1000, 1000, 1000);
    isActiveRef.current = true;

    const handleMouseMove = (event) => {
      if (!isActiveRef.current) return;

      const currentGl = glRef.current;
      const currentCamera = cameraRef.current;

      if (!currentGl?.domElement || !currentCamera) return;

      const canvas = currentGl.domElement;
      const rect = canvas.getBoundingClientRect();

      // Check if mouse is within canvas bounds
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        return;
      }

      // Convert to normalized device coordinates (-1 to +1)
      mouseNDCRef.current.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNDCRef.current.y =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Update raycaster
      raycasterRef.current.setFromCamera(mouseNDCRef.current, currentCamera);

      // Intersect with plane at Z=5
      const target = new THREE.Vector3();
      const intersected = raycasterRef.current.ray.intersectPlane(
        planeRef.current,
        target,
      );

      if (intersected) {
        mouseRef.current.copy(target);
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.set(1000, 1000, 1000);
    };

    const handleMouseEnter = () => {
      isActiveRef.current = true;
    };

    // Attach to window to capture events even when content overlays the canvas
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    const canvas = gl?.domElement;
    if (canvas) {
      canvas.addEventListener("mouseleave", handleMouseLeave);
      canvas.addEventListener("mouseenter", handleMouseEnter);
    }

    return () => {
      isActiveRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      if (canvas) {
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        canvas.removeEventListener("mouseenter", handleMouseEnter);
      }
    };
  }, []); // Empty dependency array - only run once on mount

  return mouseRef;
}
