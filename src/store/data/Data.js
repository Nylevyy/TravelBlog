import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

const dataURL = 'https://my-json-server.typicode.com/Nylevyy/TravelBlogFakeDB';

const sendRequest = (method, url, body) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return fetch(url, {
    method,
    body: body ? JSON.stringify(body) : null,
    headers,
  }).then((response) => {
    if (response.ok) return response.json();
    return response.json().then((err) => {
      const error = new Error('Something went wrong...');
      error.data = err;
      throw error;
    });
  });
};

const articlesData = sendRequest('GET', (`${dataURL}/db`))
  .catch((err) => {
    throw err;
  });

const createArticle = (body) => sendRequest('POST', (`${dataURL}/articles`), body)
  .catch((err) => {
    throw err;
  });

const editArticle = (body) => {
  const { id } = body;
  return sendRequest('PUT', (`${dataURL}/articles/${id}`), body)
    .catch((err) => {
      throw err;
    });
};

const deleteArticle = (id) => sendRequest('DELETE', (`${dataURL}/articles/${id}`))
  .catch((err) => {
    throw err;
  });

export {
  articlesData, createArticle, editArticle, deleteArticle,
};
