import Axios, { AxiosResponse } from 'axios';

const axios = Axios.create({
  baseURL: process.env.API_BASE_URL,
});

type ApiParams<T = undefined> = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: T;
  params?: Record<string, unknown>;
}

class Api {
  static send<T, U>({ method, url, data, params }: ApiParams<T>): Promise<AxiosResponse<U>> {
    return axios.request<U>({
      method,
      url,
      data,
      params,
      withCredentials: true,
    });
  }

  static get<T, U>(request: Omit<ApiParams<T>, 'method'>): Promise<AxiosResponse<U>> {
    return this.send<T, U>({
      ...request,
      method: 'GET',
    });
  }

  static post<T, U>(request: Omit<ApiParams<T>, 'method'>): Promise<AxiosResponse<U>> {
    return this.send<T, U>({
      ...request,
      method: 'POST',
    });
  }

  static put<T, U>(request: Omit<ApiParams<T>, 'method'>): Promise<AxiosResponse<U>> {
    return this.send<T, U>({
      ...request,
      method: 'PUT',
    });
  }

  static delete<T, U>(request: Omit<ApiParams<T>, 'method'>): Promise<AxiosResponse<U>> {
    return this.send<T, U>({
      ...request,
      method: 'DELETE',
    });
  }
}

export default Api;
