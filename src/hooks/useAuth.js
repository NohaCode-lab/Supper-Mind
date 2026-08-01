import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const storeUser = useAuthStore((state) => state.currentUser);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  const storeSignOut = useAuthStore((state) => state.signOut);
  const navigate = useNavigate();

  const currentUser =
    storeUser?.id === "guest-user-123" || storeUser?.email === "guest@suppermind.com"
      ? null
      : storeUser;

  const signOut = async () => {
    await storeSignOut();
    navigate("/");
  };

  return {
    currentUser,
    isAuthLoading,
    isAuthenticated: !!currentUser,
    signOut,
  };
}
