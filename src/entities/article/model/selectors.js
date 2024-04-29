import { createSelector } from '@reduxjs/toolkit';

const articlesState = (state) => {
  return state.articles;
};

export const articlesSelector = createSelector(
  articlesState,
  ({ articles }) => articles,
);
