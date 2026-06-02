import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiCircle, FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { useHabitReset } from "../hooks/useHabitReset";
import { useHabitStore } from "../stores/useHabitStore";

export default function HabitTracker() {
  const { t } = useTranslation();
  const { habits, addHabit, toggleHabit, deleteHabit, editHabit } = useHabitStore();
  const [newHabitName, setNewHabitName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  // Activate the automatic midnight reset hook
  useHabitReset();

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    addHabit(newHabitName.trim());
    setNewHabitName("");
  };

  const startEditing = (habit) => {
    setEditingId(habit.id);
    setEditName(habit.name);
  };

  const handleSaveEdit = (id) => {
    if (editName.trim()) {
      editHabit(id, editName.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm h-full">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
        {t("habits.title", "Daily Habits")}
      </h2>

      {/* Add Habit Form */}
      <form onSubmit={handleAddHabit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          placeholder={t("habits.add_placeholder", "Add a new habit...")}
          className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm transition-all"
        />
        <button
          type="submit"
          disabled={!newHabitName.trim()}
          className="bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl px-4 py-2 transition-colors flex items-center justify-center shadow-sm"
        >
          <FiPlus size={18} />
        </button>
      </form>

      {/* Habits List */}
      <div className="space-y-3">
        {habits.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-6 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
            {t("habits.empty", "No habits yet. Start small!")}
          </p>
        ) : (
          habits.map((habit) => (
            <div
              key={habit.id}
              className="group flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900/50 transition-all hover:border-slate-200 dark:hover:border-slate-700"
            >
              {editingId === habit.id ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                    autoFocus
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSaveEdit(habit.id)
                    }
                  />
                  <button
                    onClick={() => handleSaveEdit(habit.id)}
                    className="p-1.5 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-md transition-colors"
                  >
                    <FiCheck size={16} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleHabit(habit.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        habit.completedToday
                          ? "bg-teal-500 text-white border-none"
                          : "border-2 border-slate-300 dark:border-slate-600 text-transparent hover:border-teal-500"
                      }`}
                    >
                      {habit.completedToday ? (
                        <FiCheck size={14} />
                      ) : (
                        <FiCircle size={14} className="opacity-0" />
                      )}
                    </button>
                    <span
                      className={`text-sm font-medium transition-all ${
                        habit.completedToday
                          ? "text-slate-400 line-through"
                          : "text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {habit.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-md border border-orange-100 dark:border-orange-800/30">
                      <span className="text-orange-600 dark:text-orange-400 text-xs font-bold flex items-center gap-1">
                        🔥 {habit.streak}
                      </span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                      <button
                        onClick={() => startEditing(habit)}
                        className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-md transition-colors"
                        title={t("habits.edit", "Edit")}
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        onClick={() => deleteHabit(habit.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-md transition-colors"
                        title={t("habits.delete", "Delete")}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
