import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import Dashboard from "./components/pages/Dashboard";
import About from "./components/pages/About";
import Experience from "./components/pages/Experience";
import Projects from "./components/pages/Projects";
import Contact from "./components/pages/Contact";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-mono-900">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
