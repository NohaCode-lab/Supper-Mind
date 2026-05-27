import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiTrendingUp, FiClock, FiActivity, FiSmile, FiMeh, FiFrown } from 'react-icons/fi';

// Hooks & State
import { useAuth } from '../hooks/useAuth';
import { useAppStore } from '../context/useAppStore';
import { useMood } from '../hooks/useMood';
import { formatRelativeTime } from '../utils/helper';

export default function Dashboard() {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { dailyStreak, sessionsCompleted } = useAppStore();
  const { moodHistory, isFetchingMoods, logMood, isLoggingMood } = useMood();

  // Local state for the mood input form
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodNote, setMoodNote] = useState('');

  // Direct handler to submit a new mood entry to Supabase
  const handleLogMood = (e) => {
    e.preventDefault();
    if (!selectedMood) return;

    logMood({
      user_id: currentUser?.id,
      mood_score: selectedMood,
      note: moodNote,
      created_at: new Date().toISOString(),
    }, {
      onSuccess: () => {
        setSelectedMood(null);
        setMoodNote('');
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Header Section */}
      <header>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          {t('dashboard.greeting', 'Hello')}, {currentUser?.user_metadata?.full_name?.split(' ')[0] || t('dashboard.guest', 'Friend')} 👋
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          {t('dashboard.subtitle', 'Here is a summary of your mental wellness journey.')}
        </p>
      </header>

      {/* 2. Top Level Metrics (Global Zustand State) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Streak Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
            <FiTrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
              {t('dashboard.streak', 'Current Streak')}
            </p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {dailyStreak} {t('dashboard.days', 'Days')}
            </p>
          </div>
        </div>

        {/* Sessions Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
            <FiActivity size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
              {t('dashboard.sessions', 'AI Sessions')}
            </p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {sessionsCompleted}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 3. Quick Action: Log Mood */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
              {t('dashboard.log_title', 'How are you feeling?')}
            </h2>
            
            <form onSubmit={handleLogMood} className="space-y-5">
              {/* Mood Selection */}
              <div className="flex justify-between gap-2">
                {[
                  { value: 3, icon: <FiSmile size={24} />, label: 'Good', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800' },
                  { value: 2, icon: <FiMeh size={24} />, label: 'Okay', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800' },
                  { value: 1, icon: <FiFrown size={24} />, label: 'Rough', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20', border: 'border-rose-200 dark:border-rose-800' },
                ].map((mood) => (
                  <button
                    key={mood.value}
                    type="button"
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      selectedMood === mood.value 
                        ? `${mood.bg} ${mood.border} ring-2 ring-offset-2 dark:ring-offset-slate-900 ring-${mood.color.split('-')[1]}-500` 
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 grayscale hover:grayscale-0'
                    }`}
                  >
                    <span className={mood.color}>{mood.icon}</span>
                    <span className="text-xs font-medium mt-2 text-slate-600 dark:text-slate-400">{mood.label}</span>
                  </button>
                ))}
              </div>

              {/* Optional Note */}
              <div>
                <textarea
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                  placeholder={t('dashboard.note_placeholder', 'Add a brief note...')}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-none h-24 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!selectedMood || isLoggingMood}
                className="w-full bg-slate-800 hover:bg-slate-900 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed font-medium py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                {isLoggingMood ? t('dashboard.saving', 'Saving...') : t('dashboard.save_entry', 'Save Entry')}
              </button>
            </form>
          </div>
        </div>

        {/* 4. Data View: History List (TanStack Query Server State) */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm h-full">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
              <FiClock className="text-slate-400" />
              {t('dashboard.history_title', 'Recent History')}
            </h2>

            {isFetchingMoods ? (
              // Loading Skeleton
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-xl">
                    <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : moodHistory?.length === 0 ? (
              // Empty State
              <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                <FiActivity size={32} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {t('dashboard.empty_state', 'No entries yet. Log how you are feeling to see your history.')}
                </p>
              </div>
            ) : (
              // Data List
              <div className="space-y-3">
                {moodHistory?.map((entry) => (
                  <div 
                    key={entry.id} 
                    className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700 transition-colors group"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                      entry.mood_score === 3 ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      entry.mood_score === 2 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                    }`}>
                      {entry.mood_score === 3 ? <FiSmile size={18} /> : entry.mood_score === 2 ? <FiMeh size={18} /> : <FiFrown size={18} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm text-slate-800 dark:text-slate-200">
                          {entry.mood_score === 3 ? 'Good' : entry.mood_score === 2 ? 'Okay' : 'Rough'}
                        </span>
                        <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                          {formatRelativeTime(entry.created_at)}
                        </span>
                      </div>
                      {entry.note && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                          {entry.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}