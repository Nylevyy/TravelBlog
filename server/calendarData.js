const moment = require('moment');

const description =
  'Начните ваш рассказ, пусть все узнают о ваших начинаниях. Quasi soluta quisquam totam voluptatum vel sequi asperiores odio. Sequi vitae fuga nulla numquam eius at. Molestiae eum ullam nulla vitae mollitia.';

const generateTemplate = () => ({
  title: 'Здесь могло бы быть название статьи...',
  location: 'Ваше любимое кафе',
  date: moment()
    .subtract(Math.random() * 4, 'd')
    .add(Math.random() * 20, 'm')
    .subtract(Math.random() * 14, 'h'),
  description,
  isImportant: Math.random() > 0.5,
});

const identifyArticle = (body) => {
  return {
    id: Math.random(),
    ...body,
  };
};

const title = 'Придумайте название для своего сайта';

const articles = [
  identifyArticle(generateTemplate()),
  identifyArticle(generateTemplate()),
  identifyArticle(generateTemplate()),
  identifyArticle(generateTemplate()),
  identifyArticle(generateTemplate()),
  identifyArticle(generateTemplate()),
  identifyArticle(generateTemplate()),

];

module.exports = {
  title,
  articles,
  identifyArticle,
};
