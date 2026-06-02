import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useHabitStore = create(
  persist(
    (set) => ({
      habits: [],
      lastResetDate: new Date().toDateString(),

      // Add a new daily habit
      addHabit: (name) =>
        set((state) => ({
          habits: [
            ...state.habits,
            {
              id: Date.now().toString(),
              name,
              streak: 0,
              completedToday: false,
            },
          ],
        })),

      // Edit an existing habit's name
      editHabit: (id, newName) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, name: newName } : habit
          ),
        })),

      // Delete a habit
      deleteHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        })),

      // Toggle completion status for today
      toggleHabit: (id) =>
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id === id) {
              const isCompleted = !habit.completedToday;
              return {
                ...habit,
                completedToday: isCompleted,
                // Optimistically update the streak
                streak: isCompleted
                  ? habit.streak + 1
                  : Math.max(0, habit.streak - 1),
              };
            }
            return habit;
          }),
        })),

      // Check if it's a new day and reset completions (and manage streaks)
      checkAndResetHabits: () =>
        set((state) => {
          const todayDate = new Date();
          const lastReset = new Date(state.lastResetDate);

          todayDate.setHours(0, 0, 0, 0);
          lastReset.setHours(0, 0, 0, 0);

          const diffDays = Math.round(
            (todayDate - lastReset) / (1000 * 60 * 60 * 24),
          );

          if (diffDays > 0) {
            return {
              lastResetDate: new Date().toDateString(),
              habits: state.habits.map((habit) => {
                // If more than 1 day passed, or they didn't complete it yesterday, streak resets to 0
                const lostStreak = diffDays > 1 || !habit.completedToday;
                return {
                  ...habit,
                  completedToday: false,
                  streak: lostStreak ? 0 : habit.streak,
                };
              }),
            };
          }
          return state;
        }),
    }),
    { name: "supper-mind-habits" },
  ),
);
