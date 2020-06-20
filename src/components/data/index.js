const generateArticle = (object) => (
  {
    ...object,
    date: ("2020-06-" + (Math.round(Math.random() * 30)) + ' ' + (Math.round(Math.random() * 23)) + ":" + (Math.round(Math.random() * 59))),
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
      title: "Title for an calendar-item",
      location: "Moscow, Russia. Vostochny District",
    },
    {
      title: "alternative subtitle for a description",
      location: "Dubai, UAE. Central airport",
    },
    {
      title: "Main title for an calendar-item",
      location: "Tyumen, Russia. Vostochny airport",
    },
    {
      title: "Major title calendar-item with happy end",
      location: "Orenburg, Russia. Central Street",
    }
  ]
);

const articlesData = {
  articles: bodies.map(item => generateArticle(item))
};

export default articlesData