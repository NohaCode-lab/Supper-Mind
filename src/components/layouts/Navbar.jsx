import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiMoon, FiSun, FiGlobe } from 'react-icons/fi';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  
  // Direct variable for theme state
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Direct variable for current language state
  const currentLanguage = i18n.language || 'en';

  const toggleLanguage = () => {
    const nextLang = currentLanguage === 'en' ? 'de' : 'en';
    i18n.changeLanguage(nextLang);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Future integration: document.documentElement.classList.toggle('dark')
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md flex items-center justify-between px-6 z-10 sticky top-0 transition-colors duration-300">
      
      {/* Left Side: Mobile Menu & Title */}
      <div className="flex items-center gap-4">
         <button 
           className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
           aria-label={t('navbar.openMenu', 'Open Menu')}
         >
           <FiMenu size={20} />
         </button>
         <h2 className="text-lg font-medium text-slate-800 dark:text-slate-100 md:hidden">
            Supper Mind
         </h2>
      </div>

      {/* Right Side: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Language Toggle */}
        <button 
          onClick={toggleLanguage} 
          className="p-2 text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-2 text-sm font-medium"
          title={t('navbar.switchLanguage', 'Switch Language')}
        >
           <FiGlobe size={18} />
           <span className="uppercase tracking-wider">{currentLanguage}</span>
        </button>
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          title={t('navbar.toggleTheme', 'Toggle Theme')}
        >
          {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        {/* User Avatar */}
        <div 
          className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-700 dark:text-teal-300 font-semibold text-sm border border-teal-200 dark:border-teal-800 cursor-pointer"
          title={t('navbar.profile', 'User Profile')}
        >
          U
        </div>
      </div>
    </header>
  );
}