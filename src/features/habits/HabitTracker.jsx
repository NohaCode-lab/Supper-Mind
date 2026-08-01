import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiPlus, FiTrash2, FiAward } from "react-icons/fi";
import { useHabitStore } from "../../stores/useHabitStore";

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
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <FiAward className="text-amber-500" />
          {t("habits.title", "Daily Habits")}
        </h2>
        <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-400 rounded-full border border-teal-200/50 dark:border-teal-800/40">
          {habits.filter((h) => h.last_completed === today).length} / {habits.length} Done
        </span>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder={t("habits.placeholder", "Add a new habit...")}
          className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm transition-all"
        />
        <button
          type="submit"
          disabled={!newHabit.trim()}
          aria-label="Add habit"
          className="p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
        >
          <FiPlus size={18} />
        </button>
      </form>

      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {habits.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t("habits.empty", "No habits added yet. Start building good habits today!")}
            </p>
          </div>
        ) : (
          habits.map((habit) => {
            const isCompletedToday = habit.last_completed === today;
            return (
              <div
                key={habit.id}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  isCompletedToday
                    ? "bg-teal-50/60 dark:bg-teal-900/15 border-teal-200/70 dark:border-teal-900/40"
                    : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    aria-label={`Mark ${habit.name} as ${isCompletedToday ? "incomplete" : "complete"}`}
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                      isCompletedToday
                        ? "bg-teal-600 border-teal-600 text-white shadow-xs"
                        : "border-slate-300 dark:border-slate-600 text-transparent hover:border-teal-500"
                    }`}
                  >
                    <FiCheck size={14} />
                  </button>
                  <span
                    className={`font-medium text-sm transition-all ${
                      isCompletedToday
                        ? "text-slate-400 dark:text-slate-500 line-through"
                        : "text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {habit.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-2 py-1 bg-amber-100/80 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 rounded-md">
                    🔥 {habit.streak}d
                  </span>
                  <button
                    onClick={() => removeHabit(habit.id)}
                    aria-label={`Delete ${habit.name}`}
                    className="text-slate-400 hover:text-rose-500 transition-colors p-1"
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
