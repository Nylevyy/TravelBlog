import { useCallback } from 'react';
import { UiButton } from '~/shared/ui/button';
import { useAppDispatch } from '~/shared/model';
import { initializePage } from '../../model';

export const RefreshPageButton = () => {
  const dispatch = useAppDispatch();

  const onClick = useCallback(() => {
    dispatch(initializePage());
  }, [dispatch]);

  return <UiButton label="Обновить" type="transparent" onClick={onClick} />;
};
