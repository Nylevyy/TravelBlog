import { createAction } from '@reduxjs/toolkit';
import {
  EDIT_BLOG_CONFIG_ACTION,
  PULL_CONFIG_ACTION,
  EDIT_CONFIG_ACTION,
  EDIT_BLOG_CONFIG_TITLE_ACTION,
} from './constants';
import { UserApplicationConfig, UserBlogConfig } from './types';

export const receiveConfig = createAction(PULL_CONFIG_ACTION);

export const editConfig =
  createAction<InteractionActionPayload<UserApplicationConfig>>(
    EDIT_CONFIG_ACTION,
  );

export const editBlogConfig = createAction<
  InteractionActionPayload<UserBlogConfig>
>(EDIT_BLOG_CONFIG_ACTION);

export const editBlogTitle = createAction<string>(
  EDIT_BLOG_CONFIG_TITLE_ACTION,
);
