import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from '../../contexts/LanguageContext';

const Dashboard = () => {
  const { t } = useLanguage();
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const texts = useMemo(() => [
    t('frontendDeveloper'),
    t('backendDeveloper'),
    t('fullstackDeveloper'), 
    t('uiuxDesigner'),
    t('videoEditor'),
    t('graphicDesigner')
  ], [t]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const currentText = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < currentText.length) {
          setDisplayText(prev => prev + currentText[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        } else {
          // Pause at end, then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentIndex > 0) {
          setDisplayText(prev => prev.slice(0, -1));
          setCurrentIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setTextIndex(prev => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 150);
    
    return () => clearTimeout(timeout);
  }, [currentIndex, textIndex, isDeleting, texts]);

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-gray-100 text-gray-900 pt-24 sm:pt-28 pb-16 px-6 flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100/50 rounded-full filter blur-3xl opacity-60"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100/50 rounded-full filter blur-3xl opacity-60"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center max-w-4xl mx-auto w-full">
        {/* Profile Image */}
        <div className={`mb-8 relative group transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 p-1 shadow-xl">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#0d0d12]">
              <img 
                src="/assets/project/Foto Profile/icon-jo-black.png" 
                alt="Joel Profile"
                className="w-full h-full object-cover rounded-full group-hover:scale-108 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full border-2 md:border-3 border-white animate-ping pointer-events-none"></div>
          <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full border-2 md:border-3 border-white shadow-md"></div>
        </div>

        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-3 text-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          {t('greeting')}
        </h1>

        {/* Greeting Text */}
        <p className={`text-lg md:text-xl text-gray-600 font-medium mb-3 text-center transition-all duration-1000 delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          {t('welcomeMessage')}
        </p>
        
        {/* Animated role text */}
        <div className={`h-10 sm:h-12 mb-6 flex items-center justify-center transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <span className="text-xl sm:text-2xl md:text-3xl text-black font-bold font-mono text-center px-4 py-1.5 rounded-xl bg-gray-100 border border-gray-200 shadow-sm">
            {displayText}
            <span className="animate-pulse text-gray-500">|</span>
          </span>
        </div>

        {/* Quote Box */}
        <div className={`mb-8 text-center max-w-3xl w-full px-4 transition-all duration-1000 delay-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="relative bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xl shadow-gray-200/50">
            <div className="absolute -top-3 left-6 px-3 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-xs font-semibold text-gray-600 uppercase tracking-wider">
              About Vision
            </div>
            <blockquote className="text-base md:text-lg text-gray-700 leading-relaxed italic mt-2">
              "{t('description')}"
            </blockquote>
            <div className="mt-4 text-right">
              <cite className="text-sm font-semibold text-gray-900 not-italic">— Joel</cite>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 mt-4 transition-all duration-1000 delay-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <Link 
            to="/projects" 
            className="group relative px-8 py-3.5 bg-gray-900 text-white rounded-full font-semibold hover:bg-black hover:shadow-xl hover:shadow-gray-900/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>{t('viewProjects')}</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          
          <Link 
            to="/contact" 
            className="px-8 py-3.5 bg-white border-2 border-gray-300 text-gray-800 rounded-full font-semibold hover:border-black hover:text-black hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 text-center shadow-sm"
          >
            {t('contactMe')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
