import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './API';
import { GetEmployeesResponseData, GetWarehousesResponseData, GoodsResponseData, IGetPartnersResponse } from '../Interfaces/responseTypes';
import { IStorageIncomeRequestData } from '../Interfaces/requestTypes';

export const actionsApi = createApi({
    reducerPath: 'actionsApi',
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.REACT_APP_API_KEY,
    }),
    endpoints: (builder) => ({
        postWarehoseEntry: builder.mutation<any, IStorageIncomeRequestData>({
            query: (credentialsLogin) => ({
                url: '/mekum/warehouse-entry-order',
                method: 'POST',
                data: credentialsLogin,
            })
        }),
        getAllWarehouses: builder.query<GetWarehousesResponseData, void>({
            query: () => ({
                url: '/mekum/all-warehouses',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    usePostWarehoseEntryMutation,
    useGetAllWarehousesQuery,
} = actionsApi;
