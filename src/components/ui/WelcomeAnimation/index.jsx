import React, { useState, useEffect } from 'react';
import { welcomeConfig } from './WelcomeConfig';
import './WelcomeAnimation.css';

const WelcomeAnimation = ({ onComplete }) => {
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger smooth entrance on mount
    const mountTimer = setTimeout(() => setIsReady(true), 60);

    // Time-based smooth counter 0% to 100% across the 5s duration
    const startTime = performance.now();
    const activeDuration = Math.max(1000, welcomeConfig.timing.totalDuration - 500); // 4500ms
    let animFrame;

    const animateProgress = (now) => {
      const elapsed = now - startTime;
      const ratio = Math.min(1, elapsed / activeDuration);
      
      const currentPercent = Math.min(100, Math.floor(ratio * 100));
      setProgress(currentPercent);

      if (ratio < 1) {
        animFrame = requestAnimationFrame(animateProgress);
      }
    };

    animFrame = requestAnimationFrame(animateProgress);

    // Fade out exit at 4.5s
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, welcomeConfig.timing.totalDuration - 500);

    const finishTimer = setTimeout(() => {
      onComplete?.();
    }, welcomeConfig.timing.totalDuration);

    // Escape key listener for quick skip
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
      if (animFrame) cancelAnimationFrame(animFrame);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete?.();
    }, 300);
  };

  const titleWords = welcomeConfig.heading.title.split(' ');

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09090b] text-white select-none overflow-hidden transition-all duration-700 ease-in-out ${
        isReady ? 'intro-visible' : ''
      } ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{ willChange: 'opacity, transform' }}
    >
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] rounded-full blur-[130px] pointer-events-none animate-soft-aura"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 50%, transparent 80%)'
          }}
        />
      </div>

      {/* Top Floating Controls */}
      <div className="absolute top-6 left-6 right-6 sm:top-8 sm:left-8 sm:right-8 flex items-center justify-between z-20 pointer-events-auto">
        {/* Moniker Status Badge */}
        <div 
          className="intro-element inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-zinc-400 font-mono tracking-wider"
          style={{ transitionDelay: '150ms' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
          <span>{new Date().getFullYear()}</span>
        </div>

        {/* Skip Button */}
        {welcomeConfig.skipButton.show && (
          <button
            onClick={handleSkip}
            className="intro-element group flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer text-xs text-zinc-400 hover:text-white"
            style={{ transitionDelay: '200ms' }}
            aria-label="Skip animation"
          >
            <span className="font-medium">{welcomeConfig.skipButton.label}</span>
            <span className="text-zinc-600 group-hover:text-zinc-300 transition-colors">→</span>
            {welcomeConfig.skipButton.shortcutKey && (
              <kbd className="hidden sm:inline-block text-[9px] uppercase px-1 py-0.2 rounded bg-white/5 text-zinc-500 font-mono ml-0.5 border border-white/10">
                {welcomeConfig.skipButton.shortcutKey}
              </kbd>
            )}
          </button>
        )}
      </div>

      {/* Main Center Stage */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center">
        
        {/* 1. Monogram / Avatar Brand Mark with Spring Animation */}
        {welcomeConfig.monogram.show && (
          <div className="mb-5 relative">
            <div 
              className="intro-scale"
              style={{ transitionDelay: '120ms' }}
            >
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border border-white/20 flex items-center justify-center shadow-2xl backdrop-blur-xl overflow-hidden relative">
                {welcomeConfig.monogram.image ? (
                  <img
                    src={welcomeConfig.monogram.image}
                    alt={welcomeConfig.monogram.alt || "Joel Logo"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-bold tracking-tight text-white/90 font-mono">
                    {welcomeConfig.monogram.text}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. Micro Moniker Label */}
        <div className="overflow-hidden mb-3">
          <div 
            className="intro-element"
            style={{ transitionDelay: '280ms' }}
          >
            <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
              {welcomeConfig.moniker}
            </span>
          </div>
        </div>

        {/* 3. Word-by-Word Kinetic Title Reveal */}
        <div className="mb-3 flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3">
          {titleWords.map((word, index) => (
            <span key={index} className="intro-word-mask">
              <span
                className="intro-word text-3xl sm:text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent"
                style={{
                  transitionDelay: `${380 + index * 80}ms`
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </div>

        {/* 4. Sub-heading Slide with Blur Dissipation */}
        {welcomeConfig.heading.subtitle && (
          <div className="overflow-hidden mb-6 max-w-lg">
            <p
              className="intro-element text-sm sm:text-base text-zinc-400 font-normal leading-relaxed"
              style={{ transitionDelay: '720ms' }}
            >
              {welcomeConfig.heading.subtitle}
            </p>
          </div>
        )}

        {/* 5. Role Pills Staggered Pop-in */}
        <div 
          className="intro-element flex flex-wrap justify-center items-center gap-2 mb-8"
          style={{ transitionDelay: '900ms' }}
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-xs text-zinc-300 font-medium shadow-sm">
            {welcomeConfig.roles.map((role, idx) => (
              <React.Fragment key={idx}>
                <span className="hover:text-white transition-colors">{role}</span>
                {idx < welcomeConfig.roles.length - 1 && (
                  <span className="text-zinc-600 text-[10px]">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 6. Precision Progress Bar & Live Counter */}
        <div 
          className="intro-element w-full max-w-xs sm:max-w-sm flex flex-col items-center gap-2"
          style={{ transitionDelay: '1050ms' }}
        >
          {/* Expanding Track */}
          <div className="w-full h-[3px] bg-white/[0.08] rounded-full overflow-hidden relative shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-zinc-400 via-white to-white rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage Counter and Status */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-500 tracking-wider pt-1">
            <span>LOADING ASSETS</span>
            <span className="font-semibold text-zinc-300 font-mono">{progress}%</span>
          </div>
        </div>

      </div>

      {/* Bottom Footer Moniker */}
      <div 
        className="intro-element absolute bottom-6 text-[11px] text-zinc-600 font-mono tracking-widest pointer-events-none"
        style={{ transitionDelay: '1200ms' }}
      >
        © {new Date().getFullYear()} • ALL RIGHTS RESERVED
      </div>
    </div>
  );
};

export default WelcomeAnimation;
