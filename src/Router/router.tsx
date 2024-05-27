import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../Pages';
import Layout from '../Pages/Layout/layout';

const Router: React.FC = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <Layout children={<LoginPage />} />
                }
            />
        </Routes>
    )
};

export default Router