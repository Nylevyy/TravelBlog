import { Api } from '~/shared/api';
import { ARTICLE_API_PATH } from './constants';

export const getArticlesByUser = async (request) => {
  const { data } = await Api.get({ url: `${ARTICLE_API_PATH}`, ...request });
  return data.articles;
};
