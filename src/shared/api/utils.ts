import { ApiError } from './types';

export const getErrorStatusCode = (e: ApiError): number | undefined =>
  e.response?.status;
