import { create } from "zustand";
import { supabase } from "../services/supabase";

export const useAuthStore = create((set) => ({
  currentUser: {
    id: "demo-user-123",
    email: "alex.dev@suppermind.com",
    user_metadata: {
      full_name: "Alex Vance",
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
    set({ currentUser: null });
  },
}));
