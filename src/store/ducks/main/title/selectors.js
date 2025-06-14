import { createSelector } from '@reduxjs/toolkit';

const titleState = (state) => {
  return state.title;
};

export const titleSelector = createSelector(
  titleState,
  ({ blogConfig }) => blogConfig.title,
);
export const blogConfigIdSelector = createSelector(
  titleState,
  ({ blogConfig }) => blogConfig.id,
);
