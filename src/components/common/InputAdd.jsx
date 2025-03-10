import React from "react";

const InputAdd = ({ register, errors, optional, large = false, ...rest }) => {
  const { name, label, type = "text" } = rest;
  const errorMsg = errors[name]?.message || "";

  if (large)
    return (
      <div className="input__group relative">
        <label className="label" htmlFor="description">
          Description
        </label>
        <textarea
          className="input__add"
          name="description"
          {...register("description")}
        />
        {errors[name] && (
          <div className="text-xs italic text-red-700 dark:text-red-400 tracking-wider text-center">
            "{errorMsg[1].toUpperCase() + errorMsg.slice(2)}
          </div>
        )}
      </div>
    );

  return (
    <div className={`input__group`}>
      {label && (
        <label className="label" htmlFor={name}>
          {label} {!optional && "*"}
        </label>
      )}
      <input
        {...rest}
        type={type}
        className={`input__add ${errors[name] && "error__boundary"}`}
        name={name}
        {...register(name)}
      />
      {errors[name] && (
        <div className="text-xs italic text-red-700 dark:text-red-400 tracking-wider text-center">
          "{errorMsg[1].toUpperCase() + errorMsg.slice(2)}
        </div>
      )}
    </div>
  );
};

export default InputAdd;
