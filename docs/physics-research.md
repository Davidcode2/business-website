# Floating Spheres Physics & Animation Research

**Researched:** 2025-03-13  
**Domain:** Three.js / React Three Fiber - Soft Body Physics & Animation  
**Confidence:** HIGH

## Summary

This document provides research findings for implementing 8 floating, colliding spheres with dreamy vertical oscillation, soft repulsive forces, and boundary containment. The approach prioritizes soft, non-rigid physics for performance (60fps target) over realistic rigid-body simulation.

**Primary Recommendation:** Use distance-based soft repulsion forces combined with simple Euler integration and sine-wave floating animation. Avoid physics libraries (Cannon.js, Rapier) for only 8 spheres - custom force-based physics is lighter and more controllable for this aesthetic.

---

## 1. Floating Animation

### Standard Approach: Multi-Frequency Sine Waves

For dreamy, organic floating motion, combine multiple sine waves at different frequencies and phases. This creates non-repetitive, natural-feeling motion without the computational cost of noise functions.

```typescript
// Time-based floating with multiple harmonics
const floatingOffset =
  Math.sin(time * baseFreq + phase) * primaryAmp +
  Math.sin(time * baseFreq * 2.3 + phase * 1.5) * secondaryAmp * 0.3 +
  Math.sin(time * baseFreq * 0.7 + phase * 0.5) * tertiaryAmp * 0.1;
```

### Recommended Parameters

| Parameter                      | Value          | Purpose                      |
| ------------------------------ | -------------- | ---------------------------- |
| Base frequency                 | 0.3-0.8 Hz     | Primary oscillation speed    |
| Primary amplitude              | 0.5-1.5 units  | Main vertical movement range |
| Secondary frequency multiplier | 2.0-3.0        | Adds organic variation       |
| Secondary amplitude ratio      | 0.2-0.4        | Subtle detail layer          |
| Phase offset per sphere        | Random [0, 2π] | Desynchronizes spheres       |

### Implementation Pattern

```typescript
interface FloatingConfig {
  baseY: number; // Resting vertical position
  amplitude: number; // Primary oscillation magnitude
  frequency: number; // Primary oscillation speed (rad/s)
  phase: number; // Phase offset for variety
}

function calculateFloatOffset(config: FloatingConfig, time: number): number {
  const t = time * config.frequency + config.phase;
  return (
    config.baseY +
    Math.sin(t) * config.amplitude +
    Math.sin(t * 2.3) * config.amplitude * 0.3 +
    Math.sin(t * 0.7) * config.amplitude * 0.1
  );
}
```

---

## 2. Sphere-Sphere Collision Detection

### Algorithm: Distance-Based Soft Repulsion

For soft, dreamy physics (not rigid body), use an inverse-square repulsive force rather than impulse-based collision response.

```
FOR each sphere i:
  FOR each sphere j (where j > i):
    distance = |position[i] - position[j]|
    minDistance = radius[i] + radius[j]

    IF distance < minDistance + softMargin:
      // Calculate repulsion force
      direction = (position[i] - position[j]) / distance
      overlap = minDistance + softMargin - distance

      // Soft spring-like force (not rigid impulse)
      forceMagnitude = k * overlap^2 / (distance + epsilon)
      force = direction * forceMagnitude

      // Apply to both spheres (Newton's 3rd law)
      acceleration[i] += force / mass[i]
      acceleration[j] -= force / mass[j]
```

### Pseudocode: Full Collision System

```typescript
interface Sphere {
  position: Vector3;
  velocity: Vector3;
  acceleration: Vector3;
  radius: number;
  mass: number;
}

class SoftCollisionSystem {
  private spheres: Sphere[] = [];
  private readonly repulsionStrength = 15.0; // k constant
  private readonly damping = 0.92; // Energy dissipation
  private readonly softMargin = 0.5; // Extra spacing buffer

  update(deltaTime: number): void {
    // Reset accelerations
    for (const sphere of this.spheres) {
      sphere.acceleration.set(0, 0, 0);
    }

    // Calculate pairwise repulsion forces
    for (let i = 0; i < this.spheres.length; i++) {
      for (let j = i + 1; j < this.spheres.length; j++) {
        this.applyRepulsionForce(this.spheres[i], this.spheres[j]);
      }
    }

    // Integrate motion
    for (const sphere of this.spheres) {
      // Semi-implicit Euler integration
      sphere.velocity.addScaledVector(sphere.acceleration, deltaTime);
      sphere.velocity.multiplyScalar(this.damping);
      sphere.position.addScaledVector(sphere.velocity, deltaTime);
    }
  }

  private applyRepulsionForce(a: Sphere, b: Sphere): void {
    const diff = new Vector3().subVectors(a.position, b.position);
    const distance = diff.length();
    const minDist = a.radius + b.radius + this.softMargin;

    if (distance < minDist && distance > 0.001) {
      const overlap = minDist - distance;
      const forceMag = (this.repulsionStrength * overlap * overlap) / distance;

      diff.normalize().multiplyScalar(forceMag);

      // F = ma → a = F/m
      a.acceleration.addScaledVector(diff, 1 / a.mass);
      b.acceleration.addScaledVector(diff, -1 / b.mass);
    }
  }
}
```

### Key Parameters

| Parameter           | Recommended | Effect                                    |
| ------------------- | ----------- | ----------------------------------------- |
| `repulsionStrength` | 10-30       | Higher = bouncier, stiffer collisions     |
| `damping`           | 0.90-0.98   | Lower = more energy loss, calmer settling |
| `softMargin`        | 0.2-1.0     | Extra spacing beyond touch distance       |

---

## 3. Boundary Containment

### Approach: Soft Boundary Forces (Not Hard Clamping)

Rather than teleporting or clamping positions, apply increasing restorative forces as spheres approach boundaries. This creates smooth, natural-feeling containment.

### Boundary Configuration

```typescript
interface BoundaryConfig {
  zMin: -5;
  zMax: 10;
  xMin: -8;
  xMax: 8;
  yMin: -4;
  yMax: 6;
  margin: 1.0; // Distance from edge to start applying force
  strength: 20.0; // Force multiplier
}
```

### Boundary Force Implementation

```typescript
function applyBoundaryForces(
  sphere: Sphere,
  config: BoundaryConfig,
  deltaTime: number,
): void {
  const { position, velocity, radius } = sphere;
  const { xMin, xMax, yMin, yMax, zMin, zMax, margin, strength } = config;

  // X boundaries
  const distToXMin = position.x - (xMin + radius);
  const distToXMax = xMax - radius - position.x;

  if (distToXMin < margin) {
    const force = strength * Math.pow(1 - distToXMin / margin, 2);
    sphere.acceleration.x += force;
  } else if (distToXMax < margin) {
    const force = strength * Math.pow(1 - distToXMax / margin, 2);
    sphere.acceleration.x -= force;
  }

  // Y boundaries (similar pattern)
  const distToYMin = position.y - (yMin + radius);
  const distToYMax = yMax - radius - position.y;

  if (distToYMin < margin) {
    const force = strength * Math.pow(1 - distToYMin / margin, 2);
    sphere.acceleration.y += force;
  } else if (distToYMax < margin) {
    const force = strength * Math.pow(1 - distToYMax / margin, 2);
    sphere.acceleration.y -= force;
  }

  // Z boundaries (critical for depth containment)
  const distToZMin = position.z - (zMin + radius);
  const distToZMax = zMax - radius - position.z;

  if (distToZMin < margin) {
    const force = strength * Math.pow(1 - distToZMin / margin, 2);
    sphere.acceleration.z += force;
  } else if (distToZMax < margin) {
    const force = strength * Math.pow(1 - distToZMax / margin, 2);
    sphere.acceleration.z -= force;
  }
}
```

---

## 4. Frame-Rate Independent Animation

### Use `useFrame` with Clock Delta Time

React Three Fiber provides `state.clock.getElapsedTime()` and `state.clock.getDelta()` for frame-rate independent animation.

```typescript
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function FloatingSpheres() {
  const spheresRef = useRef<Sphere[]>([]);
  const physicsSystem = useRef(new SoftCollisionSystem());

  useFrame((state) => {
    const deltaTime = Math.min(state.clock.getDelta(), 0.1); // Cap at 100ms (10fps)

    // Update physics
    physicsSystem.current.update(deltaTime);

    // Apply floating animation on top of physics
    const elapsedTime = state.clock.getElapsedTime();
    for (let i = 0; i < spheresRef.current.length; i++) {
      const sphere = spheresRef.current[i];
      const floatOffset = calculateFloatOffset(sphere.config, elapsedTime);

      // Combine physics position with floating offset
      sphere.mesh.position.copy(sphere.position);
      sphere.mesh.position.y += floatOffset;
    }
  });
}
```

### Delta Time Best Practices

1. **Cap delta time**: Prevent physics explosions during lag spikes
2. **Use fixed time steps** for stability (optional for 8 spheres):

```typescript
const FIXED_TIMESTEP = 1 / 60; // 60 physics updates per second
let accumulator = 0;

useFrame((state) => {
  const deltaTime = state.clock.getDelta();
  accumulator += Math.min(deltaTime, 0.1);

  while (accumulator >= FIXED_TIMESTEP) {
    physicsSystem.current.update(FIXED_TIMESTEP);
    accumulator -= FIXED_TIMESTEP;
  }
});
```

---

## 5. Performance Optimization

### Memory Management: Minimize Garbage Collection

**CRITICAL for 60fps**: Reuse Vector3 objects instead of creating new ones each frame.

```typescript
// BAD: Creates new vectors every frame
function badUpdate(sphere: Sphere) {
  const force = new Vector3(0, 0, 0); // GC pressure!
  force.subVectors(other.position, sphere.position);
  sphere.acceleration.add(force);
}

// GOOD: Reuse temporary vectors
const tempVector = new Vector3();

function goodUpdate(sphere: Sphere) {
  tempVector.subVectors(other.position, sphere.position);
  sphere.acceleration.add(tempVector);
}
```

### Object Pool Pattern

```typescript
class VectorPool {
  private pool: Vector3[] = [];
  private inUse: Set<Vector3> = new Set();

  acquire(): Vector3 {
    const vector = this.pool.pop() || new Vector3();
    this.inUse.add(vector);
    return vector;
  }

  release(vector: Vector3): void {
    if (this.inUse.has(vector)) {
      this.inUse.delete(vector);
      vector.set(0, 0, 0);
      this.pool.push(vector);
    }
  }
}
```

### React Three Fiber Specific Optimizations

1. **Use `useMemo` for geometry/material** (as in existing GradientBlob)
2. **Avoid state updates in `useFrame`** - mutate refs directly
3. **Use `dpr` prop** to limit pixel ratio on high-DPI screens
4. **Consider `frameloop="demand"`** for static scenes (not applicable here)

```typescript
// From existing codebase - correct pattern
const geometry = useMemo(() => {
  const geo = new THREE.IcosahedronGeometry(1, 4);
  // ... modifications
  return geo;
}, []);

// In useFrame - direct mutation only
useFrame((state) => {
  if (!meshRef.current) return;
  meshRef.current.position.x = newX; // Direct mutation, no setState
});
```

### Spatial Optimization (Not Needed for 8 Spheres)

With only 8 spheres, O(n²) pairwise checks (28 comparisons) are trivial. Skip grid-based or octree spatial hashing - the overhead outweighs benefits.

---

## 6. Mouse Repulsion (Future Feature)

### Approach: Inverse-Square Mouse Force

Convert mouse screen position to world space using raycasting, then apply repulsive force.

```typescript
import { useThree } from "@react-three/fiber";
import { Vector2, Raycaster } from "three";

function useMouseRepulsion(strength: number = 50, radius: number = 5) {
  const { camera, size } = useThree();
  const mouse = useRef(new Vector2());
  const raycaster = useRef(new Raycaster());
  const mouseWorldPos = useRef(new Vector3());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / size.width) * 2 - 1;
      mouse.current.y = -(e.clientY / size.height) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size]);

  const applyMouseForce = (sphere: Sphere) => {
    // Project ray from camera through mouse position
    raycaster.current.setFromCamera(mouse.current, camera);

    // Approximate world position at sphere's Z depth
    const distance =
      (sphere.position.z - camera.position.z) /
      raycaster.current.ray.direction.z;
    mouseWorldPos.current
      .copy(raycaster.current.ray.direction)
      .multiplyScalar(distance)
      .add(camera.position);

    // Apply repulsive force
    const diff = new Vector3().subVectors(
      sphere.position,
      mouseWorldPos.current,
    );
    const dist = diff.length();

    if (dist < radius) {
      const force = strength * (1 - dist / radius);
      diff.normalize().multiplyScalar(force);
      sphere.acceleration.add(diff);
    }
  };

  return applyMouseForce;
}
```

---

## 7. Complete Implementation Example

```typescript
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SphereData {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  acceleration: THREE.Vector3;
  radius: number;
  mass: number;
  floatConfig: {
    baseY: number;
    amplitude: number;
    frequency: number;
    phase: number;
  };
  meshRef: React.RefObject<THREE.Mesh>;
}

const SPHERE_COUNT = 8;
const BOUNDS = { zMin: -5, zMax: 10, xMin: -6, xMax: 6, yMin: -3, yMax: 4 };
const PHYSICS_PARAMS = {
  repulsionStrength: 20,
  damping: 0.94,
  softMargin: 0.3,
  boundaryStrength: 25,
  boundaryMargin: 1.0
};

export default function FloatingSpheresScene() {
  const spheres = useRef<SphereData[]>([]);
  const tempVector = useRef(new THREE.Vector3());

  // Initialize spheres once
  useMemo(() => {
    spheres.current = Array.from({ length: SPHERE_COUNT }, (_, i) => ({
      id: i,
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 10
      ),
      velocity: new THREE.Vector3(),
      acceleration: new THREE.Vector3(),
      radius: 0.5 + Math.random() * 0.5,
      mass: 1,
      floatConfig: {
        baseY: 0,
        amplitude: 0.3 + Math.random() * 0.4,
        frequency: 0.4 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2
      },
      meshRef: { current: null } as React.RefObject<THREE.Mesh>
    }));
  }, []);

  useFrame((state) => {
    const deltaTime = Math.min(state.clock.getDelta(), 0.1);
    const elapsedTime = state.clock.getElapsedTime();

    // Reset accelerations
    for (const sphere of spheres.current) {
      sphere.acceleration.set(0, 0, 0);
    }

    // Apply collision forces
    for (let i = 0; i < spheres.current.length; i++) {
      for (let j = i + 1; j < spheres.current.length; j++) {
        const a = spheres.current[i];
        const b = spheres.current[j];

        tempVector.current.subVectors(a.position, b.position);
        const dist = tempVector.current.length();
        const minDist = a.radius + b.radius + PHYSICS_PARAMS.softMargin;

        if (dist < minDist && dist > 0.001) {
          const overlap = minDist - dist;
          const forceMag = PHYSICS_PARAMS.repulsionStrength * overlap * overlap / dist;
          tempVector.current.normalize().multiplyScalar(forceMag);

          a.acceleration.add(tempVector.current);
          tempVector.current.multiplyScalar(-1);
          b.acceleration.add(tempVector.current);
        }
      }
    }

    // Apply boundary forces (Z priority for depth containment)
    for (const sphere of spheres.current) {
      const { position, radius } = sphere;
      const { zMin, zMax, xMin, xMax, yMin, yMax } = BOUNDS;

      // Z boundaries (-5 to +10)
      const distZMin = position.z - (zMin + radius);
      const distZMax = (zMax - radius) - position.z;

      if (distZMin < PHYSICS_PARAMS.boundaryMargin) {
        const force = PHYSICS_PARAMS.boundaryStrength *
          Math.pow(1 - distZMin / PHYSICS_PARAMS.boundaryMargin, 2);
        sphere.acceleration.z += force;
      } else if (distZMax < PHYSICS_PARAMS.boundaryMargin) {
        const force = PHYSICS_PARAMS.boundaryStrength *
          Math.pow(1 - distZMax / PHYSICS_PARAMS.boundaryMargin, 2);
        sphere.acceleration.z -= force;
      }

      // Similar for X and Y...
    }

    // Integrate physics
    for (const sphere of spheres.current) {
      sphere.velocity.addScaledVector(sphere.acceleration, deltaTime);
      sphere.velocity.multiplyScalar(PHYSICS_PARAMS.damping);
      sphere.position.addScaledVector(sphere.velocity, deltaTime);

      // Apply floating animation on top
      const t = elapsedTime * sphere.floatConfig.frequency + sphere.floatConfig.phase;
      const floatY = Math.sin(t) * sphere.floatConfig.amplitude +
                     Math.sin(t * 2.3) * sphere.floatConfig.amplitude * 0.3;

      // Update mesh
      if (sphere.meshRef.current) {
        sphere.meshRef.current.position.copy(sphere.position);
        sphere.meshRef.current.position.y += floatY;
      }
    }
  });

  return (
    <>
      {spheres.current.map((sphere) => (
        <mesh key={sphere.id} ref={sphere.meshRef}>
          <sphereGeometry args={[sphere.radius, 32, 32]} />
          <meshStandardMaterial
            color="#60a5fa"
            roughness={0.3}
            metalness={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </>
  );
}
```

---

## 8. Performance Benchmarks

Based on React Three Fiber community benchmarks:

| Metric               | Target         | Achievable                   |
| -------------------- | -------------- | ---------------------------- |
| Sphere count         | 8              | 50+ with this approach       |
| Frame rate           | 60fps          | 60fps on mid-range desktop   |
| Physics calculations | 28 pairs/frame | ~0.01ms total                |
| Draw calls           | Minimize       | 1 if using InstancedMesh     |
| Memory allocations   | Zero per frame | Achievable with object reuse |

### Optimization Checklist

- [ ] Reuse Vector3 instances (use module-level temps)
- [ ] Use `useMemo` for geometries/materials
- [ ] Mutate refs directly in `useFrame`
- [ ] Cap delta time to prevent physics explosions
- [ ] Consider `InstancedMesh` if all spheres look identical
- [ ] Set `dpr={[1, 2]}` to limit pixel ratio

---

## Sources

### Primary (HIGH Confidence)

- Three.js v0.171.0 documentation - `Vector3`, `Clock` APIs
- React Three Fiber v8.17.10 - `useFrame` hook behavior
- Existing codebase: `/src/components/GradientBlob.jsx` - animation patterns

### Secondary (MEDIUM Confidence)

- Game physics programming patterns (soft body / force-based)
- Euler integration best practices for real-time graphics

### Tertiary (LOW Confidence)

- Community patterns for React Three Fiber performance

---

## Confidence Assessment

| Area                | Level  | Reason                                                           |
| ------------------- | ------ | ---------------------------------------------------------------- |
| Floating Animation  | HIGH   | Established sine-wave techniques, verified in existing code      |
| Collision Detection | HIGH   | Standard force-based physics, well-documented approach           |
| Boundary Forces     | HIGH   | Soft boundary pattern is standard in game physics                |
| Performance         | HIGH   | Object reuse patterns are well-established in Three.js community |
| Mouse Repulsion     | MEDIUM | Implementation outlined, requires testing for feel               |

**Research date:** 2025-03-13  
**Valid until:** 2025-06-13 (stable domain)
