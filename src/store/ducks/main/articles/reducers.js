import { appTypes } from '~/store/ducks/app';
import { RECEIVE_ARTICLES } from './types';

const { INIT, CRASH_WITH_ERROR, LOG_OUT } = appTypes;
const initialState = {
  articles: null,
};

const calendarReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT:
    case LOG_OUT:
    case CRASH_WITH_ERROR:
      return {
        ...state,
        articles: [],
      };
    case RECEIVE_ARTICLES:
      return {
        ...state,
        articles: action.articles,
      };
    default:
      return state;
  }
};

export default calendarReducer;
