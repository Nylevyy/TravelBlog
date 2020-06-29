const setTitle = (title) => ({ type: 'SET_TITLE', payload: title });

const setModalDefault = () => ({ type: 'SET_MODAL_DEFAULT' });

const openModal = (article = null) => ({
  type: 'OPEN_MODAL',
  payload: article,
});

export { setTitle, openModal, setModalDefault };
