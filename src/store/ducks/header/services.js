import Api from '~/plugins/api/api';

const titlePath = 'api/calendarData/title';

export const getTitle = async () => {
  const { data } = await Api.get({ url: titlePath });
  return data;
};

export const changeTitle = async (request) => {
  await Api.put({ url: titlePath, ...request });
};
