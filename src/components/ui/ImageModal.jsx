import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './ImageModal.css';

export const ImageModal = ({ src, alt, anchorRect, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (src) {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [src, onClose]);

  if (!src) return null;

  // Calculate vertical center of the step image
  const centerV = anchorRect ? anchorRect.top + (anchorRect.height / 2) : window.innerHeight / 2;
  
  // Modal position logic (simplified as side-aligned center)
  const cardStyle = anchorRect ? {
    top: `${Math.max(20, Math.min(window.innerHeight - 500, centerV - 220))}px`,
  } : {};

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-card"
          style={cardStyle}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 20, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close preview"
          >
            <X size={18} />
          </button>
          
          <div className="modal-img-container">
            <img src={src} alt={alt} />
          </div>
          
          {alt && (
            <div className="modal-footer" onClick={(e) => e.stopPropagation()}>
              <p className="modal-caption-text">{alt}</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
