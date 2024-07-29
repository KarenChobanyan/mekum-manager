import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './API';
import { ILoginFormValues } from '../Interfaces/interfaces';
import { GetUsersResponse, IGetMeResponseData, ILoginResponse } from '../Interfaces/responseTypes';
import { IRegisterFormValues } from '../Pages/ActionPages/Users/Create/createUser-hooks';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Users'],
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.REACT_APP_API_KEY,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginFormValues>({
      query: (credentialsLogin) => ({
        url: '/auth/login',
        method: 'POST',
        data: credentialsLogin,
      })
    }),
    register: builder.mutation<ILoginResponse, IRegisterFormValues>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        data: credentials,
      }),
      invalidatesTags: ['Users']
    }),
    getUsers: builder.query<GetUsersResponse, void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      providesTags: ['Users']
    }),
    getUserById: builder.query<GetUsersResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
    removeUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users']
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useRemoveUserMutation
} = authApi;
