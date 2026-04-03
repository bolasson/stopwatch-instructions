import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormattedText } from './FormattedText';
import './ExpandableInfo.css';

export const ExpandableInfo = ({ header = "Learn More", items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`info-accordion ${isOpen ? 'is-open' : ''}`}>
      <button 
        className="info-header" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="info-header-left">
          <span className="info-title">{header}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="chevron-icon" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="info-content-wrapper"
          >
            <div className="info-content">
              {items.map((item, idx) => (
                <p key={idx} className="info-paragraph">
                  <FormattedText text={item.body || item.content || item} />
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
