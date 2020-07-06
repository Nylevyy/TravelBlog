import Axios from 'axios';
import { appActions } from '~/store/ducks/app';
import store from '~/store/store';

const { startRequest, endRequest, reportError } = appActions;
const axios = Axios.create({
  baseURL: process.env.BASE_URL,
});

class Api {
  static async send({ method, url, data, params }) {
    try {
      store.dispatch(startRequest());
      const response = await axios.request({
        method,
        url,
        data,
        params,
      });

      store.dispatch(endRequest());
      return response;
    } catch (e) {
      store.dispatch(reportError(e));
      console.log(e);
      return e;
    }
  }

  static get(request) {
    return this.send({
      ...request,
      method: 'GET',
    });
  }

  static post(request) {
    return this.send({
      ...request,
      method: 'POST',
    });
  }

  static put(request) {
    return this.send({
      ...request,
      method: 'PUT',
    });
  }

  static delete(request) {
    return this.send({
      ...request,
      method: 'DELETE',
    });
  }
}

export default Api;
