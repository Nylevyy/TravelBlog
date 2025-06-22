export type UserBlogConfig = IDEntity & {
  title: string | null;
};

export type UserApplicationConfig = IDEntity & {
  blog: UserBlogConfig | null;
};

export type UserConfigState = {
  error: null | { message: string };
  config: UserApplicationConfig | null;
};
