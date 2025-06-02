const Icon = ({ Icon, bg = false, fn, classes, children }) => {
  return (
    <button
      className={`${bg && "btn__icon"} ${classes}`}
      onClick={() => fn && fn()}
    >
      <div className="inline-flex items-center">
        <div className="">{children}</div>
        <Icon className="icon" />
      </div>
    </button>
  );
};

export default Icon;
