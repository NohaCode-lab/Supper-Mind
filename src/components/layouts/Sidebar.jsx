import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiHome, FiGrid, FiMessageSquare, FiSettings, FiX, FiActivity, FiBookOpen } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { useAppContext } from "../../context/AppContext";

export default function Sidebar() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  
  // جلب أدوات التحكم في القائمة الجانبية من السياق العام للتطبيق
  const appContext = useAppContext() || {};
  const isMobileMenuOpen = appContext.isMobileMenuOpen || false;
  const toggleMobileMenu = appContext.toggleMobileMenu || (() => {});

  // تعريف روابط التنقل مع تحديد هل هي عامة أم محمية
  const navLinks = [
    { 
      path: "/", 
      label: t("nav.home", "Home"), 
      icon: <FiHome size={22} />, 
      public: true 
    },
    { 
      path: "/dashboard", 
      label: t("nav.dashboard", "Dashboard"), 
      icon: <FiGrid size={22} />, 
      protected: true 
    },
    { 
      path: "/chat", 
      label: t("nav.chat", "AI Chat"), 
      icon: <FiMessageSquare size={22} />, 
      protected: true 
    },
    { 
      path: "/settings", 
      label: t("nav.settings", "Settings"), 
      icon: <FiSettings size={22} />, 
      protected: true 
    },
    { 
      path: "/journal", 
      label: t("nav.journal", "Journal"), 
      icon: <FiBookOpen size={22} />, 
      protected: true 
    },
  ];

  // فلترة الروابط بناءً على حالة تسجيل الدخول
  const filteredLinks = navLinks.filter(
    (link) => link.public || (link.protected && isAuthenticated)
  );

  return (
    <>
      {/* خلفية معتمة للهواتف المحمولة عند فتح القائمة */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* الحاوية الرئيسية للشريط الجانبي */}
      <aside
        className={`fixed inset-y-0 start-0 z-30 flex h-full w-64 flex-col border-e border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* الشعار */}
        <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
          <span className="text-xl font-bold bg-linear-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
            Supper Mind
          </span>
          <button
            onClick={toggleMobileMenu}
            className="p-2 -mr-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 md:hidden"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* الروابط */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
          {filteredLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => isMobileMenuOpen && toggleMobileMenu()}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
                }`
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* الجزء السفلي من القائمة */}
        <div className="shrink-0 border-t border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50 px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
            <FiActivity size={20} className="text-teal-600 dark:text-teal-400" />
            <span className="font-medium">{t("nav.wellness", "Mental Wellness")}</span>
          </div>
        </div>
      </aside>
    </>
  );
}