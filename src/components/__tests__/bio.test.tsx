import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Bio from "../bio";

describe("bio Component", () => {
  it("renders without crashing", () => {
    render(<Bio />);
    expect(screen.getByText(/Oluwasetemi/)).toBeInTheDocument();
  });

  it("displays the author name", () => {
    render(<Bio />);
    expect(screen.getByText(/Oluwasetemi Ojo/)).toBeInTheDocument();
  });

  it("contains social links", () => {
    render(<Bio />);
    expect(screen.getByText(/Twitter/)).toBeInTheDocument();
  });

  it("shows \"Written by\" when footer prop is false", () => {
    render(<Bio footer={false} />);
    expect(screen.getByText(/Written by/)).toBeInTheDocument();
  });

  it("shows \"I'm\" when footer prop is true", () => {
    render(<Bio footer={true} />);
    expect(screen.getByText(/I'm/)).toBeInTheDocument();
  });
});
