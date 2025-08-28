import React from "react";
import { capitalise } from "../utilityFns/utils";

const TextBox = React.memo(({ large, registerObj, ...rest }) => {
  return large ? (
    <textarea className={`input`} {...registerObj} {...rest} />
  ) : (
    <input className={`input`} {...registerObj} {...rest} />
  );
});

const Input = React.memo(({ name, errors, large, register, ...rest }) => {
  const error = errors[name];
  const errorMsg = capitalise(error?.message);

  return (
    <div className="flex flex-col gap-2">
      <div className="input-box">
        <label className="label" htmlFor={name}>
          {capitalise(name)} {rest?.optional ? "" : "*"}
        </label>
        <TextBox rest={rest} large={large} registerObj={register(name)} />
      </div>
      {errorMsg && <div className="text-error">{errorMsg}</div>}
    </div>
  );
});

export default Input;
