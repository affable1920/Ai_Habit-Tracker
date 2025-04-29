import React from "react";
import alertStore from "../stores/alertStore";
import { IoMdClose } from "react-icons/io";

const Alert = () => {
  const { alert, message, hideAlert, type } = alertStore();

  if (!alert) return null;
  return (
    <div className={`alert ${type === "success" ? "" : "after:bg-red-300"}`}>
      {"message"}
      <IoMdClose
        className="ml-8 cursor-pointer icon__with__bg"
        onClick={hideAlert}
      />
    </div>
  );
};

export default Alert;
