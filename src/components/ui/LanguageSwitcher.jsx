import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSwitcher = ({ className = "", dark = false }) => {
  const { switchLanguage, isIndonesian, isEnglish } = useLanguage();

  return (
    <div 
      className={`relative inline-grid grid-cols-2 p-1 w-[80px] h-[32px] rounded-full border backdrop-blur-md select-none transition-all duration-300 ${
        dark
          ? 'bg-gray-100 border-gray-200/90 shadow-inner'
          : 'bg-white/10 border-white/20 shadow-inner'
      } ${className}`}
    >
      {/* Mathematically Symmetrical Sliding Pill */}
      <div 
        className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full shadow-md pointer-events-none transition-transform duration-300 ease-out ${
          dark 
            ? 'bg-gray-900' 
            : 'bg-white'
        }`}
        style={{
          transform: isIndonesian ? 'translateX(0%)' : 'translateX(100%)',
          transitionTimingFunction: 'cubic-bezier(0.34, 1.35, 0.64, 1)'
        }}
      />

      {/* Indonesian Button */}
      <button
        type="button"
        onClick={() => switchLanguage('id')}
        className={`relative z-10 w-full h-full flex items-center justify-center text-[11px] font-bold tracking-wider cursor-pointer transition-colors duration-200 rounded-full ${
          isIndonesian
            ? dark ? 'text-white' : 'text-gray-900'
            : dark ? 'text-gray-500 hover:text-gray-900' : 'text-white/70 hover:text-white'
        }`}
        aria-label="Switch to Indonesian"
      >
        ID
      </button>

      {/* English Button */}
      <button
        type="button"
        onClick={() => switchLanguage('en')}
        className={`relative z-10 w-full h-full flex items-center justify-center text-[11px] font-bold tracking-wider cursor-pointer transition-colors duration-200 rounded-full ${
          isEnglish
            ? dark ? 'text-white' : 'text-gray-900'
            : dark ? 'text-gray-500 hover:text-gray-900' : 'text-white/70 hover:text-white'
        }`}
        aria-label="Switch to English"
      >
        ENG
      </button>
    </div>
  );
};

export default LanguageSwitcher;