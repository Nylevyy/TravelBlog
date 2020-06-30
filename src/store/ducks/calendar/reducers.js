import * as types from './types';

const initialState = {
  header: {
    title: 'Друзья, мои походы пока ещё не закончились, делюсь с вами!',
  },
  modal: {
    isOpen: false,
    currentArticleData: null,
    isFetching: false,
    hasError: false,
  },
  calendar: {
    isFetching: true,
    hasError: false,
    articles: [],
  },
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TITLE:
      return {
        ...state,
        header: {
          title: action.payload,
        },
      };
    case types.OPEN_MODAL:
      return {
        ...state,
        modal: {
          isOpen: true,
          currentArticleData: action.payload,
          isFetching: false,
          hasError: false,
        },
      };
    case types.SET_MODAL_DEFAULT:
      return {
        ...state,
        modal: {
          isOpen: false,
          currentArticleData: null,
          isFetching: false,
          hasError: false,
        },
      };
    case types.SEND_REQUEST:
      return {
        ...state,
        modal: {
          ...state.modal,
          isFetching: true,
          hasError: false,
        },
        calendar: {
          ...state.calendar,
          isFetching: true,
          hasError: false,
        },
      };
    case types.RECEIVE_DATA:
      return {
        ...state,
        calendar: {
          isFetching: false,
          hasError: false,
          articles: action.payload,
        },
      };
    case types.CATCH_ERROR:
      return {
        ...state,
        modal: {
          ...state.modal,
          isFetching: false,
          hasError: true,
        },
        calendar: {
          ...state,
          isFetching: false,
          hasError: true,
          articles: [],
        },
      };
    default:
      return state;
  }
};

export default calendarReducer;
