import { AxiosResponse } from 'axios';

export type ApiParams<T = undefined> = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: T;
  params?: Record<string, unknown>;
};

export interface Api {
  get<T, U>(request: Omit<ApiParams<T>, 'method'>): Promise<AxiosResponse<U>>;

  post<T, U>(request: Omit<ApiParams<T>, 'method'>): Promise<AxiosResponse<U>>;

  put<T, U>(request: Omit<ApiParams<T>, 'method'>): Promise<AxiosResponse<U>>;

  delete<T, U>(
    request: Omit<ApiParams<T>, 'method'>,
  ): Promise<AxiosResponse<U>>;

  isPending(): boolean;
  isPending(key: string): boolean;
}
