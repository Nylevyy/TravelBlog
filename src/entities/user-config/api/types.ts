type UserBlogConfigDto = IDEntity & {
  title: string | null;
};

export type UserApplicationConfigDto = IDEntity & {
  blogConfig: UserBlogConfigDto | null;
};

export type FetchConfigResponse = {
  applicationConfig: UserApplicationConfigDto;
};

export type UpdateBlogConfigRequest = UserBlogConfigDto;

export type UpdateBlogConfigResponse = {
  blogConfig: UserBlogConfigDto;
};
