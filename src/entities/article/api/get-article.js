import { Api } from '~/shared/api';
import { ARTICLE_API_PATH } from './constants';

export const getArticle = async (request) => {
  const { data } = await Api.get({ url: ARTICLE_API_PATH, ...request });
  return data;
};
