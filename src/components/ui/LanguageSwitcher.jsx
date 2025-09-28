import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSwitcher = ({ className = "" }) => {
  const { language, switchLanguage, isIndonesian, isEnglish } = useLanguage();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        onClick={() => switchLanguage('id')}
        className={`text-sm font-medium cursor-pointer transition-all duration-300 ${
          isIndonesian
            ? 'text-white font-bold'
            : 'text-white opacity-60 hover:opacity-100'
        }`}
      >
        ID
      </span>
      <span className="text-white opacity-40">|</span>
      <span
        onClick={() => switchLanguage('en')}
        className={`text-sm font-medium cursor-pointer transition-all duration-300 ${
          isEnglish
            ? 'text-white font-bold'
            : 'text-white opacity-60 hover:opacity-100'
        }`}
      >
        ENG
      </span>
    </div>
  );
};

export default LanguageSwitcher;