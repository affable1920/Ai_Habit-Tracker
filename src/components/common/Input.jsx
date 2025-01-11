import React from "react";

const Input = ({ register, name, label, errors, type = "text" }) => {
  return (
    <div className="flex flex-col gap-2 mt-3">
      <label
        className="font-medium text-sm opacity-80 tracking-wide"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        name={name}
        className={`input__secondary`}
      />
      {errors[name] && (
        <div className="bg-red-50 px-4 py-1 text-xs text-red-800 shadow-sm rounded-md tracking-wide">
          {errors[name]?.message}
        </div>
      )}
    </div>
  );
};

export default Input;
