import { Api } from '~/shared/api';
import { AUTH_API_PATH } from './constants';

type LogInParams = {
  username: string;
  password: string;
};

export const logIn = async ({
  password,
  username,
}: LogInParams): Promise<void> => {
  await Api.post<LogInParams, never>({
    url: `${AUTH_API_PATH}/login`,
    data: { username, password },
  });
};
