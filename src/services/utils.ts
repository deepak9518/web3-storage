import axios, { AxiosRequestConfig } from 'axios';
import store from '../store';
import { API_BASE_URL, REQUEST_HEADERS } from '../constants/api';
import { IRequestBody } from './service.types';

export const postRequest = (url: string, body?: IRequestBody, config?: AxiosRequestConfig) => {
  const authToken = store.getState().user.token;
  if (authToken) {
    return axios.post(API_BASE_URL + url, body, {
      ...config,
      headers: { ...REQUEST_HEADERS, ...config?.headers, authorization: authToken },
    });
  }
};

export const putRequest = (url: string, body?: IRequestBody, config?: AxiosRequestConfig) => {
  const authToken = store.getState().user.token;
  if (authToken) {
    return axios.put(API_BASE_URL + url, body, {
      ...config,
      headers: { ...REQUEST_HEADERS, ...config?.headers, authorization: authToken },
    });
  }
};

export const getRequest = (url: string, config?: AxiosRequestConfig) => {
  const authToken = store.getState().user.token;
  if (authToken) {
    return axios.get(API_BASE_URL + url, {
      ...config,
      headers: {
        ...REQUEST_HEADERS,
        ...config?.headers,
        authorization: authToken,
      },
    });
  }
};

export const deleteRequest = (url: string, data?: any) => {
  const authToken = store.getState().user.token;
  if (authToken) {
    return axios.delete(API_BASE_URL + url, { headers: { ...REQUEST_HEADERS, authorization: authToken }, data });
  }
};
