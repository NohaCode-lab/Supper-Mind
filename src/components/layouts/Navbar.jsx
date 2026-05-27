import { useTranslation } from 'react-i18next';
import { FiMenu, FiSun, FiMoon, FiGlobe, FiLogOut, FiUser } from 'react-icons/fi';
import { useAppContext } from '../../context/AppContext';
import { useAppStore } from '../../context/useAppStore';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { toggleMobileMenu } = useAppContext();
  const { isDarkMode, toggleTheme } = useAppStore();
  const { currentUser, signOut } = useAuth();

  // Direct, un-abstracted language toggle logic
  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('en') ? 'de' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <header className="h-16 px-4 md:px-6 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between shrink-0 transition-colors duration-300">
      
      {/* Left Section: Mobile Menu & Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Open menu"
        >
          <FiMenu size={20} />
        </button>
        
        {/* Optional: Show page title or greeting here on desktop */}
        <h2 className="hidden md:block text-lg font-medium text-slate-800 dark:text-slate-100">
          {t('nav.greeting', 'Welcome back')}
        </h2>
      </div>

      {/* Right Section: Global Controls */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* 1. Language Toggle (EN/DE) */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 p-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          title={t('nav.toggle_language', 'Switch Language')}
        >
          <FiGlobe size={18} />
          <span className="uppercase tracking-wider">{i18n.language.substring(0, 2)}</span>
        </button>

        {/* 2. Theme Toggle (Light/Dark) */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          title={t('nav.toggle_theme', 'Toggle Theme')}
        >
          {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 md:mx-2" />

        {/* 3. User Profile & Logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-tight">
              {currentUser?.user_metadata?.full_name || t('nav.guest', 'Guest')}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
              {currentUser?.email || ''}
            </span>
          </div>
          
          <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800 shadow-sm shrink-0">
            <FiUser size={16} />
          </div>

          <button
            onClick={signOut}
            className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"
            title={t('nav.logout', 'Sign out')}
          >
            <FiLogOut size={18} />
          </button>
        </div>

      </div>
    </header>
  );
}