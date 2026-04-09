import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { preloadPoetryData } from './data/poetry/index';

// Preload poetry data before first render
preloadPoetryData();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/ai-poetry-clawh">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
