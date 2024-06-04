import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { UiLoader } from '~/shared/ui/loader';
import { useAppDispatch } from '~/shared/model';
import LayoutMain from '~/components/layouts/main/LayoutMain';
import Calendar from '~/components/base/calendar/Calendar';
import { mainActions } from '~/store/ducks/main';

const { initMain } = mainActions;

const Main = ({ modal, requestError, isFetching, isLoggedIn }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(initMain());
  }, [isLoggedIn]);
  return (
    <LayoutMain isLoggedIn={isLoggedIn} modal={modal}>
      <>
        {!!isFetching && <UiLoader />}
        <Calendar isLoggedIn={isLoggedIn} requestError={requestError} />
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
