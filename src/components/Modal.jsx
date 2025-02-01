import React from "react";

const Modal = ({
  isOpen,
  onClose,
  text = "Would you still like to add the habit ?",
  message,
  children,
}) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-10 transition-all italic">
        <div className="modal">
          <div className="bg-slate-100  rounded-md p-2 text-xs tracking-wide">
            {message && <span className="font-semibold">{message}</span>}
            {children && children}
          </div>
          <div className="text-xs w-full mt-2 flex flex-col px-2">
            {text && <span className="font-medium leading-tight">{text}</span>}
            <div className="flex gap-2 justify-between">
              <button className="btn btn__primary">Cancel</button>
              <button className="btn btn__primary" onClick={onClose}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
