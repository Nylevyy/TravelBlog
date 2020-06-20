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
        onSubmitFormClick(article) {
          setDataContent(dataContent => {
            const newArticlesData = dataContent.articles.slice();
            const oldArticlesDataIndex = newArticlesData.findIndex(item => (item.id === article.id));
            if (~oldArticlesDataIndex) {
              newArticlesData[oldArticlesDataIndex] = article
            } else {
              newArticlesData.push(article);
            }
            return (
              {
                ...dataContent,
                articles: newArticlesData
              }
            )
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
        onDeleteCLick(id) {
          return function () {
            setDataContent(dataContent => {
              const newArticlesData = dataContent.articles.slice();
              const articleIndex = newArticlesData.findIndex(item => (item.id === id));
              newArticlesData.splice(articleIndex, 1);
              return (
                {
                  ...dataContent,
                  articles: newArticlesData
                }
              )
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
    setDataContent(dataContent => (
      {
        ...dataContent,
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
    ))
  }, [dataContent.articles]);

  return (
    <Layout layoutData={layout}>
      <Calendar calendarData={dataContent}/>
    </Layout>
  )
};


export default Main

