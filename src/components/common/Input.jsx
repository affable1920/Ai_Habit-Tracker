import React from "react";

const Input = ({ register, name, label, errors, type = "text" }) => {
  return (
    <div className="flex flex-col gap-2 mt-8">
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
        className="bg-slate-100 shadow-sm py-2 rounded-lg outline-none pl-4 
        text-color__dark font-font__heading focus:shadow-md focus:mb-1 focus:ring-1"
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
