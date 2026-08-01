import { useState, useEffect } from "react";
import { FiWind, FiPlay, FiPause, FiRotateCcw } from "react-icons/fi";

export default function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState("Inhale"); // Inhale (4s), Hold (4s), Exhale (4s)
  const [timer, setTimer] = useState(4);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 1) return prev - 1;

          // Transition phase
          setPhase((currentPhase) => {
            if (currentPhase === "Inhale") return "Hold";
            if (currentPhase === "Hold") return "Exhale";
            return "Inhale";
          });
          return 4;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const reset = () => {
    setIsActive(false);
    setPhase("Inhale");
    setTimer(4);
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-4 text-teal-600 dark:text-teal-400 font-semibold text-lg">
        <FiWind size={22} />
        <span>Box Breathing Guide</span>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
        Reduce anxiety instantly by matching your breath with the calm rhythm.
      </p>

      {/* Circle Animation */}
      <div className="relative w-36 h-36 flex items-center justify-center mb-6">
        <div
          className={`absolute inset-0 rounded-full border-4 transition-all duration-1000 ease-in-out ${
            phase === "Inhale"
              ? "scale-110 border-teal-500 bg-teal-500/10"
              : phase === "Hold"
              ? "scale-110 border-amber-500 bg-amber-500/10"
              : "scale-90 border-slate-400 bg-slate-500/10"
          }`}
        />
        <div className="z-10 flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
            {isActive ? phase : "Ready"}
          </span>
          <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
            {timer}s
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsActive(!isActive)}
          className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium text-sm transition-all flex items-center gap-2 shadow-xs"
        >
          {isActive ? <FiPause /> : <FiPlay />}
          <span>{isActive ? "Pause" : "Start Exercise"}</span>
        </button>

        <button
          onClick={reset}
          aria-label="Reset exercise"
          className="p-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
        >
          <FiRotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
