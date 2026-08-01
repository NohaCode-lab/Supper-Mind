import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "../services/supabase";

export const useAuthStore = create(
  persist(
    (set) => ({
      currentUser: null,
      isAuthLoading: false,

      setUser: (user) => set({ currentUser: user }),

      signOut: async () => {
        try {
          await supabase.auth.signOut();
        } catch {
          // Ignore network errors in demo mode
        }
        set({ currentUser: null });
      },
    }),
    {
      name: "supper-mind-auth-storage",
    }
  )
);
