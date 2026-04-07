import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import './CalloutList.css';
import { FormattedText } from './FormattedText';

export const CalloutList = ({ items, type = 'step', start = 1 }) => {
  const ListTag = type === 'step' ? 'ol' : 'ul';
  
  return (
    <ListTag className={`callout-list type-${type}`} style={{ counterReset: `step-counter ${start - 1}` }}>
      {items.map((item, index) => <CalloutItem key={index} item={item} type={type} index={index} start={start} />)}
    </ListTag>
  );
};

const CalloutItem = ({ item, type, index, start }) => {
  const [checked, setChecked] = useState(false);
  const bodyContent = item.body || item.content || item;
  if (!bodyContent) return null;

  const isStep = type === 'step';

  return (
    <motion.li 
      className={`callout-item ${isStep ? 'checkable' : ''} ${checked ? 'checked' : ''}`}
      onClick={isStep ? () => setChecked(!checked) : undefined}
      whileHover={isStep ? { scale: 1.005 } : {}}
      whileTap={isStep ? { scale: 0.995 } : {}}
    >
      {isStep && (
        <div className="check-box-wrapper">
          <div className="check-box">
            {checked && <Check size={12} color="white" strokeWidth={4} />}
          </div>
        </div>
      )}
      
      <div className="callout-content">
        {isStep && <strong className="step-num">{index + start}. </strong>}
        {item.header && (
          <strong className="callout-header">
            <FormattedText text={item.header} />:{" "}
          </strong>
        )}
        <span className="callout-body">
          <FormattedText text={bodyContent} />
        </span>
      </div>
    </motion.li>
  );
};
