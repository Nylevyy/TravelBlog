import { createAction } from '@reduxjs/toolkit';
import { INITIALIZE_ACTION } from './constants';

export const initializePage = createAction(INITIALIZE_ACTION);
