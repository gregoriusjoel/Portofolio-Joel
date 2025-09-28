import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import WelcomeAnimation from "./components/ui/WelcomeAnimation";
import Dashboard from "./components/pages/Dashboard";
import About from "./components/pages/About";
import Experience from "./components/pages/Experience";
import Projects from "./components/pages/Projects";
import Contact from "./components/pages/Contact";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem('hasVisited');
    if (visited) {
      setShowWelcome(false);
      setHasVisited(true);
      setShowNavbar(true); // Show navbar immediately if already visited
    } else {
      // Mark as visited after showing animation
      setHasVisited(false);
    }
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    setHasVisited(true);
    localStorage.setItem('hasVisited', 'true');
    
    // Add delay before showing navbar for smooth transition
    setTimeout(() => {
      setShowNavbar(true);
    }, 300);
  };

  return (
    <LanguageProvider>
      <Router>
        {showWelcome && !hasVisited && (
          <WelcomeAnimation onComplete={handleWelcomeComplete} />
        )}
        <div className="flex flex-col min-h-screen bg-mono-900 overflow-x-hidden">
          {/* Only render navbar when it should be shown and interactive */}
          {showNavbar && (
            <Navbar />
          )}
          
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          
          {/* Animated Footer that fades in after navbar */}
          <div className={`transform transition-all duration-700 ease-out delay-200 ${
            showNavbar 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}>
            <Footer />
          </div>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
