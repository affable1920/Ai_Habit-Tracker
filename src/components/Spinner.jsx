import React from "react";
import { createPortal } from "react-dom";
import Overlay from "./Overlay";

const Spinner = () => {
  return createPortal(
    <Overlay>
      <div className={`spinner `}>
        <div className="rounded-full w-2 h-2 m-1 bg-bright__lighter spinner__ball"></div>
        <div className="rounded-full w-2 h-2 m-1 bg-bright__lighter spinner__ball"></div>
      </div>
    </Overlay>,
    document.getElementById("portal")
  );
};

export default Spinner;
