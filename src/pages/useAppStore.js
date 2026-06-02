import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      // Wellness & Productivity Stats
      sessionsCompleted: 0,

      // Actions
      incrementSessions: () =>
        set((state) => ({ sessionsCompleted: state.sessionsCompleted + 1 })),
    }),
    {
      name: 'supper-mind-storage', // The key used in localStorage
    }
  )
);