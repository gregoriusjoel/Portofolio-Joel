// Komponen Footer
import React from "react";

const Footer = () => (
  <footer className="w-full bg-black text-white py-6 mt-12 border-t border-mono-800">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
      <div className="mb-2 md:mb-0 text-white">&copy; {new Date().getFullYear()} Joel Portofolio. All rights reserved.</div>
      <div className="flex gap-4">
        <a href="https://github.com/joel" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-500 transition">GitHub</a>
        <a href="mailto:joel@email.com" className="text-white hover:text-accent-500 transition">Email</a>
        <a href="https://linkedin.com/in/joel" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-500 transition">LinkedIn</a>
      </div>
    </div>
  </footer>
);

export default Footer;
