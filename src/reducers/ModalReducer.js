const ModalReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        openModal: true,
        modalName: action.modalToShow,
        props: action.props || {},
      };

    case "CLOSE_MODAL":
      return { openModal: null };

    default:
      return state;
  }
};

export default ModalReducer;
