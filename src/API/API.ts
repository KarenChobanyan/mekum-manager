import { toast } from 'react-toastify';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

const notify = (text: string) => {
  toast.error(text);
};
const urlsToNotUse = ['assets'];
function createLoaderElement(): void {
  document.body.classList.add('loading-indicator');
}
function removeLoaderElement(): void {
  document.body.classList.remove('loading-indicator');
}
function isValidRequestForInterceptor(url: string): boolean {
  for (const address of urlsToNotUse) {
    if (new RegExp(address).test(url)) {
      return false;
    }
  }
  return true;
}

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
  responseType: 'json',
});

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string | undefined } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    axios.interceptors.response.use(
      (res) => {
        removeLoaderElement();
        if (res?.data?.error) {
          return Promise.reject(res?.data?.error);
        }
        return res;
      },
      async (err) => {
        removeLoaderElement();
        if (err.response.status === 403 || err.response.status === 401) {
        }
        return Promise.reject(err);
      }
    );
    axios.interceptors.request.use(
      (config) => {
        if (isValidRequestForInterceptor(config.url!)) {
          createLoaderElement();
        }
        const token =
          localStorage.getItem('access-token') &&
          localStorage.getItem('access-token');
        if (config.url !== '/login' && !!config?.headers && token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as any;
      notify(err?.response?.data?.message);
      return {
        error: {
          error: err.response?.status,
          result: err.response?.data,
        },
      };
    }
  };

export default axiosBaseQuery;
