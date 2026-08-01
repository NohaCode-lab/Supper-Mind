import { useState } from "react";
import { FiCheck, FiHeart, FiTarget, FiSmile, FiArrowRight } from "react-icons/fi";
import { useAppStore } from "../../stores/useAppStore";
import { useHabitStore } from "../../stores/useHabitStore";
import Button from "../../components/ui/Button";

const GOALS = [
  { id: "stress", title: "Stress & Anxiety Relief", icon: "🧘‍♂️", desc: "Lower stress with box breathing and AI check-ins." },
  { id: "habits", title: "Build Healthy Habits", icon: "🔥", desc: "Maintain daily consistency with streak monitoring." },
  { id: "mood", title: "Track Mood Patterns", icon: "📊", desc: "Log daily emotions and unlock mental health insights." },
  { id: "mindfulness", title: "Mindfulness & Gratitude", icon: "🌱", desc: "Journal daily reflections and foster self-awareness." },
];

const STARTER_HABITS = [
  "10-min Morning Meditation",
  "Drink 2L Water Daily",
  "Evening Gratitude Journal",
  "30-min Outdoor Walk",
  "Digital Detox Before Sleep",
];

export default function OnboardingModal() {
  const { hasCompletedOnboarding, setOnboardingComplete, setPrimaryGoal, setAiTone } = useAppStore();
  const { addHabit } = useHabitStore();

  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState("stress");
  const [selectedHabits, setSelectedHabits] = useState(["10-min Morning Meditation", "Drink 2L Water Daily"]);
  const [tone, setTone] = useState("Empathetic & Soothing");

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
    setAiTone(tone);
    selectedHabits.forEach((h) => addHabit(h));
    setOnboardingComplete(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400">
            <FiHeart size={14} /> Supper Mind Setup
          </span>
          <span>Step {step} of 3</span>
        </div>

        {/* Step 1: Goal Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Welcome to Supper Mind 👋
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                What is your primary wellness goal today?
              </p>
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto">
              {GOALS.map((g) => (
                <div
                  key={g.id}
                  onClick={() => setSelectedGoal(g.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    selectedGoal === g.id
                      ? "bg-teal-50/70 dark:bg-teal-950/50 border-teal-500 ring-2 ring-teal-500/20"
                      : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 hover:border-slate-300"
                  }`}
                >
                  <span className="text-2xl mt-0.5">{g.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                      {g.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={() => setStep(2)} className="w-full">
              Continue <FiArrowRight className="ml-1" />
            </Button>
          </div>
        )}

        {/* Step 2: Habit Goals */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <FiTarget className="text-teal-500" /> Starter Habits
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Select daily habits you want to track from day one.
              </p>
            </div>

            <div className="space-y-2">
              {STARTER_HABITS.map((habit) => {
                const isSelected = selectedHabits.includes(habit);
                return (
                  <div
                    key={habit}
                    onClick={() => toggleHabitSelection(habit)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-sm ${
                      isSelected
                        ? "bg-teal-50/70 dark:bg-teal-950/40 border-teal-500 text-teal-700 dark:text-teal-300"
                        : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span className="font-medium">{habit}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? "bg-teal-600 border-teal-600 text-white" : "border-slate-300 dark:border-slate-600"
                      }`}
                    >
                      {isSelected && <FiCheck size={12} />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep(3)} className="flex-1">
                Continue <FiArrowRight className="ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: AI Assistant Persona */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <FiSmile className="text-teal-500" /> AI Coach Persona
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                How would you like your AI wellness companion to speak with you?
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { name: "Empathetic & Soothing", desc: "Warm, gentle, and deeply supportive." },
                { name: "Direct & Action-Oriented", desc: "Clear, practical, and focused on solutions." },
                { name: "Guided & Reflective", desc: "Asks thoughtful questions to foster self-awareness." },
              ].map((t) => (
                <div
                  key={t.name}
                  onClick={() => setTone(t.name)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    tone === t.name
                      ? "bg-teal-50/70 dark:bg-teal-950/50 border-teal-500 ring-2 ring-teal-500/20"
                      : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800"
                  }`}
                >
                  <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100">{t.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleFinish} className="flex-1">
                Complete Setup ✨
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
