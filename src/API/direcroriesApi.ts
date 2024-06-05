import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './API';
import { GetEmployeesResponseData, GetWarehousesResponseData, GoodsResponseData, IGetPartnersResponse } from '../Interfaces/responseTypes';

export const directoriesApi = createApi({
    reducerPath: 'directoriesApi',
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.REACT_APP_API_KEY,
    }),
    endpoints: (builder) => ({
        getWarehouses: builder.query<GetWarehousesResponseData, void>({
            query: () => ({
                url: '/mekum/warehouses',
                method: 'GET',
            }),
        }),
        getAllWarehouses: builder.query<GetWarehousesResponseData, void>({
            query: () => ({
                url: '/mekum/all-warehouses',
                method: 'GET',
            }),
        }),
        getEmployees: builder.query<GetEmployeesResponseData, void>({
            query: () => ({
                url: '/mekum/employees',
                method: 'GET',
            }),
        }),
        getGoods: builder.query<GoodsResponseData, void>({
            query: () => ({
                url: '/mekum/goods',
                method: 'GET',
            }),
        }),
        getPartners: builder.query<IGetPartnersResponse, void>({
            query: () => ({
                url: '/mekum/partners',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetWarehousesQuery,
    useGetAllWarehousesQuery,
    useGetEmployeesQuery,
    useGetGoodsQuery,
    useGetPartnersQuery,
} = directoriesApi;
