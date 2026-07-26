import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import translations from '../i18n/translations';
import { useGame } from './GameContext';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const { language: savedLang, setLanguage } = useGame();
  const [lang, setLang] = useState(savedLang || 'en');

  // Sync from GameContext hydration
  useEffect(() => {
    if (savedLang && savedLang !== lang) {
      setLang(savedLang);
    }
  }, [savedLang]);

  const toggleLang = useCallback(() => {
    const next = lang === 'en' ? 'zh' : 'en';
    setLang(next);
    setLanguage(next);
  }, [lang, setLanguage]);

  const t = useCallback(
    (path) => {
      const keys = path.split('.');
      let val = translations[lang];
      for (const key of keys) {
        val = val?.[key];
      }
      return val ?? path;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
