import React from "react";
import { MdNearbyError } from "react-icons/md";

const InputError = ({ errorText }) => {
  return (
    <div className="error__input">
      {errorText}
      <MdNearbyError className="dark:text-red-400 scale-125 transition-all" />
    </div>
  );
};

export default InputError;
