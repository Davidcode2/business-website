import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Canvas } from "@react-three/fiber";
import Room from "./Room";

describe("Room", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <Canvas>
        <Room />
      </Canvas>,
    );
    expect(container.querySelector("canvas")).toBeTruthy();
  });

  it("renders in light mode", () => {
    const { container } = render(
      <Canvas>
        <Room isDarkMode={false} />
      </Canvas>,
    );
    expect(container.querySelector("canvas")).toBeTruthy();
  });

  it("renders in dark mode", () => {
    const { container } = render(
      <Canvas>
        <Room isDarkMode={true} />
      </Canvas>,
    );
    expect(container.querySelector("canvas")).toBeTruthy();
  });
});
