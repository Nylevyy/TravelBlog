import React, {useState} from "react";
import Calendar from "./calendar";
import Layout from "../../layout";

const data = {
  articles: {
    "12 июня": [
      {
        title: "Title for an article",
        location: "Ulyanovsk, Russia. Vostochny airport",
        time: "12:32",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut cumque dolorem et eum, fugit harum, illo laudantium maiores maxime nihil nulla numquam optio provident qui sunt, tempora ullam ut?",
        isImportant: true,
        id: 12446329323
      },
      {
        title: "Title for an article",
        location: "Ulyanovsk, Russia. Vostochny airport",
        time: "23:32",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut cumque dolorem et eum, fugit harum, illo laudantium maiores maxime nihil nulla numquam optio provident qui sunt, tempora ullam ut?",
        isImportant: true,
        id: 12446329325
      },
      {
        title: "Title for an article",
        location: "Ulyanovsk, Russia. Vostochny airport",
        time: "22:32",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut cumque dolorem et eum, fugit harum, illo laudantium maiores maxime nihil nulla numquam optio provident qui sunt, tempora ullam ut?",
        isImportant: false,
        id: 12446329324
      },
    ],
    "14 июня": [
      {
        title: "Title for an article",
        location: "Ulyanovsk, Russia. Vostochny airport",
        time: "18:42",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut cumque dolorem et eum, fugit harum, illo laudantium maiores maxime nihil nulla numquam optio provident qui sunt, tempora ullam ut?",
        isImportant: false,
        id: 12446329329
      },
      {
        title: "Title for an article",
        location: "Ulyanovsk, Russia. Vostochny airport",
        time: "12:32",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut cumque dolorem et eum, fugit harum, illo laudantium maiores maxime nihil nulla numquam optio provident qui sunt, tempora ullam ut?",
        isImportant: true,
        id: 12446329328
      }
    ],
    "15 июня": [
      {
        title: "Title for an article",
        location: "Ulyanovsk, Russia. Vostochny airport",
        time: "21:42",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aut cumque dolorem et eum, fugit harum, illo laudantium maiores maxime nihil nulla numquam optio provident qui sunt, tempora ullam ut?",
        isImportant: false,
        id: 12446329345
      }
    ]
  }
};

function Main() {
  const [layout, setLayout] = useState(
    {
      header: {
        title: 'Друзья, мои походы пока ещё не закончились, делюсь с вами!',
        onNewEventClick() {
          setLayout(layout => {
            return {
              ...layout,
              modal: {
                ...layout.modal,
                isOpen: true
              }
            }
          });
        },
        onRefreshContentClick() {
          console.log("trying2fetchData")
        }
      },
      modal: {
        isOpen: false,
        currentArticleData: null,
        onModalCloseClick() {
          setLayout(layout => {
            return {
              ...layout,
              modal: {
                ...layout.modal,
                isOpen: false
              }
            }
          });
        },
        onSubmitFormClick(date, article) {
          setDataContent(dataContent => {

            if (!dataContent.articles[date]) {
              return (
                {
                  ...dataContent,
                  articles: {
                    ...dataContent.articles,
                    [date]: [article]
                  }
                }
              )
            } else {
              const newArticlesData = dataContent.articles[date].slice();
              newArticlesData.push(article);
              return (
                {
                  ...dataContent,
                  articles: {
                    ...dataContent.articles,
                    [date]: newArticlesData
                  }
                }
              )
            }
          });
          setLayout(layout => {
            return {
              ...layout,
              modal: {
                ...layout.modal,
                currentArticleData: null,
                isOpen: false
              }
            }
          })
        },
        onDeleteCLick() {
          console.log('del');
        }
      }
    }
  );

  const [dataContent, setDataContent] = useState(
    {
      ...data,
      onDeleteArticleClick(date, id) {
        return function () {
          setDataContent(dataContent => {
            const newArticlesData = dataContent.articles[date].slice();
            const articleIndex = newArticlesData.findIndex(item => {
              return (item.id === id)
            });
            newArticlesData.splice(articleIndex, 1);
            if (!newArticlesData.length) {
              const articles = Object.assign({}, dataContent.articles);
              delete articles[date];
              return (
                {
                  ...dataContent,
                  articles: {
                    ...articles
                  }
                }
              )
            } else {
              return (
                {
                  ...dataContent,
                  articles: {
                    ...dataContent.articles,
                    [date]: newArticlesData
                  }
                }
              )
            }
          })
        }
      },
      onArticleClick(date, id) {
        const article = dataContent.articles[date].find(item => item.id === id);
        setLayout(layout => {
          return {
            ...layout,
            modal: {
              ...layout.modal,
              isOpen: true,
              currentArticleData: Object.values(article).slice(0, 5)
            }
          }
        })
      },
    }
  );
  return (
    <Layout layoutData={layout}>
      <Calendar calendarData={dataContent}/>
    </Layout>
  )
}


export default Main

