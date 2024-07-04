import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './API';
import { IAcceptCashTransfer, IAcceptWarehouseTransferRequest, ICashoutRequest, IGetStorageEntriesRequestData, IGetWarehouseTransfersRequestData, IPostCashTransfer, IPostStorageIncomeRequestData, IPostWarehouseExitRequest, IPostWarehouseReturnRequest, IWarehouseTransferRequest, PostRetunableRequestData } from '../Interfaces/requestTypes';
import { AccounInvoiceResponce, CashOutResponse, GetReturnableProductsResponse, GetWarehouseTransferResponse, IWarehouseEntryResponse, WarehouseExitResponse, WarehouseReturnsResponse } from '../Interfaces/responseTypes';
import { directoriesApi } from './direcroriesApi';
import { tagTypes } from './types';

export const actionsApi = createApi({
    reducerPath: 'actionsApi',
    tagTypes: tagTypes,
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
            invalidatesTags: ['WarehouseEntries','MyGoods'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(directoriesApi.endpoints.getGoods.initiate());
                } catch (error) {
                    console.log(error)
                }
            },
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
            invalidatesTags: ['WarehouseExits','MyGoods']
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
            invalidatesTags: ['Sales','MyGoods']
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
        getCashTransfers: builder.query<CashOutResponse, IGetWarehouseTransfersRequestData>({
            query: ({ id, limit, offset,isIn }) => ({
                url: `/mekum/cash-flows-movement?id=${id}&limit=${limit}&offset=${offset}&isIn=${isIn}`,
                method: 'GET',
            }),
            providesTags: ['CashTransfers']
        }),
        postCashTransfer: builder.mutation<any, IPostCashTransfer>({
            query: (credentials) => ({
                url: '/mekum/cash-flows-movement',
                method: 'POST',
                data: credentials,
            }),
            invalidatesTags: ['CashTransfers']
        }),
        acceptCashTransfers: builder.mutation<any, IAcceptCashTransfer>({
            query: (credentials) => ({
                url: `/mekum/accept-cash-move/${credentials.id}`,
                method: 'PUT',
                data: credentials.data,
            }),
            invalidatesTags: ['CashTransfers']
        }),
        getWarehouseTransfers: builder.query<GetWarehouseTransferResponse, IGetWarehouseTransfersRequestData>({
            query: ({ id, limit, offset, isIn }) => ({
                url: `/mekum/movements?id=${id}&limit=${limit}&offset=${offset}&isIn=${isIn}`,
                method: 'GET',
            }),
            providesTags: ['WarehouseTransfers']
        }),
        postWarehouseTransfer: builder.mutation<any, IWarehouseTransferRequest>({
            query: (credentials) => ({
                url: '/mekum/move',
                method: 'POST',
                data: credentials,
            }),
            invalidatesTags: ['WarehouseTransfers']
        }),
        acceptWarehouseTransfer: builder.mutation<any, IAcceptWarehouseTransferRequest>({
            query: (credentials) => ({
                url: `/mekum/accept-move/${credentials.id}`,
                method: 'PUT',
                data: credentials.data,
            }),
            invalidatesTags: ['WarehouseTransfers']
        }),
        getWarehouseReturns: builder.query<WarehouseReturnsResponse, IGetStorageEntriesRequestData>({
            query: ({ id, limit, offset }) => ({
                url: `/mekum/returns?id=${id}&limit=${limit}&offset=${offset}`,
                method: 'GET',
            }),
            providesTags: ['Returns']
        }),

        postWarehouseReturn: builder.mutation<any, IPostWarehouseReturnRequest>({
            query: (credentials) => ({
                url: '/mekum/return',
                method: 'POST',
                data: credentials,
            }),
            invalidatesTags: ['Returns']
        }),
        postReturnable: builder.mutation<any, PostRetunableRequestData>({
            query: (credentials) => ({
                url: '/returnable-product',
                method: 'POST',
                data: credentials,
            }),
            invalidatesTags: ['Returnable']
        }),
        getReturnableProducts: builder.query<GetReturnableProductsResponse, void>({
            query: () => ({
                url: `/returnable-product`,
                method: 'GET',
            }),
            providesTags: ['Returnable']
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
    usePostCashTransferMutation,
    useGetCashTransfersQuery,
    useAcceptCashTransfersMutation,
    usePostWarehouseTransferMutation,
    useAcceptWarehouseTransferMutation,
    usePostWarehouseReturnMutation,
    usePostReturnableMutation,
    useGetWarehouseTransfersQuery,
    useGetWarehouseReturnsQuery,
    useGetReturnableProductsQuery
} = actionsApi;
