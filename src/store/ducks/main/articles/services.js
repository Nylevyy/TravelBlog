import { Api } from '~/shared/api';

const articlesPath = 'calendarData/articles';

export const postArticle = async (request) => {
  const { data } = await Api.post({ url: articlesPath, ...request });
  return data;
};

export const putArticle = async (request) => {
  const { data } = await Api.put({ url: articlesPath, ...request });
  return data;
};

export const deleteArticle = async (request) => {
  const { data } = await Api.delete({ url: articlesPath, ...request });
  return data;
};
