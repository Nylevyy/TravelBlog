import { connect } from 'react-redux';
import { calendarActions } from '~/store/ducks/calendar';
import Layout from '~/components/layouts/Layout';

const { openModal, sendRequest, setModalDefault } = calendarActions;

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
    dispatch(sendRequest());
  },
  onSubmitFormClick: (article, id) => {
    if (id) {
      dispatch(sendRequest(article, id));
      return;
    }
    dispatch(sendRequest(article));
  },
  onDeleteClick: (id) => () => {
    dispatch(sendRequest(null, id));
  },
});

const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default LayoutContainer;
