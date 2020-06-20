import React, {useEffect, useState} from "react";
import Calendar from "./calendar";
import Layout from "../../layout";
import articlesData from "../../data";

const Main = () => {
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
                isOpen: false,
                currentArticleData: null
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
              const oldArticlesDataIndex = newArticlesData.findIndex(item => {
                return (item.id === article.id)
              });
              if (typeof oldArticlesDataIndex === "number") {
                newArticlesData[oldArticlesDataIndex] = article
              } else {
                newArticlesData.push(article);
              }
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
        onDeleteCLick(id, date) {
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
          }
        }
      }
    }
  );

  const [dataContent, setDataContent] = useState(
    {
      ...articlesData,
      onDeleteArticleClick(id) {
        return function () {
          setDataContent(dataContent => {
            const newArticlesData = dataContent.articles.slice();
            const articleIndex = newArticlesData.findIndex(item => {
              return (item.id === id)
            });
            newArticlesData.splice(articleIndex, 1);
            return (
              {
                ...dataContent,
                articles: newArticlesData
              }
            )
          })
        }
      },
      onArticleClick(id) {
        const article = dataContent.articles.find(item => item.id === id);
        const data = Object.values(article);
        setLayout(layout => (
          {
            ...layout,
            modal: {
              ...layout.modal,
              isOpen: true,
              currentArticleData: data
            }
          }
        ))
      }
    }
  );
  useEffect(() => {
    setDataContent(dataContent => {
      return (
        {
          ...dataContent,
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
            console.log(article)
            console.log(dataContent.articles[date])
            const data = Object.values(article);
            data.push(date);
            setLayout(layout => {
              return {
                ...layout,
                modal: {
                  ...layout.modal,
                  isOpen: true,
                  currentArticleData: data
                }
              }
            })
          },
        }
      )
    })
  }, [dataContent.articles]);
  return (
    <Layout layoutData={layout}>
      <Calendar calendarData={dataContent}/>
    </Layout>
  )
}


export default Main

