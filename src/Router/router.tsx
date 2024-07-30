import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { t } from 'i18next';
import { CashIncomingPage, CashOutPage, CashTransfersPage, HomePage, LoginPage, MyPage, SalesPage, StorageIncomesPage, StorageOutgoingsPage, UsersPage } from '../Pages';
import Layout from '../Pages/Layout/layout';
import MainPage from '../Pages/Main/mainPage';
import StorageTransfers from '../Pages/ActionPages/StorageTransfers/storageTransfers';
import { CreateStorageIncomePage, CreateStorageOutgoingsPage, CreateStorageTransfersPage, CreateSalesPage, CreateCashIncomePage, CreateCashoutPage, CreateCashTransferPage, CreateUserPage, StorageReturnPage, ReturnableProductsPage, CreateReturnableProductsPage } from '../Pages/ActionPages';
import CreateStorageReturn from '../Pages/ActionPages/StorageReturns/Create/createStorageReturn';
import SignUpPage from '../Pages/SignUp/signUpPage';
import Companies from '../Pages/ActionPages/Companies/companies';
import CreateCompany from '../Pages/ActionPages/Companies/Create/createCompany';
import EditUser from '../Pages/ActionPages/Users/Edit/editUser';
import Admin from '../Pages/Providers/admin';
import User from '../Pages/Providers/user';
import NotFound from '../Pages/NotFound/notFound';


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
                path='/signUp'
                element={
                    <Layout title={t('Sign_Up.Title')} children={<SignUpPage />} />
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
                    <Layout title={t('Actions.Sales.Title')} children={<User children={<SalesPage />}/>} />
                }
            />
            <Route
                path='/sales/create/:id'
                element={
                    <Layout title={t('Actions.Sales.Title')} children={<User children={<CreateSalesPage />}/>} />
                }
            />
            <Route
                path='/users'
                element={
                    <Layout title={t('Actions.Users.Title')} children={<Admin children={<UsersPage />} />} />
                }
            />
            <Route
                path='/users/create'
                element={
                    <Layout title={t('Actions.Users.Create')} children={<Admin children={<CreateUserPage />}/>} />
                }
            />
            <Route
                path='/users/edit/:id'
                element={
                    <Layout title={t('Actions.Users.Title')} children={<Admin children={<EditUser />}/>} />
                }
            />
            <Route
                path='/companies'
                element={
                    <Layout title={t('Actions.Companies.Title')} children={<Admin children={<Companies />}/>} />
                }
            />
            <Route
                path='/companies/create'
                element={
                    <Layout title={t('Actions.Companies.Title')} children={<Admin children={<CreateCompany />}/>} />
                }
            />
            <Route
                path='/storage_incomings'
                element={
                    <Layout title={t('Actions.To_Storage.Title')} children={<User children={<StorageIncomesPage />} />}/>
                }
            />
            <Route
                path='/storage_incomings/create/:id'
                element={
                    <Layout title={t('Actions.To_Storage.Title')} children={<User children={<CreateStorageIncomePage />}/>} />
                }
            />
            <Route
                path='/storage_outgoings'
                element={
                    <Layout title={t('Actions.From_Storage.Title')} children={<User children={<StorageOutgoingsPage />}/>} />
                }
            />
            <Route
                path='/storage_outgoings/create/:id'
                element={
                    <Layout title={t('Actions.From_Storage.Title')} children={<User children={<CreateStorageOutgoingsPage />}/>} />
                }
            />
            <Route
                path='/storage_transfers'
                element={
                    <Layout title={t('Actions.Between_Storages.Title')} children={<User children={<StorageTransfers />}/>} />
                }
            />
            <Route
                path='/storage_transfers/create/:id'
                element={
                    <Layout title={t('Actions.Between_Storages.Title')} children={<User children={<CreateStorageTransfersPage />}/>} />
                }
            />
            <Route
                path='/cash_incomings'
                element={
                    <Layout title={t('Actions.Cash_Income.Title')} children={<User children={<CashIncomingPage />} />}/>
                }
            />
            <Route
                path='/cash_incomings/create/:id'
                element={
                    <Layout title={t('Actions.Cash_Income.Title')} children={<User children={<CreateCashIncomePage />}/>} />
                }
            />
            <Route
                path='/cashouts'
                element={
                    <Layout title={t('Actions.CashOut.Title')} children={<User children={<CashOutPage />}/>} />
                }
            />
            <Route
                path='/cashouts/create/:id'
                element={
                    <Layout title={t('Actions.CashOut.Title')} children={<User children={<CreateCashoutPage />}/>} />
                }
            />
            <Route
                path='/cash_transfers'
                element={
                    <Layout title={t('Actions.Cash_Changes.Title')} children={<User children={<CashTransfersPage />}/>} />
                }
            />
            <Route
                path='/cash_transfers/create/:id'
                element={
                    <Layout title={t('Actions.Cash_Changes.Title')} children={<User children={<CreateCashTransferPage />} />}/>
                }
            />

            <Route
                path='/returnable'
                element={
                    <Layout title={t('Actions.Returnable.Title')} children={<Admin children={<ReturnableProductsPage />}/>} />
                }
            />
            <Route
                path='/returnable/create'
                element={
                    <Layout title={t('Actions.Returnable.Title')} children={<Admin children={<CreateReturnableProductsPage />} />}/>
                }
            />
            <Route
                path='/warehouse_returns'
                element={
                    <Layout title={t('Actions.Warehouse_Return.Title')} children={<User children={<StorageReturnPage />}/>} />
                }
            />
            <Route
                path='/warehouse_returns/create/:id'
                element={
                    <Layout title={t('Actions.Warehouse_Return.Title')} children={<User children={<CreateStorageReturn />}/>} />
                }
            />
            <Route
            path='*'
            element={<NotFound/>}
            />
        </Routes>
    )
};

export default Router