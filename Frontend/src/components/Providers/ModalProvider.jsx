import React, { useReducer } from "react";

export const ModalContext = React.createContext();
ModalContext.displayName = "ModalContext";

const ModalProvider = ({ children }) => {
  const ModalReducer = (state, action) => {
    switch (action.type) {
      case "OPEN_MODAL":
        return {
          open: action.keepPrevious
            ? [...state.open, action.name]
            : [action.name],

          props: action.props ? action.props : {},
        };

      case "CLOSE_MODAL":
        return {
          open: state.open?.filter((m) => m != action.name),
          props: action.props ? action.props : {},
        };

      case "CLOSE_ALL":
        return { open: [], props: action.props ? action.props : {} };

      default:
        return state;
    }
  };

  const [modals, dispatch] = useReducer(ModalReducer, {
    open: [],
    props: {},
  });

  return (
    <ModalContext.Provider value={{ modals, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
