import { Api } from '~/shared/api';

export const authLogin = async (request) => {
  await Api.post({ url: 'auth/login', ...request });
};

export const auth = async (request) => {
  const { data } = await Api.get({ url: 'auth', ...request });
  return data;
};

export const authLogout = async () => {
  await Api.get({ url: 'auth/logout' });
};

export const authJoin = async (request) => {
  await Api.post({ url: 'auth/join', ...request });
};
