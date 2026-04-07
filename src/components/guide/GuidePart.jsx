import { memo } from 'react';
import './GuidePart.css';
import { PART_RENDERERS, resolveAssetPath } from './renderers/RendererRegistry';
import { FormattedText } from '../ui/FormattedText';

export const GuidePart = memo(({ part }) => {
  if (part.type === 'none') return null;

  const Renderer = PART_RENDERERS[part.type];

  return (
    <section id={part.id} className="guide-part">
      {part.id === 'top' && (
        <header className="article-header">
          <h1>How to build a stopwatch with an Arduino Nano</h1>
        </header>
      )}
      {part.kicker && <span className="step-kicker">{part.kicker}</span>}
      <h2>{part.title}</h2>
      {part.materials && (
        <div className="part-materials-list">
          <FormattedText text={part.materials} />
        </div>
      )}
      
      {part.intro && (
        <p className="step-intro">
          <FormattedText text={part.intro} />
        </p>
      )}
      
      {Renderer ? Renderer(part) : <p>Unknown Part Type: {part.type}</p>}

      {part.image && (
        <img 
          src={resolveAssetPath(part.image)} 
          alt={part.title} 
          className="step-img" 
        />
      )}
    </section>
  );
});

GuidePart.displayName = 'GuidePart';
