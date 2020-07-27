import Axios from 'axios';
import { history } from '~/history/history';

const axios = Axios.create({
  baseURL: process.env.BASE_URL,
});

class Api {
  static send({ method, url, data, params }) {
    return axios
      .request({
        method,
        url,
        data,
        params,
        withCredentials: true,
      })
      .catch((err) => {
        if (err.response.status === 401) history.push('/login');
      });
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
