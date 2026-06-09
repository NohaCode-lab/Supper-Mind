import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";
import { supabase } from "../services/supabase";
import { ROUTES } from "../utils/constants";
import { handleAppError } from "../utils/helper";

// Singleton store to prevent multiple listeners and redundant network calls
const useAuthStore = create((set) => {
  let initialized = false;
  let authSubscription = null;

  return {
    currentUser: null,
    isAuthLoading: true,
    initialize: async () => {
      if (initialized) return;
      initialized = true;

      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;
        set({ currentUser: session?.user || null, isAuthLoading: false });
      } catch (error) {
        console.error("Session verification failed:", error);
        set({ currentUser: null, isAuthLoading: false });
      }

      // Save the subscription to prevent memory leaks
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        set({ currentUser: session?.user || null, isAuthLoading: false });
      });

      authSubscription = data.subscription;
    },
    cleanupAuth: () => {
      if (authSubscription) {
        authSubscription.unsubscribe();
        authSubscription = null;
      }
      initialized = false;
    },
  };
});

export function useAuth() {
  // Use atomic selectors to prevent unnecessary re-renders across the app
  const currentUser = useAuthStore((state) => state.currentUser);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  const initialize = useAuthStore((state) => state.initialize);

  const navigate = useNavigate();

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Direct logout handler
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Navigate strictly to the home page after a successful sign out
      navigate(ROUTES.HOME);
    } catch (error) {
      handleAppError(error, "Failed to sign out securely.");
    }
  };

  return {
    currentUser,
    isAuthLoading,
    isAuthenticated: !!currentUser,
    signOut,
  };
}
