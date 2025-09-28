// Komponen Navbar
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (path) => location.pathname === path;

  const menuItems = [
    { path: '/', label: t('dashboard') },
    { path: '/about', label: t('about') },
    { path: '/experience', label: t('experience') },
    { path: '/projects', label: t('projects') },
    { path: '/contact', label: t('contact') }
  ];

  return (
    <nav className={`w-full fixed top-0 left-0 z-[9998] pointer-events-auto transition-all duration-300 ${
      scrolled 
        ? 'bg-black/95 backdrop-blur-md shadow-2xl border-b border-accent-500/20' 
        : 'bg-black/90 backdrop-blur-sm shadow-lg border-b border-mono-800'
    }`} style={{ pointerEvents: 'auto' }}>
      {/* Decorative top gradient line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-accent-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo with animation */}
        <Link to="/" className="group flex items-center gap-3 cursor-pointer relative z-10">
          <div className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-white group-hover:text-accent-400 transition-colors duration-300">
            Joel
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <ul className="flex items-center gap-4 lg:gap-8">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`relative px-2 lg:px-3 py-2 text-sm lg:text-base text-white font-medium transition-all duration-300 cursor-pointer block ${
                    isActiveLink(item.path)
                      ? 'text-accent-500'
                      : 'hover:text-accent-500'
                  }`}
                >
                  <span>{item.label}</span>
                  
                  {/* Active indicator */}
                  {isActiveLink(item.path) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent-500 rounded-full"></div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none group cursor-pointer relative z-10 p-2 -mr-2"
          onClick={() => setIsOpen(!isOpen)}
          style={{ pointerEvents: 'auto' }}
        >
          <div className="relative w-5 h-5 transform transition-all duration-300 ease-in-out">
            <span className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${
              isOpen ? 'rotate-45 translate-y-2' : 'translate-y-1'
            }`}></span>
            <span className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out translate-y-2 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${
              isOpen ? '-rotate-45 translate-y-2' : 'translate-y-3'
            }`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-black/95 backdrop-blur-md border-t border-accent-500/20 overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className={`px-4 sm:px-6 py-4 sm:py-6 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-4'
        }`}>
          <ul className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {menuItems.map((item, index) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`block p-3 rounded-lg text-base sm:text-lg text-white font-medium transition-all duration-300 transform cursor-pointer ${
                    isActiveLink(item.path)
                      ? 'text-accent-500 bg-accent-500/10'
                      : 'hover:text-accent-500 hover:bg-white/5'
                  } ${
                    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: isOpen ? `${index * 100}ms` : '0ms'
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Mobile Language Switcher */}
          <div className={`flex justify-center transform transition-all duration-300 ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          }`} style={{ 
            transitionDelay: isOpen ? `${menuItems.length * 100}ms` : '0ms'
          }}>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
