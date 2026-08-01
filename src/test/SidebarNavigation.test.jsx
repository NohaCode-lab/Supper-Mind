import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import Sidebar from "../components/layouts/Sidebar";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useAuthStore } from "../stores/useAuthStore";
import { useAuth } from "../hooks/useAuth";
import "../i18n";

function AuthStateChecker() {
  const { currentUser, isAuthenticated, isGuest } = useAuth();
  return (
    <div>
      <span data-testid="user">{currentUser ? currentUser.email : "none"}</span>
      <span data-testid="auth-flag">{isAuthenticated ? "auth-true" : "auth-false"}</span>
      <span data-testid="guest-flag">{isGuest ? "guest-true" : "guest-false"}</span>
    </div>
  );
}

describe("Security & Guest Navigation Verification", () => {
  beforeEach(() => {
    useAuthStore.setState({ currentUser: null });
  });

  it("strictly maintains currentUser as null for unauthenticated users without fake identities", () => {
    render(
      <MemoryRouter>
        <AuthStateChecker />
      </MemoryRouter>
    );

    expect(screen.getByTestId("user")).toHaveTextContent("none");
    expect(screen.getByTestId("auth-flag")).toHaveTextContent("auth-false");
    expect(screen.getByTestId("guest-flag")).toHaveTextContent("guest-true");
    expect(useAuthStore.getState().currentUser).toBeNull();
  });

  it("allows guest users to navigate sidebar links while keeping currentUser null", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<div>Home View</div>} />
          <Route path="/login" element={<div>Login View</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/chat" element={<div>AI Companion View</div>} />
            <Route path="/habits" element={<div>Habits View</div>} />
            <Route path="/journal" element={<div>Journal View</div>} />
            <Route path="/mood" element={<div>Mood View</div>} />
            <Route path="/stress" element={<div>Stress View</div>} />
            <Route path="/settings" element={<div>Settings View</div>} />
            <Route path="/dashboard" element={<div>Dashboard View</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const chatLink = screen.getByRole("link", { name: /AI Companion/i });
    fireEvent.click(chatLink);
    expect(screen.getByText("AI Companion View")).toBeInTheDocument();
    expect(screen.queryByText("Login View")).not.toBeInTheDocument();

    const habitsLink = screen.getByRole("link", { name: /Habits Tracker/i });
    fireEvent.click(habitsLink);
    expect(screen.getByText("Habits View")).toBeInTheDocument();

    // Verify currentUser is strictly null during guest navigation
    expect(useAuthStore.getState().currentUser).toBeNull();
  });

  it("authenticates real users properly and attaches valid credentials", () => {
    const realUser = {
      id: "usr-real-999",
      email: "jane@suppermind.com",
      user_metadata: { full_name: "Jane Doe" },
    };

    useAuthStore.setState({ currentUser: realUser });

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <AuthStateChecker />
        <Sidebar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<div>Dashboard View</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("user")).toHaveTextContent("jane@suppermind.com");
    expect(screen.getByTestId("auth-flag")).toHaveTextContent("auth-true");
    expect(screen.getByTestId("guest-flag")).toHaveTextContent("guest-false");
  });
});
