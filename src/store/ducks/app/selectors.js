import { createSelector } from '@reduxjs/toolkit';

const appState = (state) => {
  return state.app;
};

export const appSelector = createSelector(
  appState,
  ({ modal, requestError, isFetching }) => ({
    modal,
    requestError,
    isFetching,
  }),
);
