import './utils/axiosConfig'; // Импорт для применения настроек
import React from 'react';
import ReactDOM from 'react-dom/client';
import './design/index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </React.StrictMode>
);