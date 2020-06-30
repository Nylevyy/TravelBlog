import * as types from './types';

const initialState = {
  header: {
    title: 'Друзья, мои походы пока ещё не закончились, делюсь с вами!',
  },
  modal: {
    isOpen: false,
    currentArticleData: null,
    hasError: false,
  },
  isFetching: false,
  calendar: {
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
          hasError: false,
        },
      };
    case types.SET_DEFAULT:
      return {
        ...state,
        modal: {
          isOpen: false,
          currentArticleData: null,
          hasError: false,
        },
        isFetching: false,
      };
    case types.SEND_REQUEST:
      return {
        ...state,
        modal: {
          ...state.modal,
          hasError: false,
        },
        isFetching: true,
        calendar: {
          ...state.calendar,
          hasError: false,
        },
      };
    case types.RECEIVE_DATA:
      return {
        ...state,
        calendar: {
          hasError: false,
          articles: action.payload,
        },
      };
    case types.CATCH_ERROR:
      return {
        ...state,
        modal: {
          ...state.modal,
          hasError: true,
        },
        isFetching: false,
        calendar: {
          ...state,
          hasError: true,
          articles: [],
        },
      };
    default:
      return state;
  }
};

export default calendarReducer;
