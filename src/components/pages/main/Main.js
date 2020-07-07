import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { mainActions } from '~/store/ducks/main';
import LayoutMain from '~/components/layouts/main/LayoutMain';
import Calendar from '~/components/base/calendar/Calendar';
import Loader from '~/components/core/loader/Loader';

const { initMain } = mainActions;

const Main = ({ modal, requestError, isFetching }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initMain());
  }, []);
  return (
    <LayoutMain modal={modal}>
      <>
        {!!isFetching && <Loader />}
        <Calendar requestError={requestError} />
      </>
    </LayoutMain>
  );
};

Main.propTypes = {
  modal: PropTypes.objectOf(PropTypes.any).isRequired,
  requestError: PropTypes.bool.isRequired,
  isFetching: PropTypes.number.isRequired,
};

export default Main;
