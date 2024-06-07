import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './API';
import { AllGoodsResponse, GetEmployeesResponseData, GetGoodBatchesResponse, GetWarehousesResponseData, GoodsResponseData, IGetPartnersResponse } from '../Interfaces/responseTypes';
import { IGetGoodBatchRequest } from '../Interfaces/requestTypes';

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
        getAllGoods: builder.query<AllGoodsResponse, void>({
            query: () => ({
                url: '/mekum/all-goods',
                method: 'GET',
            }),
        }),
        getWarehouseGoods: builder.query<GoodsResponseData, string>({
            query: (id) => ({
                url: `/mekum/goods?id=${id}`,
                method: 'GET',
            }),
        }),
        getPartners: builder.query<IGetPartnersResponse, void>({
            query: () => ({
                url: '/mekum/partners',
                method: 'GET',
            }),
        }),
        getGoodBatches: builder.query<GetGoodBatchesResponse, IGetGoodBatchRequest >({
            query: (credentials) => ({
                url: `/mekum/good-batches?warehouseId=${credentials.warehouseId}&materialValueId=${credentials.materialValueId}`,
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
    useGetAllGoodsQuery,
    useGetPartnersQuery,
    useGetWarehouseGoodsQuery,
    useGetGoodBatchesQuery,
} = directoriesApi;
