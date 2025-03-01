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
  large = false,
  teritiary = false,
}) => {
  const { dispatch } = useContext(TooltipContext);

  if (large)
    return (
      <div className="input__group">
        <label className="label" htmlFor="description">
          Describe your habit
        </label>
        <textarea
          className="input__add"
          name="description"
          {...register("description")}
        />
      </div>
    );

  return (
    <div className={`input__group`}>
      {label && (
        <label
          className={`label ${name === "reminderTimes" && "text-center"}`}
          htmlFor="title"
        >
          {label} {!optional && "*"}
        </label>
      )}
      <input
        onFocus={() => dispatch({ type: "input", tooltip: placeholder, name })}
        onMouseLeave={() => dispatch({ type: "clear" })}
        placeholder={placeholder}
        type={type}
        className={`${teritiary ? "input__teritiary" : "input__add"} ${
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
