// Z-Index Hierarchy System
// Digunakan untuk memastikan layering yang konsisten di seluruh aplikasi

export const Z_INDEX = {
  // Base level - Regular content
  BASE: 0,
  
  // Navbar - Should be above regular content but below modals
  NAVBAR: 9998,
  
  // Welcome Animation - Initial loading screen
  WELCOME_ANIMATION: 9999,
  WELCOME_SKIP_BUTTON: 10001,
  
  // Modals - Should be above everything except tooltips
  MODAL_OVERLAY: 10000,
  MODAL_CONTENT: 10001,
  
  // Tooltips and notifications - Highest priority
  TOOLTIP: 10002,
  NOTIFICATION: 10003,
};

// Utility function untuk generate z-index classes
export const getZIndexClass = (level) => {
  return `z-[${Z_INDEX[level]}]`;
};

// Documentation:
// - NAVBAR: Fixed navigation, should be accessible but not block modals
// - WELCOME_ANIMATION: Full screen loading animation
// - MODAL: Project previews, image galleries, etc.
// - TOOLTIP: Contextual help, should be above everything