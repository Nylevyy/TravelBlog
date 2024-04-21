import { appTypes } from '~/store/ducks/app';
import { RECEIVE_TITLE } from './types';

const { INIT, LOG_OUT } = appTypes;
const initialState = {
  title: null,
};

const titleReducer = (state = initialState, action) => {
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
    case LOG_OUT:
      return {
        ...state,
        title: 'Возвращайтесь...',
      };
    default:
      return state;
  }
};

export default titleReducer;
