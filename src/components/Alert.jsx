import React from "react";
import { MdNearbyError } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";

const Alert = ({ ifSuccessfull, errorMessage }) => {
  return (
    <div className="alert__container flex justify-center items-center">
      <div
        className={`alert after:absolute after:w-full after:h-[108%] after:top-0 
          after:left-0 after:z-[-5] after:rounded-sm after:animate-[alert] ${
            ifSuccessfull
              ? "text-green-600 after:bg-green-600"
              : "text-red-600 after:bg-red-600"
          }`}
      >
        {ifSuccessfull ? <IoMdDoneAll /> : <MdNearbyError />}
        <span className="font-semibold tracking-wider text-xs leading-none line-clamp-1">
          {ifSuccessfull ? "Operation Successfull!" : errorMessage}
        </span>
      </div>
    </div>
  );
};

export default Alert;
