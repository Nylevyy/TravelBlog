/* eslint-disable */
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
let { title } = calendarData;
const { articles, identifyArticle } = calendarData;

// middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/calendarData', (req, res) => {
  res.status(200).json({title, articles});
});

app.get(titlePath, (req, res) => {
  res.status(200).json({title});
});

app.put(titlePath, (req, res) => {
  console.log(req.body.title)
  title = req.body.title;
  res.status(200).json({title});
});

app.get(articlesPath, (req, res) => {
  res.status(200).json({articles});
});

app.post(articlesPath, (req, res) => {
  articles.push(identifyArticle(req.body));
  res.status(200).json({articles});
});

app.put(articlesPath, (req, res) => {
  req.body.id = +req.query.id;
  const idx = articles.findIndex((item) => item.id === +req.query.id);
  if (!(~idx)) {
    res.status(404).json('Not found')
    return;
  }
  articles[idx] = req.body;
  res.status(200).json({articles});
});

app.delete(articlesPath, (req, res) => {
  const idx = articles.findIndex((item) => item.id === +req.query.id);
  if (!(~idx)) {
    res.status(404).json('Not found');
    return;
  }
  articles.splice(idx, 1);
  res.status(200).json({articles});
});

app.use((err, req, res) => {
  console.log('err');
  res.status(500).send(`Error: ${err}`);
});
app.listen(port, () => console.log(`Server is listening on ${port}`));
