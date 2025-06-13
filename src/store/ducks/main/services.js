import { Api } from '~/shared/api';

export const getArticlesByUser = async () => {
  const { data } = await Api.get({ url: 'articles' });
  return data.articles;
};

export const getUserApplicationConfig = async () => {
  const { data } = await Api.get({ url: 'userConfig' });
  return data.applicationConfig;
};

export const fetchMainData = async () => {
  const [articles, userConfig] = await Promise.all([
    getArticlesByUser(),
    getUserApplicationConfig(),
  ]);
  return { articles, userConfig };
};
