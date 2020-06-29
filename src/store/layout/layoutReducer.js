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
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return {
        ...state,
        header: {
          title: action.payload,
        },
      };
    case 'REQUEST_DATA':
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case 'SET_MODAL_DEFAULT':
      return {
        ...state,
        modal: {
          isOpen: false,
          currentArticleData: null,
          isFetching: false,
          hasError: false,
        },
      };
    case 'SEND_DATA':
      return {
        ...state,
        modal: {
          ...state.modal,
          isFetching: true,
        },
      };
    case 'CATCH_ERROR':
      return {
        ...state,
        modal: {
          ...state.modal,
          isFetching: false,
          hasError: true,
        },
      };
    case 'OPEN_MODAL':
      return {
        ...state,
        modal: {
          isOpen: true,
          currentArticleData: action.payload,
          isFetching: false,
          hasError: false,
        },
      };
    default:
      return state;
  }
};

export { layoutReducer as layout };
