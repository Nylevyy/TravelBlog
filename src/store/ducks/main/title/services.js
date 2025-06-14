import { Api } from '~/shared/api';

const userConfigPath = 'userConfig';

export const fetchConfig = async () => {
  const { data } = await Api.get({ url: userConfigPath });
  return data.applicationConfig;
};

export const changeTitle = async (blogConfigId, request) => {
  const { data } = await Api.put({
    url: `${userConfigPath}/blog/${blogConfigId}`,
    ...request,
  });
  return data.blogConfig;
};
