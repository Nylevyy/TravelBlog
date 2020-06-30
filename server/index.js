const express = require('express');
const cors = require('cors');
const calendarData = require('./calendarData');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const calendarDataPath = '/api/calendarData';
const mainStore = calendarData.articles;

// middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get(calendarDataPath, (req, res) => {
  res.status(200).json(mainStore);
});

app.post(calendarDataPath, (req, res) => {
  const idae = calendarData.identifyArticle(req.body)
  mainStore.push(idae);
  res.status(200).json(mainStore);
});

app.put(calendarDataPath, (req, res) => {
  req.body.id = +req.query.id;
  const idx = mainStore.findIndex((item) => item.id === +req.query.id);
  mainStore[idx] = req.body;
  res.status(200).json(mainStore);
});

app.delete(calendarDataPath, (req, res) => {
  const idx = mainStore.findIndex((item) => item.id === +req.query.id);
  mainStore.splice(idx, 1);
  res.status(200).json(mainStore);
});

app.use((err, req, res) => {
  console.log('err');
  res.status(500).send(`Error: ${err}`);
});

app.listen(port, () => console.log(`Server is listening on ${port}`));
