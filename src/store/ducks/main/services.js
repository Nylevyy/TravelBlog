import { Api } from '~/shared/api';

export const fetchMainData = async () => {
  const { data } = await Api.get({ url: 'api/calendarData' });
  return data;
};
