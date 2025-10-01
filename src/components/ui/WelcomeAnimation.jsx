import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const WelcomeAnimation = ({ onComplete }) => {
  const { t } = useLanguage();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Split text into words for typing effect
  const welcomeText = "Welcome to my portfolio";
  const words = welcomeText.split(' ');

  useEffect(() => {
    // First phase: Typing effect for main title
    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setCurrentWordIndex(prev => prev + 1);
      }, 600); // Slower timing for smoother effect
      return () => clearTimeout(timer);
    } else {
      // Second phase: After main title is complete, show subtitle
      const timer = setTimeout(() => {
        setShowSubtitle(true);
        // Third phase: After subtitle appears, show loading animation
        setTimeout(() => {
          setShowContent(true);
        }, 1000);
        // Final phase: After everything is shown, wait then fade out
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            onComplete();
          }, 1000);
        }, 4000);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentWordIndex, words.length, onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-1000 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      
      {/* Skip button */}
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onComplete(), 500);
        }}
        className="absolute top-6 sm:top-8 right-6 sm:right-8 text-white/80 hover:text-white transition-all duration-300 z-50"
        aria-label="Skip animation"
      >
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30">
          <span className="text-xs sm:text-sm font-medium">Skip</span>
          <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </button>

      {/* Main content */}
      <div className="relative text-center px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Text container */}
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 text-white leading-tight">
            {words.map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-3 sm:mr-6 transform transition-all duration-1200 ease-out ${
                  index < currentWordIndex 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${index * 400}ms`,
                  fontWeight: '900',
                  letterSpacing: '-0.02em'
                }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <div className={`transition-all duration-1500 ease-out ${
            showSubtitle 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-4 opacity-0'
          }`}>
            <p className="relative text-lg sm:text-xl lg:text-2xl text-white/90 font-light tracking-wide mb-6 sm:mb-8 px-4">
              <span className="text-white font-medium">
                Gregorius Joel
              </span>
              <span className="mx-2 text-white/60">•</span>
              <span className="text-white/80">Full Stack Developer</span>
            </p>
            
            {/* Simple progress line */}
            <div className={`relative mx-auto mb-6 sm:mb-8 transition-all duration-1500 ease-out ${
              showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`} style={{ width: '240px' }}>
              <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
                <div className={`h-full bg-white transition-all duration-2000 ease-out ${
                  showContent ? 'w-full' : 'w-0'
                }`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple loading dots */}
        <div className={`mt-8 sm:mt-16 flex justify-center space-x-3 sm:space-x-4 transition-all duration-1200 ease-out ${
          showContent 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-4 opacity-0'
        }`}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full"
              style={{ 
                animation: showContent ? 'bounce 2s infinite ease-in-out' : 'none',
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>

        {/* Bottom text */}
        <div className={`mt-12 sm:mt-16 transition-all duration-1500 ease-out ${
          showContent 
            ? 'translate-y-0 opacity-60' 
            : 'translate-y-4 opacity-0'
        }`}>
          <p className="text-xs sm:text-sm text-white/50 font-light tracking-wider uppercase">
            Creating Digital Experiences
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomeAnimation;