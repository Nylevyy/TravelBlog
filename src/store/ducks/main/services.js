import { Api } from '~/shared/api';

export const fetchMainData = async () => {
  const { data } = await Api.get({ url: 'calendarData' });
  return data;
};
