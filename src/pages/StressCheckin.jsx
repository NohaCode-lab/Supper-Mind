import { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { getAIInsight } from "../services/aiService";
import BreathingExercise from "../features/stress/BreathingExercise";

export default function StressCheckin() {
  const [level, setLevel] = useState(null);
  const [history, setHistory] = useState([]);

  const levels = ["Low 😌", "Medium 😐", "High 😰", "Extreme 😵"];

  const save = (value) => {
    setLevel(value);
    setHistory((prev) => [
      { value, date: new Date().toLocaleString() },
      ...prev,
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
          <span>😰</span> Stress Check-in & Relief
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Monitor your current stress status and engage in guided relaxation exercises.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Stress Rating & AI Insight */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Select Current Stress Level
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {levels.map((l) => (
                <Button
                  key={l}
                  variant={level === l ? "primary" : "outline"}
                  onClick={() => save(l)}
                  className="w-full text-sm"
                >
                  {l}
                </Button>
              ))}
            </div>

            {level && (
              <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/40">
                <p className="text-xs uppercase tracking-wider font-bold text-teal-700 dark:text-teal-400 mb-1">
                  🤖 AI Stress Analysis
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-200">
                  {getAIInsight(level)}
                </p>
              </div>
            )}
          </Card>

          {/* History */}
          {history.length > 0 && (
            <Card>
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-3 text-sm">
                Recent Check-ins
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {history.map((h, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-xs"
                  >
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {h.value}
                    </span>
                    <span className="text-slate-400">{h.date}</span>
                  </div>
                ))}
              </div>
            </Card>
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