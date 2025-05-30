const InputAdd = ({ register, errors, optional, large = false, ...rest }) => {
  const { name, label, type = "text" } = rest;
  const errorMsg = errors[name]?.message || "";

  if (large)
    return (
      <div className="input__group relative">
        <label className="label" htmlFor="description">
          {label} {!optional && "*"}
        </label>
        <textarea className="input" name={name} {...register(name)} />
        {errors[name] && (
          <div className="text-xs italic text-red-700 dark:text-red-400 tracking-wider text-center">
            "{errorMsg[1].toUpperCase() + errorMsg.slice(2)}
          </div>
        )}
      </div>
    );

  return (
    <div className={`input__group`}>
      {label && (
        <label className="label" htmlFor={name}>
          {label} {!optional && "*"}
        </label>
      )}
      <input
        {...rest}
        type={type}
        className={`input`}
        name={name}
        {...register(name)}
      />
      {errors[name] && (
        <div className="text-xs italic text-rose-600 dark:text-red-500/80 tracking-widest text-center mt-1">
          "{errorMsg[1].toUpperCase() + errorMsg.slice(2)}
        </div>
      )}
    </div>
  );
};

export default InputAdd;
