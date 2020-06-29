import { connect } from 'react-redux';
import Calendar from '~/components/base/calendar/Calendar';
import { openModal } from '~/store/layout/layoutActions';
import { sendArticle, sendRequest } from '~/store/calendar/calendarActions';

const mapStateToProps = (state) => ({
  ...state.calendar,
});

const mapDispatchToProps = (dispatch) => ({
  onArticleClick: (id) => {
    dispatch(openModal(id));
  },
  onDeleteArticleClick: (id) => () => {
    dispatch(sendArticle({ method: 'DELETE', body: id }));
  },
  refreshData: () => {
    dispatch(sendRequest());
  },
});

const CalendarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);

export default CalendarContainer;
