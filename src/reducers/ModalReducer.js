const init = { openModal: null };

const ModalReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { openModal: action.payload };

    case "CLOSE_MODAL":
      return { openModal: null };

    default:
      return init;
  }
};

export default ModalReducer;
