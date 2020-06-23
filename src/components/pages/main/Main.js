import React, {useEffect, useState} from "react";
import Calendar from "../../base/calendar/MainCalendar";
import Layout from "../../layout/Layout";
import {articlesData, createArticle, deleteArticle, editArticle} from "../../../data/Data";

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
          setDataContent(dataContent => {
            return {
              ...dataContent,
              dataStatus: "fetching",
            }
          })
        }
      },
      modal: {
        isOpen: false,
        request: {
          isRequesting: false,
          hasError: false
        },
        currentArticleData: null,
        onModalCloseClick() {
          setLayout(layout => (
            {
              ...layout,
              modal: {
                ...layout.modal,
                isOpen: false,
                currentArticleData: null,
                request: {
                  isRequesting: false,
                  hasError: false
                },
              }
            }
          ))
        },
        onSubmitFormClick(article, isEditMode) {
          setLayout(layout => (
            {
              ...layout,
              modal: {
                ...layout.modal,
                request: {
                  isRequesting: true,
                  hasError: false
                },
              }
            }
          ));
          const request = async () => {
            if (isEditMode) {
              await editArticle(article);
              return
            }
            await createArticle(article)
          };
          request()
            .then(() => {
            setDataContent(dataContent => {
              return (
                {
                  ...dataContent,
                  status: "fetching",
                  requestError: null
                }
              )
            });
            setLayout(layout => (
              {
                ...layout,
                modal: {
                  ...layout.modal,
                  currentArticleData: null,
                  isOpen: false,
                  request: {
                    isRequesting: false,
                    hasError: false
                  },
                }
              }
            ))
          })
            .catch(() => {
              setLayout(layout => (
                {
                  ...layout,
                  modal: {
                    ...layout.modal,
                    request: {
                      isRequesting: false,
                      hasError: true
                    },
                  }
                }
              ))
            });
        },
        onDeleteCLick(id) {
          return function () {
            setLayout(layout => (
              {
                ...layout,
                modal: {
                  ...layout.modal,
                  request: {
                    isRequesting: true,
                    hasError: false
                  },
                }
              }
            ));
            const request = async () => {
              await deleteArticle(id)
                .catch(err => {
                  throw err
                })
            };
            request()
              .then(() => {
                setDataContent(dataContent => (
                  {
                    ...dataContent,
                    dataStatus: "fetching",
                    requestError: null
                  }
                ));
                setLayout(layout => (
                  {
                    ...layout,
                    modal: {
                      ...layout.modal,
                      currentArticleData: null,
                      isOpen: false,
                      request: {
                        isRequesting: false,
                        hasError: false
                      },
                    }
                  }
                ))
              })
              .catch(() => {
                setLayout(layout => (
                  {
                    ...layout,
                    modal: {
                      ...layout.modal,
                      request: {
                        isRequesting: false,
                        hasError: true
                      },
                    },
                  }
                ))
              })
          }
        }
      }
    }
  );
  const [dataContent, setDataContent] = useState(
    {
      dataStatus: "fetching",
      requestError: null,
      articles: [],
      onDeleteArticleClick(id) {
        return function () {
          const request = async () => {
            await deleteArticle(id)
              .catch(err => {
                throw err
              })
          };
          request()
            .then(() => {
              setDataContent(dataContent => (
                {
                  ...dataContent,
                  dataStatus: "fetching"
                }
              ));
            })
            .catch(() => {
              setDataContent(dataContent => (
                {
                  ...dataContent,
                  requestError: id,
                }
              ));
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
    const getData = async () => {
      return await articlesData;
    };
    getData().then(response => {
      setDataContent(dataContent => (
        {
          ...dataContent,
          dataStatus: "loaded",
          requestError: false,
          ...response,
          onDeleteArticleClick(id) {
            return function () {
              const request = async () => {
                await deleteArticle(id)
                  .catch(err => {
                    throw err
                  })
              };
              request()
                .then(() => {
                  setDataContent(dataContent => (
                    {
                      ...dataContent,
                      dataStatus: "fetching"
                    }
                  ));
                })
                .catch(() => {
                  setDataContent(dataContent => (
                    {
                      ...dataContent,
                      requestError: id,
                    }
                  ));
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
    }).catch(() => {
      setDataContent(dataContent => (
        {
          ...dataContent,
          dataStatus: "failed to fetch"
        }
      ))
    })
  }, [dataContent.dataStatus]);

  return (
    <Layout layoutData={layout}>
      <Calendar calendarData={dataContent}/>
    </Layout>
  )
};


export default Main

