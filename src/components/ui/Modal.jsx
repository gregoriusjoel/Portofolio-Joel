import React, { useState } from "react";

const Modal = ({ isOpen, onClose, images, title }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // All hooks must be called before any conditional returns
  React.useEffect(() => {
    if (isOpen && images) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, images]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-w-6xl w-[95vw] max-h-[95vh] m-4 bg-white rounded-2xl shadow-2xl border border-gray-200" onClick={(e) => e.stopPropagation()}>
        
        {/* Enhanced Header */}
        <div className="bg-gray-100 p-4 border-b border-gray-200 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 truncate mr-4">{title || 'Project Preview'}</h3>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-200 hover:bg-red-500 hover:text-white text-gray-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 flex-shrink-0"
              title="Close Preview"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {imageArray.length > 1 && (
            <p className="text-sm text-gray-600 mt-2">
              Image {currentImageIndex + 1} of {imageArray.length}
            </p>
          )}
        </div>
        
        {/* Image Section with Fixed Layout */}
        <div className="p-8">
          {currentImage ? (
            <div className="relative">
              <div className="relative w-full h-[70vh] bg-gray-50 rounded-xl overflow-hidden shadow-inner">
                <button
                  onClick={prevImage}
                  disabled={imageArray.length <= 1}
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-20 shadow-lg transition-all duration-300 ${
                    imageArray.length > 1 
                      ? 'bg-white bg-opacity-90 hover:bg-opacity-100 hover:scale-110 text-gray-800 hover:text-gray-900' 
                      : 'bg-gray-200 bg-opacity-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextImage}
                  disabled={imageArray.length <= 1}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-20 shadow-lg transition-all duration-300 ${
                    imageArray.length > 1 
                      ? 'bg-white bg-opacity-90 hover:bg-opacity-100 hover:scale-110 text-gray-800 hover:text-gray-900' 
                      : 'bg-gray-200 bg-opacity-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
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