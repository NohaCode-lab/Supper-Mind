import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_HABITS = [
  {
    id: "habit-1",
    name: "10-min Morning Meditation",
    streak: 5,
    last_completed: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
  },
  {
    id: "habit-2",
    name: "Drink 2L Water",
    streak: 3,
    last_completed: "",
    created_at: new Date().toISOString(),
  },
  {
    id: "habit-3",
    name: "Evening Gratitude Journaling",
    streak: 7,
    last_completed: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString(),
  },
];

export const useHabitStore = create(
  persist(
    (set, get) => ({
      habits: INITIAL_HABITS,

      addHabit: (name) => {
        if (!name.trim()) return;
        const newHabit = {
          id: `habit-${Date.now()}`,
          name: name.trim(),
          streak: 0,
          last_completed: "",
          created_at: new Date().toISOString(),
        };
        set({ habits: [newHabit, ...get().habits] });
      },

      toggleHabit: (id) => {
        const today = new Date().toISOString().split("T")[0];
        set({
          habits: get().habits.map((habit) => {
            if (habit.id !== id) return habit;

            const isAlreadyCompleted = habit.last_completed === today;
            if (isAlreadyCompleted) {
              return {
                ...habit,
                last_completed: "",
                streak: Math.max(0, habit.streak - 1),
              };
            } else {
              return {
                ...habit,
                last_completed: today,
                streak: habit.streak + 1,
              };
            }
          }),
        });
      },

      removeHabit: (id) => {
        set({ habits: get().habits.filter((h) => h.id !== id) });
      },

      resetHabits: () => set({ habits: INITIAL_HABITS }),
    }),
    {
      name: "supper-mind-habits-storage",
    }
  )
);
