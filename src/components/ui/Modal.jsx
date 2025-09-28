import React, { useState } from "react";
import { Z_INDEX } from '../../utils/zIndex';

const Modal = ({ isOpen, onClose, images, title }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // All hooks must be called before any conditional returns
  React.useEffect(() => {
    if (isOpen && images) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, images]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  // Define imageArray before using it in useEffect
  const imageArray = isOpen && images ? (Array.isArray(images) ? images : [images]) : [];

  // Add keyboard navigation
  React.useEffect(() => {
    if (!isOpen || !imageArray.length) return;
    
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
  
  if (!isOpen) return null;
  
  // Debug log
  console.log('Modal props:', { isOpen, images, title });
  
  if (!images) {
    console.log('No images provided to modal');
    return null;
  }
  
  const currentImage = imageArray[currentImageIndex];
  
  console.log('Current image:', currentImage);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative max-w-6xl w-[95vw] max-h-[95vh] m-2 sm:m-4 bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200" 
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        
        {/* Enhanced Header */}
        <div className="bg-gray-100 p-3 sm:p-4 border-b border-gray-200 rounded-t-xl sm:rounded-t-2xl">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 id="modal-title" className="text-lg sm:text-xl font-bold text-gray-900 truncate">{title || 'Project Preview'}</h3>
            </div>
            
            {/* Header Navigation Buttons - Responsive */}
            {imageArray.length > 1 && (
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={prevImage}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full transition-all duration-200 flex items-center gap-1 whitespace-nowrap"
                  title="Previous Image"
                >
                  <span className="hidden xs:inline">← Previous</span>
                  <span className="xs:hidden">←</span>
                </button>
                <button
                  onClick={nextImage}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full transition-all duration-200 flex items-center gap-1 whitespace-nowrap"
                  title="Next Image"
                >
                  <span className="hidden xs:inline">Next →</span>
                  <span className="xs:hidden">→</span>
                </button>
              </div>
            )}
            
            <button
              onClick={onClose}
              title="Close Preview"
              aria-label="Close Preview"
              className="group relative w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 hover:bg-red-500 hover:text-white text-gray-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 flex-shrink-0"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none hidden sm:block">
                Close Preview
              </span>
            </button>
          </div>
          {imageArray.length > 1 && (
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Image {currentImageIndex + 1} of {imageArray.length}
            </p>
          )}
        </div>
        
        {/* Image Section with Fixed Layout */}
        <div className="p-4 sm:p-8">
          {currentImage ? (
            <div className="relative">
              <div className="relative w-full h-[60vh] sm:h-[70vh] bg-gray-50 rounded-xl overflow-hidden shadow-inner">
                <button
                  onClick={prevImage}
                  disabled={imageArray.length <= 1}
                  title="Previous Image"
                  aria-label="Previous Image"
                  className={`group absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-20 shadow-lg transition-all duration-300 ${
                    imageArray.length > 1 
                      ? 'bg-white bg-opacity-90 hover:bg-opacity-100 hover:scale-110 text-gray-800 hover:text-gray-900' 
                      : 'bg-gray-200 bg-opacity-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {imageArray.length > 1 && (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none hidden sm:block">
                      Previous Image
                    </span>
                  )}
                </button>
                
                <button
                  onClick={nextImage}
                  disabled={imageArray.length <= 1}
                  title="Next Image"
                  aria-label="Next Image"
                  className={`group absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-20 shadow-lg transition-all duration-300 ${
                    imageArray.length > 1 
                      ? 'bg-white bg-opacity-90 hover:bg-opacity-100 hover:scale-110 text-gray-800 hover:text-gray-900' 
                      : 'bg-gray-200 bg-opacity-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {imageArray.length > 1 && (
                    <span className="absolute right-full mr-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none hidden sm:block">
                      Next Image
                    </span>
                  )}
                </button>
                
                {/* Image with slide animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    key={currentImageIndex} // Force re-render for animation
                    src={currentImage}
                    alt={`${title} screenshot ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-lg transform transition-all duration-500 ease-in-out animate-fadeIn"
                    onError={(e) => {
                      console.error('Image failed to load:', currentImage);
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                    }}
                    onLoad={() => console.log('Image loaded successfully:', currentImage)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-[70vh] bg-gray-100 rounded-xl flex items-center justify-center shadow-inner">
              <p className="text-gray-500 text-lg">No image to display</p>
            </div>
          )}
          
          {/* Enhanced Image indicators */}
          {imageArray.length > 1 && (
            <div className="flex justify-center gap-3 mt-6">
              {imageArray.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentImageIndex 
                      ? 'w-8 h-3 bg-gray-800 shadow-md' 
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-500 hover:scale-125'
                  }`}
                  title={`Image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;