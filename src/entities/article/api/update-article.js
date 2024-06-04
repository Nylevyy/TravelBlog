import { Api } from '~/shared/api';
import { ARTICLE_API_PATH } from './constants';

export const updateArticle = async (request) => {
  const { data } = await Api.put({ url: ARTICLE_API_PATH, ...request });
  return data;
};
