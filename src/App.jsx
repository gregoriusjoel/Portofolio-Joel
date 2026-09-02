import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
import Dashboard from "./components/pages/Dashboard";
import About from "./components/pages/About";
import Experience from "./components/pages/Experience";
import Projects from "./components/pages/Projects";
import Contact from "./components/pages/Contact";
import WelcomeAnimation from "./components/ui/WelcomeAnimation";

const NotFound = React.lazy(() => import("./components/pages/NotFound"));

function AppContent() {
  const { language } = useLanguage();
  const [showWelcome, setShowWelcome] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();

  const validPaths = ['/', '/about', '/experience', '/projects', '/contact'];
  const isNotFound = !validPaths.includes(location.pathname);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    setTimeout(() => {
      setShowNavbar(true);
    }, 200);
  };

  return (
    <>
      <ScrollToTop />
      {/* Show welcome animation only for first-time visitors on valid pages */}
      {showWelcome && !isNotFound && (
        <WelcomeAnimation onComplete={handleWelcomeComplete} />
      )}
      <div className="flex flex-col min-h-screen bg-white text-gray-900 overflow-x-clip">
        {/* Hide navbar on 404 page */}
        {showNavbar && !showWelcome && !isNotFound && <Navbar />}
        
        {/* Main Content with Smooth Language Cross-fade Animation */}
        <main key={language} className="flex-1 w-full animate-lang-crossfade">
          <React.Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
        </main>
        
        {/* Hide footer on 404 page for clean focused look */}
        {!showWelcome && !isNotFound && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
