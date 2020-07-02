import {
  START_REQUEST,
  RECEIVE_DATA,
  RECEIVE_NEW_TITLE,
  RECEIVE_ARTICLES,
  CATCH_ERROR,
  OPEN_MODAL,
  SET_DEFAULT,
} from './types';

const initialState = {
  header: {
    title: 'Please wait...',
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
    case RECEIVE_NEW_TITLE:
      return {
        ...state,
        header: {
          title: action.payload,
        },
      };
    case OPEN_MODAL:
      return {
        ...state,
        modal: {
          isOpen: true,
          currentArticleData: action.data,
          hasError: false,
        },
      };
    case SET_DEFAULT:
      return {
        ...state,
        modal: {
          isOpen: false,
          currentArticleData: null,
          hasError: false,
        },
        isFetching: false,
      };
    case START_REQUEST:
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
    case RECEIVE_DATA:
      return {
        ...state,
        header: {
          title: action.payload.title,
        },
        calendar: {
          hasError: false,
          articles: action.payload.articles,
        },
      };
    case RECEIVE_ARTICLES:
      return {
        ...state,
        calendar: {
          articles: action.payload,
        },
      };
    case CATCH_ERROR:
      console.log(action.err);
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
