import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage } from '../Pages';
import Layout from '../Pages/Layout/layout';
import MainPage from '../Pages/Main/mainPage';

const Router: React.FC = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <MainPage />
                }
            />
            <Route
                path='/login'
                element={
                    <Layout children={<LoginPage />} />
                }
            />
            <Route
                path='/home'
                element={
                    <Layout children={<HomePage/>} />
                }
            />
        </Routes>
    )
};

export default Router