import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiPlus, FiTrash2 } from "react-icons/fi";
import { useHabitStore } from "../store/useHabitStore";

export default function HabitTracker() {
  const { t } = useTranslation();
  const { habits, addHabit, toggleHabit, removeHabit } = useHabitStore();
  const [newHabit, setNewHabit] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    addHabit(newHabit);
    setNewHabit("");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
        {t("habits.title", "Daily Habits")}
      </h2>

      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder={t("habits.placeholder", "Add a new habit...")}
          className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all"
        />
        <button
          type="submit"
          disabled={!newHabit.trim()}
          className="p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <FiPlus size={18} />
        </button>
      </form>

      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {habits.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
            {t(
              "habits.empty",
              "No habits added yet. Start building good habits today!",
            )}
          </p>
        ) : (
          habits.map((habit) => {
            const isCompletedToday = habit.last_completed === today;
            return (
              <div
                key={habit.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  isCompletedToday
                    ? "bg-teal-50/50 dark:bg-teal-900/10 border-teal-100 dark:border-teal-900/30"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                      isCompletedToday
                        ? "bg-teal-500 border-teal-500 text-white"
                        : "border-slate-300 dark:border-slate-600 text-transparent hover:border-teal-500"
                    }`}
                  >
                    <FiCheck size={14} />
                  </button>
                  <span
                    className={`font-medium text-sm transition-all ${isCompletedToday ? "text-slate-400 dark:text-slate-500 line-through" : "text-slate-700 dark:text-slate-200"}`}
                  >
                    {habit.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-md">
                    🔥 {habit.streak}
                  </span>
                  <button
                    onClick={() => removeHabit(habit.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
