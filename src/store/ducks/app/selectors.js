import { createSelector } from '@reduxjs/toolkit';

const appState = (state) => {
  return state.app;
};

export const appSelector = createSelector(
  appState,
  ({ init, modal, requestError, isFetching }) => ({
    init,
    modal,
    requestError,
    isFetching,
  })
);
