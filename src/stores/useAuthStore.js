import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "../services/supabase";

export const useAuthStore = create(
  persist(
    (set) => ({
      currentUser: {
        id: "guest-user-123",
        email: "guest@suppermind.com",
        user_metadata: {
          full_name: "Guest User",
        },
      },
      isAuthLoading: false,

      setUser: (user) => set({ currentUser: user }),

      signOut: async () => {
        try {
          await supabase.auth.signOut();
        } catch {
          // Ignore network errors in demo mode
        }
        set({
          currentUser: {
            id: "guest-user-123",
            email: "guest@suppermind.com",
            user_metadata: { full_name: "Guest User" },
          },
        });
      },
    }),
    {
      name: "supper-mind-auth-storage",
    }
  )
);
