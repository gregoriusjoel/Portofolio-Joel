import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const WelcomeAnimation = ({ onComplete }) => {
  const { t } = useLanguage();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);

  // Split text into words for typing effect
  const welcomeText = "Welcome to my portfolio";
  const words = welcomeText.split(' ');

  useEffect(() => {
    // Typing effect - slower and smoother
    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setCurrentWordIndex(prev => prev + 1);
      }, 600); // Slower timing for smoother effect
      return () => clearTimeout(timer);
    } else {
      // Show subtitle after all words appear
      setTimeout(() => setShowSubtitle(true), 800);
      // After all words are shown, wait 3 seconds then fade out
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentWordIndex, words.length, onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gray-200 transition-all duration-1000 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      
      {/* Skip button */}
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onComplete(), 500);
        }}
        className="absolute top-8 right-8 text-gray-600 hover:text-gray-800 transition-colors duration-300 z-[10000] group"
        aria-label="Skip animation"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white transition-all duration-300 group-hover:scale-105 shadow-lg">
          <span className="text-sm font-medium">Skip</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </button>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #6b7280 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Main content */}
      <div className="relative text-center px-6 max-w-5xl mx-auto">
        {/* Text container */}
        <div className="relative">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-gray-800 leading-tight">
            {words.map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-6 transform transition-all duration-1000 ease-out ${
                  index < currentWordIndex 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-20 opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${index * 300}ms`,
                  fontWeight: '800',
                  letterSpacing: '-0.03em',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Subtitle with smooth slide-in from left */}
          <div className={`transition-all duration-1200 ease-out ${
            showSubtitle 
              ? 'translate-x-0 opacity-100' 
              : '-translate-x-16 opacity-0'
          }`}>
            <p className="text-xl md:text-2xl text-gray-600 font-light tracking-wide mb-6">
              Gregorius Joel - Full Stack Developer
            </p>
            
            {/* Smooth expanding line from left */}
            <div className="mx-auto h-1 bg-gray-300 rounded-full overflow-hidden" style={{ width: '300px' }}>
              <div className={`h-full bg-gray-600 transition-all duration-1500 ease-out ${
                showSubtitle ? 'w-full' : 'w-0'
              }`}
              style={{ 
                borderRadius: '2px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }} />
            </div>
          </div>
        </div>

        {/* Smooth loading dots sliding from left */}
        <div className={`mt-16 flex justify-center space-x-3 transition-all duration-1000 ease-out ${
          showSubtitle 
            ? 'translate-x-0 opacity-100' 
            : '-translate-x-12 opacity-0'
        }`}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gray-600 rounded-full shadow-sm"
              style={{ 
                animation: 'bounce 2s infinite ease-in-out',
                animationDelay: `${i * 0.4}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeAnimation;