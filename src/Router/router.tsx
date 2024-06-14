import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { t } from 'i18next';
import { CashIncomingPage, CashOutPage, CashTransfersPage, HomePage, LoginPage, MyPage, SalesPage, StorageIncomesPage, StorageOutgoingsPage, UsersPage } from '../Pages';
import Layout from '../Pages/Layout/layout';
import MainPage from '../Pages/Main/mainPage';
import StorageTransfers from '../Pages/ActionPages/StorageTransfers/storageTransfers';
import { CreateStorageIncomePage, CreateStorageOutgoingsPage, CreateTorageTransfersPage, CreateSalesPage, CreateCashIncomePage, CreateCashoutPage, CreateCashTransferPage, CreateUserPage, StorageReturnPage, ReturnableProductsPage ,CreateReturnableProductsPage} from '../Pages/ActionPages';
import CreateStorageReturn from '../Pages/ActionPages/StorageReturns/Create/createStorageReturn';


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
                    <Layout children={<HomePage />} />
                }
            />
            <Route
                path='/my_page'
                element={
                    <Layout children={<MyPage />} />
                }
            />
            <Route
                path='/sales'
                element={
                    <Layout title={t('Actions.Sales.Title')} children={<SalesPage />} />
                }
            />
            <Route
                path='/sales/create/:id'
                element={
                    <Layout title={t('Actions.Sales.Title')} children={<CreateSalesPage />} />
                }
            />
            <Route
                path='/users'
                element={
                    <Layout title={t('Actions.Users.Title')} children={<UsersPage />} />
                }
            />
            <Route
                path='/users/create'
                element={
                    <Layout title={t('Actions.Users.Create')} children={<CreateUserPage />} />
                }
            />
            <Route
                path='/storage_incomings'
                element={
                    <Layout title={t('Actions.To_Storage.Title')} children={<StorageIncomesPage />} />
                }
            />
            <Route
                path='/storage_incomings/create/:id'
                element={
                    <Layout title={t('Actions.To_Storage.Title')} children={<CreateStorageIncomePage />} />
                }
            />
            <Route
                path='/storage_outgoings'
                element={
                    <Layout title={t('Actions.From_Storage.Title')} children={<StorageOutgoingsPage />} />
                }
            />
            <Route
                path='/storage_outgoings/create/:id'
                element={
                    <Layout title={t('Actions.From_Storage.Title')} children={<CreateStorageOutgoingsPage />} />
                }
            />
            <Route
                path='/storage_transfers'
                element={
                    <Layout title={t('Actions.Between_Storages.Title')} children={<StorageTransfers />} />
                }
            />
            <Route
                path='/storage_transfers/create'
                element={
                    <Layout title={t('Actions.Between_Storages.Title')} children={<CreateTorageTransfersPage />} />
                }
            />
            <Route
                path='/cash_incomings'
                element={
                    <Layout title={t('Actions.Cash_Income.Title')} children={<CashIncomingPage />} />
                }
            />
            <Route
                path='/cash_incomings/create/:id'
                element={
                    <Layout title={t('Actions.Cash_Income.Title')} children={<CreateCashIncomePage />} />
                }
            />
            <Route
                path='/cashouts'
                element={
                    <Layout title={t('Actions.CashOut.Title')} children={<CashOutPage />} />
                }
            />
            <Route
                path='/cashouts/create/:id'
                element={
                    <Layout title={t('Actions.CashOut.Title')} children={<CreateCashoutPage />} />
                }
            />
            <Route
                path='/cash_transfers'
                element={
                    <Layout title={t('Actions.Cash_Changes.Title')} children={<CashTransfersPage />} />
                }
            />
            <Route
                path='/cash_transfers/create'
                element={
                    <Layout title={t('Actions.Cash_Changes.Title')} children={<CreateCashTransferPage />} />
                }
            />

            <Route
                path='/returnable'
                element={
                    <Layout title={t('Actions.Returnable.Title')} children={<ReturnableProductsPage />} />
                }
            />
            <Route
                path='/returnable/create'
                element={
                    <Layout title={t('Actions.Returnable.Title')} children={<CreateReturnableProductsPage/>} />
                }
            />
            <Route
                path='/warehouse_returns'
                element={
                    <Layout title={t('Actions.Warehouse_Return.Title')} children={<StorageReturnPage />} />
                }
            />
            <Route
                path='/warehouse_returns/create/:id'
                element={
                    <Layout title={t('Actions.Warehouse_Return.Title')} children={<CreateStorageReturn />} />
                }
            />
        </Routes>
    )
};

export default Router