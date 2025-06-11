const IconComponent = ({
  Icon,
  fn,
  children,
  pClass,
  chClass,
  bg = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`${bg && "icon__bg"} ${pClass}`}
      onClick={fn}
    >
      <div className="flex items-center gap-2">
        {children && children}
        <Icon className={`icon ${chClass}`} />
      </div>
    </button>
  );
};

export default IconComponent;
