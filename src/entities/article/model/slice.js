import { createSlice } from '@reduxjs/toolkit';

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    error: null,
    isFetching: {},
    articles: [],
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
      state.articles = [];
    },
    startRequest: (state, action) => {
      state.isFetching[action.payload] = true;
    },
    endRequest: (state, action) => {
      delete state.isFetching[action.payload];
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
  },
  selectors: {
    getError: (state) => state.error,
    getIsFetching: (state) => Object.keys(state.isFetching).length > 0,
    getArticles: (state) => state.articles,
  },
});

export const { startRequest, endRequest, setError, setArticles } =
  articleSlice.actions;
export const { getError, getIsFetching, getArticles } = articleSlice.selectors;

export default articleSlice.reducer;
