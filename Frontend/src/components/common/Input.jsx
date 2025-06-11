const InputBox = ({ registerProps, large, ...rest }) => {
  return large ? (
    <textarea className="input" {...registerProps} {...rest} />
  ) : (
    <input className="input" {...registerProps} {...rest} />
  );
};

const Input = ({ register, errors, optional, large, ...rest }) => {
  let { name } = rest;

  let errorMsg = "";

  if (errors[name]) {
    errorMsg = errors[name].message;
  }

  if (errorMsg)
    errorMsg = '"' + errorMsg[1].toUpperCase() + errorMsg.slice(2) + " !";

  const registerProps = register(name);
  name = name[0].toUpperCase() + name.slice(1);

  return (
    <div className="input__group">
      <label htmlFor={name} id={name} className="label">
        {name} {!optional && "*"}
      </label>
      <InputBox registerProps={registerProps} large={large} />
      <div className="text-xs italic text-red-700 dark:text-red-400 tracking-wider text-center">
        {errorMsg}
      </div>
    </div>
  );
};

export default Input;
