import { connect } from 'react-redux';
import Calendar from '~/components/base/calendar/Calendar';
import { calendarActions } from '~/store/ducks/calendar';

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ...state.calendar,
  };
};

const { openModal, deleteArticle } = calendarActions;

const mapDispatchToProps = (dispatch) => ({
  onArticleClick: (article) => {
    dispatch(openModal(article));
  },
  onDeleteArticleClick: (id) => () => {
    dispatch(deleteArticle(id));
  },
});

const CalendarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);

export default CalendarContainer;
