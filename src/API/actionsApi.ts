import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './API';
import { IGetStorageEntriesRequestData, IPostStorageIncomeRequestData, IPostWarehouseExitRequest } from '../Interfaces/requestTypes';
import { IWarehouseEntryResponse, WarehouseExitResponse } from '../Interfaces/responseTypes';

export const actionsApi = createApi({
    reducerPath: 'actionsApi',
    tagTypes: ['WarehouseEntries','WarehouseExits'],
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
    }),
});

export const {
    usePostWarehoseEntryMutation,
    useGetWarehouseEntriesQuery,
    useGetWarehouseExitsQuery,
    usePostWarehoseExitMutation,
} = actionsApi;
