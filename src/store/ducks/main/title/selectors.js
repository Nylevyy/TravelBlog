import { createSelector } from '@reduxjs/toolkit';

const titleState = (state) => {
  return state.title;
};

export const titleSelector = createSelector(titleState, ({ title }) => title);
