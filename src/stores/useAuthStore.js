import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "../services/supabase";

/**
 * @typedef {Object} UserMetadata
 * @property {string} [full_name] - Full display name of the user.
 * @property {string} [name] - Alternative name field.
 */

/**
 * @typedef {Object} User
 * @property {string} id - Unique identifier for the user.
 * @property {string} email - Email address of the user.
 * @property {UserMetadata} [user_metadata] - Additional metadata associated with user profile.
 */

/**
 * @typedef {Object} AuthState
 * @property {User|null} currentUser - Currently authenticated user object, or null for guests.
 * @property {boolean} isAuthLoading - Flag indicating active auth rehydration or login state.
 * @property {(user: User|null) => void} setUser - Function to set or clear active user state.
 * @property {() => Promise<void>} signOut - Function to log out and reset user session.
 */

/** @type {import('zustand').UseBoundStore<import('zustand').StoreApi<AuthState>>} */
export const useAuthStore = create(
  persist(
    (set) => ({
      currentUser: null,
      isAuthLoading: false,

      setUser: (user) => set({ currentUser: user || null }),

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
      onRehydrateStorage: () => (state) => {
        if (
          !state?.currentUser?.id ||
          !state?.currentUser?.email ||
          state?.currentUser?.id === "guest-user-123" ||
          state?.currentUser?.email === "guest@suppermind.com"
        ) {
          state?.setUser?.(null);
        }
      },
    }
  )
);


