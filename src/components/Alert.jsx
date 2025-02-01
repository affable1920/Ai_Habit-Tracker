import React from "react";
import { MdNearbyError } from "react-icons/md";
import { IoIosClose, IoMdDoneAll } from "react-icons/io";

const Alert = ({ ifSuccessfull }) => {
  return (
    <div className="alert__container flex justify-center items-center">
      <div
        className={`alert ${
          ifSuccessfull
            ? "text-green-600 after:bg-green-600"
            : "text-red-600 after:bg-red-600"
        }`}
      >
        {ifSuccessfull ? <IoMdDoneAll /> : <MdNearbyError />}
        <span className="font-semibold tracking-wider text-xs leading-none line-clamp-1"></span>
        <IoIosClose className="cp" />
      </div>
    </div>
  );
};

export default Alert;
