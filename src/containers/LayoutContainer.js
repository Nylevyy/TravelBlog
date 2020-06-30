import { connect } from 'react-redux';
import { calendarActions } from '~/store/ducks/calendar';
import Layout from '~/components/layouts/Layout';

const { openModal, sendRequest, setModalDefault } = calendarActions;

const mapStateToProps = (state, ownProps) => ({
  layout: {
    header: state.header,
    modal: state.modal,
  },
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
  onSubmitFormClick: (article, isEdit) => {
    if (isEdit) {
      dispatch(sendRequest('PUT', article));
      return;
    }
    dispatch(sendRequest('POST', article));
  },
  onDeleteClick: (id) => () => {
    dispatch(sendRequest('DELETE', id));
  },
});

const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default LayoutContainer;
