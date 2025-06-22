import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserBlogConfig, UserConfigState } from './types';

const initialState: UserConfigState = {
  error: null,
  config: null,
};

const userConfigSlice = createSlice({
  name: 'userConfig',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<UserConfigState['error']>) => {
      state.error = action.payload;
    },
    setConfig: (state, action: PayloadAction<UserConfigState['config']>) => {
      state.config = action.payload;
    },
    setBlogConfig: (state, action: PayloadAction<UserBlogConfig>) => {
      if (!state.config) {
        throw new Error('User config state has not been initialized');
      }
      state.config.blog = action.payload;
    },
  },
  selectors: {
    getError: (state) => state.error,
    getUserConfig: (state) => state.config,
    getBlogConfig: (state): UserBlogConfig | null =>
      userConfigSlice.getSelectors().getUserConfig(state)?.blog ?? null,
    getBlogTitle: (state): string | null =>
      userConfigSlice.getSelectors().getBlogConfig(state)?.title ?? null,
  },
});

export const { setError, setConfig, setBlogConfig } = userConfigSlice.actions;
export const { getError, getBlogConfig, getUserConfig, getBlogTitle } =
  userConfigSlice.selectors;

export default userConfigSlice.reducer;
