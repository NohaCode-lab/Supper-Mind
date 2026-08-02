import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

/**
 * Custom authentication hook providing current user state, auth flags, and signOut handler.
 *
 * @returns {{
 *   currentUser: import("../stores/useAuthStore").User | null,
 *   isAuthLoading: boolean,
 *   isAuthenticated: boolean,
 *   isGuest: boolean,
 *   signOut: () => Promise<void>
 * }} Authentication status and methods.
 */
export function useAuth() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  const storeSignOut = useAuthStore((state) => state.signOut);
  const navigate = useNavigate();

  const isAuthenticated = Boolean(
    currentUser &&
    currentUser.id &&
    currentUser.email &&
    currentUser.id !== "guest-user-123" &&
    currentUser.email !== "guest@suppermind.com"
  );

  const signOut = async () => {
    await storeSignOut();
    navigate("/");
  };

  return {
    currentUser: isAuthenticated ? currentUser : null,
    isAuthLoading,
    isAuthenticated,
    isGuest: !isAuthenticated,
    signOut,
  };
}


