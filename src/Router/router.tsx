import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CashIncomingPage, CashOutPage, CashTransfersPage, HomePage, LoginPage, SalesPage, StorageIncomesPage, StorageOutgoingsPage, UsersPage } from '../Pages';
import Layout from '../Pages/Layout/layout';
import MainPage from '../Pages/Main/mainPage';
import StorageTransfers from '../Pages/ActionPages/StorageTransfers/storageTransfers';

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
             <Route
                path='/sales'
                element={
                    <Layout children={<SalesPage/>} />
                }
            />
             <Route
                path='/users'
                element={
                    <Layout children={<UsersPage/>} />
                }
            />
            <Route
                path='/storage_incomings'
                element={
                    <Layout children={<StorageIncomesPage/>} />
                }
            />
            <Route
                path='/storage_outgoings'
                element={
                    <Layout children={<StorageOutgoingsPage/>} />
                }
            />
            <Route
                path='/storage_transfers'
                element={
                    <Layout children={<StorageTransfers/>} />
                }
            />
             <Route
                path='/cash_incomings'
                element={
                    <Layout children={<CashIncomingPage/>} />
                }
            />
            <Route
                path='/cashouts'
                element={
                    <Layout children={<CashOutPage/>} />
                }
            />
             <Route
                path='/cash_transfers'
                element={
                    <Layout children={<CashTransfersPage/>} />
                }
            />
        </Routes>
    )
};

export default Router