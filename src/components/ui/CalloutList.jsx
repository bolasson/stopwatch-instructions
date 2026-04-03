import './CalloutList.css';
import { FormattedText } from './FormattedText';

export const CalloutList = ({ items, type = 'step' }) => {
  const ListTag = type === 'step' ? 'ol' : 'ul';
  
  return (
    <ListTag className={`callout-list type-${type}`}>
      {items.map((item, index) => {
        const bodyContent = item.body || item.content || item;
        if (!bodyContent) return null;
        
        return (
          <li key={index} className="callout-item">
            {type === 'step' && <strong className="step-num">{index + 1}. </strong>}
            {item.header && (
              <strong className="callout-header">
                <FormattedText text={item.header} />:{" "}
              </strong>
            )}
            <span className="callout-body">
              <FormattedText text={bodyContent} />
            </span>
          </li>
        );
      })}
    </ListTag>
  );
};
