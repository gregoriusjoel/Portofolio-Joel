import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Z_INDEX } from '../../utils/zIndex';

const Navbar = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActiveLink = (path) => location.pathname === path;

  const menuItems = [
    { path: '/', label: t('dashboard') },
    { path: '/about', label: t('about') },
    { path: '/experience', label: t('experience') },
    { path: '/projects', label: t('projects') },
    { path: '/contact', label: t('contact') }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 pointer-events-auto transition-all duration-500 shadow-lg ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    } ${
      scrolled 
        ? 'bg-black/95 backdrop-blur-md shadow-2xl border-b border-accent-500/20' 
        : 'bg-black/90 backdrop-blur-sm shadow-lg border-b border-mono-800'
    }`}>
      {/* Decorative top gradient line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-accent-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo with animation */}
        <Link to="/" className="group flex items-center gap-3 cursor-pointer relative z-20">
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
          className="md:hidden text-white focus:outline-none group cursor-pointer relative z-20 p-2 -mr-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
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

      {/* Mobile Menu with Overlay */}
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <div 
            className="md:hidden fixed inset-0 bg-black z-40" 
            onClick={() => setIsOpen(false)}
            style={{ top: '0' }}
          />
          
          {/* Mobile Menu Content */}
          <div className="md:hidden fixed top-0 left-0 right-0 bg-black z-50 transition-all duration-300 ease-in-out">
            <div className="px-4 sm:px-6 py-4 sm:py-6">
              <ul className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {menuItems.map((item, index) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className={`block p-3 rounded-lg text-base sm:text-lg text-white font-medium transition-all duration-300 transform cursor-pointer ${
                        isActiveLink(item.path)
                          ? 'text-accent-500 bg-accent-500/10'
                          : 'hover:text-accent-500 hover:bg-white/5'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Mobile Language Switcher */}
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
