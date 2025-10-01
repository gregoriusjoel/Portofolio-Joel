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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    // Force cleanup scroll lock when route changes
    document.body.style.overflow = 'unset';
  }, [location.pathname]);

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

  // Additional cleanup on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsOpen(false);
        document.body.style.overflow = 'unset';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const isActiveLink = (path) => location.pathname === path;

  const handleMenuItemClick = () => {
    setIsOpen(false);
    // Force reset scroll immediately
    setTimeout(() => {
      document.body.style.overflow = 'unset';
    }, 0);
  };

  const handleMobileMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const menuItems = [
    { path: '/', label: t('dashboard') },
    { path: '/about', label: t('about') },
    { path: '/experience', label: t('experience') },
    { path: '/projects', label: t('projects') },
    { path: '/contact', label: t('contact') }
  ];

  return (
    <>
      <nav className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-2xl border-b border-accent-500/20' 
          : 'bg-black/90 backdrop-blur-sm shadow-lg border-b border-mono-800'
      }`}>
        {/* Decorative top gradient line */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-accent-500 to-transparent"></div>
      
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          {/* Logo with animation */}
          <Link to="/" className="group flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide text-white group-hover:text-accent-400 transition-colors duration-300">
              Joel
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 flex-shrink-0">
            <ul className="flex items-center gap-4 lg:gap-6 xl:gap-8">
              {menuItems.map((item) => (
                <li key={item.path} className="flex-shrink-0">
                  <Link 
                    to={item.path} 
                    className={`relative px-2 xl:px-3 py-2 text-white font-medium transition-all duration-300 text-sm xl:text-base whitespace-nowrap ${
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
            <div className="flex-shrink-0">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white focus:outline-none group p-2 -mr-2 flex-shrink-0"
            onClick={handleMobileMenuToggle}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5 sm:w-6 sm:h-6 transform transition-all duration-300 ease-in-out">
              <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${
                isOpen ? 'rotate-45 translate-y-2 sm:translate-y-2.5' : 'translate-y-1'
              }`}></span>
              <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out translate-y-2 sm:translate-y-2.5 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${
                isOpen ? '-rotate-45 translate-y-2 sm:translate-y-2.5' : 'translate-y-3 sm:translate-y-4'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden bg-black/95 backdrop-blur-md border-t border-accent-500/20 overflow-hidden transition-all duration-300 ease-in-out w-full max-w-full ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className={`px-4 sm:px-6 py-4 sm:py-6 transform transition-all duration-300 ease-in-out w-full ${
            isOpen ? 'translate-y-0' : '-translate-y-4'
          }`}>
            <ul className="space-y-2 sm:space-y-4 mb-4 sm:mb-6 w-full">
              {menuItems.map((item, index) => (
                <li key={item.path} className="w-full">
                  <Link 
                    to={item.path} 
                    className={`block p-2.5 sm:p-3 rounded-lg text-white font-medium transition-all duration-300 transform text-sm sm:text-base w-full ${
                      isActiveLink(item.path)
                        ? 'text-accent-500 bg-accent-500/10'
                        : 'hover:text-accent-500 hover:bg-white/5'
                    } ${
                      isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                    }`}
                    style={{ 
                      transitionDelay: isOpen ? `${index * 100}ms` : '0ms'
                    }}
                    onClick={handleMenuItemClick}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Mobile Language Switcher */}
            <div className={`flex justify-center transform transition-all duration-300 w-full ${
              isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
            }`} style={{ 
              transitionDelay: isOpen ? `${menuItems.length * 100}ms` : '0ms'
            }}>
              <LanguageSwitcher className="scale-110" />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleOverlayClick}
          style={{ top: '64px' }}
        />
      )}
    </>
  );
};

export default Navbar;
