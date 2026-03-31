import React from 'react';
import './ArticleHeader.css';

export const ArticleHeader = () => (
  <header className="article-header">
    <h1>How to build a stopwatch with an Arduino Nano</h1>
    <p className="lead">
      This guide walks you through wiring and programming an Arduino Nano stopwatch 
      with start/stop, reset, and lap controls displayed on a 16x2 LCD.
    </p>
  </header>
);
