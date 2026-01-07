import { useState, useEffect, useCallback } from 'react';
import { translations, Language } from '@/i18n/translations';

const STORAGE_KEY = 'cyberlens-language';

export function useTranslation() {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && ['en', 'fr', 'ar'].includes(saved)) {
        return saved as Language;
      }
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = translations[language];

  const isRTL = language === 'ar';

  return { t, language, setLanguage, isRTL };
}
