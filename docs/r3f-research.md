# React Three Fiber 3D Hero Section - Research Document

**Researched:** March 13, 2026  
**Domain:** React Three Fiber, Three.js, @react-three/drei  
**Confidence:** HIGH

---

## Summary

This research covers implementation patterns for a 3D hero section with **8 instanced glossy spheres**, an **infinite perspective grid with fog**, and **sphere-sphere collision detection** targeting 60fps performance. The recommended stack uses **@react-three/fiber** for React integration, **@react-three/drei** for utilities like Grid and Environment, and **Three.js InstancedMesh** for performant sphere rendering.

**Primary recommendation:** Use `InstancedMesh` with `MeshPhysicalMaterial` for spheres, Drei's `Grid` component with `infiniteGrid` for the floor, and manual sphere-sphere collision detection with reflection vectors for physics. Avoid physics engines for only 8 objects—manual collision is faster and simpler.

---

## Standard Stack

### Core Dependencies (Already Installed)

| Library              | Version  | Purpose                                | Why Standard               |
| -------------------- | -------- | -------------------------------------- | -------------------------- |
| `@react-three/fiber` | ^8.17.10 | React renderer for Three.js            | Standard React integration |
| `@react-three/drei`  | ^9.120.0 | Helpers (Grid, Environment, Instances) | Official helper library    |
| `three`              | ^0.171.0 | Core 3D engine                         | Industry standard          |
| `@types/three`       | ^0.171.0 | TypeScript definitions                 | Required for type safety   |

### Drei Helpers for This Project

| Component                        | Purpose                                 | Usage                     |
| -------------------------------- | --------------------------------------- | ------------------------- |
| `<Grid />`                       | Infinite perspective grid with fog fade | Floor visualization       |
| `<Environment />`                | HDRI environment for reflections        | Glossy sphere reflections |
| `<Instances />` + `<Instance />` | Declarative instanced mesh API          | 8 colored spheres         |
| `<Stats />`                      | Performance monitoring                  | Development only          |

---

## Architecture Patterns

### Pattern 1: Infinite Grid with Fog Fade

**What:** A perspective grid extending to the horizon with distance-based fog fade.

**Drei Grid Component:**

```jsx
import { Grid } from "@react-three/drei";

<Grid
  cellSize={0.5}
  cellThickness={0.5}
  cellColor="#444444"
  sectionSize={2}
  sectionThickness={1}
  sectionColor="#2080ff"
  infiniteGrid={true}
  fadeDistance={25}
  fadeStrength={1}
  followCamera={false}
/>;
```

**With Scene Fog (Linear Fog):**

```jsx
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

<Canvas>
  <scene fog={new THREE.Fog("#1a1a1a", 5, 25)}>
    {/* Grid will fade with fog */}
    <Grid cellColor="#666666" sectionColor="#888888" fadeDistance={25} />
  </scene>
</Canvas>;
```

**For Light/Dark Mode:**

```jsx
const theme = {
  dark: {
    fog: new THREE.Fog("#0a0a0a", 5, 20),
    gridCell: "#333333",
    gridSection: "#444444",
    background: "#0a0a0a",
  },
  light: {
    fog: new THREE.Fog("#f0f0f0", 5, 20),
    gridCell: "#cccccc",
    gridSection: "#999999",
    background: "#f0f0f0",
  },
};
```

**Best Practices:**

- Match fog color to scene background color for seamless fade
- `fadeDistance` should align with fog far plane
- Use `infiniteGrid={true}` for horizon effect
- Grid is Y-up oriented by default

---

### Pattern 2: Glossy Spheres with MeshPhysicalMaterial

**What:** Christmas-ball-like glossy spheres using physically-based rendering.

**Basic MeshPhysicalMaterial Configuration:**

```jsx
<mesh>
  <sphereGeometry args={[1, 32, 32]} />
  <meshPhysicalMaterial
    color="#ffffff"
    metalness={0.1} // Slight metalness for shine
    roughness={0.05} // Very smooth for glossy finish
    clearcoat={1} // Clear coating layer
    clearcoatRoughness={0} // Mirror-like clearcoat
    envMapIntensity={1} // Environment reflection strength
  />
</mesh>
```

**For Gray Scale Variations (8 spheres):**

```jsx
const grayTones = [
  0xffffff, // Pure white
  0xe0e0e0, // Light gray
  0xc0c0c0, // Silver
  0xa0a0a0, // Medium-light
  0x808080, // Medium gray
  0x606060, // Medium-dark
  0x404040, // Dark gray
  0x202020, // Near black
];
```

**MeshPhysicalMaterial Key Properties for Glossy Spheres:**

| Property             | Value     | Purpose                                  |
| -------------------- | --------- | ---------------------------------------- |
| `roughness`          | 0.0 - 0.1 | Smooth surface for sharp reflections     |
| `metalness`          | 0.0 - 0.2 | Non-metallic but slightly reflective     |
| `clearcoat`          | 1.0       | Additional glossy layer (lacquer effect) |
| `clearcoatRoughness` | 0.0       | Mirror-like clearcoat                    |
| `envMapIntensity`    | 1.0       | Reflection brightness                    |

**Important:** Always use an Environment map for MeshPhysicalMaterial:

```jsx
import { Environment } from "@react-three/drei";

<Environment preset="city" />;
{
  /* or */
}
<Environment files="/studio.hdr" />;
```

---

### Pattern 3: InstancedMesh for Performance

**What:** Render 8 identical spheres in a single draw call with different positions and colors.

**Declarative Approach with Drei `<Instances>`:**

```jsx
import { Instances, Instance } from "@react-three/drei";
import * as THREE from "three";

function InstancedSpheres() {
  const sphereData = [
    { position: [-2, 0, -5], color: 0xffffff },
    { position: [-1, 0.5, -3], color: 0xe0e0e0 },
    // ... 8 total
  ];

  return (
    <Instances limit={8}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        roughness={0.05}
        clearcoat={1}
        clearcoatRoughness={0}
      />
      {sphereData.map((data, i) => (
        <Instance
          key={i}
          position={data.position}
          color={new THREE.Color(data.color)}
        />
      ))}
    </Instances>
  );
}
```

**Imperative Approach (for physics updates):**

```jsx
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

function PhysicsSpheres() {
  const meshRef = useRef();
  const count = 8;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  // Initialize positions and colors
  useEffect(() => {
    const positions = [
      new THREE.Vector3(-2, 0, -5),
      new THREE.Vector3(-1, 0.5, -3),
      // ...
    ];
    const colors = [
      0xffffff, 0xe0e0e0, 0xc0c0c0, 0xa0a0a0, 0x808080, 0x606060, 0x404040,
      0x202020,
    ];

    for (let i = 0; i < count; i++) {
      dummy.position.copy(positions[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      color.setHex(colors[i]);
      meshRef.current.setColorAt(i, color);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        roughness={0.05}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </instancedMesh>
  );
}
```

**InstancedMesh Key Methods:**

- `setMatrixAt(index, matrix)` - Set position/rotation/scale
- `setColorAt(index, color)` - Set per-instance color
- `instanceMatrix.needsUpdate = true` - Mark for GPU upload
- `instanceColor.needsUpdate = true` - Mark colors for GPU upload

---

### Pattern 4: Sphere-Sphere Collision Detection

**What:** Simple collision detection with reflection vectors for 8 spheres.

**Sphere Class from Three.js:**

```jsx
import * as THREE from "three";

// Create bounding spheres for collision
const sphere1 = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1);
const sphere2 = new THREE.Sphere(new THREE.Vector3(3, 0, 0), 1);

// Check intersection
const isColliding = sphere1.intersectsSphere(sphere2);
```

**Complete Collision System:**

```jsx
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function useCollisions(positions, velocities, radii) {
  const tempPos = useMemo(() => new THREE.Vector3(), []);
  const tempVel = useMemo(() => new THREE.Vector3(), []);
  const tempNormal = useMemo(() => new THREE.Vector3(), []);
  const tempReflect = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    // Update positions
    for (let i = 0; i < positions.length; i++) {
      positions[i].addScaledVector(velocities[i], delta);
    }

    // Check collisions
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = positions[i].distanceTo(positions[j]);
        const minDist = radii[i] + radii[j];

        if (dist < minDist) {
          // Collision detected - calculate reflection
          tempNormal.subVectors(positions[j], positions[i]).normalize();

          // Reflect velocity of sphere i
          const dotI = velocities[i].dot(tempNormal);
          tempReflect.copy(tempNormal).multiplyScalar(-2 * dotI);
          velocities[i].add(tempReflect);

          // Reflect velocity of sphere j
          const dotJ = velocities[j].dot(tempNormal);
          tempReflect.copy(tempNormal).multiplyScalar(-2 * dotJ);
          velocities[j].sub(tempReflect);

          // Separate spheres to prevent sticking
          const overlap = minDist - dist;
          tempNormal.multiplyScalar(overlap * 0.5);
          positions[i].sub(tempNormal);
          positions[j].add(tempNormal);
        }
      }
    }

    // Update instanced mesh
    // ... (update instance matrices)
  });
}
```

**Alternative: Simplified Elastic Collision:**

```jsx
function resolveCollision(pos1, vel1, pos2, vel2, mass1 = 1, mass2 = 1) {
  const normal = new THREE.Vector3().subVectors(pos2, pos1).normalize();
  const relativeVelocity = new THREE.Vector3().subVectors(vel1, vel2);
  const velocityAlongNormal = relativeVelocity.dot(normal);

  if (velocityAlongNormal > 0) return; // Moving away

  const restitution = 0.9; // Bounciness (0-1)
  const impulseScalar =
    (-(1 + restitution) * velocityAlongNormal) / (1 / mass1 + 1 / mass2);

  const impulse = normal.multiplyScalar(impulseScalar);
  vel1.add(impulse.clone().multiplyScalar(1 / mass1));
  vel2.sub(impulse.clone().multiplyScalar(1 / mass2));
}
```

**Performance Considerations:**

- With 8 spheres: O(n²) = 28 checks per frame (negligible cost)
- Pre-allocate Vector3 objects outside the loop
- Use `distanceToSquared` for comparison if not needing actual distance
- Consider spatial partitioning only if expanding to 100+ objects

---

## Camera Setup for Hero Section

**Required Configuration:**

```jsx
<Canvas
  camera={{
    position: [0, 0, 0], // At origin
    fov: 60,
    near: 0.1,
    far: 100,
  }}
  gl={{ antialias: true }}
  dpr={[1, 2]} // Responsive pixel ratio
>
  {/* Looking down -Z */}
  {/* Objects placed at z: -5 to +10 (in front of camera) */}
</Canvas>
```

**Camera at (0,0,0) looking down -Z means:**

- Objects with negative Z are in front of camera
- Object positions: z ∈ [-5, +10] relative to camera
- X: horizontal, Y: vertical, Z: depth

---

## Don't Hand-Roll

| Problem                | Don't Build                | Use Instead              | Why                                                |
| ---------------------- | -------------------------- | ------------------------ | -------------------------------------------------- |
| Infinite Grid          | Custom shader              | Drei's `<Grid>`          | Handles infinite rendering, fade, and followCamera |
| Environment lighting   | Manual cube camera         | Drei's `<Environment>`   | Automatic HDR loading, PMREM generation            |
| Performance monitoring | Custom FPS counter         | Drei's `<Stats>`         | Already optimized, minimal overhead                |
| Basic instancing       | Raw Three.js InstancedMesh | Drei's `<Instances>`     | Declarative API, React lifecycle integration       |
| Camera controls        | Custom mouse handlers      | Drei's `<OrbitControls>` | Touch, wheel, keyboard support built-in            |

**When NOT to use physics libraries:**

- With only 8 spheres and simple collisions: Manual detection is faster
- Physics engines (Cannon.js, Rapier) add 50-200KB and complex setup
- No need for gravity, constraints, or complex rigid bodies

---

## Common Pitfalls

### Pitfall 1: Fog Mismatch

**What goes wrong:** Grid fades but background doesn't match, creating visible edge.

**Why it happens:** Fog color ≠ background color.

**How to avoid:**

```jsx
const fogColor = "#1a1a1a";
scene.fog = new THREE.Fog(fogColor, 5, 25);
scene.background = new THREE.Color(fogColor); // Match!
```

### Pitfall 2: InstancedMesh Update Forgetting

**What goes wrong:** Colors or positions don't update visually.

**Why it happens:** Forgot to set `needsUpdate = true`.

**How to avoid:**

```jsx
instancedMesh.instanceMatrix.needsUpdate = true;
instancedMesh.instanceColor.needsUpdate = true;
```

### Pitfall 3: Material Recreation in Loop

**What goes wrong:** Terrible performance, materials recompiling.

**Why it happens:** Creating materials inside render or component.

**How to avoid:**

```jsx
// ❌ BAD - creates new material every render
return <mesh><meshPhysicalMaterial /></mesh>

// ✅ GOOD - share geometry and material
const geometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), [])
const material = useMemo(() => new THREE.MeshPhysicalMaterial({...}), [])
```

### Pitfall 4: Fog with Transparent Materials

**What goes wrong:** Transparent objects appear in front of fog.

**Why it happens:** Three.js fog doesn't affect transparent materials properly.

**How to avoid:** Use `FogExp2` instead of linear fog, or ensure materials aren't fully transparent.

### Pitfall 5: Missing Environment Map

**What goes wrong:** Glossy spheres look black or flat.

**Why it happens:** MeshPhysicalMaterial needs environment to reflect.

**How to avoid:** Always add `<Environment />` or `<CubeCamera />`.

### Pitfall 6: 60fps Target on Mobile

**What goes wrong:** Mobile devices can't maintain 60fps with high DPR.

**Why it happens:** Retina displays render at 3x pixel ratio.

**How to avoid:**

```jsx
<Canvas dpr={[1, Math.min(window.devicePixelRatio, 2)]}>
{/* Or use PerformanceMonitor from Drei */}
<PerformanceMonitor onDecline={() => setDpr(1)} />
```

---

## Code Examples

### Complete Hero Scene Component

```jsx
import { Canvas } from "@react-three/fiber";
import { Grid, Environment, Instances, Instance } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const SPHERE_COUNT = 8;
const GRAY_TONES = [
  0xffffff, 0xe0e0e0, 0xc0c0c0, 0xa0a0a0, 0x808080, 0x606060, 0x404040,
  0x202020,
];

function MovingSpheres() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initial positions and velocities
  const spheres = useMemo(() => {
    return Array.from({ length: SPHERE_COUNT }, (_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
        -5 - Math.random() * 8,
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        0,
      ),
      radius: 0.5 + Math.random() * 0.3,
      color: new THREE.Color(GRAY_TONES[i]),
    }));
  }, []);

  useFrame((state, delta) => {
    // Update physics and handle collisions here
    // ... (collision code from Pattern 4)

    // Update instance matrices
    spheres.forEach((sphere, i) => {
      dummy.position.copy(sphere.position);
      dummy.scale.setScalar(sphere.radius);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, SPHERE_COUNT]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        roughness={0.05}
        metalness={0.1}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </instancedMesh>
  );
}

function Scene({ darkMode = true }) {
  const fogColor = darkMode ? "#0a0a0a" : "#f5f5f5";

  return (
    <>
      <color attach="background" args={[fogColor]} />
      <fog attach="fog" args={[fogColor, 5, 25]} />

      <Environment preset="city" />

      <Grid
        infiniteGrid
        cellSize={0.5}
        cellColor={darkMode ? "#333333" : "#dddddd"}
        sectionColor={darkMode ? "#555555" : "#aaaaaa"}
        fadeDistance={20}
        fadeStrength={1}
      />

      <MovingSpheres />

      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 0], fov: 60, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
```

---

## Performance Targets

### Expected Performance (8 Spheres)

| Device          | Expected FPS | Notes                           |
| --------------- | ------------ | ------------------------------- |
| Desktop (dpr=2) | 60fps        | Smooth with all effects         |
| Mobile (dpr=2)  | 60fps        | May need to reduce to dpr=1     |
| Low-end         | 45-60fps     | Use PerformanceMonitor to adapt |

### Optimization Checklist

- [ ] Use `InstancedMesh` (single draw call)
- [ ] Reuse geometry and material
- [ ] Limit sphere segments to 32x32 (not 64x64)
- [ ] Use `dpr={[1, 2]}` for responsive quality
- [ ] Add `frustumCulled={false}` only if needed
- [ ] Profile with `<Stats />` during development

---

## Light/Dark Mode Implementation

```jsx
const themes = {
  dark: {
    background: "#0a0a0a",
    fog: "#0a0a0a",
    gridCell: "#333333",
    gridSection: "#555555",
    environment: "city",
  },
  light: {
    background: "#f5f5f5",
    fog: "#f5f5f5",
    gridCell: "#dddddd",
    gridSection: "#aaaaaa",
    environment: "sunset",
  },
};

function Scene({ theme }) {
  const t = themes[theme];
  return (
    <>
      <color attach="background" args={[t.background]} />
      <fog attach="fog" args={[t.fog, 5, 25]} />
      <Environment preset={t.environment} />
      <Grid cellColor={t.gridCell} sectionColor={t.gridSection} infiniteGrid />
    </>
  );
}
```

---

## Sources

### Primary (HIGH confidence)

- Context7: `/pmndrs/react-three-fiber` - InstancedMesh, Performance patterns
- Context7: `/pmndrs/drei` - Grid, Instances, Environment, Stats components
- Context7: `/mrdoob/three.js` - InstancedMesh.setColorAt, Fog, MeshPhysicalMaterial, Sphere

### Secondary (MEDIUM confidence)

- Official Drei docs: https://github.com/pmndrs/drei/tree/master/docs
- R3F Performance guide: https://docs.pmndrs.io/react-three-fiber/advanced/scaling-performance

---

## Research Assessment

| Area                  | Level  | Reason                                                                      |
| --------------------- | ------ | --------------------------------------------------------------------------- |
| Standard Stack        | HIGH   | Verified from Context7, versions match package.json                         |
| Architecture Patterns | HIGH   | Direct from Context7 code examples                                          |
| Performance           | HIGH   | R3F docs specifically cover 60fps optimization                              |
| InstancedMesh         | HIGH   | Complete API coverage from Three.js docs                                    |
| Collision Detection   | MEDIUM | Patterns derived from Three.js Sphere class, manual implementation required |

**Valid until:** 30 days (stable stack)

**Open Questions:**

1. Should spheres have varying sizes or uniform size?
2. Should collision response include damping/friction?
3. Is subtle animation required or can spheres be static?
