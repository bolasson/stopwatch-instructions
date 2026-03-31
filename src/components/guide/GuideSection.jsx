import { memo } from 'react';
import './GuideSection.css';
import { SECTION_RENDERERS, resolveAssetPath } from './renderers/RendererRegistry';

export const GuideSection = memo(({ section }) => {
  if (section.type === 'none') return null;

  const Renderer = SECTION_RENDERERS[section.type];

  return (
    <section id={section.id} className="guide-section">
      {section.id === 'top' && (
        <header className="article-header">
          <h1>How to build a stopwatch with an Arduino Nano</h1>
        </header>
      )}
      {section.kicker && <span className="step-kicker">{section.kicker}</span>}
      <h2>{section.title}</h2>
      {section.intro && <p className="step-intro">{section.intro}</p>}
      
      {Renderer ? Renderer(section) : <p>Unknown Section Type: {section.type}</p>}

      {section.image && (
        <img 
          src={resolveAssetPath(section.image)} 
          alt={section.title} 
          className="step-img" 
        />
      )}
    </section>
  );
});

GuideSection.displayName = 'GuideSection';
