import { Api } from '~/shared/api';
import { AUTH_API_PATH } from './constants';

type AuthResponse = {
  username: string;
};

export const auth = async (): Promise<AuthResponse> => {
  const { data } = await Api.get<never, AuthResponse>({
    url: AUTH_API_PATH,
  });
  return data;
};
