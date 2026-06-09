import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMoon, FiSun, FiGlobe, FiUser, FiLock } from "react-icons/fi";
import { useAppStore } from "../stores/useAppStore";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../services/supabase";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useAppStore();
  const { currentUser } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setMessage({ type: "error", text: t("settings.password_length_error", "Password must be at least 6 characters.") });
      return;
    }

    setIsUpdating(true);
    setMessage({ type: "", text: "" });

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      
      setMessage({ type: "success", text: t("settings.password_success", "Password updated successfully!") });
      setNewPassword("");
    } catch (error) {
      setMessage({ type: "error", text: error.message || t("settings.password_error", "Failed to update password.") });
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith("en") ? "de" : "en";
    i18n.changeLanguage(nextLang);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* عنوان الصفحة */}
      <header>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          {t("settings.title", "Settings")}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          {t("settings.subtitle", "Manage your account preferences and app settings.")}
        </p>
      </header>

      <div className="space-y-6">
        {/* قسم الملف الشخصي */}
        <section className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <FiUser className="text-teal-600 dark:text-teal-400" />
            {t("settings.profile", "Profile Information")}
          </h2>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-slate-500 dark:text-slate-400">{t("settings.email", "Email Address")}</div>
            <div className="font-medium text-slate-900 dark:text-slate-100">{currentUser?.email || "Not available"}</div>
          </div>
        </section>

        {/* قسم التفضيلات */}
        <section className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <FiGlobe className="text-teal-600 dark:text-teal-400" />
            {t("settings.preferences", "Preferences")}
          </h2>
          
          <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="font-medium text-slate-900 dark:text-slate-100">{t("settings.theme", "Appearance")}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{t("settings.theme_desc", "Toggle between light and dark mode")}</div>
            </div>
            <button
              onClick={toggleTheme}
              className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors shadow-sm"
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <div className="font-medium text-slate-900 dark:text-slate-100">{t("settings.language", "Language")}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{t("settings.language_desc", "Change the application language")}</div>
            </div>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium uppercase tracking-wider text-sm shadow-sm"
            >
              {i18n.language.substring(0, 2)}
            </button>
          </div>
        </section>

        {/* قسم الأمان */}
        <section className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <FiLock className="text-teal-600 dark:text-teal-400" />
            {t("settings.security", "Security")}
          </h2>
          
          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-sm">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t("settings.new_password", "New Password")}
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-teal-500"
              />
            </div>

            {message.text && (
              <div className={`p-3 rounded-lg text-sm ${message.type === "error" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isUpdating || !newPassword}
              className="rounded-lg bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-slate-900 transition-colors"
            >
              {isUpdating ? t("settings.updating", "Updating...") : t("settings.update_password", "Update Password")}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}