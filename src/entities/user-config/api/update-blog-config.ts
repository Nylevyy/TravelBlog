import { Api } from '~/shared/api';
import { UpdateBlogConfigResponse, UpdateBlogConfigRequest } from './types';
import { BLOG_CONFIG_PATH } from './constants';

export const updateBlogConfig = async (
  blogConfig: UpdateBlogConfigRequest,
): Promise<UpdateBlogConfigResponse['blogConfig']> => {
  const { data } = await Api.put<
    UpdateBlogConfigRequest,
    UpdateBlogConfigResponse
  >({
    url: `${BLOG_CONFIG_PATH}/${blogConfig.id}`,
    data: blogConfig,
  });
  return data.blogConfig;
};
