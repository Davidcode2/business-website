# Phase 01: Grid Visibility - Research

**Researched:** 2026-03-13
**Domain:** @react-three/drei Grid component, Three.js line rendering
**Confidence:** HIGH

## Summary

The @react-three/drei `Grid` component is a **shader-based implementation** that renders an infinite plane with mathematically calculated grid lines. It supports **fade-to-horizon effects natively** but **does NOT support dashed lines** as it's not using actual line primitives.

**Primary Issue Identified:** In Room.jsx, the dark mode colors (#333333 cells, #444444 sections) are too close to the background (#0a0a0a), causing the grid to be invisible.

**Primary recommendation:** Fix color contrast first. For dashed lines, use a custom Line-based grid implementation as Drei's Grid doesn't support it.

## Grid Component Analysis

### What Drei's Grid Component Actually Is

From examining the source code (`src/core/Grid.tsx`):

- **Shader-based**: Uses custom GLSL vertex/fragment shaders, not actual line geometry
- **Mathematical lines**: Grid lines are calculated using `fwidth()` and `fract()` operations in the fragment shader
- **Not compatible with dashed materials**: Since there are no actual Line objects, `LineDashedMaterial` cannot be applied

### Available Props (Complete API)

| Prop               | Type       | Default  | Description                                |
| ------------------ | ---------- | -------- | ------------------------------------------ |
| `cellSize`         | number     | 0.5      | Size of individual grid cells              |
| `cellThickness`    | number     | 0.5      | Thickness of cell lines (0-1)              |
| `cellColor`        | Color      | black    | Color of cell lines                        |
| `sectionSize`      | number     | 1        | Size of section markers                    |
| `sectionThickness` | number     | 1        | Thickness of section lines                 |
| `sectionColor`     | Color      | #2080ff  | Color of section lines                     |
| `infiniteGrid`     | boolean    | false    | Extends grid infinitely                    |
| `fadeDistance`     | number     | 100      | Distance at which grid fades out           |
| `fadeStrength`     | number     | 1        | Fade curve exponent strength               |
| `fadeFrom`         | number     | 1        | 1 = fade from camera, 0 = fade from origin |
| `followCamera`     | boolean    | false    | Grid follows camera position               |
| `side`             | THREE.Side | BackSide | Material side rendering                    |

**Source**: https://github.com/pmndrs/drei/blob/master/src/core/Grid.tsx

## Fade Toward Horizon (NATIVE SUPPORT)

### How It Works

The Grid shader calculates distance from camera and applies fade:

```glsl
// From Grid.tsx fragment shader
vec3 from = worldCamProjPosition*vec3(fadeFrom);
float dist = distance(from, worldPosition.xyz);
float d = 1.0 - min(dist / fadeDistance, 1.0);
// ... applied to alpha: pow(d, fadeStrength)
```

### Configuration

```jsx
<Grid
  infiniteGrid={true}
  fadeDistance={30} // Fade starts at 30 units
  fadeStrength={1} // Linear fade (higher = sharper fade)
  fadeFrom={1} // 1 = fade from camera, 0 = fade from origin
/>
```

**Confidence: HIGH** - This is documented and implemented in the shader.

## Dashed Lines (NOT NATIVE)

### Why Dashed Doesn't Work

Drei's Grid uses a **custom shader material** on a PlaneGeometry. The "lines" are calculated in the fragment shader using:

```glsl
float getGrid(float size, float thickness) {
  vec2 r = localPosition.xz / size;
  vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
  float line = min(grid.x, grid.y) + 1.0 - thickness;
  return 1.0 - min(line, 1.0);
}
```

This mathematically determines which pixels are "on the grid line" - there are no actual Line primitives to apply dashed materials to.

## Alternative Approaches for Dashed Grid

### Option 1: Drei's Line Component (RECOMMENDED)

Use multiple `<Line>` components from drei with `dashed={true}`:

```jsx
import { Line } from "@react-three/drei";

// Horizontal lines
{
  Array.from({ length: 21 }).map((_, i) => (
    <Line
      key={`h-${i}`}
      points={[
        [-50, 0, (i - 10) * 5],
        [50, 0, (i - 10) * 5],
      ]}
      color="#666666"
      lineWidth={1}
      dashed={true}
      dashSize={2}
      gapSize={1}
    />
  ));
}
```

**Pros**: Native dashed support, customizable
**Cons**: Performance (many draw calls), no automatic fade

### Option 2: GridHelper with Custom Material

Three.js GridHelper uses LineBasicMaterial which doesn't support dashing. Would need to:

1. Create GridHelper
2. Replace material with LineDashedMaterial
3. Call `computeLineDistances()`

**Limitation**: GridHelper creates a finite grid, not infinite.

### Option 3: Custom Shader Grid

Modify Drei's Grid shader to include dash pattern:

```glsl
// Add to fragment shader
float dashPattern = step(0.5, fract(localPosition.x / dashSize));
```

**Pros**: Best performance, works with existing Grid props
**Cons**: Requires forking drei or custom implementation

## Color Contrast Fix (IMMEDIATE PRIORITY)

### Current Problem

```javascript
// Current dark mode colors
{
  background: "#0a0a0a",  // Very dark
  cellColor: "#333333",     // Too close to background
  sectionColor: "#444444",  // Barely distinguishable
}
```

### Recommended Colors

```javascript
// Dark mode - better contrast
{
  background: "#0a0a0a",
  cellColor: "#666666",     // Lighter for visibility
  sectionColor: "#888888",  // Even lighter for emphasis
}

// Alternative with more subtlety
{
  cellColor: "#444444",     // Still visible
  sectionColor: "#666666",  // Clear distinction
}
```

## Code Examples

### Example 1: Fixed Room.jsx (Immediate Fix)

```jsx
import { Grid } from "@react-three/drei";

export default function Room({ isDarkMode = false }) {
  const colors = isDarkMode
    ? {
        background: "#0a0a0a",
        fog: "#0a0a0a",
        cellColor: "#555555", // Was #333333 - too dark
        sectionColor: "#777777", // Was #444444 - too dark
      }
    : {
        background: "#f5f5f5",
        fog: "#f5f5f5",
        cellColor: "#cccccc",
        sectionColor: "#aaaaaa",
      };

  return (
    <>
      <color attach="background" args={[colors.background]} />
      <fog attach="fog" args={[colors.fog, 10, 40]} />
      <Grid
        infiniteGrid={true}
        fadeDistance={35}
        fadeStrength={1.5} // Sharper fade
        fadeFrom={1}
        cellSize={2}
        cellThickness={0.5}
        sectionSize={10}
        sectionThickness={1.5} // Thicker sections
        cellColor={colors.cellColor}
        sectionColor={colors.sectionColor}
      />
    </>
  );
}
```

### Example 2: Dashed Grid (Alternative Implementation)

```jsx
import { Line } from "@react-three/drei";
import { useMemo } from "react";

function DashedGrid({ size = 50, divisions = 20, fadeDistance = 30 }) {
  const lines = useMemo(() => {
    const result = [];
    const step = size / divisions;
    const half = size / 2;

    // Create horizontal and vertical lines
    for (let i = 0; i <= divisions; i++) {
      const pos = -half + i * step;

      // Horizontal
      result.push({
        points: [
          [-half, 0, pos],
          [half, 0, pos],
        ],
        color: i % 5 === 0 ? "#888888" : "#555555",
        lineWidth: i % 5 === 0 ? 1.5 : 1,
      });

      // Vertical
      result.push({
        points: [
          [pos, 0, -half],
          [pos, 0, half],
        ],
        color: i % 5 === 0 ? "#888888" : "#555555",
        lineWidth: i % 5 === 0 ? 1.5 : 1,
      });
    }
    return result;
  }, [size, divisions]);

  return (
    <group>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          color={line.color}
          lineWidth={line.lineWidth}
          dashed={true}
          dashSize={2}
          gapSize={1}
          opacity={0.8}
          transparent
        />
      ))}
    </group>
  );
}
```

## Decision Matrix

| Approach                    | Fade Support | Dashed | Performance               | Complexity |
| --------------------------- | ------------ | ------ | ------------------------- | ---------- |
| Drei Grid (fixed colors)    | ✅ Native    | ❌ No  | ✅ Excellent              | Low        |
| Drei Grid + custom shader   | ✅ Native    | ✅ Yes | ✅ Excellent              | High       |
| Drei Line components        | ❌ Manual    | ✅ Yes | ⚠️ Poor (many draw calls) | Medium     |
| Custom Lines implementation | ❌ Manual    | ✅ Yes | ⚠️ Poor                   | High       |

## Recommendation

**Phase 1 (Immediate)**: Fix color contrast in Room.jsx

- Change cellColor from `#333333` to `#555555` or `#666666`
- Change sectionColor from `#444444` to `#777777` or `#888888`
- Adjust fadeDistance/fadeStrength for desired effect

**Phase 2 (If dashed needed)**: Create custom dashed grid using Line components

- Accept performance trade-off for visual effect
- Or: Fork Drei's Grid and add dash pattern to shader

## Sources

### Primary (HIGH confidence)

- Context7 `/pmndrs/drei` "Grid" - Component API and props
- Context7 `/pmndrs/drei` "infiniteGrid" - Fade behavior documentation
- GitHub source: `pmndrs/drei/src/core/Grid.tsx` - Complete implementation
- Context7 `/pmndrs/drei` "dashed" - Line component dashed support

### Secondary (MEDIUM confidence)

- Context7 `/mrdoob/three.js` "GridHelper" - Alternative grid options
- Context7 `/mrdoob/three.js` "LineDashedMaterial" - Three.js dashed line support

## Open Questions

1. **Should we prioritize dashed lines over native Grid fade?**
   - Dashed lines require significant implementation effort
   - Native Grid fade works well and is performant
   - Recommendation: Fix colors first, evaluate if dashed is truly needed

2. **Ball color blending issue**
   - Balls are also `#333333` - they blend with current grid
   - If grid becomes lighter, balls may need color adjustment too
   - Consider using different color for balls to ensure visibility

## Metadata

**Confidence breakdown:**

- Grid capabilities: HIGH - Source code examined
- Fade feature: HIGH - Documented and implemented
- Dashed lines not supported: HIGH - Confirmed via source analysis
- Alternative approaches: MEDIUM - Based on drei documentation

**Research date:** 2026-03-13
**Valid until:** 2026-04-13 (drei updates may add features)
