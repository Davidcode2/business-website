# 3D Hero Implementation Specification

## Overview
Transform Hero section into immersive 3D experience with perspective room, infinite grid, and 8 glossy floating spheres with collision physics.

## Component Architecture

### 1. Room.jsx - 3D Environment
**Purpose**: Create infinite perspective room with grid floor

**Implementation**:
```jsx
// Drei's Grid component for infinite grid
<Grid
  infiniteGrid={true}
  fadeDistance={30}
  fadeStrength={1}
  cellSize={2}
  cellThickness={0.5}
  sectionSize={10}
  sectionThickness={1}
  sectionColor={isDarkMode ? 0x444444 : 0xcccccc}
  cellColor={isDarkMode ? 0x333333 : 0xe0e0e0}
/>

// Fog for depth fade
<fog attach="fog" args={[isDarkMode ? 0x111111 : 0xffffff, 10, 40]} />

// Background color
<color attach="background" args={[isDarkMode ? 0x111111 : 0xffffff]} />
```

**Props**:
- `isDarkMode`: boolean - Controls grid/fog colors

### 2. Spheres.jsx - Floating Spheres
**Purpose**: Render 8 glossy spheres with physics

**Implementation**:
```jsx
// Using Drei's Instances for declarative instancing
<Instances limit={8}>
  <sphereGeometry args={[1, 32, 32]} />
  <MeshPhysicalMaterial
    metalness={0.9}
    roughness={0.1}
    clearcoat={1}
    clearcoatRoughness={0}
    envMapIntensity={1}
  />
  {spheres.map((sphere, i) => (
    <Instance
      key={i}
      position={sphere.position}
      color={sphere.color}
    />
  ))}
</Instances>
```

**Sphere Data Structure**:
```javascript
{
  id: number,
  position: Vector3,
  velocity: Vector3,
  baseY: number,      // For floating oscillation
  phase: number,      // For sine wave offset
  color: Color        // Varying gray tone
}
```

**Gray Tones** (8 variations):
- #333333, #444444, #555555, #666666, #777777, #888888, #999999, #aaaaaa

### 3. Physics System
**Location**: Inside Spheres.jsx useFrame loop

**Animation Loop**:
```javascript
useFrame((state, delta) => {
  const time = state.clock.elapsedTime;
  
  spheres.forEach((sphere) => {
    // 1. Floating motion (sine wave on Y)
    const floatOffset = Math.sin(time * 0.5 + sphere.phase) * 0.3;
    sphere.position.y = sphere.baseY + floatOffset;
    
    // 2. Apply velocity
    sphere.position.add(sphere.velocity.clone().multiplyScalar(delta));
    
    // 3. Sphere-sphere collision (soft repulsion)
    spheres.forEach((other) => {
      if (sphere === other) return;
      const dist = sphere.position.distanceTo(other.position);
      const minDist = 2.0; // Sum of radii
      if (dist < minDist) {
        const push = sphere.position.clone().sub(other.position).normalize();
        const force = (minDist - dist) * 2; // Soft spring force
        sphere.velocity.add(push.multiplyScalar(force * delta));
      }
    });
    
    // 4. Boundary containment
    // X: [-8, 8], Y: [-4, 4], Z: [-4, 8]
    ['x', 'y', 'z'].forEach((axis, i) => {
      const bounds = [[-8, 8], [-4, 4], [-4, 8]][i];
      if (sphere.position[axis] < bounds[0]) {
        sphere.velocity[axis] += (bounds[0] - sphere.position[axis]) * delta;
      }
      if (sphere.position[axis] > bounds[1]) {
        sphere.velocity[axis] += (bounds[1] - sphere.position[axis]) * delta;
      }
    });
    
    // 5. Damping
    sphere.velocity.multiplyScalar(0.98);
  });
});
```

### 4. Scene3D.jsx - Main Scene
**Purpose**: Compose Room + Spheres + Lighting + Environment

```jsx
<Canvas
  camera={{ position: [0, 0, 0], fov: 60 }}
  dpr={[1, 2]}
  gl={{ antialias: true, alpha: true }}
>
  <color attach="background" args={[isDarkMode ? 0x111111 : 0xffffff]} />
  <fog attach="fog" args={[isDarkMode ? 0x111111 : 0xffffff, 10, 40]} />
  
  {/* Camera looking down -Z */}
  <PerspectiveCamera makeDefault position={[0, 0, 0]} rotation={[0, 0, 0]} />
  
  {/* Lighting for glossy spheres */}
  <ambientLight intensity={0.3} />
  <directionalLight position={[10, 10, 5]} intensity={1} />
  <directionalLight position={[-10, -10, -5]} intensity={0.5} />
  
  {/* Environment for reflections */}
  <Environment preset="city" />
  
  {/* Components */}
  <Room isDarkMode={isDarkMode} />
  <Spheres count={8} isDarkMode={isDarkMode} />
</Canvas>
```

### 5. Hero Integration
**File**: Hero.astro

**Changes**:
1. Remove existing GradientBlob and CSS blob animations
2. Add Scene3D component with proper hydration
3. Ensure text remains readable with proper z-index layering

```astro
---
import Scene3D from '../components/Scene3D.jsx';
---

<section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
  <!-- 3D Background -->
  <div class="absolute inset-0 -z-10">
    <Scene3D client:load />
  </div>
  
  <!-- Content (unchanged) -->
  <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <!-- ... existing content ... -->
  </div>
</section>
```

## Performance Targets
- 60fps on desktop
- Single draw call for all spheres (InstancedMesh)
- < 16ms frame time
- No memory leaks (reused Vector3 objects)

## Dependencies
Already installed:
- `@react-three/fiber` ✓
- `@react-three/drei` ✓
- `three` ✓

## File Structure
```
src/components/
├── Scene3D.jsx          # Main 3D scene component
├── Room.jsx             # Infinite grid room
├── Spheres.jsx          # Floating spheres with physics
└── Hero.astro           # Modified hero section

docs/
├── r3f-research.md      # Research findings
├── physics-research.md  # Physics patterns
└── 3d-hero-implementation-spec.md  # This spec
```

## Testing Checklist
- [ ] Grid visible at 20% opacity
- [ ] Fog creates depth fade
- [ ] 8 spheres render with glossy reflections
- [ ] Spheres float and collide smoothly
- [ ] 60fps maintained
- [ ] Light/dark mode toggle works
- [ ] Text content remains readable
