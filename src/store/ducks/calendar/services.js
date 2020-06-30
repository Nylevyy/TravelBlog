import { appStoreAPI } from '~/store/data/Data';

const request = async (method, body) =>
  appStoreAPI[method](body).catch((err) => {
    throw err;
  });

export default request;
