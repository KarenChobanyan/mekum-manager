import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
import './Local/i18Next/i18n';
import './General/Styles/index.css';
import { Provider } from 'react-redux';
import { store } from './Store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
);


