import React from "react";
import InputError from "./InputError";

const Select = ({ name, label, register, errors, optional, options }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="label" htmlFor={name}>
        {label} {!optional && "*"}
      </label>
      <select
        className="input__add cp w-1/2"
        name={name}
        register={register}
        errors={errors}
      >
        <option value="" defaultChecked></option>
        {options.map((option) => (
          <option
            className="text-xs flex items-start justify-start"
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
      {errors[name] && <InputError errorText={errors[name]?.message} />}
    </div>
  );
};

export default Select;
