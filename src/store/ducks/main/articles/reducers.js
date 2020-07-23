import { RECEIVE_ARTICLES } from './types';
import { appTypes } from '~/store/ducks/app';

const { INIT, CRASH_WITH_ERROR, LOG_OUT } = appTypes;
const initialState = {
  articles: null,
};

const calendarReducer = (state = initialState, action) => {
  // eslint-disable-next-line sonarjs/no-small-switch
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
