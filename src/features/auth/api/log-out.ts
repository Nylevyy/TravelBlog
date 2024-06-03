import { Api } from '~/shared/api';
import { AUTH_API_PATH } from './constants';

export const logOut = async () => {
  await Api.get<never, never>({ url: `${AUTH_API_PATH}/logout` });
};
