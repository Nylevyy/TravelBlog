import { createSlice } from '@reduxjs/toolkit';

type State = {
  fetchRecords: Record<string, boolean>;
};

const initialState: State = {
  fetchRecords: {},
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    startRequest: (state, action) => {
      state.fetchRecords[action.payload] = true;
    },
    endRequest: (state, action) => {
      delete state.fetchRecords[action.payload];
    },
  },
  selectors: {
    getIsFetching: (state) => Object.keys(state.fetchRecords).length > 0,
  },
});

export const { startRequest, endRequest } = loaderSlice.actions;
export const { getIsFetching } = loaderSlice.selectors;

export default loaderSlice.reducer;
