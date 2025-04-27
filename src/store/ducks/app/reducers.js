import {
  START_REQUEST,
  END_REQUEST,
  CRASH_WITH_ERROR,
  OPEN_MODAL,
  SET_DEFAULT,
  CLOSE_MODAL,
  LOG_OUT,
  LOG_IN,
} from './types';

const initialState = {
  userName: null,
  modal: {
    isOpen: null,
    type: null,
    data: null,
  },
  requestError: null,
  isFetching: null,
};

const appReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case START_REQUEST:
      return {
        ...state,
        isFetching: state.isFetching + 1,
      };
    case END_REQUEST:
      return {
        ...state,
        isFetching: state.isFetching - 1,
      };
    case LOG_IN:
      return {
        ...state,
        userName: action.username,
      };
    case LOG_OUT:
      return {
        ...state,
        userName: null,
      };
    case CRASH_WITH_ERROR:
      return {
        ...state,
        modal: {
          isOpen: false,
          data: null,
          type: null,
        },
        requestError: true,
        isFetching: state.isFetching - 1,
      };
    case OPEN_MODAL:
      return {
        ...state,
        modal: {
          isOpen: true,
          data: action.data,
          type: action.modalType,
        },
      };
    case SET_DEFAULT:
      return {
        ...state,
        modal: {
          isOpen: false,
          data: null,
          type: null,
        },
        requestError: false,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: {
          isOpen: false,
          data: null,
          type: null,
        },
      };
    default:
      return state;
  }
};

export { appReducer };
