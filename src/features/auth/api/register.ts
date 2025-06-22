import { Api } from '~/shared/api';
import { AUTH_API_PATH } from './constants';
import { logIn } from './log-in';

type RegisterParams = {
  username: string;
  password: string;
};

export const register = async ({ password, username }: RegisterParams) => {
  await Api.post<RegisterParams, never>({
    url: `${AUTH_API_PATH}/join`,
    data: { username, password },
  });

  await logIn({ password, username });
};
