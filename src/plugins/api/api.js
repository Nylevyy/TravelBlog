import axios from 'axios';

const server = axios.create({
  baseURL: process.env.BASE_URL,
});

class Api {
  static send(method, url, data, params) {
    return server.request({
      method,
      url,
      data,
      params,
    });
  }

  static get(url) {
    return this.send('get', url);
  }

  static post(url, data) {
    return this.send('post', url, data, null);
  }

  static put(url, data, params) {
    return this.send('put', url, data, params);
  }

  static delete(url, params) {
    return this.send('delete', url, null, params);
  }
}

export default Api;
