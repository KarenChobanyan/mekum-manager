import React, { useEffect } from 'react';
import Router from '../Router/router';
import { useTranslation } from 'react-i18next';
import './App.scss';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('currentLang') ?? 'am');
  }, [i18n]);

  return (
    <>
    <Router />
    </>
  );
}

export default App;
