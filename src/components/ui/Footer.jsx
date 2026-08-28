// Komponen Footer
import React from "react";

const Footer = () => (
  <footer className="w-full bg-black text-white py-8 border-t border-white/10">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
      <div className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Joel Portofolio. All rights reserved.</div>
      <div className="flex gap-6 text-sm font-medium">
        <a href="https://github.com/gregoriusjoel" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">GitHub</a>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hi.gregoriusjoel@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">Email</a>
        <a href="https://linkedin.com/in/gregorius-joel" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">LinkedIn</a>
      </div>
    </div>
  </footer>
);

export default Footer;
