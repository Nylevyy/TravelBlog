import Api from '~/plugins/api/api';

export const authLogin = async (request) => {
  await Api.post({ url: 'api/auth/login', ...request });
};

export const auth = async (request) => {
  const { data } = await Api.get({ url: 'api/auth', ...request });
  return data;
};

export const authLogout = async () => {
  await Api.get({ url: 'api/auth/logout' });
};

export const authJoin = async (request) => {
  await Api.post({ url: 'api/auth/join', ...request });
};
