import { useTranslation } from "react-i18next";
import { FiClock, FiSmile } from "react-icons/fi";
import { useMood } from "../hooks/useMood";
import { MOODS } from "../services/moodService";
import { formatRelativeTime } from "../utils/helper";

export default function MoodTracker() {
  const { t } = useTranslation();
  const { moodHistory, isFetchingMoods } = useMood();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
          <FiSmile className="text-teal-600 dark:text-teal-400" />
          {t("mood.title", "Mood Analytics & History")}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          {t("mood.subtitle", "Track emotional patterns, view logged moods, and foster self-awareness.")}
        </p>
      </header>

      {/* Breakdown */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          {t("mood.breakdown", "Mood Palette Breakdown")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {MOODS.map((mood) => {
            const count = moodHistory?.filter((m) => m.mood_score === mood.value).length || 0;
            return (
              <div
                key={mood.value}
                className={`p-4 rounded-xl border flex flex-col items-center gap-1 ${mood.bg} ${mood.border}`}
              >
                <span className="text-2xl">{mood.icon}</span>
                <span className={`font-bold text-sm ${mood.color}`}>{mood.label}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  {count} {t("mood.logsCount", "logs")}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* History */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
          <FiClock className="text-teal-600 dark:text-teal-400" />
          {t("mood.history", "Mood Log History")}
        </h2>

        {isFetchingMoods ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-teal-600 animate-spin dark:border-slate-800 dark:border-t-teal-500" />
          </div>
        ) : moodHistory && moodHistory.length > 0 ? (
          <div className="space-y-4">
            {moodHistory.map((entry) => {
              const mood = MOODS.find((m) => m.value === entry.mood_score) || MOODS[1];
              return (
                <div
                  key={entry.id}
                  className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 transition-all"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 border ${mood.bg} ${mood.border}`}
                  >
                    {mood.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-bold text-sm ${mood.color}`}>{mood.label}</h4>
                      <span className="text-xs text-slate-400">
                        {formatRelativeTime(entry.created_at)}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 mt-1 whitespace-pre-wrap">
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
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t("mood.empty", "No mood entries logged yet.")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}