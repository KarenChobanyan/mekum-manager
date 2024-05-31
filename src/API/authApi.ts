import { FieldValues } from 'react-hook-form';
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './API';
import { ILoginFormValues } from '../Interfaces/interfaces';
import { ILoginResponse } from '../Interfaces/responseTypes';

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
  }),
});

export const  {
  useLoginMutation
} = authApi;
