const express = require('express');
const cors = require('cors');
const calendarData = require('./calendarData');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const articlesPath = '/api/calendarData/articles';
const titlePath = '/api/calendarData/title';
let { title } = calendarData; // Читается отсюда!!! ?
const { articles } = calendarData; // Читается отсюда!!! ?

// middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/calendarData', (req, res) => {
  res.status(200).json(title, articles);
});

app.get(titlePath, (req, res) => {
  res.status(200).json(title);
});

app.put(titlePath, (req) => {
  title = req.body;
});

app.get(articlesPath, (req, res) => {
  res.status(200).json(articles);
});

app.post(articlesPath, (req) => {
  articles.push(calendarData.identifyArticle(req.body));
});

app.put(articlesPath, (req) => {
  req.body.id = +req.query.id;
  const idx = articles.findIndex((item) => item.id === +req.query.id);
  articles[idx] = req.body;
});

app.delete(articlesPath, (req) => {
  const idx = articles.findIndex((item) => item.id === +req.query.id);
  articles.splice(idx, 1);
});

app.use((err, req, res) => {
  console.log('err');
  res.status(500).send(`Error: ${err}`);
});

app.listen(port, () => console.log(`Server is listening on ${port}`));
