import { createAction } from '@reduxjs/toolkit';
import {
  AUTHORIZE_ACTION,
  LOG_IN_ACTION,
  LOG_OUT_ACTION,
  REGISTER_ACTION,
} from './constants';
import { User } from './types';

export const authorize = createAction(AUTHORIZE_ACTION);

export const login = createAction<{ user: User }>(LOG_IN_ACTION);

export const logout = createAction(LOG_OUT_ACTION);

export const register = createAction<{ user: User }>(REGISTER_ACTION);
