import React from 'react';
import './CalloutList.css';

export const CalloutList = ({ items }) => (
  <ul className="callout-list">
    {items.map((item, index) => (
      <li key={index} className="callout-item">
        {item.header && <strong>{item.header}{": "}</strong>}
        {item.body && <span>{item.body}</span>}
      </li>
    ))}
  </ul>
);
