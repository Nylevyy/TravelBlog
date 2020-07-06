import { RECEIVE_ARTICLES } from './types';

const initialState = {
  articles: [],
};

const calendarReducer = (state = initialState, action) => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
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
