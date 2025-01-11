import React, { useContext } from "react";
import InputError from "./InputError";
import TooltipContext from "./../../context/TooltipContext";

const InputAdd = ({
  name,
  label,
  register,
  errors,
  type = "text",
  optional,
  placeholder = "",
}) => {
  const { dispatch } = useContext(TooltipContext);

  return (
    <div className={`flex flex-col gap-1`}>
      <label className="label" htmlFor="title">
        {label} {!optional && "*"}
      </label>
      <input
        onFocus={() => dispatch({ type: "input", tooltip: placeholder, name })}
        onMouseLeave={() => dispatch({ type: "clear" })}
        placeholder={placeholder}
        type={type}
        className={`input__add ${
          errors[name] &&
          "border-red-800 focus:border-red-800 dark:border-red-800 dark:focus:border-red-800 focus:mb-2"
        } ${type === "datetime-local" && "uppercase tracking-wide cp"}`}
        name={name}
        {...register(name)}
      />
      {errors[name] && <InputError errorText={errors[name]?.message} />}
    </div>
  );
};

export default InputAdd;
