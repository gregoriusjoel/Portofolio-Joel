import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import OptionWheel from './OptionWheel';

const Navbar = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navContainerRef = useRef(null);
  const itemsRef = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { path: '/', label: t('dashboard'), icon: 'bx-home-alt-2' },
    { path: '/about', label: t('about'), icon: 'bx-user' },
    { path: '/experience', label: t('experience'), icon: 'bx-briefcase-alt-2' },
    { path: '/projects', label: t('projects'), icon: 'bx-layer' },
    { path: '/contact', label: t('contact'), icon: 'bx-envelope' }
  ];

  const activeIndex = Math.max(0, menuItems.findIndex(item => item.path === location.pathname));

  // Update sliding pill position
  const updateIndicator = () => {
    const currentActiveIndex = menuItems.findIndex(item => item.path === location.pathname);
    if (currentActiveIndex !== -1 && itemsRef.current[currentActiveIndex]) {
      const activeEl = itemsRef.current[currentActiveIndex];
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1
      });
    }
  };

  useEffect(() => {
    updateIndicator();
    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location.pathname, t]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle open menu state: body scroll lock, resize, and escape key
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'unset';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => e.key === 'Escape' && setIsOpen(false);
    const handleResize = () => window.innerWidth >= 1024 && setIsOpen(false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  const isActiveLink = (path) => location.pathname === path;
  const handleMobileMenuToggle = () => setIsOpen((prev) => !prev);
  const handleOverlayClick = () => setIsOpen(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 40);
    return () => clearTimeout(timer);
  }, []);

  const [activeWheelIndex, setActiveWheelIndex] = useState(activeIndex);

  // Sync activeWheelIndex when menu opens
  useEffect(() => {
    if (isOpen) {
      setActiveWheelIndex(activeIndex);
    }
  }, [isOpen, activeIndex]);

  return (
    <>
      <header
        className={`fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 flex flex-col items-center pointer-events-none transition-all duration-700 ease-out transform ${isMounted
            ? 'opacity-100 translate-y-0 filter-none'
            : 'opacity-0 -translate-y-8 blur-[6px]'
          }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Floating Pill Container */}
        <nav
          className={`pointer-events-auto w-full max-w-5xl bg-black/90 backdrop-blur-xl border border-white/15 rounded-full shadow-2xl shadow-black/25 px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-black/95 shadow-black/40 border-white/20 scale-[0.99]' : ''
            }`}
        >
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2 flex-shrink-0 pl-1 sm:pl-2">
            <span className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-gray-300 transition-colors duration-300">
              Joel<span className="text-gray-400 group-hover:text-gray-400 transition-colors">.</span>
            </span>
          </Link>

          {/* Desktop Menu with Smooth Sliding Pill Animation */}
          <div className="hidden lg:flex items-center gap-2">
            <div
              ref={navContainerRef}
              className="relative flex items-center bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-sm"
            >
              {/* Animated Floating Pill Background */}
              <div
                className="absolute top-1 bottom-1 bg-white rounded-full shadow-md transition-all duration-300 ease-out pointer-events-none"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                  opacity: indicatorStyle.opacity,
                  transform: 'translateZ(0)'
                }}
              />

              {menuItems.map((item, index) => {
                const isActive = isActiveLink(item.path);
                return (
                  <Link
                    key={item.path}
                    ref={(el) => (itemsRef.current[index] = el)}
                    to={item.path}
                    className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-300 whitespace-nowrap block ${isActive
                        ? 'text-black'
                        : 'text-white/70 hover:text-white'
                      }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop Right Action: Language Switcher */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden w-9 h-9 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center focus:outline-none cursor-pointer transition-colors hover:bg-white/20 flex-shrink-0"
            onClick={handleMobileMenuToggle}
            aria-label="Toggle menu"
          >
            <i className={`bx ${isOpen ? 'bx-x' : 'bx-menu-alt-right'} text-xl`}></i>
          </button>
        </nav>
      </header>

      {/* Mobile 3D Floating Wheel Menu Fullscreen Overlay */}
      {isOpen && (
        <>
          {/* Dim Backdrop Blur */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-2xl z-40 lg:hidden transition-all duration-300"
            onClick={handleOverlayClick}
          />

          {/* Fullscreen Centered 3D Wheel & Bottom Language Switcher */}
          <div className="fixed inset-0 z-45 lg:hidden flex flex-col justify-between items-center pointer-events-none pt-20 pb-24 px-4 animate-fadeIn">
            {/* 3D Wheel in Spacious Center Stage */}
            <div className="w-full max-w-sm flex-1 relative flex items-center justify-center pointer-events-auto">
              
              {/* Background Frosted Lens (Behind text) */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-16 sm:h-20 rounded-3xl bg-white/[0.08] border border-white/20 backdrop-blur-xl shadow-2xl pointer-events-none z-10" />

              {/* 3D OptionWheel (Middle layer) */}
              <div className="w-full h-full relative z-20">
                <OptionWheel
                  items={menuItems}
                  defaultSelected={activeIndex}
                  onChange={(idx) => setActiveWheelIndex(idx)}
                  side="left"
                  fontSize={2.1}
                  spacing={1.45}
                  curve={0.8}
                  tilt={6}
                  blur={1}
                  fade={0.5}
                  inset={36}
                  textColor="rgba(255, 255, 255, 0.35)"
                  activeColor="#ffffff"
                  onItemSelect={(index, item) => {
                    const target = typeof item === 'object' ? item.path : menuItems[index]?.path;
                    if (target) {
                      navigate(target);
                      setIsOpen(false);
                    }
                  }}
                />
              </div>

              {/* Top Layer Right Arrow Button (High z-index, always receives clicks) */}
              <div className="absolute top-1/2 right-4 -translate-y-1/2 z-30 pointer-events-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const target = menuItems[activeWheelIndex]?.path || menuItems[activeIndex]?.path;
                    if (target) {
                      navigate(target);
                      setIsOpen(false);
                    }
                  }}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:bg-gray-200 active:scale-90 transition-all duration-150 cursor-pointer"
                  aria-label="Navigate to page"
                >
                  <i className="bx bx-right-arrow-alt text-2xl text-black"></i>
                </button>
              </div>
            </div>

            {/* Fixed Bottom Anchored Language Switcher */}
            <div className="fixed bottom-6 sm:bottom-8 left-0 right-0 flex justify-center pointer-events-auto z-50">
              <LanguageSwitcher />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
