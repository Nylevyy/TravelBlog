import {
  START_REQUEST,
  END_REQUEST,
  CRASH_WITH_ERROR,
  OPEN_MODAL,
  SET_DEFAULT,
  CLOSE_MODAL,
} from './types';

const initialState = {
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },
  requestError: false,
  isFetching: null,
};

const appReducer = (state = initialState, action) => {
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
    case CRASH_WITH_ERROR:
      return {
        ...state,
        modal: {
          isOpen: false,
          data: null,
          type: null,
        },
        requestError: true,
      };
    case OPEN_MODAL:
      return {
        ...state,
        modal: {
          isOpen: true,
          data: action.modalData,
          type: action.modalType,
        },
      };
    case SET_DEFAULT:
      return {
        ...state,
        modal: {
          isOpen: true,
          data: null,
          type: null,
        },
        requestError: false,
        isFetching: null,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: {
          isOpen: true,
          data: null,
          type: null,
        },
      };
    default:
      return state;
  }
};

export default appReducer;
