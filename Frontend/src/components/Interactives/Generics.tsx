import React from "react";
import { capitalise } from "../../utilityFns/utils.js";
import type { LabelProps, BaseInputProps, ErrorMessageProps } from "./types.js";

export const Label = ({ name, required = false }: LabelProps) => {
  return (
    <label htmlFor={name} className="label">
      {capitalise(name)} {required ? "*" : ""}
    </label>
  );
};

export const BaseInput = React.memo(
  ({
    name,
    register,
    className,
    type = "text",
    large = false,
    ...rest
  }: BaseInputProps) => {
    const Component = large ? "textarea" : "input";

    return (
      <Component
        {...register(name)}
        type={large ? undefined : type}
        className={`input ${className}`}
        {...rest}
      />
    );
  }
);

export const ErrorMessage = ({ error }: ErrorMessageProps) => (
  <div className="error-text">{error && error}</div>
);
