import { RECEIVE_DATA, RECEIVE_ARTICLES } from './types';

const initialState = {
  hasError: false,
  articles: [],
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_DATA:
      return {
        ...state,
        hasError: false,
        articles: action.articles,
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
