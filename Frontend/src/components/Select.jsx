import { capitalise } from "../Utils/utilFns";

const Select = ({ name, register, errors, optional, options }) => {
  const error = errors[name];
  const errorMsg = error ? capitalise(error?.message) + " !" : "";

  return (
    <div className="flex flex-col gap-2">
      <div className="input-box">
        <label className="label" htmlFor={name}>
          {capitalise(name)} {optional ? "" : "*"}
        </label>
        <select {...register(name)} className="input" name={name}>
          <option value="" defaultChecked />
          {options.map((option, i) => (
            <option
              key={i}
              value={option}
              className="bg-slate-100 dark:bg-primary-light hover:pointer"
            >
              {option}
            </option>
          ))}
        </select>
      </div>
      {errorMsg && <div className="text-error">{errorMsg}</div>}
    </div>
  );
};

export default Select;
