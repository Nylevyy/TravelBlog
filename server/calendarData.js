const moment = require('moment');

const description =
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi soluta quisquam totam voluptatum vel sequi asperiores odio. Sequi vitae fuga nulla numquam eius at. Molestiae eum ullam nulla vitae mollitia.';

const generateTemplate = () => ({
  title: 'Generated(not) original Title',
  location: 'Ulyanovsk, Russia. Vostochny airport',
  date: moment()
    .subtract(Math.random() * 4, 'd')
    .add(Math.random() * 20, 'm')
    .subtract(Math.random() * 14, 'h'),
  description,
  isImportant: Math.random() > 0.5,
});

const identifyArticle = (body) => {
  return {
    ...body,
    id: Math.random(),
  };
};

const articles = [
  identifyArticle(generateTemplate()),
  identifyArticle(generateTemplate()),
  identifyArticle(generateTemplate()),
  identifyArticle(generateTemplate()),
  identifyArticle(generateTemplate()),
  identifyArticle(generateTemplate()),
  identifyArticle(generateTemplate()),
  identifyArticle(generateTemplate()),
];

module.exports = {
  title: 'Default title',
  articles,
  identifyArticle,
};
