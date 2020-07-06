import Api from '~/plugins/api/api';

const articlesPath = 'api/calendarData/articles';

export const getArticles = async () => {
  const { data } = await Api.get({ url: articlesPath });
  return data;
};

export const postArticle = async (request) => {
  await Api.post({ url: articlesPath, ...request });
};

export const putArticle = async (request) => {
  await Api.put({ url: articlesPath, ...request });
};

export const deleteArticle = async (request) => {
  await Api.delete({ url: articlesPath, ...request });
};
