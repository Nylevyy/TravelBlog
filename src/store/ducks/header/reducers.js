import { RECEIVE_TITLE } from './types';

const initialState = {
  title: 'Please wait...',
};

const headerReducer = (state = initialState, action) => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case RECEIVE_TITLE:
      return {
        ...state,
        title: action.title,
      };
    default:
      return state;
  }
};

export default headerReducer;
