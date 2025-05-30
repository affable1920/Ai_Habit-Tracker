const Icon = ({ Icon, bg = false, fn, classes }) => {
  return (
    <button
      className={`${bg && "btn__icon"} ${classes}`}
      onClick={() => fn && fn()}
    >
      <Icon className="icon" />
    </button>
  );
};

export default Icon;
