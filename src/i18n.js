import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import de from "./locales/de.json";
import ar from "./locales/ar.json";

const SAVED_LANG_KEY = "suppermind-lang";
const savedLang = localStorage.getItem(SAVED_LANG_KEY) || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      ar: { translation: ar },
    },
    lng: savedLang,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

// Apply RTL / LTR dynamically whenever language changes
const applyLayoutDirection = (lang) => {
  const isRtl = lang === "ar";
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.documentElement.lang = lang;
  localStorage.setItem(SAVED_LANG_KEY, lang);
};

// Initial layout direction
applyLayoutDirection(savedLang);

i18n.on("languageChanged", (lng) => {
  applyLayoutDirection(lng);
});

export default i18n;
