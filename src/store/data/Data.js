/* eslint-disable */
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

const articles = [
  {
    title: "Title for an order",
    location: "Ulyanovsk, Russia. Vostochny railway station",
    date: "2020-06-19T15:40:20.536Z",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut cumque dolorem et eum, fugit harum, illo laudantium maiores maxime nihil nulla numquam optio provident qui sunt, tempora ullam ut?",
    isImportant: true,
    id: 0.03873282942545364
  },
  {
    title: "Title for a calendar-item",
    location: "Moscow, Russia. Vostochny District",
    date: "2020-06-18T20:39:13.833Z",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut cumque dolorem et eum, fugit harum, illo laudantium maiores maxime nihil nulla numquam optio provident qui sunt, tempora ullam ut?",
    isImportant: false,
    id: 0.8941051407740057
  },
  {
    title: "alternative subtitle for a description",
    location: "Dubai, UAE. Central airport",
    date: "2020-06-20T20:49:35.058Z",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut cumque dolorem et eum, fugit harum, illo laudantium maiores maxime nihil nulla numquam optio provident qui sunt, tempora ullam ut?",
    isImportant: true,
    id: 0.21171422685359453
  },
  {
    title: "Main title for an calendar-item",
    location: "Tyumen, Russia. Vostochny airport",
    date: "2020-06-19T18:51:07.471Z",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut cumque dolorem et eum, fugit harum, illo laudantium maiores maxime nihil nulla numquam optio provident qui sunt, tempora ullam ut?",
    isImportant: false,
    id: 0.6402915314697499
  },
  {
    title: "Major title calendar-item with happy end",
    location: "Orenburg, Russia. Central Street",
    date: "2020-06-19T19:31:58.728Z",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut cumque dolorem et eum, fugit harum, illo laudantium maiores maxime nihil nulla numquam optio provident qui sunt, tempora ullam ut?",
    isImportant: false,
    id: 0.9107698164240214
  }
];

export const appStoreAPI = {
  _articles: articles,
  GET() {
    return new Promise(res => {
      setTimeout(() => res(JSON.stringify(this._articles)), 750)
    })
  },
  POST(article) {
    this._articles.push(JSON.parse(article));
    return new Promise(resolve => setTimeout(() => resolve(JSON.stringify(this._articles)), 1000))
  },
  PUT(json) {
    const article = JSON.parse(json);
    const idx = this._articles.findIndex(item => item.id === article.id);
    this._articles[idx] = article;
    return new Promise(resolve => setTimeout(() => resolve(JSON.stringify(this._articles)), 800))
  },
  DELETE(id) {
    const idx = this._articles.findIndex(item => item.id === +id);
    this._articles.splice(idx, 1);
    return new Promise(resolve => setTimeout(() => resolve(JSON.stringify(this._articles)), 700))
  }
};

