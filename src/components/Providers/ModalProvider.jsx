import React, { useReducer } from "react";
import ModalReducer from "../../reducers/ModalReducer";

export const ModalContext = React.createContext();
ModalContext.displayName = "ModalContext";

const ModalProvider = ({ children }) => {
  const [modal, dispatch] = useReducer(ModalReducer, { openModal: null });
  return (
    <ModalContext.Provider value={{ modal, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
