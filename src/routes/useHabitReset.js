import { useEffect } from 'react';
import { useHabitStore } from '../stores/useHabitStore';

export function useHabitReset() {
  // Safely extract the check function from the store
  const checkAndResetHabits = useHabitStore((state) => state.checkAndResetHabits);

  useEffect(() => {
    if (!checkAndResetHabits) return;

    // 1. Immediately check when the app or component mounts 
    // (handles the user opening the app after being away for days)
    checkAndResetHabits();

    // 2. Schedule a check for exactly midnight 
    // (handles the user keeping the app open overnight)
    const getMsUntilMidnight = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0); // Next midnight
      return midnight.getTime() - now.getTime();
    };

    let timeoutId;
    const scheduleReset = () => {
      timeoutId = setTimeout(() => {
        checkAndResetHabits();
        scheduleReset(); // Schedule for the next midnight
      }, getMsUntilMidnight());
    };

    scheduleReset();

    return () => clearTimeout(timeoutId);
  }, [checkAndResetHabits]);
}