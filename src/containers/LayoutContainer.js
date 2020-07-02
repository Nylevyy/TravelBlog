import { connect } from 'react-redux';
import { calendarActions } from '~/store/ducks/calendar';
import Layout from '~/components/layouts/Layout';

const {
  openModal,
  refresh,
  setModalDefault,
  deleteArticle,
  postNewArticle,
  updateArticle,
} = calendarActions;

const mapStateToProps = (state, ownProps) => ({
  layout: {
    header: state.header,
    modal: state.modal,
  },
  isFetching: state.isFetching,
  children: ownProps.children,
});
const mapDispatchToProps = (dispatch) => ({
  onModalCloseClick: () => {
    dispatch(setModalDefault());
  },
  onNewEventClick: () => {
    dispatch(openModal());
  },
  onRefreshContentClick: () => {
    dispatch(refresh());
  },
  onSubmitFormClick: (article, id) => {
    if (id) {
      dispatch(updateArticle(article, id));
      return;
    }
    dispatch(postNewArticle(article));
  },
  onDeleteClick: (id) => () => {
    dispatch(deleteArticle(null, id));
  },
});

const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default LayoutContainer;
