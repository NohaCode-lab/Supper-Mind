import { describe, it, expect, beforeEach } from "vitest";
import { useHabitStore } from "../stores/useHabitStore";

describe("useHabitStore Zustand Store", () => {
  beforeEach(() => {
    useHabitStore.getState().resetHabits();
  });

  it("should initialize with default habits", () => {
    const habits = useHabitStore.getState().habits;
    expect(habits.length).toBeGreaterThan(0);
  });

  it("should add a new habit", () => {
    useHabitStore.getState().addHabit("Test Morning Run");
    const habits = useHabitStore.getState().habits;
    expect(habits[0].name).toBe("Test Morning Run");
    expect(habits[0].streak).toBe(0);
  });

  it("should toggle an uncompleted habit state and increase streak", () => {
    const habits = useHabitStore.getState().habits;
    // habit-2 starts with last_completed = ""
    const uncompletedHabit = habits.find((h) => !h.last_completed);
    const initialStreak = uncompletedHabit.streak;

    useHabitStore.getState().toggleHabit(uncompletedHabit.id);
    const updatedHabit = useHabitStore.getState().habits.find((h) => h.id === uncompletedHabit.id);

    expect(updatedHabit.streak).toBe(initialStreak + 1);
  });

  it("should remove a habit", () => {
    const habits = useHabitStore.getState().habits;
    const targetId = habits[0].id;
    const initialLength = habits.length;

    useHabitStore.getState().removeHabit(targetId);
    const remaining = useHabitStore.getState().habits;

    expect(remaining.length).toBe(initialLength - 1);
    expect(remaining.find((h) => h.id === targetId)).toBeUndefined();
  });
});
