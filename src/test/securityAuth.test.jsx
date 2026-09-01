import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { authApi } from "../api/authApi";
import { useAuthStore } from "../stores/useAuthStore";
import "../i18n";

describe("Security & Authentication Error Handling", () => {
  beforeEach(() => {
    useAuthStore.setState({ currentUser: null });
    vi.restoreAllMocks();
  });

  it("does not log in and shows error message when login fails", async () => {
    vi.spyOn(authApi, "login").mockRejectedValue(new Error("Invalid credentials"));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "hacker@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });

    // Ensure state was NOT updated with a synthetic fake user
    expect(useAuthStore.getState().currentUser).toBeNull();
  });

  it("does not register and shows error message when signup fails", async () => {
    vi.spyOn(authApi, "signUp").mockRejectedValue(new Error("Email already registered"));

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Alex Vance"), {
      target: { value: "Alex Vance" },
    });
    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "existing@test.com" },
    });
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    fireEvent.change(passwordInputs[0], { target: { value: "validpass123" } });
    fireEvent.change(passwordInputs[1], { target: { value: "validpass123" } });

    fireEvent.click(screen.getByRole("button", { name: /Create Free Account/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email already registered/i)).toBeInTheDocument();
    });

    expect(useAuthStore.getState().currentUser).toBeNull();
  });
});