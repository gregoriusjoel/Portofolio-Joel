import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSwitcher = ({ className = "" }) => {
  const { language, switchLanguage, isIndonesian, isEnglish } = useLanguage();

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <button
        onClick={() => switchLanguage('id')}
        className={`text-xs sm:text-sm font-medium cursor-pointer transition-all duration-300 px-2 py-1 rounded hover:bg-white/10 ${
          isIndonesian
            ? 'text-white font-bold bg-accent-500/20'
            : 'text-white opacity-60 hover:opacity-100'
        }`}
        aria-label="Switch to Indonesian"
      >
        ID
      </button>
      <span className="text-white opacity-40 text-xs sm:text-sm">|</span>
      <button
        onClick={() => switchLanguage('en')}
        className={`text-xs sm:text-sm font-medium cursor-pointer transition-all duration-300 px-2 py-1 rounded hover:bg-white/10 ${
          isEnglish
            ? 'text-white font-bold bg-accent-500/20'
            : 'text-white opacity-60 hover:opacity-100'
        }`}
        aria-label="Switch to English"
      >
        ENG
      </button>
    </div>
  );
};

export default LanguageSwitcher;