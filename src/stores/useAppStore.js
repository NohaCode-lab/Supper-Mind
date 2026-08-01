import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set) => ({
      isDarkMode: true,
      isMobileMenuOpen: false,
      sessionsCompleted: 12,
      toggleTheme: () => set((state) => {
        const nextMode = !state.isDarkMode;
        if (nextMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        return { isDarkMode: nextMode };
      }),
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),
      incrementSessions: () => set((state) => ({ sessionsCompleted: state.sessionsCompleted + 1 })),
    }),
    {
      name: "supper-mind-app-storage",
      partialize: (state) => ({ isDarkMode: state.isDarkMode, sessionsCompleted: state.sessionsCompleted }),
    }
  )
);
