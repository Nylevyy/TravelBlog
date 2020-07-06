import {
  START_REQUEST,
  END_REQUEST,
  CRASH_WITH_ERROR,
  OPEN_MODAL,
  SET_DEFAULT,
  CLOSE_MODAL,
  INIT,
} from './types';

const initialState = {
  init: null,
  modal: {
    isOpen: null,
    type: null,
    data: null,
  },
  requestError: null,
  isFetching: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return {
        init: true,
        modal: {
          isOpen: false,
          type: null,
          data: null,
        },
        requestError: false,
        isFetching: 0,
      };
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
