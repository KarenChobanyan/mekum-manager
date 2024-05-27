import React, { useEffect } from 'react';
import './App.css';
import Router from '../Router/router';
import Header from '../Components/Header/header';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('currentLang') ?? 'am');
  }, [i18n]);

  return (
    <>
    <Header/>
    <Router />
    </>
  );
}

export default App;
