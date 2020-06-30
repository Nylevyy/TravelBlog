const isImportant = true;
const description =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut cumque dolorem et eum, fugit harum, illo laudantium maiores maxime nihil nulla numquam optio provident qui sunt, tempora ullam ut?';

const articles = [
  {
    title: 'Title for an order',
    location: 'Ulyanovsk, Russia. Vostochny railway station',
    date: '2020-06-19T15:40:20.536Z',
    description,
    isImportant,
    id: 0.03873282942545364,
  },
  {
    title: 'Title for a calendar-item',
    location: 'Moscow, Russia. Vostochny District',
    date: '2020-06-18T20:39:13.833Z',
    description,
    isImportant,
    id: 0.8941051407740057,
  },
  {
    title: 'alternative subtitle for a description',
    location: 'Dubai, UAE. Central airport',
    date: '2020-06-20T20:49:35.058Z',
    description,
    isImportant,
    id: 0.21171422685359453,
  },
  {
    title: 'Main title for an calendar-item',
    location: 'Tyumen, Russia. Vostochny airport',
    date: '2020-06-19T18:51:07.471Z',
    description,
    isImportant: false,
    id: 0.6402915314697499,
  },
  {
    title: 'Major title calendar-item with happy end',
    location: 'Orenburg, Russia. Central Street',
    date: '2020-06-19T19:31:58.728Z',
    description,
    isImportant: false,
    id: 0.9107698164240214,
  },
];

module.exports = {
  title: 'Default title',
  articles,
};
