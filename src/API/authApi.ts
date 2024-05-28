import { FieldValues } from 'react-hook-form';
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './API';
import { ILoginFormValues } from '../Interfaces/interfaces';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.REACT_APP_API_KEY,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginFormValues, FieldValues>({
      query: (credentialsLogin) => ({
        url: '/users/login',
        method: 'POST',
        data: credentialsLogin,
      })
    }),
  }),
});

export const  {
  
} = authApi;
