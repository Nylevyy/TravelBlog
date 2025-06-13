import { Api } from '~/shared/api';
import { ARTICLE_API_PATH } from './constants';

export const updateArticle = async (articleId, request) => {
  const { data } = await Api.put({
    url: `${ARTICLE_API_PATH}/${articleId}`,
    ...request,
  });
  return data;
};
