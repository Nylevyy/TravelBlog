import { useSelector, useDispatch } from 'react-redux';

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector = useSelector<RootState>;
