import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiChevronDown } from "react-icons/fi";

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
];

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLangCode = i18n.language?.substring(0, 2) || "en";
  const currentLang = LANGUAGES.find((l) => l.code === currentLangCode) || LANGUAGES[0];

  const handleSelectLanguage = (lang) => {
    i18n.changeLanguage(lang.code);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all border border-slate-200/70 dark:border-slate-800"
        aria-label={t("navigation.switchLang", "Select language")}
        title={t("navigation.switchLang", "Select language")}
      >
        <span className="text-sm">{currentLang.flag}</span>
        <span className="uppercase font-bold tracking-wider">{currentLang.code}</span>
        <FiChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[10px] uppercase font-extrabold tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
            {t("settings.switchLang", "Select Language")}
          </div>
          {LANGUAGES.map((lang) => {
            const isSelected = currentLangCode === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                  isSelected
                    ? "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 font-semibold"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
                {isSelected && <FiCheck size={14} className="text-teal-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}