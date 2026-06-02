import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set) => ({
      // Auth State
      // Note: You can sync this with your Supabase useAuth hook later
      isAuthenticated: false,
      setAuthenticated: (status) => set({ isAuthenticated: status }),

      // Wellness & Productivity Stats
      dailyStreak: 0,
      sessionsCompleted: 0,

      // Actions
      incrementSessions: () =>
        set((state) => ({ sessionsCompleted: state.sessionsCompleted + 1 })),
    }),
    {
      name: "supper-mind-storage", // The key used in localStorage
    },
  ),
);
