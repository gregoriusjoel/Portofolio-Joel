import React, { useEffect, useState } from "react";
import 'boxicons/css/boxicons.min.css';

const ContributorsPopup = ({ isOpen, onClose, contributors, projectTitle }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  const handleLinkedInClick = (linkedinUrl) => {
    if (linkedinUrl) {
      window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-all duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`} 
      onClick={handleClose}
    >
      <div 
        className={`relative w-full max-w-md h-[480px] sm:h-[520px] max-h-[calc(100dvh-4rem)] flex flex-col bg-white rounded-3xl shadow-2xl border border-gray-200 transition-all duration-300 overflow-hidden ${
          isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`} 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header (Fixed at top) */}
        <div className="bg-white p-4 sm:p-5 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0 pr-3">
              <div className="w-9 h-9 rounded-xl bg-gray-900 text-white flex items-center justify-center text-base shadow-sm flex-shrink-0">
                <i className="bx bx-group"></i>
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight truncate">
                  Team Contributors
                </h3>
                <p className="text-xs text-gray-500 font-medium truncate mt-0.5">
                  {projectTitle}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-500 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer flex-shrink-0"
              title="Close"
            >
              <i className="bx bx-x text-lg"></i>
            </button>
          </div>
        </div>
        
        {/* Contributors List - Scrollable Body with min-h-0 */}
        <div className="p-3.5 sm:p-4 overflow-y-auto flex-1 min-h-0 space-y-2">
          {contributors && contributors.length > 0 ? (
            contributors.map((contributor, index) => (
              <div 
                key={index}
                onClick={() => handleLinkedInClick(contributor.linkedin)}
                className={`group flex items-center gap-3 p-3 bg-gray-50/90 hover:bg-gray-100 rounded-2xl border border-gray-200/80 hover:border-gray-300 hover:shadow-md transition-all duration-200 ${
                  contributor.linkedin ? 'cursor-pointer' : ''
                }`}
              >
                <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center text-base shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <i className={`bx ${contributor.avatar || 'bx-user'}`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm group-hover:text-black transition-colors flex items-center gap-1.5 leading-snug">
                    <span className="truncate">{contributor.name}</span>
                    {contributor.linkedin && (
                      <i className="bx bx-link-external text-[10px] text-gray-400 group-hover:text-gray-900 transition-colors flex-shrink-0"></i>
                    )}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 font-normal truncate">
                    {contributor.role}
                  </p>
                </div>
                
                {contributor.linkedin && (
                  <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-gray-900 group-hover:border-gray-300 transition-colors flex-shrink-0 shadow-2xs">
                    <i className="bx bxl-linkedin text-xs"></i>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <i className="bx bx-group text-4xl text-gray-300 mb-2 block"></i>
              <p className="text-xs text-gray-500">No contributors data available</p>
            </div>
          )}
        </div>
        
        {/* Footer (Fixed at bottom) */}
        <div className="bg-gray-50 px-4 sm:px-5 py-2.5 border-t border-gray-100 flex-shrink-0 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">
            {contributors?.length || 0} Contributors
          </span>
          <span className="text-[11px] text-gray-400 font-medium hidden sm:inline">
            Scroll to view all • Click to open profile
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContributorsPopup;