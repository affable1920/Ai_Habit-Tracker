import { capitalise } from "../Utils/utilFns";

const Select = ({ name, register, errors, optional, options }) => {
  const error = errors[name];
  const errorMsg = error ? capitalise(error?.message) + " !" : "";

  return (
    <>
      <div className="input-box">
        <label className="label" htmlFor={name}>
          {capitalise(name)} {optional ? "" : "*"}
        </label>
        <select {...register(name)} className="input" name={name}>
          {options.map((option, i) => {
            if (i === 0) return <option value="" defaultChecked />;
            return <option value={option}>{option}</option>;
          })}
        </select>
      </div>
      {errorMsg && <div className="text-error">{errorMsg}</div>}
    </>
  );
};

export default Select;
