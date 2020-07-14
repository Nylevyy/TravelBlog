import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.BASE_URL,
});

class Api {
  static send({ method, url, data, params }) {
    return axios.request({
      method,
      url,
      data,
      params,
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
