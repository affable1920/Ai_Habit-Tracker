import InputError from "./InputError";

const Select = ({ name, register, errors, optional, options }) => {
  const registerProps = register(name);
  name = name[0].toUpperCase() + name.slice(1);

  return (
    <div className="input__group">
      <label className="label" htmlFor={name}>
        {name} {!optional && "*"}
      </label>
      <select {...registerProps} className="input" name={name}>
        <div className="text-primary h-full w-full dark:bg-primary italic tracking-wider dark:text-light-darker">
          <option value={""} className="bg-inherit" defaultChecked></option>
          {options.map((option) => (
            <option className="bg-inherit" key={option} value={option}>
              {option}
            </option>
          ))}
        </div>
      </select>
      {errors[name] && <InputError errorText={errors[name]?.message} />}
    </div>
  );
};

export default Select;
