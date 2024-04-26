import { Api } from '~/shared/api';

const titlePath = 'api/calendarData/title';

export const fetchTitle = async () => {
  const { data } = await Api.get({ url: titlePath });
  return data;
};

export const changeTitle = async (request) => {
  const { data } = await Api.put({ url: titlePath, ...request });
  return data;
};
