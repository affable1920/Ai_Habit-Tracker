import React from "react";
import InputError from "./InputError";

const Select = ({ name, label, register, errors, optional, options }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="label" htmlFor={name}>
        {label} {!optional && "*"}
      </label>
      <select
        className="input__add"
        name={name}
        errors={errors}
        {...register(name)}
      >
        <option value={""} defaultChecked></option>
        {options.map((option) => (
          <option className="text-xs" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[name] && <InputError errorText={errors[name]?.message} />}
    </div>
  );
};

export default Select;
