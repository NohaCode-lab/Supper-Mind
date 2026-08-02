import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiHeart, FiSmile, FiTarget, FiWind, FiX } from "react-icons/fi";
import { useAppStore } from "../../stores/useAppStore";
import { useHabitStore } from "../../stores/useHabitStore";

const GOALS = [
  { id: "stress", label: "Stress & Anxiety Relief", icon: FiWind },
  { id: "habits", label: "Build Healthy Habits", icon: FiTarget },
  { id: "mood", label: "Track Mood Patterns", icon: FiSmile },
  { id: "mindfulness", label: "Mindfulness & Gratitude", icon: FiHeart },
];

const STARTER_HABITS = [
  "2-min Box Breathing",
  "Drink 8 glasses of water",
  "Daily gratitude note",
  "10-min evening walk",
];

const AI_TONES = [
  "Empathetic & Soothing",
  "Direct & Action-Oriented",
  "Guided & Reflective",
];

export default function OnboardingModal() {
  const { t } = useTranslation();
  const { hasCompletedOnboarding, setOnboardingComplete, setPrimaryGoal, setAiTone } = useAppStore();
  const { addHabit } = useHabitStore();
  const modalRef = useRef(null);

  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState("stress");
  const [selectedHabits, setSelectedHabits] = useState(["2-min Box Breathing"]);
  const [selectedTone, setSelectedTone] = useState("Empathetic & Soothing");

  useEffect(() => {
    if (hasCompletedOnboarding) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOnboardingComplete(true);
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasCompletedOnboarding, setOnboardingComplete]);

  if (hasCompletedOnboarding) return null;

  const toggleHabitSelection = (habit) => {
    if (selectedHabits.includes(habit)) {
      setSelectedHabits(selectedHabits.filter((h) => h !== habit));
    } else {
      setSelectedHabits([...selectedHabits, habit]);
    }
  };

  const handleFinish = () => {
    setPrimaryGoal(selectedGoal);
    setAiTone(selectedTone);
    selectedHabits.forEach((habitName) => addHabit(habitName));
    setOnboardingComplete(true);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setOnboardingComplete(true);
      }}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6 relative"
      >
        {/* Progress Bar & Dismiss Button */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-2">
            <span>{t("onboarding.step", "Step")} {step} {t("onboarding.of", "of")} 3</span>
            <div className="flex gap-1.5 ml-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-6 h-1.5 rounded-full transition-all ${
                    s <= step ? "bg-teal-600" : "bg-slate-200 dark:bg-slate-800"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => setOnboardingComplete(true)}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
            aria-label={t("common.close", "Close")}
            title={t("common.close", "Close")}
          >
            <FiX size={18} />
          </button>
        </div>


        {/* Step 1: Goals */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {t("onboarding.title", "Welcome to Supper Mind 👋")}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t("onboarding.subtitle", "What is your primary wellness goal today?")}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {GOALS.map((g) => {
                const Icon = g.icon;
                const isSelected = selectedGoal === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id)}
                    className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition-all ${
                      isSelected
                        ? "bg-teal-50 dark:bg-teal-950/50 border-teal-500 ring-2 ring-teal-500/20"
                        : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <Icon className={isSelected ? "text-teal-600" : "text-slate-400"} size={20} />
                    <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                      {g.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Starter Habits */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {t("onboarding.starterHabitsTitle", "Starter Habits")}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t("onboarding.starterHabitsSubtitle", "Select daily habits you want to track from day one.")}
            </p>

            <div className="space-y-2.5 pt-2">
              {STARTER_HABITS.map((habit) => {
                const isSelected = selectedHabits.includes(habit);
                return (
                  <button
                    key={habit}
                    onClick={() => toggleHabitSelection(habit)}
                    className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                      isSelected
                        ? "bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-800 dark:text-teal-200"
                        : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span className="text-xs font-medium">{habit}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? "bg-teal-600 border-teal-600 text-white" : "border-slate-300"
                      }`}
                    >
                      {isSelected && <FiCheck size={12} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: AI Tone */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {t("onboarding.aiToneTitle", "AI Coach Persona")}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t("onboarding.aiToneSubtitle", "How would you like your AI wellness companion to speak with you?")}
            </p>

            <div className="space-y-2.5 pt-2">
              {AI_TONES.map((tone) => {
                const isSelected = selectedTone === tone;
                return (
                  <button
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className={`w-full p-4 rounded-2xl border text-left font-medium text-xs transition-all ${
                      isSelected
                        ? "bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-800 dark:text-teal-200 ring-2 ring-teal-500/20"
                        : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {tone}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              {t("onboarding.back", "Back")}
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2.5 rounded-xl text-xs transition-all shadow-xs"
            >
              {t("onboarding.continue", "Continue")}
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2.5 rounded-xl text-xs transition-all shadow-xs"
            >
              {t("onboarding.complete", "Complete Setup ✨")}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
