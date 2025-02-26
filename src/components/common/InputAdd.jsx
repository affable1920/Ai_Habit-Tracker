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
}) => {
  const { dispatch } = useContext(TooltipContext);

  if (large)
    return (
      <div className="flex flex-col">
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
    <div className={`flex flex-col gap-[8px] mb-3`}>
      {label && (
        <label
          className={`text-xs tracking-wider font-medium opacity-75 ${
            name === "reminderTimes" && "text-center"
          }`}
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
