import moment from "moment";
import 'moment/locale/ru'
moment.locale('ru');

/*const generateArticle = (object) => (
  {
    ...object,
    date: moment().subtract((Math.random() * 2), "d").add((Math.random() * 20), "m").subtract((Math.random() * 14), "h"),
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut cumque dolorem et eum, fugit harum, illo laudantium maiores maxime nihil nulla numquam optio provident qui sunt, tempora ullam ut?",
    isImportant: (Math.random() > 0.5),
    id: Math.random()
  }
);

const bodies = (
  [
    {
      title: "Title for an order",
      location: "Ulyanovsk, Russia. Vostochny railway station",
    },
    {
      title: "Title for a item",
      location: "Moscow, Russia. Vostochny District",
    },
    {
      title: "alternative subtitle for a description",
      location: "Dubai, UAE. Central airport",
    },
    {
      title: "Main title for an item",
      location: "Tyumen, Russia. Vostochny airport",
    },
    {
      title: "Major title item with happy end",
      location: "Orenburg, Russia. Central Street",
    }
  ]
);

const articlesData = {
  articles: bodies.map(item => generateArticle(item))
};*/

const dataURL = "https://my-json-server.typicode.com/Nylevyy/TravelBlogFakeDB/";

const sendRequest = (method, url, body) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  return fetch(url, {
    method: method,
    body: body ? JSON.stringify(body) : null,
    headers: headers
  }).then(response => {
    if (response.ok) return response.json();
    return response.json().then(err => {
      const error = new Error('Something went wrong...');
      error.data = err;
      throw error
    })
  })
};

const articlesData = sendRequest('GET', (dataURL + 'db'))
  .catch(err => {
    throw err
  });

const createArticle = body => {
  return sendRequest('POST', (dataURL + "articles"), body)
    .catch(err => {
      throw err
    })
};

const editArticle = body => {
  const id = body.id;
  return sendRequest('PUT', (dataURL + "articles/" + id), body)
    .catch(err => {
      throw err
    })
};

const deleteArticle = id => {
  return sendRequest('DELETE', (dataURL + "articles/" + id))
    .catch(err => {
      throw err
    })
};

export { articlesData, createArticle, editArticle, deleteArticle }