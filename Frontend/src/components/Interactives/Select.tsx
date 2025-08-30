import type { SelectProps } from "./types.js";
import { ErrorMessage, Label } from "./Generics.js";

const Select = ({ name, register, errors, options, ...rest }: SelectProps) => {
  const error = errors?.[name]?.message as string;

  return (
    <div className="flex flex-col gap-2">
      <div className="input-box">
        <Label name={name} />
        <select {...register(name)} className={`input`} name={name} {...rest}>
          <option value="" defaultChecked />
          {options.map((option, i) => (
            <option
              key={i}
              value={option}
              className="bg-slate-100 dark:bg-primary-light pointer"
            >
              {option}
            </option>
          ))}
        </select>
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};

export default Select;
