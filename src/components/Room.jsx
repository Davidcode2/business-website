import { Grid } from "@react-three/drei";

export default function Room({ isDarkMode = false }) {
  const colors = isDarkMode
    ? {
        cellColor: "#555555",
        sectionColor: "#777777",
      }
    : {
        cellColor: "#e0e0e0",
        sectionColor: "#cccccc",
      };

  return (
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
  );
}
