import React from 'react';
import './GuideSection.css';
import { ChecklistItem } from '../ui/ChecklistItem';
import { CalloutList } from '../ui/CalloutList';
import { CodeBlock } from '../ui/CodeBlock';

export const GuideSection = ({ section }) => {
  const renderContent = (item) => {
    switch (item.type) {
      case 'text':
        return <p className="step-intro" key={item.body}>{item.body}</p>;
      case 'callout':
        return <CalloutList key={item.id || 'callout'} items={item.items} />;
      case 'code':
        return <CodeBlock key="code" code={item.items} hint={item.hint || 'Scroll to see full sketch'} />;
      case 'image':
        return <img key={item.src} src={item.src} alt={item.alt || 'Step diagram'} className="step-img" />;
      default:
        return null;
    }
  };

  if (section.type === 'none') return null;

  return (
    <section id={section.id}>
      {section.kicker && <span className="step-kicker">{section.kicker}</span>}
      <h2>{section.title}</h2>
      {section.intro && <p className="step-intro">{section.intro}</p>}
      
      {section.type === 'checklist' && (
        <ul className="checklist">
          {section.items.map((item, i) => (
            <ChecklistItem key={i}>{item}</ChecklistItem>
          ))}
        </ul>
      )}

      {section.type === 'callout' && <CalloutList items={section.items} />}
      
      {section.type === 'composite' && section.content.map(renderContent)}

      {section.type === 'code' && (
        <>
          <CodeBlock code={section.items} hint="Scroll to see full sketch" />
          {section.footer && <p className="step-intro" style={{ whiteSpace: 'pre-line' }}>{section.footer}</p>}
        </>
      )}

      {section.type === 'text_block' && section.content.map((p, i) => (
        <p key={i} className="step-intro">{p}</p>
      ))}

      {section.image && <img src={section.image} alt={section.title} className="step-img" />}
    </section>
  );
};
