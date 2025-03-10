import React, { useReducer } from "react";

export const ModalContext = React.createContext();
ModalContext.displayName = "ModalContext";

const ModalProvider = ({ children }) => {
  const ModalReducer = (state, action) => {
    switch (action.type) {
      case "OPEN_MODAL":
        return {
          ...state,
          openModals: action.keepPrevious
            ? [...state.openModals, action.name]
            : [action.name],

          props: action.props || {},
        };

      case "CLOSE_MODAL":
        return {
          ...state,
          openModals: state.opeModals?.filter((m) => modal != action.name),
        };

      case "CLOSE_ALL":
        return { openModals: [] };

      default:
        return state;
    }
  };

  const [modal, dispatch] = useReducer(ModalReducer, {
    openModals: [],
    props: {},
  });

  return (
    <ModalContext.Provider value={{ modal, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
