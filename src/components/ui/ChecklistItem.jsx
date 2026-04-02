import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import './ChecklistItem.css';

export const ChecklistItem = ({ children }) => {
  const [checked, setChecked] = useState(false);

  return (
    <motion.li 
      className={`checklist-item ${checked ? 'checked' : ''}`}
      onClick={() => setChecked(!checked)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="check-box">
        {checked && <Check size={14} color="white" strokeWidth={3} />}
      </div>
      <div className="checklist-text">{children}</div>
    </motion.li>
  );
};
