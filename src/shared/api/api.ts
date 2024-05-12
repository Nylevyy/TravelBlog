import { nanoid } from '@reduxjs/toolkit';
import Axios, { AxiosResponse } from 'axios';
import { Api, ApiParams } from './types';

class AxiosApi implements Api {
  private pendingReqs: Record<string, boolean> = {};

  private axios = Axios.create({
    baseURL: process.env.API_BASE_URL,
  });

  private async send<T, U>({
    method,
    url,
    data,
    params,
  }: ApiParams<T>): Promise<AxiosResponse<U>> {
    const reqId = nanoid();
    this.pendingReqs[reqId] = false;

    try {
      return await this.axios.request<U>({
        method,
        url,
        data,
        params,
        withCredentials: true,
      });
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
}

export default new AxiosApi();
