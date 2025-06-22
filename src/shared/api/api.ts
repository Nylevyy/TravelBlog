import { nanoid } from '@reduxjs/toolkit';
import Axios, { AxiosHeaders, AxiosResponse } from 'axios';
import { Api, ApiParams, ApiResponse } from './types';

class TravelBlogApi implements Api {
  private pendingReqs: Record<string, boolean> = {};

  private axios = Axios.create({
    baseURL: process.env.API_BASE_URL,
  });

  private authToken: string | null = null;

  private async send<T, U>({
    method,
    url,
    data,
    params,
  }: ApiParams<T>): Promise<AxiosResponse<U>> {
    const reqId = nanoid();
    this.pendingReqs[reqId] = false;

    const headers = new AxiosHeaders();

    if (this.authToken) {
      headers.setAuthorization(`Bearer ${this.authToken}`);
    }

    try {
      const axiosResponse = await this.axios.request<ApiResponse<U>>({
        method,
        url,
        data,
        params,
        withCredentials: true,
        headers,
      });

      const { data: responseData, error } = axiosResponse.data;

      if (error) {
        throw new Error(error.message);
      }

      return { ...axiosResponse, data: responseData };
    } finally {
      delete this.pendingReqs[reqId];
    }
  }

  get<T, U>(request: Omit<ApiParams<T>, 'method'>): Promise<AxiosResponse<U>> {
    return this.send<T, U>({
      ...request,
      method: 'GET',
    });
  }

  post<T, U>(request: Omit<ApiParams<T>, 'method'>): Promise<AxiosResponse<U>> {
    return this.send<T, U>({
      ...request,
      method: 'POST',
    });
  }

  put<T, U>(request: Omit<ApiParams<T>, 'method'>): Promise<AxiosResponse<U>> {
    return this.send<T, U>({
      ...request,
      method: 'PUT',
    });
  }

  delete<T, U>(
    request: Omit<ApiParams<T>, 'method'>,
  ): Promise<AxiosResponse<U>> {
    return this.send<T, U>({
      ...request,
      method: 'DELETE',
    });
  }

  /**
   * @description
   * Имеются ли запросы в ожидании
   */
  isPending(): boolean;
  /**
   * @description
   * Статус запроса по ключу
   */
  isPending(key: string): boolean;
  isPending(key?: string) {
    if (key) {
      return this.pendingReqs[key];
    }

    return Object.keys(this.pendingReqs).length > 0;
  }

  public setAuthToken(token: string) {
    this.authToken = token;
  }
}

export default new TravelBlogApi();
