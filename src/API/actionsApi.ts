import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './API';
import { IGetStorageEntriesRequestData, IPostStorageIncomeRequestData } from '../Interfaces/requestTypes';
import { IWarehouseEntryResponse } from '../Interfaces/responseTypes';

export const actionsApi = createApi({
    reducerPath: 'actionsApi',
    tagTypes: ['WarehouseEntries'],
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.REACT_APP_API_KEY,
    }),
    endpoints: (builder) => ({
        postWarehoseEntry: builder.mutation<any, IPostStorageIncomeRequestData>({
            query: (credentialsLogin) => ({
                url: '/mekum/warehouse-entry-order',
                method: 'POST',
                data: credentialsLogin,
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
        getWarehouseExits: builder.query<any, IGetStorageEntriesRequestData>({
            query: ({ id, limit, offset }) => ({
                url: `/mekum/exit-orders?id=${id}&limit=${limit}&offset=${offset}`,
                method: 'GET',
            }),
            providesTags: ['WarehouseEntries']
        }),
    }),
});

export const {
    usePostWarehoseEntryMutation,
    useGetWarehouseEntriesQuery,
    useGetWarehouseExitsQuery,
} = actionsApi;
