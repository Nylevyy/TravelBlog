import React, { useEffect, useState } from 'react';
import {
  articlesData, createArticle, deleteArticle, editArticle,
} from 'src/store/data/Data';
import moment from 'moment';
import Calendar from '~/components/base/calendar/MainCalendar';
import Layout from '~/components/layouts/Layout';

const Main = () => {
  const [layout, setLayout] = useState(
    {
      header: {
        title: 'Друзья, мои походы пока ещё не закончились, делюсь с вами!',
        onNewEventClick() {
          setLayout((prevLayout) => (
            {
              ...prevLayout,
              modal: {
                ...prevLayout.modal,
                isOpen: true,
              },
            }
          ));
        },
        onRefreshContentClick() {
          setDataContent(dataContent => (
            {
              ...dataContent,
              dataStatus: 'fetching',
            }
          ));
        },
      },
      modal: {
        isOpen: false,
        request: {
          isRequesting: false,
          hasError: false,
        },
        currentArticleData: null,
        onModalCloseClick() {
          setLayout((prevLayout) => (
            {
              ...prevLayout,
              modal: {
                ...prevLayout.modal,
                isOpen: false,
                currentArticleData: null,
                request: {
                  isRequesting: false,
                  hasError: false,
                },
              },
            }
          ));
        },
        onSubmitFormClick(article, isEditMode) {
          setLayout((prevLayout) => (
            {
              ...prevLayout,
              modal: {
                ...prevLayout.modal,
                request: {
                  isRequesting: true,
                  hasError: false,
                },
              },
            }
          ));
          const request = async () => {
            if (isEditMode) {
              await editArticle(article);
              return;
            }
            await createArticle(article);
          };
          request()
            .then(() => {
              setDataContent((dataContent) => (
                {
                  ...dataContent,
                  status: 'fetching',
                  requestError: null,
                }
              ));
              setLayout((prevLayout) => (
                {
                  ...prevLayout,
                  modal: {
                    ...layout.modal,
                    currentArticleData: null,
                    isOpen: false,
                    request: {
                      isRequesting: false,
                      hasError: false,
                    },
                  },
                }
              ));
            })
            .catch(() => {
              setLayout((prevLayout) => (
                {
                  ...prevLayout,
                  modal: {
                    ...prevLayout.modal,
                    request: {
                      isRequesting: false,
                      hasError: true,
                    },
                  },
                }
              ));
            });
        },
        onDeleteCLick(id) {
          return () => {
            setLayout((prevLayout) => (
              {
                ...prevLayout,
                modal: {
                  ...prevLayout.modal,
                  request: {
                    isRequesting: true,
                    hasError: false,
                  },
                },
              }
            ));
            const request = async () => {
              await deleteArticle(id)
                .catch((err) => {
                  throw err;
                });
            };
            request()
              .then(() => {
                setDataContent((prevDataContent) => (
                  {
                    ...prevDataContent,
                    dataStatus: 'fetching',
                    requestError: null,
                  }
                ));
                setLayout((prevLayout) => (
                  {
                    ...prevLayout,
                    modal: {
                      ...prevLayout.modal,
                      currentArticleData: null,
                      isOpen: false,
                      request: {
                        isRequesting: false,
                        hasError: false
                      },
                    },
                  }
                ));
              })
              .catch(() => {
                setLayout((prevLayout) => (
                  {
                    ...prevLayout,
                    modal: {
                      ...prevLayout.modal,
                      request: {
                        isRequesting: false,
                        hasError: true,
                      },
                    },
                  }
                ));
              });
          };
        },
      },
    },
  );
  const [dataContent, setDataContent] = useState(
    {
      dataStatus: 'fetching',
      requestError: null,
      articles: [],
      onDeleteArticleClick(id) {
        return () => {
          const request = async () => {
            await deleteArticle(id)
              .catch((err) => {
                throw err;
              });
          };
          request()
            .then(() => {
              setDataContent((prevDataContent) => (
                {
                  ...prevDataContent,
                  dataStatus: 'fetching',
                }
              ));
            })
            .catch(() => {
              setDataContent((prevDataContent) => (
                {
                  ...prevDataContent,
                  requestError: id,
                }
              ));
            });
        };
      },
      onArticleClick(id) {
        const article = dataContent.articles.find(item => item.id === id);
        const data = Object.values(article);
        const data[2] = moment(data[2]).format();
        setLayout((prevLayout) => (
          {
            ...prevLayout,
            modal: {
              ...prevLayout.modal,
              isOpen: true,
              currentArticleData: data,
            },
          }
        ));
      },
    },
  );
  useEffect(() => {
    const getData = async () => {
      return await articlesData;
    };
    getData().then((prevResponse) => {
      setDataContent((revDataContent) => (
        {
          ...revDataContent,
          dataStatus: 'loaded',
          requestError: false,
          ...prevResponse,
          onDeleteArticleClick(id) {
            return () => {
              const request = async () => {
                await deleteArticle(id)
                  .catch((err) => {
                    throw err;
                  });
              };
              request()
                .then(() => {
                  setDataContent((prevDataContent) => (
                    {
                      ...prevDataContent,
                      dataStatus: 'fetching',
                    }
                  ));
                })
                .catch(() => {
                  setDataContent((prevDataContent) => (
                    {
                      ...prevDataContent,
                      requestError: id,
                    }
                  ));
                });
            };
          },
          onArticleClick(id) {
            const article = dataContent.articles.find((item) => item.id === id);
            const data = Object.values(article);
            data[2] = moment(data[2]);
            setLayout((prevLayout) => (
              {
                ...prevLayout,
                modal: {
                  ...prevLayout.modal,
                  isOpen: true,
                  currentArticleData: data,
                },
              }
            ));
          },
        }
      ));
    }).catch(() => {
      setDataContent((prevDataContent) => (
        {
          ...prevDataContent,
          dataStatus: 'failed to fetch',
        }
      ));
    });
  }, [dataContent.dataStatus]);

  return (
    <Layout layoutData={layout}>
      <Calendar calendarData={dataContent} />
    </Layout>
  );
};

export default Main;
