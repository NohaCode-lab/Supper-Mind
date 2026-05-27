
import i18n from 'i18n';
import { initReactI18next } from 'react-i18next';
import enTranslation from './en.json';
import deTranslation from './de.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      de: { translation: deTranslation }
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;