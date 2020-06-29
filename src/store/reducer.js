import { combineReducers } from 'redux';
import { layout } from '~/store/layout/layoutReducer';
import { calendar } from '~/store/calendar/calendarReducer';

const reducer = combineReducers({
  layout,
  calendar,
});

export default reducer;
