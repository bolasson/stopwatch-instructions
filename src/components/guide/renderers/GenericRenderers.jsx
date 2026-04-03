import { memo, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { ChecklistItem } from '../../ui/ChecklistItem';
import { CalloutList } from '../../ui/CalloutList';
import { CodeBlock } from '../../ui/CodeBlock';
import { FormattedText } from '../../ui/FormattedText';
import { ImageModal } from '../../ui/ImageModal';

export const resolveAssetPath = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${base}${cleanPath}`.replace(/\/+/g, '/');
};

export const TextRenderer = memo(({ content, body, index }) => (
  <p className="step-intro" key={`text-${index}`}>
    <FormattedText text={body || content} />
  </p>
));

export const CalloutRenderer = memo(({ items, variant, index }) => (
  <CalloutList key={`callout-${index}`} items={items} type={variant || 'step'} />
));

export const CodeRenderer = memo(({ content, items, hint, index }) => (
  <CodeBlock 
    key={`code-${index}`} 
    code={items || content} 
    hint={hint || 'Scroll to see full sketch'} 
  />
));

export const ImageRenderer = memo(({ src, alt, index }) => (
  <img 
    key={`image-${index}`} 
    src={resolveAssetPath(src)} 
    alt={alt || 'Step diagram'} 
    className="step-img" 
  />
));

export const ChecklistRenderer = memo(({ items }) => {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <>
      <ul className="checklist">
        {items.map((item, i) => {
          const isObject = typeof item === 'object';
          const text = isObject ? item.text : item;
          const image = isObject ? item.image : null;

          return (
            <ChecklistItem key={i}>
              <div className="checklist-item-content">
                {image && (
                  <div 
                    className={`checklist-img-wrapper ${activeImage?.src === resolveAssetPath(image) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      const rect = e.currentTarget.getBoundingClientRect();
                      setActiveImage({ 
                        src: resolveAssetPath(image), 
                        alt: text,
                        anchorRect: rect
                      });
                    }}
                  >
                    <img 
                      src={resolveAssetPath(image)} 
                      alt={text} 
                      className="checklist-thumb" 
                    />
                    <div className="expand-overlay">
                      <Maximize2 size={12} />
                    </div>
                  </div>
                )}
                <FormattedText text={text} />
              </div>
            </ChecklistItem>
          );
        })}
      </ul>
      <ImageModal 
        src={activeImage?.src} 
        alt={activeImage?.alt} 
        anchorRect={activeImage?.anchorRect}
        onClose={() => setActiveImage(null)} 
      />
    </>
  );
});

export const TextBlockRenderer = memo(({ content }) => (
  <>
    {content.map((text, i) => (
      <p key={i} className="step-intro">
        <FormattedText text={text} />
      </p>
    ))}
  </>
));
