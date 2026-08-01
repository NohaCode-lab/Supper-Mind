import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMenu, FiSun, FiMoon, FiGlobe, FiLogOut, FiUser, FiZap } from "react-icons/fi";
import { useAppStore } from "../../stores/useAppStore";
import { useAuth } from "../../hooks/useAuth";
import PricingModal from "../../features/subscription/PricingModal";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme, toggleMobileMenu } = useAppStore();
  const { currentUser, signOut } = useAuth();
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLang = i18n.language?.startsWith("en") ? "de" : "en";
    i18n.changeLanguage(nextLang);
  };

  return (
    <>
      <header className="h-16 px-4 md:px-6 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between shrink-0 transition-colors duration-300">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            <FiMenu size={20} />
          </button>

          <h2 className="hidden md:block text-lg font-semibold text-slate-800 dark:text-slate-100">
            {t("nav.greeting", "Welcome back")},{" "}
            <span className="text-teal-600 dark:text-teal-400">
              {currentUser?.user_metadata?.full_name?.split(" ")[0] || "Friend"}
            </span>
          </h2>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Upgrade Pro Badge */}
          <button
            onClick={() => setIsPricingOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold transition-all"
          >
            <FiZap className="text-amber-500" /> Upgrade Pro
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 p-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Switch language"
            title="Switch language (EN/DE)"
          >
            <FiGlobe size={16} />
            <span className="uppercase tracking-wider">
              {i18n.language?.substring(0, 2) || "EN"}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle color scheme"
            title="Toggle Theme"
          >
            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* User Info & Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-tight">
                {currentUser?.user_metadata?.full_name || "Guest User"}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                {currentUser?.email || "guest@suppermind.com"}
              </span>
            </div>

            <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800 shadow-xs shrink-0">
              <FiUser size={16} />
            </div>

            <button
              onClick={signOut}
              className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"
              aria-label="Sign out of application"
              title="Sign out"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Stripe Pricing & Entitlement Modal */}
      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
    </>
  );
}