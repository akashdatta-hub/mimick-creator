import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation } from '@/translations';

export type Language = 'hi' | 'en';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, fallback?: string, replacements?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

// Get saved language from localStorage or default to Hindi
const getSavedLanguage = (): Language => {
  if (typeof window === 'undefined') return 'hi';
  const saved = localStorage.getItem('mimick-language');
  return (saved === 'en' || saved === 'hi') ? saved : 'hi';
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(getSavedLanguage());

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('mimick-language', language);
  };

  // Translation function with replacements support
  const t = (key: string, fallback?: string, replacements?: Record<string, string>): string => {
    return getTranslation(currentLanguage, key, fallback, replacements);
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};