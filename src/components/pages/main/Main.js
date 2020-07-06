import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '~/components/layouts/mainLayout/MainLayout';
import Calendar from '~/components/base/calendar/Calendar';
import Loader from '~/components/core/loaders/Loader';

const Main = ({
  modal,
  onModalCloseClick,
  onSubmitFormClick,
  onDeleteClick,
  onArticleClick,
  calendar,
  requestError,
  isFetching,
}) => {
  Main.propTypes = {
    modal: PropTypes.objectOf(PropTypes.any).isRequired,
    onModalCloseClick: PropTypes.func.isRequired,
    onSubmitFormClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onArticleClick: PropTypes.func.isRequired,
    calendar: PropTypes.objectOf(PropTypes.any).isRequired,
    requestError: PropTypes.bool.isRequired,
    isFetching: PropTypes.number.isRequired,
  };
  return (
    <MainLayout
      modal={modal}
      onModalCloseClick={onModalCloseClick}
      onSubmitFormClick={onSubmitFormClick}
      onDeleteClick={onDeleteClick}
    >
      <div>
        {!!isFetching && <Loader />}
        <Calendar
          {...calendar}
          requestError={requestError}
          onDeleteClick={onDeleteClick}
          onArticleClick={onArticleClick}
        />
      </div>
    </MainLayout>
  );
};

export default Main;
