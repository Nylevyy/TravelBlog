import Api from '~/plugins/api/api';

const articlesPath = 'api/calendarData/articles';
const titlePath = 'api/calendarData/title';

export const getData = async () => {
  const { data } = await Api.get({ url: 'api/calendarData' });
  return data;
};

export const getTitle = async () => {
  const { data } = await Api.get({ url: titlePath });
  return data;
};

export const changeTitle = async (title) => {
  Api.put({ url: titlePath, data: title });
};

export const getArticles = async () => {
  const { data } = await Api.get({ url: articlesPath });
  return data;
};

export const postArticle = async (article) => {
  await Api.post({ url: articlesPath, data: article });
};

export const putArticle = async (article, id) => {
  await Api.put({ url: articlesPath, data: article, params: { id } });
};

export const deleteArticle = async (id) => {
  await Api.delete({ url: articlesPath, params: { id } });
};
