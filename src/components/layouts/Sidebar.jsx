import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Sidebar() {
  const { t } = useTranslation();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-indigo-600 text-white shadow-md"
        : "text-gray-300 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <aside className="w-64 hidden md:flex flex-col border-r border-white/10 bg-white/5 backdrop-blur-md p-5">

      {/* App Title */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">
          🧠 Supper Mind
        </h1>

        <p className="text-xs text-gray-400 mt-1">
          {t("ai")} Mental Support SaaS
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 text-sm">

        <NavLink to="/" className={linkClass}>
          🏠 {t("dashboard")}
        </NavLink>

        <NavLink to="/dashboard" className={linkClass}>
          📊 {t("dashboard")}
        </NavLink>

        <NavLink to="/journal" className={linkClass}>
          📓 {t("journal")}
        </NavLink>

        <NavLink to="/mood" className={linkClass}>
          😊 {t("mood")}
        </NavLink>

        <NavLink to="/chat" className={linkClass}>
          🤖 {t("ai")}
        </NavLink>

      </nav>

      {/* Bottom Section */}
      <div className="mt-auto pt-6 border-t border-white/10 text-xs text-gray-500">
        {t("welcome")}
      </div>

    </aside>
  );
}

export default Sidebar;