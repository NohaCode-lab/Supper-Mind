import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  const storeSignOut = useAuthStore((state) => state.signOut);
  const navigate = useNavigate();

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
