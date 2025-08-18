import React from "react";
import { capitalise } from "../Utils/utilFns";

const TextBox = React.memo(({ large, isError, registerObj }) => {
  return large ? (
    <textarea className={`input ${isError && "ring-error"}`} {...registerObj} />
  ) : (
    <input className={`input ${isError && "ring-error"}`} {...registerObj} />
  );
});

const Input = ({ name, optional, errors, large, register }) => {
  const error = errors[name];
  const errorMsg = error?.message
    ? capitalise(error.message.replaceAll('"', "")) + " !"
    : "";

  return (
    <div>
      <div className="input-box">
        <label className="label" htmlFor={name}>
          {capitalise(name)} {optional ? "" : "*"}
        </label>
        <TextBox
          large={large}
          isError={!!errorMsg}
          registerObj={register(name)}
        />
      </div>
      {errorMsg && <div className="text-error">{errorMsg}</div>}
    </div>
  );
};

export default Input;
