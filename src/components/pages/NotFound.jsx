import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import lottie from "lottie-web/build/player/lottie_light";
import { useLanguage } from "../../contexts/LanguageContext";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import "boxicons/css/boxicons.min.css";

const NotFound = () => {
  const { isEnglish } = useLanguage();
  const animationContainer = useRef(null);

  useEffect(() => {
    let anim = null;
    if (animationContainer.current) {
      anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/assets/assets-lottie/T-rex%20404%20error%20page.json"
      });
    }

    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-gray-100 text-gray-900 flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-8 relative overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-gray-200/40 rounded-full filter blur-3xl pointer-events-none -z-10"></div>

      {/* Top Header Bar */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between z-20">
        <Link 
          to="/" 
          className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight hover:opacity-80 transition-opacity"
        >
          Joel<span className="text-gray-400">.</span>
        </Link>
        <LanguageSwitcher dark={true} />
      </div>

      {/* Main Clean 404 Hero Centerpiece */}
      <div className="max-w-2xl w-full mx-auto text-center relative z-10 my-auto py-4 flex flex-col items-center justify-center">
        
        {/* Large Prominent T-Rex Lottie Animation */}
        <div 
          ref={animationContainer} 
          className="w-full max-w-md sm:max-w-lg md:max-w-xl h-64 sm:h-80 md:h-[22rem] mx-auto flex items-center justify-center pointer-events-none select-none scale-105 sm:scale-110 -mb-2"
        />

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2.5">
          {isEnglish ? "Oops! Lost in Digital Space" : "Ups! Tersesat di Ruang Digital"}
        </h1>
        
        {/* Subtitle */}
        <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-8 font-normal">
          {isEnglish
            ? "The page you are looking for might have been moved, removed, or the link is incorrect. Don't worry, let's get you back on track!"
            : "Halaman yang Anda tuju mungkin telah dipindahkan, dihapus, atau tautannya keliru. Mari kembali ke jalur yang benar!"}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-gray-900 text-white rounded-full font-bold hover:bg-black hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm"
          >
            <i className="bx bx-home-alt text-lg"></i>
            <span>{isEnglish ? "Back to Home" : "Kembali ke Beranda"}</span>
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-white text-gray-800 border border-gray-200 rounded-full font-bold hover:bg-gray-50 hover:text-black hover:border-gray-300 hover:shadow-md transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm"
          >
            <i className="bx bx-folder text-lg"></i>
            <span>{isEnglish ? "Browse Projects" : "Lihat Portofolio"}</span>
          </Link>
        </div>

      </div>

      {/* Subtle Footer */}
      <div className="text-center text-xs text-gray-400 z-10">
        © {new Date().getFullYear()} Gregorius Joel. All rights reserved.
      </div>
    </div>
  );
};

export default NotFound;
