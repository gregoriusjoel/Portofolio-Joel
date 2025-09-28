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
  const [showWelcome, setShowWelcome] = useState(false); // Start with false
  const [appReady, setAppReady] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem('hasVisited');
    if (!visited) {
      setShowWelcome(true); // Show welcome only for first time users
    } else {
      // If user has visited before, show navbar immediately
      setShowNavbar(true);
    }
    setAppReady(true); // App is ready to render
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    localStorage.setItem('hasVisited', 'true');
    // Add delay for smooth navbar animation
    setTimeout(() => {
      setShowNavbar(true);
    }, 300);
  };

  // Don't render anything until app is ready
  if (!appReady) {
    return <div className="min-h-screen bg-mono-900"></div>;
  }

  return (
    <LanguageProvider>
      <Router>
        {/* Show welcome animation only for first-time visitors */}
        {showWelcome && (
          <WelcomeAnimation onComplete={handleWelcomeComplete} />
        )}
        
        <div className="flex flex-col min-h-screen bg-mono-900 overflow-x-hidden">
          {/* Always show navbar when ready, with simple fade-in */}
          {showNavbar && <Navbar />}
          
          <main className="flex-1 w-full pt-16 sm:pt-20">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          
          {/* Show footer when welcome animation is not active */}
          {!showWelcome && <Footer />}
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
