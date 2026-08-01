import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiUser, FiGlobe, FiMoon, FiCheck, FiRefreshCw } from "react-icons/fi";
import { useAppStore } from "../stores/useAppStore";
import { useAuthStore } from "../stores/useAuthStore";
import { profileSchema } from "../utils/validators";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme, primaryGoal, setPrimaryGoal, aiTone, setAiTone, setOnboardingComplete } = useAppStore();
  const { currentUser, setUser } = useAuthStore();

  const [fullName, setFullName] = useState(currentUser?.user_metadata?.full_name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [goal, setGoal] = useState(primaryGoal || "stress");
  const [tone, setTone] = useState(aiTone || "Empathetic & Soothing");

  const [errors, setErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setErrors({});
    setIsSaved(false);

    const validation = profileSchema.safeParse({
      fullName,
      email,
      primaryGoal: goal,
      aiTone: tone,
    });

    if (!validation.success) {
      const fieldErrors = {};
      validation.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setUser({
      ...currentUser,
      email,
      user_metadata: { ...currentUser?.user_metadata, full_name: fullName },
    });
    setPrimaryGoal(goal);
    setAiTone(tone);

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
          <FiUser className="text-teal-600 dark:text-teal-400" />
          {t("settings.title", "Account & SaaS Settings")}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t("settings.subtitle", "Manage your personal profile, AI coach preferences, and application settings.")}
        </p>
      </header>

      {/* Profile Form */}
      <Card>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
          <FiUser className="text-teal-500" /> {t("settings.profileTitle", "User Profile Information")}
        </h2>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={t("settings.fullName", "Full Name")}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
              placeholder="Your Full Name"
            />
            <Input
              label={t("settings.email", "Email Address")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="you@example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("settings.primaryGoal", "Primary Wellness Goal")}
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm transition-all"
              >
                <option value="stress">Stress & Anxiety Relief</option>
                <option value="habits">Build Healthy Habits</option>
                <option value="mood">Track Mood Patterns</option>
                <option value="mindfulness">Mindfulness & Gratitude</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t("settings.aiTone", "AI Coach Persona Tone")}
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm transition-all"
              >
                <option value="Empathetic & Soothing">Empathetic & Soothing</option>
                <option value="Direct & Action-Oriented">Direct & Action-Oriented</option>
                <option value="Guided & Reflective">Guided & Reflective</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Button type="submit">{t("settings.saveBtn", "Save Changes")}</Button>
            {isSaved && (
              <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                <FiCheck /> {t("settings.savedSuccess", "Settings saved successfully!")}
              </span>
            )}
          </div>
        </form>
      </Card>

      {/* Preferences & System Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <FiMoon className="text-amber-500" /> {t("settings.themeTitle", "Interface & Theme")}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            {t("settings.themeDesc", "Switch between light and dark modes according to your preference.")}
          </p>
          <Button variant="outline" onClick={toggleTheme} className="w-full">
            {t("settings.toggleTheme", "Toggle")} {isDarkMode ? t("settings.lightMode", "Light Mode ☀️") : t("settings.darkMode", "Dark Mode 🌙")}
          </Button>
        </Card>

        <Card>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <FiGlobe className="text-teal-500" /> {t("settings.langTitle", "Language & Regional")}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            {t("settings.langDesc", "Active Language:")} <strong className="uppercase">{i18n.language || "EN"}</strong>
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => i18n.changeLanguage("en")} className="flex-1 text-xs">🇬🇧 EN</Button>
            <Button variant="outline" onClick={() => i18n.changeLanguage("de")} className="flex-1 text-xs">🇩🇪 DE</Button>
            <Button variant="outline" onClick={() => i18n.changeLanguage("ar")} className="flex-1 text-xs">🇸🇦 AR</Button>
          </div>
        </Card>
      </div>

      {/* Onboarding Reset */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2 text-sm">
              <FiRefreshCw className="text-teal-500" /> {t("settings.onboardingResetTitle", "Re-run Setup Wizard")}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t("settings.onboardingResetDesc", "Want to re-select your initial goals or starter habits?")}
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setOnboardingComplete(false)}>
            {t("settings.launchWizard", "Launch Wizard")}
          </Button>
        </div>
      </Card>
    </div>
  );
}