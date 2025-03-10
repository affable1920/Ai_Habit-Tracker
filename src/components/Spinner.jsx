import React from "react";
import { createPortal } from "react-dom";
import Overlay from "./Overlay";
import loadingStore from "../stores/loadingStore";

const Spinner = () => {
  const { loading } = loadingStore();

  if (!loading) return null;
  return createPortal(
    <Overlay>
      <div className={`spinner`}></div>
    </Overlay>,
    document.getElementById("portal")
  );
};

export default Spinner;
