import { memo } from 'react';
import './Sidebar.css';

export const Sidebar = memo(({ parts, activeId }) => (
  <aside className="toc-sidebar" aria-label="Table of contents">
    <span className="toc-label">Table of Contents</span>
    <ul>
      {parts.map((p) => (
        <li key={p.id}>
          <a 
            href={`#${p.id}`} 
            className={activeId === p.id ? 'active' : ''}
          >
            {p.sidebarLabel || p.label || (p.id === 'top' ? 'Overview' : 'Part')}
          </a>
        </li>
      ))}
    </ul>
  </aside>
));

Sidebar.displayName = 'Sidebar';
