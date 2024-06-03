import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './API';
import { ILoginFormValues } from '../Interfaces/interfaces';
import { ILoginResponse } from '../Interfaces/responseTypes';
import { IRegisterFormValues } from '../Pages/ActionPages/Users/Create/createUser-hooks';

export const authApi = createApi({
  reducerPath: 'authApi',
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
      query: (credentialsLogin) => ({
        url: '/auth/register',
        method: 'POST',
        data: credentialsLogin,
      })
    }),
  }),
});

export const  {
  useLoginMutation,
  useRegisterMutation
} = authApi;
