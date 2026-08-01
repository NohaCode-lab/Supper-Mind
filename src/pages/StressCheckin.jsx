import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiWind, FiCheckCircle, FiActivity } from "react-icons/fi";
import BreathingExercise from "../features/stress/BreathingExercise";
import { getAIInsight } from "../services/aiService";

const STRESS_LEVEL_OPTIONS = [
  { key: "levelLow", fallback: "Low 😌" },
  { key: "levelMedium", fallback: "Medium 😐" },
  { key: "levelHigh", fallback: "High 😰" },
  { key: "levelExtreme", fallback: "Extreme 😵" },
];

export default function StressCheckin() {
  const { t } = useTranslation();
  const [selectedKey, setSelectedKey] = useState(null);
  const [history, setHistory] = useState([]);

  const handleCheckin = (opt) => {
    setSelectedKey(opt.key);
    const newEntry = {
      id: Date.now(),
      label: t(`stress.${opt.key}`, opt.fallback),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setHistory([newEntry, ...history]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
          <FiWind className="text-teal-600 dark:text-teal-400" />
          {t("stress.title", "Stress Check-in & Relief")}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          {t("stress.subtitle", "Monitor your current stress status and engage in guided relaxation exercises.")}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Checkin & Insight */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
              {t("stress.selectLevel", "Select Current Stress Level")}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {STRESS_LEVEL_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handleCheckin(opt)}
                  className={`p-3.5 rounded-xl border font-medium text-sm transition-all flex items-center justify-between ${
                    selectedKey === opt.key
                      ? "bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-700 dark:text-teal-300 ring-2 ring-teal-500/20"
                      : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                  }`}
                >
                  <span>{t(`stress.${opt.key}`, opt.fallback)}</span>
                  {selectedKey === opt.key && <FiCheckCircle className="text-teal-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* AI Insight Card */}
          <div className="p-6 bg-linear-to-br from-teal-900 to-slate-900 text-white rounded-2xl shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <FiActivity className="text-teal-400" />
              <h3 className="font-semibold text-sm uppercase tracking-wider text-teal-300">
                {t("stress.aiAnalysis", "AI Stress Analysis")}
              </h3>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {getAIInsight(selectedKey)}
            </p>
          </div>

          {/* Recent Checkins */}
          {history.length > 0 && (
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-3 text-sm">
                {t("stress.recentCheckins", "Recent Check-ins")}
              </h3>
              <div className="space-y-2">
                {history.map((h) => (
                  <div key={h.id} className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{h.label}</span>
                    <span className="text-slate-400">{h.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Breathing Exercise */}
        <div>
          <BreathingExercise />
        </div>
      </div>
    </div>
  );
}