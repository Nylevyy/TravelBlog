import Api from '~/plugins/api/api';

export const auth = async (request) => {
  const { userName } = await Api.post({ url: 'api/auth', ...request });
  return userName;
};

export const unAuth = async () => {
  await Api.get({ url: 'api/unAuth' });
};
