import { connect } from 'react-redux';
import Calendar from '~/components/base/calendar/Calendar';
import { calendarActions } from '~/store/ducks/calendar';

const mapStateToProps = (state) => ({
  ...state.calendar,
});

const { openModal, refresh, deleteArticle } = calendarActions;

const mapDispatchToProps = (dispatch) => ({
  onArticleClick: (article) => {
    dispatch(openModal(article));
  },
  onDeleteArticleClick: (id) => () => {
    dispatch(deleteArticle(id));
  },
  initFetchData: () => {
    dispatch(refresh());
  },
});

const CalendarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);

export default CalendarContainer;
