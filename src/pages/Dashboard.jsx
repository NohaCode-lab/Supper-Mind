import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiActivity,
  FiClock,
  FiTrendingUp,
  FiSmile,
} from "react-icons/fi";

import HabitTracker from "../features/habits/components/HabitTracker";
import { useHabitStore } from "../features/habits/store/useHabitStore";
import { useAuth } from "../hooks/useAuth";
import { useMood } from "../hooks/useMood";
import { useAppStore } from "../stores/useAppStore";
import { formatRelativeTime } from "../utils/helper";
import { MOODS } from "../services/moodService";

export default function Dashboard() {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { sessionsCompleted } = useAppStore();
  const { habits } = useHabitStore();
  const { moodHistory, isFetchingMoods, logMood, isLoggingMood } = useMood();

  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);

  const [selectedMood, setSelectedMood] = useState(null);
  const [moodNote, setMoodNote] = useState("");

  const handleLogMood = (e) => {
    e.preventDefault();
    if (!selectedMood) return;

    logMood(
      {
        user_id: currentUser?.id,
        mood_score: selectedMood,
        note: moodNote,
        created_at: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          setSelectedMood(null);
          setMoodNote("");
        },
      },
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          {t("dashboard.greeting", "Hello")},{" "}
          {currentUser?.user_metadata?.full_name?.split(" ")[0] || "Friend"} 👋
        </h1>
      </header>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* البطاقة الأولى: أيام الالتزام */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
            <FiTrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t("dashboard.stat_streak", "Habit Streak")}</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{totalStreak} <span className="text-sm font-normal text-slate-500">{t("dashboard.stat_days", "Days")}</span></h3>
          </div>
        </div>

        {/* البطاقة الثانية: جلسات الذكاء الاصطناعي */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
            <FiActivity size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t("dashboard.stat_sessions", "AI Sessions")}</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{sessionsCompleted}</h3>
          </div>
        </div>

        {/* البطاقة الثالثة: تسجيلات المزاج */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
            <FiSmile size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t("dashboard.stat_moods", "Mood Logs")}</p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{moodHistory?.length || 0}</h3>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MOOD FORM */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
              {t("dashboard.log_title", "How are you feeling?")}
            </h2>

            <form onSubmit={handleLogMood} className="space-y-5">
              <div className="flex gap-2">
                {MOODS.map((mood) => (
                  <button
                    key={mood.value}
                    type="button"
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex-1 p-3 rounded-xl border transition-all ${
                      selectedMood === mood.value
                        ? `${mood.bg} ${mood.border} ring-2 ${mood.ring}`
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className={mood.color}>{mood.icon}</div>
                    <span className="text-xs">{mood.label}</span>
                  </button>
                ))}
              </div>

              <textarea
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                className="w-full p-3 rounded-xl"
                placeholder="Add note..."
              />

              <button
                type="submit"
                disabled={!selectedMood || isLoggingMood}
                className="w-full bg-slate-800 text-white py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoggingMood ? "Saving..." : "Save Entry"}
              </button>
            </form>
          </div>

          <HabitTracker />
        </div>

        {/* HISTORY */}
        <div className="lg:col-span-2">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <FiClock className="text-teal-600 dark:text-teal-400" />
                {t("dashboard.history_title", "Recent History")}
              </h2>
            </div>

            {isFetchingMoods ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-teal-600 animate-spin dark:border-slate-800 dark:border-t-teal-500"></div>
              </div>
            ) : moodHistory && moodHistory.length > 0 ? (
              <div className="space-y-4">
                {moodHistory.map((entry) => {
                  // استخراج بيانات المزاج (اللون، الأيقونة) بناءً على القيمة المسجلة
                  const mood = MOODS.find((m) => m.value === entry.mood_score) || MOODS[1];
                  return (
                    <div key={entry.id} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md group">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${mood.bg} ${mood.border} ${mood.color}`}>
                        {mood.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-semibold ${mood.color}`}>{mood.label}</h4>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{formatRelativeTime(entry.created_at)}</span>
                        </div>
                        {entry.note && (
                          <p className="text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 mt-2 whitespace-pre-wrap">
                            {entry.note}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <p className="text-slate-500 dark:text-slate-400">
                  {t("dashboard.empty_state", "No entries yet. Log how you are feeling to see your history.")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
