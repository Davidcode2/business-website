import { Grid } from "@react-three/drei";

export default function Room({ isDarkMode = false }) {
  const colors = isDarkMode
    ? {
        background: "#0a0a0a",
        fog: "#0a0a0a",
        cellColor: "#555555",
        sectionColor: "#777777",
      }
    : {
        background: "#f5f5f5",
        fog: "#f5f5f5",
        cellColor: "#e0e0e0",
        sectionColor: "#cccccc",
      };

  return (
    <>
      <color attach="background" args={[colors.background]} />
      <fog attach="fog" args={[colors.fog, 10, 40]} />
      <Grid
        infiniteGrid={true}
        fadeDistance={30}
        fadeStrength={1}
        fadeFrom={1}
        cellSize={2}
        cellThickness={0.5}
        sectionSize={10}
        sectionThickness={1}
        cellColor={colors.cellColor}
        sectionColor={colors.sectionColor}
      />
    </>
  );
}
