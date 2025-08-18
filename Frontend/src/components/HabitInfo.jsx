import useModalStore from "../stores/modalStore";

export const capitalize = (str) => {
  if (typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const HabitInfo = () => {
  const { props } = useModalStore((s) => s.props);

  const unwanted = ["id", "category", "status"];
  if (props) habit = props.habit;

  const properties = Object.entries(habit).filter(([key, value]) => {
    if (!unwanted.includes(key)) return value ? [key, value] : [key, "N/A"];
  });

  if (!props || !props?.habit) return null;

  return (
    <div className="flex  gap-3">
      {properties.map(([key, value]) => (
        <div
          className="flex justify-between gap-3 items-center italic tracking-wider"
          key={key}
        >
          <span className="leading-4 button button-primary">
            {capitalize(key)}
          </span>
          <span className={`leading-4 ${value && "button button-primary"}`}>
            {value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default HabitInfo;
