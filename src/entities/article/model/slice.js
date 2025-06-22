import { createSlice } from '@reduxjs/toolkit';

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    error: null,
    articles: [],
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
      state.articles = [];
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
  },
  selectors: {
    getError: (state) => state.error,
    getArticles: (state) => state.articles,
  },
});

export const { setError, setArticles } = articleSlice.actions;
export const { getError, getArticles } = articleSlice.selectors;

export default articleSlice.reducer;
