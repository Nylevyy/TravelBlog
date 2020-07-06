import { RECEIVE_ARTICLES } from './types';
import { appTypes } from '~/store/ducks/app';

const { INIT } = appTypes;
const initialState = {
  articles: null,
};

const calendarReducer = (state = initialState, action) => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case INIT:
      return {
        articles: [],
      };
    case RECEIVE_ARTICLES:
      return {
        ...state,
        ...state.calendar,
        articles: action.articles,
      };
    default:
      return state;
  }
};

export default calendarReducer;
