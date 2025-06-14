import { appTypes } from '~/store/ducks/app';
import { RECEIVE_CONFIG } from './types';

const { INIT, LOG_OUT } = appTypes;
const initialState = {
  blogConfig: {},
};

// TODO: Переименовать в userConfigReducer
const titleReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT:
      return {
        blogConfig: {
          title: 'Please wait...',
        },
      };
    case RECEIVE_CONFIG:
      return {
        ...state,
        blogConfig: action.blogConfig,
      };
    case LOG_OUT:
      return {
        ...state,
        blogConfig: {
          title: 'Возвращайтесь...',
        },
      };
    default:
      return state;
  }
};

export default titleReducer;
