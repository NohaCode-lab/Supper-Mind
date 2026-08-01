import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Button from "../components/ui/Button";

describe("Button Component", () => {
  it("renders button label correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("displays loading state when isLoading is true", () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
