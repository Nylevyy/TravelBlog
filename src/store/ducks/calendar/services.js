import Api from '~/plugins/api/api';

// Почему не прописать логику здесь?
// ex.
// export const changeTitle = () => {
//   Api
//     .changeTitle(title)
//     .then(Api.getTitle()
//       .then(res => res.title))
//     .catch((err) => {
//       throw err;
//     });
// };

export const initApp = () => {
  Api.initRequest()
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getTitle = () => {
  Api.getTitle()
    .then((res) => res.title)
    .catch((err) => {
      throw err;
    });
};

export const changeTitle = (title) => {
  Api.changeTitle(title).catch((err) => {
    throw err;
  });
};

export const getArticles = () => {
  Api.getArticles()
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const postArticle = (article) => {
  Api.postArticle(article).catch((err) => {
    throw err;
  });
};

export const putArticle = (article, id) => {
  Api.putArticle(article, id).catch((err) => {
    throw err;
  });
};

export const deleteArticle = (id) => {
  Api.deleteArticle(id).catch((err) => {
    throw err;
  });
};
