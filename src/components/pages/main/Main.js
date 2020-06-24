import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  articlesData, createArticle, deleteArticle, editArticle,
} from '~/store/data/Data';
import MainCalendar from '~/components/base/calendar/MainCalendar';
import Layout from '~/components/layouts/Layout';

const Main = () => {
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
      /* onArticleClick(id) {
        const article = dataContent.articles.find((item) => item.id === id);
        const data = Object.values(article);
        data[2] = moment(data[2]).format();
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
      }, */
    },
  );
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
          /* setDataContent((prevDataContent) => (
            {
              ...prevDataContent,
              dataStatus: 'fetching',
            }
          )); */
        },
      },
      modal: {
        isOpen: false,
        request: {
          isRequesting: false,
          hasError: false,
        },
        currentArticleData: null,
        sendRequest() {
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
        },
        setRequestError() {
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
        },
        resetModal() {
          setLayout((prevLayout) => (
            {
              ...prevLayout,
              modal: {
                ...prevLayout.modal,
                currentArticleData: null,
                isOpen: false,
                request: {
                  isRequesting: false,
                  hasError: false,
                },
              },
            }
          ));
        },
        onModalCloseClick() {
          layout.modal.resetModal();
        },
        onSubmitFormClick(article, isEditMode) {
          layout.modal.sendRequest();
          const request = async () => {
            if (isEditMode) {
              await editArticle(article);
              return;
            }
            await createArticle(article);
          };
          request()
            .then(() => {
              setDataContent((prevDataContent) => (
                {
                  ...prevDataContent,
                  status: 'fetching',
                  requestError: null,
                }
              ));
              layout.modal.resetModal();
            })
            .catch(() => {
              layout.modal.setRequestError();
            });
        },
        onDeleteCLick(id) {
          return () => {
            layout.modal.sendRequest();
            const request = async () => {
              const r = 12;
              await deleteArticle(id, r)
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
                layout.modal.resetModal();
              })
              .catch(() => {
                layout.modal.setRequestError();
              });
          };
        },
      },
    },
  );
  useEffect(() => {
    const getData = async () => articlesData;
    getData().then((response) => {
      setDataContent((revDataContent) => (
        {
          ...revDataContent,
          dataStatus: 'loaded',
          requestError: null,
          ...response,
          /* onDeleteArticleClick(id) {
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
          }, */
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
      <MainCalendar calendarData={dataContent} />
    </Layout>
  );
};

export default Main;
