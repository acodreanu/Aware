import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError } from 'axios';
import * as rax from 'retry-axios';

import { CommonConstants } from '../domain/constants/commonConstants';
import { IRequestConfiguration } from '../domain/models/requestConfiguration';
import { IResponse } from '../domain/models/response';

import { NotificationHelper } from './notificationHelper';

function mapResponse<T>(axiosResponse: AxiosResponse<T>): IResponse<T> {
  const result = {
    data: axiosResponse?.data,
    status: axiosResponse?.status,
    statusText: axiosResponse?.statusText
  };

  return result;
}

function setAuthHeader(config: AxiosRequestConfig) {
  const token = localStorage.getItem(CommonConstants.AccessToken);
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    };
  }
}

function requestInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
  setAuthHeader(config);
  return config;
}

function requestErrorInterceptor(error: AxiosError) {
  throw error;
}

function responseInterceptor(response: AxiosResponse): AxiosResponse {
  return response;
}

function responseErrorInterceptor(error: AxiosError) {
  const config = error.config as IRequestConfiguration;
  if (config?.errorConfiguration) {
    NotificationHelper.error(config.errorConfiguration.title, config.errorConfiguration.body);
  } else {
    if (error.response) {
      if (error.response.data && error.response.data.message) {
        console.log(error.response);
        // console.log(error.response.data.message);
        const apiServiceError = error.response.data;

        // if (typeof error.response.data.message === 'string') {
        //   NotificationHelper.error(error.response.statusText, error.response.data.message);
        // } else {
        (apiServiceError.data as [{ msg: string }]).forEach(err => {
          NotificationHelper.error(apiServiceError.message, err.msg);
        });
        // }
      } else {
        const errorResponse = mapResponse(error.response);
        NotificationHelper.error(errorResponse.status, errorResponse.statusText);
      }
    }

    throw error;
  }
}

async function internalGet<TResponse>(
  axios: AxiosInstance,
  url: string,
  configuration?: IRequestConfiguration
): Promise<IResponse<TResponse>> {
  const response = await axios.get<TResponse>(url, { ...configuration });
  const result = mapResponse(response);

  return result;
}

async function internalPost<TResponse, TRequest>(
  axios: AxiosInstance,
  url: string,
  data?: TRequest,
  configuration?: IRequestConfiguration
): Promise<IResponse<TResponse>> {
  const response = await axios.post<TResponse>(url, data, { ...configuration });
  const result = mapResponse(response);

  return result;
}

async function internalPut<TResponse, TRequest>(
  axios: AxiosInstance,
  url: string,
  data?: TRequest,
  configuration?: IRequestConfiguration
): Promise<IResponse<TResponse>> {
  const response = await axios.put<TResponse>(url, data, { ...configuration });
  const result = mapResponse(response);

  return result;
}

async function internalDelete<TResponse>(
  axios: AxiosInstance,
  url: string,
  configuration?: IRequestConfiguration
): Promise<IResponse<TResponse>> {
  const response = await axios.delete<TResponse>(url, { ...configuration });
  const result = mapResponse(response);

  return result;
}

interface IHttpClient {
  get<TResponse>(url: string, configuration?: IRequestConfiguration): Promise<IResponse<TResponse>>;
  post<TResponse, TRequest = never>(
    url: string,
    model?: TRequest,
    configuration?: IRequestConfiguration
  ): Promise<IResponse<TResponse>>;
  put<TResponse, TRequest = never>(
    url: string,
    model?: TRequest,
    configuration?: IRequestConfiguration
  ): Promise<IResponse<TResponse>>;
  delete<TResponse>(url: string, configuration?: IRequestConfiguration): Promise<IResponse<TResponse>>;
}

export function createApiClient(): IHttpClient {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_ADDRESS,
    responseType: 'json'
  });

  rax.attach(axiosInstance);

  axiosInstance.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
  axiosInstance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

  return {
    get: (url, configuration?) => internalGet(axiosInstance, url, configuration),
    post: (url, model, configuration?) => internalPost(axiosInstance, url, model, configuration),
    put: (url, model, configuration?) => internalPut(axiosInstance, url, model, configuration),
    delete: (url, configuration?) => internalDelete(axiosInstance, url, configuration)
  };
}
