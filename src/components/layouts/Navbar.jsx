import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FiMenu, FiSun, FiMoon, FiLogOut, FiUser, FiZap, FiLogIn } from "react-icons/fi";
import { useAppStore } from "../../stores/useAppStore";
import { useAuth } from "../../hooks/useAuth";
import { getUserDisplayName } from "../../utils/helper";
import PricingModal from "../../features/subscription/PricingModal";
import LanguageSwitcher from "../shared/LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme, toggleMobileMenu } = useAppStore();
  const { currentUser, signOut } = useAuth();
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  const displayName = getUserDisplayName(currentUser, t);

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
            {t("navigation.greeting", "Welcome back")},{" "}
            <span className="text-teal-600 dark:text-teal-400">{displayName}</span>
          </h2>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Upgrade Pro Badge */}
          <button
            onClick={() => setIsPricingOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold transition-all"
          >
            <FiZap className="text-amber-500" /> {t("navigation.upgradePro", "Upgrade Pro")}
          </button>

          {/* Interactive Language Selector Dropdown */}
          <LanguageSwitcher />

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

          {/* User Info & Actions */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                <div className="hidden sm:flex flex-col items-end rtl:items-start">
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-tight">
                    {currentUser?.user_metadata?.full_name || displayName}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                    {currentUser.email}
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800 shadow-xs shrink-0">
                  <FiUser size={16} />
                </div>

                <button
                  onClick={signOut}
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  aria-label={t("navigation.signOut", "Sign out")}
                  title={t("navigation.signOut", "Sign out")}
                >
                  <FiLogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <div className="hidden sm:flex flex-col items-end rtl:items-start">
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-tight">
                    {t("navigation.guest", "Guest")}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                    {t("navigation.guestUser", "Guest User")}
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-xs shrink-0">
                  <FiUser size={16} />
                </div>

                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
                >
                  <FiLogIn size={14} />
                  <span>{t("auth.signInBtn", "Sign In")}</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Stripe Pricing & Entitlement Modal */}
      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
    </>
  );
}