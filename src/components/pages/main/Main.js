import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import LayoutMain from '~/components/layouts/main/LayoutMain';
import Calendar from '~/components/base/calendar/Calendar';
import Loader from '~/components/core/loader/Loader';
import { useAppDispatch } from '~/shared/model';
import { mainActions } from '~/store/ducks/main';

const { initMain } = mainActions;

const Main = ({ modal, requestError, isFetching, isLoggedIn }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(initMain());
  }, [isLoggedIn]);
  return (
    <LayoutMain modal={modal} isLoggedIn={isLoggedIn}>
      <>
        {!!isFetching && <Loader />}
        <Calendar requestError={requestError} isLoggedIn={isLoggedIn} />
      </>
    </LayoutMain>
  );
};

Main.propTypes = {
  modal: PropTypes.objectOf(PropTypes.any).isRequired,
  requestError: PropTypes.bool.isRequired,
  isFetching: PropTypes.number.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Main;
