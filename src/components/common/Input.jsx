import React from "react";

const Input = ({ register, name, label, errors, classes, type = "text" }) => {
  return (
    <div className="flex flex-col text-left gap-1 mt-7">
      <label className="font-medium opacity-90 tracking-wide" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        name={name}
        className="bg-slate-50 py-2 rounded-sm outline-none pl-4 text-color__dark font-font__heading focus:bg-gray-100"
      />
      {errors[name] && (
        <div className="bg-red-100 px-4 py-1 text-sm rounded-sm tracking-wide">
          {errors[name]?.message}
        </div>
      )}
    </div>
  );
};

export default Input;
