const initialState = {
  isFetching: true,
  hasError: false,
  articles: [],
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_DATA':
      return {
        ...state,
        isFetching: true,
        hasError: false,
        articles: [],
      };
    case 'RECEIVE_DATA':
      return {
        ...state,
        isFetching: false,
        hasError: false,
        articles: action.payload,
      };
    case 'CATCH_ERROR':
      return {
        ...state,
        isFetching: false,
        hasError: true,
        articles: [],
      };
    case 'SEND_DATA':
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    default:
      return state;
  }
};

export { calendarReducer as calendar };
