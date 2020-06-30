import calendarAPI from '~/store/api/calendarApi';

const requestServer = (body, id) => {
  if (!body && !id)
    return calendarAPI
      .get()
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  if (!body)
    return calendarAPI
      .delete(id)
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  if (!id)
    return calendarAPI
      .post(body)
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  return calendarAPI
    .put(body, id)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export default requestServer;
