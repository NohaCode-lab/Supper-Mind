import { NavLink } from 'react-router-dom';
import { FiHome, FiMessageSquare, FiPieChart, FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';

export default function Sidebar() {
  const { t } = useTranslation();
  const { isMobileMenuOpen, closeMobileMenu } = useAppContext();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 dark:bg-slate-900/60 backdrop-blur-sm z-20 md:hidden transition-opacity"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        
        {/* Brand Header with Mobile Close Button */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
           <h1 className="text-xl font-semibold bg-linear-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent tracking-tight">
             Supper Mind
           </h1>
           <button 
             onClick={closeMobileMenu}
             className="md:hidden p-2 -mr-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
             aria-label="Close menu"
           >
             <FiX size={20} />
           </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 font-medium'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100'
              }`
            }
          >
            <FiHome size={18} className="shrink-0" />
            <span>{t('nav.home', 'Home')}</span>
          </NavLink>

          <NavLink
            to="/dashboard"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 font-medium'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100'
              }`
            }
          >
            <FiPieChart size={18} className="shrink-0" />
            <span>{t('nav.dashboard', 'Wellness Dashboard')}</span>
          </NavLink>

          <NavLink
            to="/chat"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 font-medium'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100'
              }`
            }
          >
            <FiMessageSquare size={18} className="shrink-0" />
            <span>{t('nav.chat', 'AI Support')}</span>
          </NavLink>
        </nav>

        {/* Bottom Action Area (Emotional Wellness Touch) */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0">
           <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 text-center border border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                {t('sidebar.breathe_prompt', 'Need a moment?')}
              </p>
              <button className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm">
                {t('sidebar.breathe_btn', 'Take a Breath')}
              </button>
           </div>
        </div>
      </aside>
    </>
  );
} 