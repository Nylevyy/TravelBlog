import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthSliceState } from './types';

const initialState: AuthSliceState = {
  auth: { isAuthorized: false },
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<AuthSliceState['auth']>) => {
      state.auth = action.payload;
    },
    setError: (state, action: PayloadAction<AuthSliceState['error']>) => {
      state.error = action.payload;
    },
  },
  selectors: {
    getIsAuthorized: (state) => state.auth.isAuthorized,
    getErrorMessage: (state) => state.error?.message,
  },
});

export const { setAuthStatus, setError } = authSlice.actions;
export const { getIsAuthorized, getErrorMessage } = authSlice.selectors;

export default authSlice.reducer;
