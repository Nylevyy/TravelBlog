import { Api } from '~/shared/api';
import { ARTICLE_API_PATH } from './constants';

export const getArticle = async (articleId, request) => {
  const { data } = await Api.get({
    url: `${ARTICLE_API_PATH}/${articleId}`,
    ...request,
  });
  return data;
};
