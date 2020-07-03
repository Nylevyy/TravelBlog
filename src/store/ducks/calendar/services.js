import Api from '~/plugins/api/api';

const articlesPath = 'api/calendarData/articles';
const titlePath = 'api/calendarData/title';

export const getData = async () => {
  const res = await Api.get('api/calendarData');
  return res.data;
};

export const getTitle = async () => {
  const res = await Api.get(titlePath);
  return res.data;
};

export const changeTitle = async (title) => {
  await Api.put(titlePath, title);
};

export const getArticles = async () => {
  const res = await Api.get(articlesPath);
  return res.data;
};

export const postArticle = async (article) => {
  await Api.post(articlesPath, article);
};

export const putArticle = async (article, id) => {
  await Api.put(articlesPath, article, { id });
};

export const deleteArticle = async (id) => {
  await Api.delete(articlesPath, { id });
};
