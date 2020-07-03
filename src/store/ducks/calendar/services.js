import Api from '~/plugins/api/api';

const articlesPath = 'api/calendarData/articles';

export const getData = async () => {
  const { data } = await Api.get({ url: 'api/calendarData' });
  return data;
};

export const getArticles = async () => {
  const { data } = await Api.get({ url: articlesPath });
  return data;
};

export const postArticle = async (article) => {
  await Api.post({ url: articlesPath, data: article });
};

export const putArticle = async (request) => {
  await Api.put({ url: articlesPath, ...request });
};

export const deleteArticle = async (id) => {
  await Api.delete({ url: articlesPath, params: { id } });
};
