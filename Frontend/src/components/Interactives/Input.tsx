import React from "react";
import type { InputProps } from "./types.js";
import { Label, BaseInput, ErrorMessage } from "./Generics.js";

const Input = React.memo(
  ({ name, errors, required = true, ...inputProps }: InputProps) => {
    const error = errors?.[name]?.message as string;

    return (
      <div className="flex flex-col gap-2">
        <div className="input-box">
          <Label name={name} required={required} />
          <BaseInput name={name} {...inputProps} />
        </div>
        <ErrorMessage error={error} />
      </div>
    );
  }
);

export default Input;
