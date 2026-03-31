import { memo } from 'react';
import { ChecklistItem } from '../../ui/ChecklistItem';
import { CalloutList } from '../../ui/CalloutList';
import { CodeBlock } from '../../ui/CodeBlock';
import { FormattedText } from '../../ui/FormattedText';

export const resolveAssetPath = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${base}${cleanPath}`;
};

export const TextRenderer = memo(({ content, body, index }) => (
  <p className="step-intro" key={`text-${index}`}>
    <FormattedText text={body || content} />
  </p>
));

export const CalloutRenderer = memo(({ items, index }) => (
  <CalloutList key={`callout-${index}`} items={items} />
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

export const ChecklistRenderer = memo(({ items }) => (
  <ul className="checklist">
    {items.map((item, i) => (
      <ChecklistItem key={i}>
        <FormattedText text={item} />
      </ChecklistItem>
    ))}
  </ul>
));

export const TextBlockRenderer = memo(({ content }) => (
  <>
    {content.map((text, i) => (
      <p key={i} className="step-intro">
        <FormattedText text={text} />
      </p>
    ))}
  </>
));
