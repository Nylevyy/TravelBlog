import axios from 'axios';

const articlesPath = 'http://localhost:3001/api/calendarData/articles';
const titlePath = 'http://localhost:3001/api/calendarData/title';

// API служит для связи с сервером/сторонними фичами

class Api {
  static initRequest() {
    return axios.get('http://localhost:3001/api/calendarData');
  }

  static getTitle() {
    return axios.get(titlePath);
  }

  static changeTitle(title) {
    return axios.put(titlePath, { title });
  }

  static getArticles() {
    return axios.get(articlesPath);
  }

  static postArticle(article) {
    return axios.post(articlesPath, { article });
  }

  static putArticle(article, id) {
    return axios.get(
      articlesPath,
      { article },
      {
        params: {
          id,
        },
      }
    );
  }

  static deleteArticle(id) {
    return axios.get(articlesPath, {
      params: {
        id,
      },
    });
  }
}

export default Api;
