import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, images, title, videoUrl }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageArray = isOpen && images ? (Array.isArray(images) ? images.filter(Boolean) : [images]) : [];

  // Reset index, lock body scroll, and preload all screenshots when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      document.body.style.overflow = 'hidden';

      // Preload images into browser cache so switching is instantaneous
      imageArray.forEach((src) => {
        if (src) {
          const img = new Image();
          img.src = src;
        }
      });
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && imageArray.length > 1) {
        setCurrentImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
      } else if (e.key === 'ArrowRight' && imageArray.length > 1) {
        setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, imageArray.length, onClose]);
  
  if (!isOpen || typeof document === 'undefined') return null;

  // Video embed preview modal
  if (videoUrl) {
    return createPortal(
      <div 
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md" 
        onClick={onClose}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <div 
          className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col my-auto" 
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate pr-4">{title || 'Video Preview'}</h3>
            <button 
              onClick={onClose} 
              className="w-9 h-9 bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-700 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer flex-shrink-0"
              aria-label="Close"
            >
              <i className="bx bx-x text-2xl"></i>
            </button>
          </div>
          
          {/* Video Container */}
          <div className="p-4 sm:p-6 flex items-center justify-center bg-gray-950 flex-1 min-h-0">
            <div className="w-full h-[65vh] bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={videoUrl}
                title={title || 'Video Preview'}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  const currentImage = imageArray[currentImageIndex];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md" 
      onClick={onClose}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="relative max-w-5xl w-full max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col my-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-white px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="text-base sm:text-xl font-bold text-gray-900 truncate pr-2">{title || 'Project Preview'}</h3>
            {imageArray.length > 1 && (
              <p className="text-xs text-gray-500 mt-0.5 font-medium">
                Screenshot {currentImageIndex + 1} of {imageArray.length}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-700 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer flex-shrink-0"
            title="Close Preview"
          >
            <i className="bx bx-x text-2xl"></i>
          </button>
        </div>
        
        {/* Image Content Area */}
        <div className="p-4 sm:p-6 bg-slate-50 flex flex-col items-center justify-center flex-1 min-h-0 overflow-hidden">
          {currentImage ? (
            <div className="relative w-full flex-1 flex items-center justify-center min-h-0 max-h-[66vh]">
              {/* Previous Arrow */}
              {imageArray.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-gray-900 hover:scale-110 shadow-xl border border-gray-200 flex items-center justify-center z-20 transition-transform duration-150 cursor-pointer"
                  aria-label="Previous screenshot"
                >
                  <i className="bx bx-chevron-left text-2xl"></i>
                </button>
              )}
              
              {/* Next Arrow */}
              {imageArray.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-gray-900 hover:scale-110 shadow-xl border border-gray-200 flex items-center justify-center z-20 transition-transform duration-150 cursor-pointer"
                  aria-label="Next screenshot"
                >
                  <i className="bx bx-chevron-right text-2xl"></i>
                </button>
              )}
              
              {/* Image element without destructive remount key or jarring fade animation */}
              <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-gray-900/5 p-2 border border-gray-200/60 shadow-inner">
                <img
                  src={currentImage}
                  alt={`${title} screenshot ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[60vh] object-contain rounded-xl shadow-md select-none pointer-events-none"
                  loading="eager"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="w-full h-64 bg-gray-100 rounded-2xl flex items-center justify-center">
              <p className="text-gray-500 text-sm font-medium">No screenshots available</p>
            </div>
          )}
          
          {/* Thumbnails indicator dots */}
          {imageArray.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4 pt-2 flex-shrink-0">
              {imageArray.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`transition-all duration-200 rounded-full cursor-pointer ${
                    index === currentImageIndex 
                      ? 'w-7 h-2.5 bg-gray-900 shadow-md' 
                      : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-500 hover:scale-125'
                  }`}
                  title={`Screenshot ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;