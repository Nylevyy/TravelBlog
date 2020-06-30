const express = require('express');
const cors = require('cors');
const calendarData = require('./calendarData');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const calendarDataPath = '/api/calendarData';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get(calendarDataPath, (req, res) => {
  res.status(200).json(calendarData);
});

app.post(calendarDataPath, (req, res) => {
  calendarData.articles.push(req.body);
  console.log('calendarData', calendarData);
  res.status(200).json(calendarData);
});

app.put(calendarDataPath, (req, res) => {
  res.status(200).send('put api');
});

app.delete(calendarDataPath, (req, res) => {
  res.status(200).send('delete api');
});

app.use((err, req, res) => {
  console.log('err');
  res.status(500).send(`Error: ${err}`);
});

app.listen(port, () => console.log(`Server is listening on ${port}`));
