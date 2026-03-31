import React from 'react';
import './Sidebar.css';

export const Sidebar = ({ sections, activeId }) => (
  <aside className="toc-sidebar" aria-label="Table of contents">
    <span className="toc-label">Table of Contents</span>
    <ul>
      {sections.map((s) => (
        <li key={s.id}>
          <a 
            href={`#${s.id}`} 
            className={activeId === s.id ? 'active' : ''}
          >
            {s.sidebarLabel || s.label || (s.id === 'top' ? 'Overview' : 'Section')}
          </a>
        </li>
      ))}
    </ul>
  </aside>
);
