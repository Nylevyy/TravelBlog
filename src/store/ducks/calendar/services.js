import Api from '~/plugins/api/api';

const articlesPath = 'api/calendarData/articles';

export const fetchArticles = async () => {
  const { data } = await Api.get({ url: articlesPath });
  return data;
};

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
