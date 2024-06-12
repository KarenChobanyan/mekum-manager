import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './API';
import { ICashoutRequest, IGetStorageEntriesRequestData, IPostRPostReturnable, IPostStorageIncomeRequestData, IPostWarehouseExitRequest, IPostWarehouseReturnRequest, IWarehouseTransferRequest } from '../Interfaces/requestTypes';
import { AccounInvoiceResponce, CashOutResponse, IWarehouseEntryResponse, WarehouseExitResponse } from '../Interfaces/responseTypes';

export const actionsApi = createApi({
    reducerPath: 'actionsApi',
    tagTypes: ['WarehouseEntries', 'WarehouseExits', 'Sales', 'CashOut', 'CashEntry','Returnable'],
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.REACT_APP_API_KEY,
    }),
    endpoints: (builder) => ({
        postWarehoseEntry: builder.mutation<any, IPostStorageIncomeRequestData>({
            query: (credentials) => ({
                url: '/mekum/warehouse-entry-order',
                method: 'POST',
                data: credentials,
            }),
            invalidatesTags: ['WarehouseEntries']
        }),
        getWarehouseEntries: builder.query<IWarehouseEntryResponse, IGetStorageEntriesRequestData>({
            query: ({ id, limit, offset }) => ({
                url: `/mekum/entry-orders?id=${id}&limit=${limit}&offset=${offset}`,
                method: 'GET',
            }),
            providesTags: ['WarehouseEntries']
        }),
        getWarehouseExits: builder.query<WarehouseExitResponse, IGetStorageEntriesRequestData>({
            query: ({ id, limit, offset }) => ({
                url: `/mekum/exit-orders?id=${id}&limit=${limit}&offset=${offset}`,
                method: 'GET',
            }),
            providesTags: ['WarehouseExits']
        }),
        postWarehoseExit: builder.mutation<any, IPostWarehouseExitRequest>({
            query: (credentials) => ({
                url: '/mekum/warehouse-exit-order',
                method: 'POST',
                data: credentials,
            }),
            invalidatesTags: ['WarehouseExits']
        }),
        getSales: builder.query<AccounInvoiceResponce, IGetStorageEntriesRequestData>({
            query: ({ id, limit, offset }) => ({
                url: `/mekum/account-invoices?id=${id}&limit=${limit}&offset=${offset}`,
                method: 'GET',
            }),
            providesTags: ['Sales']
        }),
        postSale: builder.mutation<any, IPostWarehouseExitRequest>({
            query: (credentials) => ({
                url: '/mekum/sell',
                method: 'POST',
                data: credentials,
            }),
            invalidatesTags: ['Sales']
        }),
        getCashOuts: builder.query<CashOutResponse, IGetStorageEntriesRequestData>({
            query: ({ id, limit, offset }) => ({
                url: `/mekum/cash-register-exits?id=${id}&limit=${limit}&offset=${offset}`,
                method: 'GET',
            }),
            providesTags: ['CashOut']
        }),
        postCashout: builder.mutation<any, ICashoutRequest>({
            query: (credentials) => ({
                url: '/mekum/cash-register-exit',
                method: 'POST',
                data: credentials,
            }),
            invalidatesTags: ['CashOut']
        }),
        getCashEntry: builder.query<CashOutResponse, IGetStorageEntriesRequestData>({
            query: ({ id, limit, offset }) => ({
                url: `/mekum/cash-register-entries?id=${id}&limit=${limit}&offset=${offset}`,
                method: 'GET',
            }),
            providesTags: ['CashEntry']
        }),
        postCashEntry: builder.mutation<any, ICashoutRequest>({
            query: (credentials) => ({
                url: '/mekum/cash-register-entry',
                method: 'POST',
                data: credentials,
            }),
            invalidatesTags: ['CashEntry']
        }),
        postWarehouseTransfer: builder.mutation<any, IWarehouseTransferRequest>({
            query: (credentials) => ({
                url: '/mekum/move',
                method: 'POST',
                data: credentials,
            }),
            invalidatesTags: ['WarehouseExits']
        }),
        postWarehouseReturn: builder.mutation<any, IPostWarehouseReturnRequest>({
            query: (credentials) => ({
                url: '/mekum/return',
                method: 'POST',
                data: credentials,
            }),
        }),
        postReturnable: builder.mutation<any,IPostRPostReturnable>({
            query: (credentials) => ({
                url: '/returnable-product/',
                method: 'POST',
                data: credentials,
            }),
            invalidatesTags: ['Returnable']            
        }),
    }),
});

export const {
    usePostWarehoseEntryMutation,
    useGetWarehouseEntriesQuery,
    useGetWarehouseExitsQuery,
    usePostWarehoseExitMutation,
    useGetSalesQuery,
    usePostSaleMutation,
    useGetCashOutsQuery,
    usePostCashoutMutation,
    useGetCashEntryQuery,
    usePostCashEntryMutation,
    usePostWarehouseTransferMutation,
    usePostWarehouseReturnMutation,
    usePostReturnableMutation,
} = actionsApi;
