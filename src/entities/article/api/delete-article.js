import { Api } from '~/shared/api';
import { ARTICLE_API_PATH } from './constants';

export const deleteArticle = async (request) => {
  const { data } = await Api.delete({ url: ARTICLE_API_PATH, ...request });
  return data;
};
