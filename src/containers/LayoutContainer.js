import { connect } from 'react-redux';
import { openModal, setModalDefault } from '~/store/layout/layoutActions';
import Layout from '~/components/layouts/Layout';
import { sendArticle, sendRequest } from '~/store/calendar/calendarActions';

const mapStateToProps = (state, ownProps) => (
  {
    layout: state.layout,
    children: ownProps.children,
  }
);
const mapDispatchToProps = (dispatch) => (
  {
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
        const payload = { method: 'PUT', body: article };
        dispatch(sendArticle(payload));
        return;
      }
      dispatch(sendArticle({ method: 'POST', body: article }));
    },
    onDeleteClick: (id) => () => {
      dispatch(sendArticle({ method: 'DELETE', body: id }));
    },
  }
);

const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default LayoutContainer;
