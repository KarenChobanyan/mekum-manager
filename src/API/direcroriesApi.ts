import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './API';
import { AllGoodsResponse, CashRegistersResponse, GetEmployeesResponseData, GetGoodBatchesResponse, GetWarehousesResponseData, GoodsResponseData, IGetPartnersResponse } from '../Interfaces/responseTypes';
import { IGetGoodBatchRequest } from '../Interfaces/requestTypes';
import { tagTypes as actionsTagTypes } from './types';

export const directoriesApi = createApi({
    reducerPath: 'directoriesApi',
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.REACT_APP_API_KEY,
    }),
    tagTypes:[...actionsTagTypes],
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
            providesTags: ['WarehouseEntries','Sales','MyGoods']
        }),
        getAllGoods: builder.query<AllGoodsResponse, void>({
            query: () => ({
                url: '/mekum/all-goods',
                method: 'GET',
            }),
            providesTags: ['WarehouseEntries','Sales']
        }),
        getWarehouseGoods: builder.query<GoodsResponseData, string>({
            query: (id) => ({
                url: `/mekum/goods?id=${id}`,
                method: 'GET',
            }),
            providesTags: ['WarehouseEntries','Sales','MyGoods']
        }),
        getPartners: builder.query<IGetPartnersResponse, void>({
            query: () => ({
                url: '/mekum/partners',
                method: 'GET',
            }),
        }),
        getGoodBatches: builder.query<GetGoodBatchesResponse, IGetGoodBatchRequest>({
            query: (credentials) => ({
                url: `/mekum/good-batches?warehouseId=${credentials.warehouseId}&materialValueId=${credentials.materialValueId}`,
                method: 'GET',
            }),
            providesTags: ['WarehouseEntries','Sales']
        }),
        getCashRegisters: builder.query<CashRegistersResponse, void>({
            query: () => ({
                url: '/mekum/cash-registers',
                method: 'GET',
            }),
        }),
        getCashAllRegisters: builder.query<CashRegistersResponse, void>({
            query: () => ({
                url: '/mekum/all-cash-registers',
                method: 'GET',
            }),
        }),
    getAllCashRegisters: builder.query<CashRegistersResponse, void>({
        query: () => ({
            url: '/mekum/all-cash-registers',
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
    useGetCashAllRegistersQuery,
    useGetGoodBatchesQuery,
    useGetCashRegistersQuery,
    useGetAllCashRegistersQuery
} = directoriesApi;
