// Komponen Footer
import React from "react";

const Footer = () => (
  <footer className="w-full bg-black text-white py-4 sm:py-6 mt-8 sm:mt-12 border-t border-mono-800">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6">
      <div className="mb-2 md:mb-0 text-xs sm:text-sm text-white text-center md:text-left">&copy; {new Date().getFullYear()} Joel Portofolio. All rights reserved.</div>
      <div className="flex gap-3 sm:gap-4">
        <a href="https://github.com/joel" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-white hover:text-accent-500 transition">GitHub</a>
        <a href="mailto:joel@email.com" className="text-xs sm:text-sm text-white hover:text-accent-500 transition">Email</a>
        <a href="https://linkedin.com/in/joel" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-white hover:text-accent-500 transition">LinkedIn</a>
      </div>
    </div>
  </footer>
);

export default Footer;
