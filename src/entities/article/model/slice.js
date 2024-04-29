import { createSlice } from '@reduxjs/toolkit';

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    error: null,
    isFetching: {},
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    startRequest: (state, action) => {
      state.isFetching[action.payload] = true;
    },
    endRequest: (state, action) => {
      delete state.isFetching[action.payload];
    },
  },
  selectors: {
    getError: (state) => state.error,
    getIsFetching: (state) => Object.keys(state.isFetching).length > 0,
  },
});

export const { startRequest, endRequest, setError } = articleSlice.actions;
export const { getError, getIsFetching } = articleSlice.selectors;

export default articleSlice.reducer;
