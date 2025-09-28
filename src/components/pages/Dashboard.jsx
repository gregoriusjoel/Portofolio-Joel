// Dashboard (Home)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from '../../contexts/LanguageContext';

const Dashboard = () => {
  const { t } = useLanguage();
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const texts = [
    t('frontendDeveloper'),
    t('backendDeveloper'),
    t('fullstackDeveloper'), 
    t('uiuxDesigner'),
    t('videoEditor'),
    t('graphicDesigner')
  ];

  useEffect(() => {
    setMounted(true);
    
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
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timeout);
  }, [currentIndex, textIndex, isDeleting]);

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-mono-900 via-mono-800 to-mono-900 text-mono-100 pt-20 sm:pt-24 pb-8 px-4 sm:px-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-accent-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-mono-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full min-h-[calc(100vh-8rem)]">
        {/* Profile Image */}
        <div className={`mb-6 sm:mb-8 relative group transition-all duration-1000 ${mounted ? 'translate-y-0' : 'translate-y-12'}`}>
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-accent-500 to-mono-600 p-1">
            <div className="w-full h-full rounded-full bg-mono-800 flex items-center justify-center overflow-hidden">
              <img 
                src="/assets/project/Foto Profile/animasi.png" 
                alt="Joel Profile"
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-mono-800 animate-ping"></div>
          <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-mono-800"></div>
        </div>

        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-center bg-gradient-to-r from-mono-100 to-accent-500 bg-clip-text text-transparent transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          {t('greeting')}
        </h1>

        {/* Greeting Text */}
        <p className={`text-base sm:text-lg md:text-xl text-mono-300 mb-3 sm:mb-4 text-center transition-all duration-1000 delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          {t('welcomeMessage')}
        </p>
        
        <div className={`h-6 sm:h-8 mb-4 sm:mb-6 flex items-center justify-center transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <span className="text-lg sm:text-xl md:text-2xl text-accent-500 font-mono text-center">
            {displayText}
            <span className="animate-pulse">|</span>
          </span>
        </div>

        <div className={`mb-6 sm:mb-8 text-center max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl px-2 sm:px-4 transition-all duration-1000 delay-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 text-2xl sm:text-4xl text-accent-500/30 font-serif">"</div>
            <div className="absolute -bottom-3 sm:-bottom-6 -right-2 sm:-right-4 text-2xl sm:text-4xl text-accent-500/30 font-serif rotate-180">"</div>
            
            {/* Quote Content */}
            <div className="relative bg-mono-800/30 backdrop-blur-sm border-l-4 border-accent-500 rounded-r-lg p-4 sm:p-6 shadow-lg">
              <blockquote className="text-sm sm:text-base md:text-lg lg:text-xl text-mono-300 leading-relaxed italic">
                "Inovasi digital yang mengubah ide menjadi solusi nyata. 
                Setiap project adalah perjalanan untuk menciptakan pengalaman yang 
                <span className="text-accent-400 font-semibold italic"> bermakna</span> dan 
                <span className="text-accent-400 font-semibold italic"> berdampak</span>."
              </blockquote>
              
              {/* Quote Attribution */}
              <div className="mt-3 sm:mt-4 text-right">
                <cite className="text-xs sm:text-sm text-mono-400 not-italic">— Joel</cite>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-500/10 to-transparent rounded-lg -z-10"></div>
          </div>
        </div>

        <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full max-w-xs sm:max-w-none px-4 sm:px-0 transition-all duration-1000 delay-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <Link 
            to="/projects" 
            className="group relative px-6 sm:px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-mono-800 hover:shadow-2xl hover:shadow-black/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden text-center"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <span className="relative flex items-center justify-center gap-2">
              {t('viewProjects')} 
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            
            {/* Pulsing border */}
            <div className="absolute inset-0 rounded-full border-2 border-accent-300 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
          </Link>
          
          <Link 
            to="/contact" 
            className="px-6 sm:px-8 py-3 border-2 border-accent-500 text-accent-500 rounded-full font-semibold hover:bg-accent-500 hover:text-mono-900 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-center"
          >
            {t('contactMe')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
