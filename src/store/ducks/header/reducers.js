import { RECEIVE_TITLE } from './types';
import { appTypes } from '~/store/ducks/app';

const { INIT } = appTypes;
const initialState = {
  title: null,
};

const headerReducer = (state = initialState, action) => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case INIT:
      return {
        title: 'Please wait...',
      };
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
