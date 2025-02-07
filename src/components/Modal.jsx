import React from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return createPortal(
    <div className="overlay">
      <div className={`modal`}>
        <RxCross2
          className="cp icon__with__bg justify-self-end"
          onClick={onClose}
        />
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
