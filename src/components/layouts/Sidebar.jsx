import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FiGrid,
  FiMessageSquare,
  FiCheckSquare,
  FiBookOpen,
  FiSmile,
  FiWind,
  FiSettings,
  FiX,
  FiHeart,
} from "react-icons/fi";
import { useAppStore } from "../../stores/useAppStore";

export default function Sidebar() {
  const { t } = useTranslation();
  const { isMobileMenuOpen, closeMobileMenu } = useAppStore();

  const navItems = [
    { path: "/dashboard", label: t("navigation.dashboard", "Dashboard"), icon: FiGrid },
    { path: "/chat", label: t("navigation.chat", "AI Companion"), icon: FiMessageSquare },
    { path: "/habits", label: t("navigation.habits", "Habits Tracker"), icon: FiCheckSquare },
    { path: "/journal", label: t("navigation.journal", "Daily Journal"), icon: FiBookOpen },
    { path: "/mood", label: t("navigation.mood", "Mood Analytics"), icon: FiSmile },
    { path: "/stress", label: t("navigation.stress", "Stress Check-in"), icon: FiWind },
    { path: "/settings", label: t("navigation.settings", "Settings"), icon: FiSettings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 rtl:left-auto rtl:right-0 z-50 w-64 bg-white dark:bg-slate-900 border-r rtl:border-r-0 rtl:border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 shrink-0 ${
          isMobileMenuOpen
            ? "translate-x-0 md:transform-none"
            : "-translate-x-full rtl:translate-x-full md:transform-none"
        }`}
      >
        <div>
          {/* Logo Header */}
          <div className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <NavLink
              to="/dashboard"
              onClick={closeMobileMenu}
              className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-slate-100"
            >
              <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md">
                <FiHeart size={18} />
              </div>
              <span>
                Supper<span className="text-teal-600 dark:text-teal-400">Mind</span>
              </span>
            </NavLink>

            <button
              onClick={closeMobileMenu}
              className="md:hidden p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              aria-label={t("common.close", "Close menu")}
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                      isActive
                        ? "bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/40 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Brand Info */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-slate-800/50 border border-teal-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
              🌱 {t("navigation.brandSubtitle", "SaaS Wellness Platform")}
            </p>
            <p>{t("navigation.brandTagline", "Empowering mental clarity & healthy habits daily.")}</p>
          </div>
        </div>
      </aside>
    </>
  );
}