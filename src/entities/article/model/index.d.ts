import { Action, Slice } from '@reduxjs/toolkit';

export type Article = IDEntity & {
  description?: string;
  date?: string;
  location?: string;
  title?: string;
  isImportant?: boolean;
};

export const deleteArticle: (payload: IDEntity) => Action;
export const createArticle: (payload: { article: Partial<Article> }) => Action;
export const updateArticle: (payload: { article: Article; id: Uuid }) => Action;
export const receiveArticles: () => Action;

export const articleSaga: () => Generator;
export const articleReducer: () => Slice;

export const getArticleError: (state: RootState) => unknown | null;
export const getArticles: (state: RootState) => Article[];
