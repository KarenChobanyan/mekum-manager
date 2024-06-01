import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {t} from 'i18next';
import { CashIncomingPage, CashOutPage, CashTransfersPage, HomePage, LoginPage, SalesPage, StorageIncomesPage, StorageOutgoingsPage, UsersPage } from '../Pages';
import Layout from '../Pages/Layout/layout';
import MainPage from '../Pages/Main/mainPage';
import StorageTransfers from '../Pages/ActionPages/StorageTransfers/storageTransfers';
import { CreateStorageIncomePage,CreateStorageOutgoings } from '../Pages/ActionPages';

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
                    <Layout title={t('Actions.Sales.Title')} children={<SalesPage/>} />
                }
            />
             <Route
                path='/users'
                element={
                    <Layout title={t('Actions.Users.Title')} children={<UsersPage/>} />
                }
            />
            <Route
                path='/storage_incomings'
                element={
                    <Layout title={t('Actions.To_Storage.Title')} children={<StorageIncomesPage/>} />
                }
            />
             <Route
                path='/storage_incomings/create'
                element={
                    <Layout title={t('Actions.To_Storage.Title')} children={<CreateStorageIncomePage/>} />
                }
            />
            <Route
                path='/storage_outgoings'
                element={
                    <Layout title={t('Actions.From_Storage.Title')}  children={<StorageOutgoingsPage/>} />
                }
            />
            <Route
                path='/storage_outgoings/create'
                element={
                    <Layout title={t('Actions.From_Storage.Title')} children={<CreateStorageOutgoings/>} />
                }
            />
            <Route
                path='/storage_transfers'
                element={
                    <Layout title={t('Actions.Between_Storages.Title')} children={<StorageTransfers/>} />
                }
            />
             <Route
                path='/cash_incomings'
                element={
                    <Layout title={t('Actions.Cash_Income.Title')} children={<CashIncomingPage/>} />
                }
            />
            <Route
                path='/cashouts'
                element={
                    <Layout title={t('Actions.CashOut.Title')} children={<CashOutPage/>} />
                }
            />
             <Route
                path='/cash_transfers'
                element={
                    <Layout title={t('Actions.Cash_Changes.Title')} children={<CashTransfersPage/>} />
                }
            />
        </Routes>
    )
};

export default Router