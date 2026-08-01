import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function BreathingExercise() {
  const { t } = useTranslation();
  const [phase, setPhase] = useState("ready"); // ready, inhale, hold, exhale
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;
    if (isActive) {
      if (phase === "ready" || phase === "exhale") {
        setPhase("inhale");
        timer = setTimeout(() => setPhase("hold"), 4000);
      } else if (phase === "inhale") {
        timer = setTimeout(() => setPhase("hold"), 4000);
      } else if (phase === "hold") {
        timer = setTimeout(() => setPhase("exhale"), 4000);
      }
    } else {
      setPhase("ready");
    }
    return () => clearTimeout(timer);
  }, [isActive, phase]);

  const getPhaseText = () => {
    switch (phase) {
      case "inhale":
        return t("stress.inhale", "Inhale");
      case "hold":
        return t("stress.hold", "Hold");
      case "exhale":
        return t("stress.exhale", "Exhale");
      default:
        return t("stress.ready", "Ready");
    }
  };

  const getCircleScale = () => {
    switch (phase) {
      case "inhale":
        return 1.4;
      case "hold":
        return 1.4;
      case "exhale":
        return 1.0;
      default:
        return 1.0;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
        {t("stress.breathingTitle", "Box Breathing Guide")}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
        {t("stress.breathingSubtitle", "Reduce anxiety instantly by matching your breath with the calm rhythm.")}
      </p>

      {/* Circle Animation */}
      <div className="relative w-44 h-44 flex items-center justify-center mb-8">
        <motion.div
          animate={{ scale: getCircleScale() }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-teal-500/20 border-2 border-teal-500/50"
        />
        <div className="z-10 font-bold text-lg text-teal-700 dark:text-teal-400 uppercase tracking-widest">
          {getPhaseText()}
        </div>
      </div>

      <button
        onClick={() => setIsActive(!isActive)}
        className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium text-sm transition-all shadow-xs"
      >
        {isActive ? t("stress.pause", "Pause") : t("stress.start", "Start Exercise")}
      </button>
    </div>
  );
}
